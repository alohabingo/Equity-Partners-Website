export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { syncProjectMailbox, importProjectMailboxHistory, importSentHistory } from "../../../lib/projectMailSync";

/** Sync a project's mailbox on demand, from the Overview or Settings. */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = form.get("slug")?.toString().trim() ?? "";
  if (!slug) return redirect("/admin/projects");

  // Return to whichever screen asked. Sync now lives on the Overview as well as
  // in Settings, and being bounced to a different tab than the one you were
  // working on reads as the button having done something else.
  const back = form.get("back")?.toString().trim();

  const supabase = supabaseServer(cookies, request);
  const { data: project } = await supabase
    .from("projects").select("id").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  // "history" walks the whole mailbox; the default only reads the newest page.
  const wantsHistory = form.get("mode")?.toString() === "history";

  let msg: string;
  if (wantsHistory) {
    // Received first, then sent: a reply can only be attached to an enquiry
    // that exists, so the inbox pass has to run before the Sent one.
    const r = await importProjectMailboxHistory(project.id);
    const sentPass = r.ok ? await importSentHistory(project.id) : null;

    if (!r.ok) {
      msg = `Import failed: ${r.error}`;
    } else {
      const back = r.oldest
        ? new Date(r.oldest).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
        : "the start";
      msg =
        `Read ${r.scanned} received message${r.scanned === 1 ? "" : "s"} back to ${back} — ` +
        `${r.created} new enquir${r.created === 1 ? "y" : "ies"}, ${r.appended} added to existing, ${r.ignored} ignored.`;
      if (sentPass?.ok) {
        msg += ` Sent folder: ${sentPass.attached} earlier repl${sentPass.attached === 1 ? "y" : "ies"} attached` +
          (sentPass.unmatched > 0 ? `, ${sentPass.unmatched} to people with no enquiry here` : "") + ".";
      } else if (sentPass) {
        msg += ` Sent folder could not be read: ${sentPass.error}.`;
      }
      if (!r.reachedEnd) msg += " Stopped at the page limit; run it again to go further back.";
    }
  } else {
    const result = await syncProjectMailbox(project.id);
    msg = result.ok
      ? `Synced — ${result.created} new, ${result.appended} added to existing, ${result.ignored} ignored`
      : `Sync failed: ${result.error}`;
  }

  const target = back && back.startsWith(`/admin/projects/${slug}`)
    ? back
    : `/admin/projects/${slug}?tab=settings`;
  const sep = target.includes("?") ? "&" : "?";
  return redirect(`${target}${sep}mailbox=${encodeURIComponent(msg)}`);
};
