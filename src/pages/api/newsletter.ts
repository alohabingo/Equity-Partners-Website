export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseAdmin } from "../../lib/supabase";
import { getEsp } from "../../lib/esp";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request, url }) => {
  // Basic CSRF/spam guard: browser posts must come from our own origin.
  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return json({ ok: false, error: "bad_origin" }, 403);
  }

  let payload: { email?: string; locale?: string; source_page?: string; website?: string };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Honeypot
  if (payload.website) return json({ ok: true });

  const email = (payload.email ?? "").trim().toLowerCase();
  const locale = ["en", "es", "ca"].includes(payload.locale ?? "") ? payload.locale : "en";

  if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/) || email.length > 320) {
    return json({ ok: false, error: "invalid_email" }, 422);
  }

  const db = supabaseAdmin();

  // Upsert: new signup, or re-subscribe a previously unsubscribed address.
  const { data: sub, error } = await db
    .from("subscribers")
    .upsert(
      {
        email,
        locale,
        status: "subscribed",
        source: "website",
        unsubscribed_at: null,
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (error || !sub) {
    console.error("subscriber upsert failed:", error);
    return json({ ok: false, error: "server_error" }, 500);
  }

  // Push to the ESP. Failure is non-fatal: the subscriber is safe in our DB
  // (esp_synced_at stays null → visible in admin as "not synced").
  const esp = getEsp();
  if (esp) {
    try {
      const { contactId } = await esp.addSubscriber({ email, locale });
      await db
        .from("subscribers")
        .update({ esp_contact_id: contactId, esp_synced_at: new Date().toISOString() })
        .eq("id", sub.id);
    } catch (e) {
      console.error(`${esp.name} sync failed for ${email}:`, e);
    }
  }

  return json({ ok: true });
};
