export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { syncProjectMailbox } from "../../../lib/projectMailSync";

/** Sync a project's mailbox on demand, from the Settings tab. */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = form.get("slug")?.toString().trim() ?? "";
  if (!slug) return redirect("/admin/projects");

  const supabase = supabaseServer(cookies, request);
  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  const result = await syncProjectMailbox(project.id);
  const msg = result.ok
    ? `Synced — ${result.created} new, ${result.appended} added to existing, ${result.ignored} ignored`
    : `Sync failed: ${result.error}`;

  return redirect(`/admin/projects/${slug}?tab=settings&mailbox=${encodeURIComponent(msg)}`);
};
