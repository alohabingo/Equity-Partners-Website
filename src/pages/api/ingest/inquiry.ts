export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

const MAX_MESSAGE = 5000;
const VALID_LOCALES = ["en", "es", "ca"];

/** "Full Name" / full_name / fullName all collapse to "fullname". */
const norm = (k: string) => k.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Field aliases, because every form builder names things differently and the
 * person wiring up the other end shouldn't have to match our vocabulary.
 */
const ALIASES: Record<string, string[]> = {
  name:        ["name", "fullname", "yourname", "nombre", "nom"],
  email:       ["email", "emailaddress", "youremail", "correo", "correu", "mail"],
  phone:       ["phone", "telephone", "tel", "phonenumber", "mobile", "telefono", "telefon"],
  message:     ["message", "howcanwehelp", "comments", "comment", "enquiry", "inquiry",
                "question", "body", "mensaje", "missatge", "notes"],
  locale:      ["locale", "lang", "language", "idioma", "llengua"],
  source_page: ["sourcepage", "page", "url", "pageurl", "referrer", "referer", "origin"],
};

/** Some services wrap the real fields one level down. */
const WRAPPERS = ["data", "fields", "payload", "form", "formdata", "answers", "submission"];

function flatten(input: Record<string, unknown>): Record<string, string> {
  let source = input;
  for (const w of WRAPPERS) {
    const inner = input[w];
    if (inner && typeof inner === "object" && !Array.isArray(inner)) {
      source = { ...(inner as Record<string, unknown>), ...input };
      break;
    }
  }
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(source)) {
    if (v === null || v === undefined) continue;
    if (typeof v === "object") continue;
    out[norm(k)] = String(v).trim();
  }
  return out;
}

const pick = (flat: Record<string, string>, field: string): string => {
  for (const alias of ALIASES[field] ?? []) {
    if (flat[alias]) return flat[alias];
  }
  return "";
};

/**
 * Buyer enquiries arriving from a project's own website.
 *
 * This is the webhook the project site posts to. It accepts JSON, urlencoded and
 * multipart bodies, tolerates the field names common form builders use, and takes
 * the key from a header, the body or the query string — so whoever wires up the
 * other end doesn't have to match one exact shape.
 *
 * Every attempt is written to ingest_log. A misconfigured form should be visible
 * in the portal rather than silently dropping a real buyer's enquiry. The log
 * stores no submitted payload: a rejected attempt may still contain personal data.
 */
export const POST: APIRoute = async ({ request, url }) => {
  const supabase = supabaseAdmin();

  const log = async (outcome: "accepted" | "rejected", reason: string, projectId: string | null = null) => {
    try {
      await supabase.from("ingest_log").insert({ project_id: projectId, outcome, reason });
    } catch {
      /* logging must never be why a submission fails */
    }
  };

  // ---- read the body in whatever shape it arrived ----
  let raw: Record<string, unknown> = {};
  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      raw = await request.json();
    } else if (
      contentType.includes("form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      raw = Object.fromEntries(await request.formData());
    } else {
      // No or unknown content-type: try JSON, fall back to urlencoded.
      const text = await request.text();
      try {
        raw = JSON.parse(text);
      } catch {
        raw = Object.fromEntries(new URLSearchParams(text));
      }
    }
  } catch {
    await log("rejected", "could not read the request body");
    return json({ ok: false, error: "bad_body" }, 400);
  }
  const flat = flatten(raw);

  // ---- authenticate ----
  // Header is preferred. Body and query string are fallbacks for form services
  // that can't set custom headers; both are noted as second-best in the docs
  // because a key in a URL can end up in server logs.
  const key =
    request.headers.get("x-ingest-key")?.trim() ||
    flat["ingestkey"] ||
    flat["key"] ||
    url.searchParams.get("key")?.trim() ||
    "";

  if (!key) {
    await log("rejected", "no ingest key supplied");
    return json({ ok: false, error: "no_key" }, 401);
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id, slug, status")
    .eq("ingest_key_hash", await sha256Hex(key))
    .maybeSingle();

  if (!project) {
    await log("rejected", "ingest key did not match any project");
    return json({ ok: false, error: "bad_key" }, 401);
  }
  if (project.status !== "active") {
    await log("rejected", `project ${project.slug} is archived`, project.id);
    return json({ ok: false, error: "project_archived" }, 403);
  }

  // ---- pull the fields out ----
  const name = pick(flat, "name");
  // Normalised on the way in: lower-cased and trimmed. Enquiries stand alone by
  // decision, but consistent emails plus the index on lower(email) leave the door
  // open to grouping them into contacts later without touching historical rows.
  const email = pick(flat, "email").toLowerCase();

  if (!name || !email) {
    await log(
      "rejected",
      `name or email missing — fields received: ${Object.keys(flat).join(", ") || "none"}`,
      project.id,
    );
    return json({ ok: false, error: "name_and_email_required" }, 422);
  }
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) {
    await log("rejected", "email was not a valid address", project.id);
    return json({ ok: false, error: "bad_email" }, 422);
  }

  const localeRaw = pick(flat, "locale").toLowerCase().slice(0, 2);
  const locale = VALID_LOCALES.includes(localeRaw) ? localeRaw : "en";

  const { error } = await supabase.from("inquiries").insert({
    project_id: project.id,
    audience: "buyer",
    stage: "new",
    type: "general",
    name,
    email,
    phone: pick(flat, "phone") || null,
    message: pick(flat, "message").slice(0, MAX_MESSAGE) || null,
    locale,
    source_page: pick(flat, "source_page") || null,
    details: {},
  });

  if (error) {
    await log("rejected", `database insert failed: ${error.message}`, project.id);
    return json({ ok: false, error: "insert_failed" }, 500);
  }

  await log("accepted", `enquiry received from ${email}`, project.id);
  return json({ ok: true });
};

/** A GET is almost always someone checking the URL works. Say so plainly. */
export const GET: APIRoute = async () =>
  json({ ok: false, error: "use_post", hint: "POST your form fields here with an X-Ingest-Key header." }, 405);
