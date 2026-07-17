export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const VALID_STATUSES = ["new", "in_progress", "closed", "partnered"];

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const id = form.get("id")?.toString() ?? "";
  const status = form.get("status")?.toString() ?? "";
  const backTo = form.get("back_to")?.toString() || "/admin/leads";

  if (!id || !VALID_STATUSES.includes(status)) {
    return new Response(JSON.stringify({ ok: false, error: "invalid" }), { status: 422 });
  }

  // Session-scoped client: RLS only allows this for super admins.
  const supabase = supabaseServer(cookies, request);
  const { error } = await supabase
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: "denied" }), { status: 403 });
  }

  // Fetch-based callers get JSON; plain form posts get redirected back.
  if (request.headers.get("accept")?.includes("application/json")) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return redirect(backTo.startsWith("/admin") ? backTo : "/admin/leads");
};
