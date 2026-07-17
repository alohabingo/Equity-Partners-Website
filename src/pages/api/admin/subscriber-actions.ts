export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { getEsp } from "../../../lib/esp";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Admin subscriber actions (super admin only, enforced by RLS):
 *   action=add     email, name?, locale?   → manual addition
 *   action=toggle  id                      → subscribe/unsubscribe flip
 *   action=resync  id                      → retry ESP push
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const action = form.get("action")?.toString() ?? "";
  const wantsJson = request.headers.get("accept")?.includes("application/json");
  const supabase = supabaseServer(cookies, request);
  const esp = getEsp();

  if (action === "add") {
    const email = (form.get("email")?.toString() ?? "").trim().toLowerCase();
    const name = form.get("name")?.toString().trim() || null;
    const locale = ["en", "es", "ca"].includes(form.get("locale")?.toString() ?? "")
      ? form.get("locale")!.toString()
      : "en";

    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      return json({ ok: false, error: "invalid_email" }, 422);
    }

    const { data: sub, error } = await supabase
      .from("subscribers")
      .upsert(
        { email, name, locale, status: "subscribed", source: "manual", unsubscribed_at: null },
        { onConflict: "email" }
      )
      .select("id")
      .single();
    if (error) return json({ ok: false, error: "denied_or_failed" }, 403);

    if (esp && sub) {
      try {
        const { contactId } = await esp.addSubscriber({ email, name: name ?? undefined, locale });
        await supabase
          .from("subscribers")
          .update({ esp_contact_id: contactId, esp_synced_at: new Date().toISOString() })
          .eq("id", sub.id);
      } catch (e) {
        console.error("ESP sync failed on manual add:", e);
      }
    }
    return wantsJson ? json({ ok: true }) : redirect("/admin/subscribers");
  }

  if (action === "toggle" || action === "resync") {
    const id = form.get("id")?.toString() ?? "";
    if (!id) return json({ ok: false, error: "invalid" }, 422);

    const { data: sub } = await supabase
      .from("subscribers")
      .select("id, email, name, locale, status")
      .eq("id", id)
      .single();
    if (!sub) return json({ ok: false, error: "not_found" }, 404);

    if (action === "toggle") {
      const newStatus = sub.status === "subscribed" ? "unsubscribed" : "subscribed";
      const { error } = await supabase
        .from("subscribers")
        .update({
          status: newStatus,
          unsubscribed_at: newStatus === "unsubscribed" ? new Date().toISOString() : null,
        })
        .eq("id", id);
      if (error) return json({ ok: false, error: "denied_or_failed" }, 403);

      if (esp) {
        try {
          if (newStatus === "unsubscribed") await esp.removeSubscriber(sub.email);
          else await esp.addSubscriber({ email: sub.email, name: sub.name ?? undefined, locale: sub.locale });
        } catch (e) {
          console.error("ESP status sync failed:", e);
        }
      }
      return wantsJson ? json({ ok: true, status: newStatus }) : redirect("/admin/subscribers");
    }

    // resync
    if (!esp) return json({ ok: false, error: "no_esp_configured" }, 400);
    try {
      const { contactId } = await esp.addSubscriber({
        email: sub.email,
        name: sub.name ?? undefined,
        locale: sub.locale,
      });
      await supabase
        .from("subscribers")
        .update({ esp_contact_id: contactId, esp_synced_at: new Date().toISOString() })
        .eq("id", id);
      return wantsJson ? json({ ok: true }) : redirect("/admin/subscribers");
    } catch (e) {
      console.error("ESP resync failed:", e);
      return json({ ok: false, error: "esp_failed" }, 502);
    }
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
