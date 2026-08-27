export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

/**
 * Dismiss the rejected-submissions warning on a project's Overview.
 *
 * Marks the rows as read rather than hiding the box. Hiding it in the browser
 * would clear it for one person on one machine and tell nobody anything; this
 * way the whole team stops being shown a problem that has been looked at, and a
 * NEW rejection brings the box straight back — which is the entire point of it.
 *
 * The rows themselves are kept. The log is the record that a submission was
 * refused, and that stays true after somebody has read it.
 */
export const POST: APIRoute = async ({ request, cookies, locals, redirect }) => {
  const form = await request.formData();
  const slug = form.get("slug")?.toString().trim() ?? "";
  if (!slug) return redirect("/admin/projects");

  const supabase = supabaseServer(cookies, request);

  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  // The error is CHECKED, not assumed away. This exact write was silently
  // refused by row-level security — the table had a SELECT-only policy — and
  // because nothing looked at the result the button redirected as though it had
  // worked, leaving no way to tell "dismissed" from "the database said no".
  const { error } = await supabase
    .from("ingest_log")
    .update({
      acknowledged_at: new Date().toISOString(),
      acknowledged_by: locals.user?.id ?? null,
    })
    .eq("project_id", project.id)
    .eq("outcome", "rejected")
    .is("acknowledged_at", null);

  const back = form.get("back")?.toString().trim();
  const target = back && back.startsWith(`/admin/projects/${slug}`)
    ? back
    : `/admin/projects/${slug}`;

  if (error) {
    const sep = target.includes("?") ? "&" : "?";
    return redirect(`${target}${sep}notice=${encodeURIComponent(`Could not dismiss: ${error.message}`)}`);
  }
  return redirect(target);
};
