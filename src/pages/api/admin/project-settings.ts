export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/** SHA-256 hex. The ingest key is stored only as a hash — never in plaintext. */
async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function newIngestKey(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return "epi_" + [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const POST: APIRoute = async ({ request, cookies, redirect, url }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";
  const slug = get("slug");
  if (!slug) return json({ ok: false, error: "slug_required" }, 422);

  const supabase = supabaseServer(cookies, request);
  const back = `/admin/projects/${slug}?tab=settings`;

  // ---- rotate the ingest key ----
  if (get("action") === "rotate_key") {
    const key = newIngestKey();
    const { error } = await supabase
      .from("projects")
      .update({ ingest_key_hash: await sha256Hex(key), updated_at: new Date().toISOString() })
      .eq("slug", slug);
    if (error) return json({ ok: false, error: error.message }, 403);

    // The plaintext key goes back via a short-lived httpOnly cookie rather than a
    // query string: URLs end up in browser history, server logs and referrers, and
    // a secret has no business in any of them.
    cookies.set("ep_fresh_ingest_key", key, {
      httpOnly: true,
      sameSite: "lax",
      secure: url.protocol === "https:",
      path: "/admin",
      maxAge: 120,
    });
    return redirect(back);
  }

  // ---- save the project's settings ----
  const domainRaw = get("domain").toLowerCase().replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const mailbox = get("mailbox").toLowerCase();

  if (domainRaw && !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domainRaw)) {
    return json({ ok: false, error: "bad_domain" }, 422);
  }
  if (mailbox && !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(mailbox)) {
    return json({ ok: false, error: "bad_mailbox" }, 422);
  }

  // Sidebar label only. Cleared to null when blank so the fallback to the real
  // project name is a single check everywhere rather than "" vs null handling.
  const navName = get("nav_name").replace(/\s+/g, " ").slice(0, 40);

  // completion_date is deliberately NOT written here. The column stays (phase E's
  // retention purge needs a real date to count from) but there is no field for it
  // in this form, and blindly writing an absent field would erase whatever is
  // there. It gets its own clearly-labelled home when retention is built.
  const { error } = await supabase
    .from("projects")
    .update({
      domain: domainRaw || null,
      mailbox: mailbox || null,
      nav_name: navName || null,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) return json({ ok: false, error: error.message }, 403);
  return redirect(`${back}&saved=1`);
};
