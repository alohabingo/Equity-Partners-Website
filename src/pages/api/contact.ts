export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../lib/supabase";
import { CLICK_ID_PARAMS, clickIdsForRow, type ClickIds } from "../../lib/clickIds";

const VALID_TYPES = ["investor", "founder_pitch", "general", "video_call"] as const;
type InquiryType = (typeof VALID_TYPES)[number];

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, url }) => {
  // Basic CSRF/spam guard: browser form posts must come from our own origin.
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return json({ ok: false, error: "bad_origin" }, 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const get = (key: string) => form.get(key)?.toString().trim() ?? "";

  // Honeypot — bots fill every field; humans never see this one.
  if (get("website")) return json({ ok: true });

  const firstName = get("first_name");
  const lastName = get("last_name");
  const email = get("email");
  const message = get("message");
  const company = get("company");
  const locale = ["en", "es", "ca"].includes(get("locale")) ? get("locale") : "en";
  const rawType = get("inquiry_type");
  const type: InquiryType = (VALID_TYPES as readonly string[]).includes(rawType)
    ? (rawType as InquiryType)
    : "general";

  // Basic validation
  if (!firstName || !lastName || !email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    return json({ ok: false, error: "invalid_fields" }, 422);
  }
  if ([firstName, lastName, email, message].some((v) => v.length > 5000)) {
    return json({ ok: false, error: "invalid_fields" }, 422);
  }

  /**
   * The advertising click id, re-validated here rather than trusted.
   *
   * It arrives as a JSON string from the visitor's browser, which means it
   * arrives from a place anyone can edit. Only the parameters we know about are
   * read, only strings are kept, and anything oversized is dropped — so the
   * worst a forged submission can do is attribute itself to a click that never
   * happened, which is noise in a report rather than a way into the database.
   */
  const clickIds: ClickIds = (() => {
    const raw = get("click_ids");
    if (!raw || raw.length > 4000) return {};
    let parsed: unknown;
    try { parsed = JSON.parse(raw); } catch { return {}; }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: ClickIds = {};
    for (const key of CLICK_ID_PARAMS) {
      const v = (parsed as Record<string, unknown>)[key];
      if (typeof v === "string" && v && v.length <= 512 && !/\s/.test(v)) out[key] = v;
    }
    return out;
  })();

  // Extra structured fields (investor form)
  const details: Record<string, string> = {};
  for (const key of ["investor_type", "investment_timeline", "investment_range"]) {
    const v = get(key);
    if (v) details[key] = v;
  }

  // Throttle: max 5 submissions per email address per 24h.
  try {
    const dayAgo = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
    const { count } = await supabaseAdmin()
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", dayAgo);
    if ((count ?? 0) >= 5) return json({ ok: false, error: "rate_limited" }, 429);
  } catch { /* throttle check must not block legitimate submissions */ }

  try {
    const { error } = await supabaseAdmin().from("inquiries").insert({
      type,
      name: `${firstName} ${lastName}`,
      email,
      company: company || null,
      message: message || null,
      locale,
      source_page: get("source_page") || null,
      click_ids: clickIdsForRow(clickIds),
      details,
      // Fund enquiries don't go through buyer triage - that queue belongs to a
      // project. Set explicitly so the column never claims a fund lead is
      // sitting unjudged in a queue that will never look at it.
      triage: "converted",
    });
    if (error) throw error;
  } catch (e) {
    console.error("contact insert failed:", e);
    return json({ ok: false, error: "server_error" }, 500);
  }

  return json({ ok: true });
};
