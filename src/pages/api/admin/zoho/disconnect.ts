export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer, supabaseAdmin } from "../../../../lib/supabase";

/** Remove a project's mailbox connection. The stored token is deleted outright. */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = form.get("slug")?.toString().trim() ?? "";
  if (!slug) return redirect("/admin/projects");

  const supabase = supabaseServer(cookies, request);
  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  const admin = supabaseAdmin();
  await admin.from("mail_accounts").delete().eq("project_id", project.id);
  await admin.from("projects")
    .update({ mailbox_connected_at: null, mailbox_last_sync_at: null, mailbox_last_error: null })
    .eq("id", project.id);

  return redirect(`/admin/projects/${slug}?tab=settings&mailbox=Disconnected`);
};
