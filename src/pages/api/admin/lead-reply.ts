export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { isZohoConfigured, sendMail, zohoFromAddress } from "../../../lib/zoho";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  if (!isZohoConfigured()) return json({ ok: false, error: "zoho_not_configured" }, 400);

  const form = await request.formData();
  const inquiryId = form.get("inquiry_id")?.toString() ?? "";
  const subject = (form.get("subject")?.toString() ?? "").trim();
  const message = (form.get("message")?.toString() ?? "").trim();
  if (!inquiryId || !subject || !message) return json({ ok: false, error: "missing_fields" }, 422);

  // Session client → RLS guarantees only super admins can read the lead.
  const supabase = supabaseServer(cookies, request);
  const { data: lead } = await supabase
    .from("inquiries")
    .select("id, email, name")
    .eq("id", inquiryId)
    .single();
  if (!lead) return json({ ok: false, error: "not_found_or_denied" }, 403);

  const htmlBody = escapeHtml(message).replace(/\n/g, "<br/>");

  try {
    await sendMail({ to: lead.email, subject, htmlBody });
  } catch (e) {
    console.error("Zoho send failed:", e);
    return json({ ok: false, error: "zoho_send_failed" }, 502);
  }

  await supabase.from("inquiry_messages").insert({
    inquiry_id: lead.id,
    direction: "outbound",
    subject,
    body_html: htmlBody,
    from_email: zohoFromAddress(),
    to_email: lead.email,
    sent_at: new Date().toISOString(),
  });

  return redirect(`/admin/leads/${lead.id}?sent=1`);
};
