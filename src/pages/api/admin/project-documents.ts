export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { DOCUMENT_CATEGORIES } from "../../../lib/projectDocuments";
import { UPLOAD_RULES, pathLooksIssued, uploadRefusal } from "../../../lib/uploads";
import { readStoredObject } from "../../../lib/storedObject";

/**
 * A project's documents: upload, retitle, remove.
 *
 * They live in the same private "vault" bucket and the same documents table as
 * the fund's own paperwork, separated only by project_id. One store means one
 * set of storage rules and one redemption route that is already proven, rather
 * than a second, younger copy of both.
 */

const CATEGORY_VALUES = DOCUMENT_CATEGORIES.map((c) => c.value) as string[];

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const get = (k: string) => form.get(k)?.toString().trim() ?? "";
  const action = get("action");
  const slug = get("slug");

  const supabase = supabaseServer(cookies, request);
  if (!slug) return redirect("/admin/projects");

  const back = `/admin/projects/${slug}?tab=documents`;
  const say = (msg: string) => redirect(`${back}&notice=${encodeURIComponent(msg)}`);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/admin/login");

  const { data: project } = await supabase
    .from("projects").select("id, slug").eq("slug", slug).maybeSingle();
  if (!project) return redirect("/admin/projects");

  // Every read and write is pinned to this project, so a document id posted from
  // one project cannot retitle or delete another's paperwork.
  const owned = <T,>(q: T): T => (q as any).eq("project_id", project.id);

  /**
   * ---- record an upload ----
   *
   * The file is already in storage: the browser sent it straight there with a
   * signed ticket, because routing it through this function meant squeezing it
   * through a 6 MB platform limit that killed the request before any of this
   * code could run.
   *
   * So what arrives here is a claim about a file, and every part of it is
   * checked: the path must match the shape we issue for THIS project, the
   * object must actually exist, and its size and type are read back from
   * storage rather than taken from the request.
   */
  if (action === "upload") {
    const path = get("storage_path");
    if (!path) return say("Choose a file to upload.");
    if (!pathLooksIssued("project_document", path, project.slug)) {
      return say("That upload could not be matched to this project. Please try again.");
    }

    const stored = await readStoredObject(supabase, UPLOAD_RULES.project_document.bucket, path);
    if (!stored) return say("The upload did not finish. Please try again.");

    // Re-run the rules against what is genuinely on disk. A file that got past
    // the browser check but is not what it claimed is removed rather than
    // recorded, so nothing is left behind that no page will ever show.
    const refusal = uploadRefusal("project_document", { type: stored.mimeType, size: stored.size });
    if (refusal) {
      await supabase.storage.from(UPLOAD_RULES.project_document.bucket).remove([path]);
      return say(refusal);
    }

    const category = CATEGORY_VALUES.includes(get("category")) ? get("category") : "general";
    const title = get("title") || get("file_name").replace(/\.[^.]+$/, "") || "Document";

    const { error: dbErr } = await supabase.from("documents").insert({
      project_id: project.id,
      title,
      category,
      storage_path: path,
      file_size: stored.size,
      mime_type: stored.mimeType,
      uploaded_by: user.id,
    });

    if (dbErr) {
      // Put the file back where it was found. A stored object with no row is
      // invisible to everyone and impossible to delete from the interface.
      await supabase.storage.from("vault").remove([path]);
      return say(`Uploaded, but could not be saved: ${dbErr.message}`);
    }

    return say(`“${title}” added.`);
  }

  // ---- retitle / recategorise ----
  if (action === "save") {
    const id = get("id");
    const title = get("title");
    if (!id) return say("Which document?");
    if (!title) return say("A document needs a name.");

    const category = CATEGORY_VALUES.includes(get("category")) ? get("category") : "general";
    const { error } = await owned(
      supabase.from("documents").update({ title, category }).eq("id", id),
    );
    if (error) return say(`Could not save it: ${error.message}`);
    return say(`Saved “${title}”.`);
  }

  // ---- remove ----
  if (action === "remove") {
    const id = get("id");
    if (!id) return say("Which document?");

    const { data: doc } = await owned(
      supabase.from("documents").select("title, storage_path").eq("id", id),
    ).maybeSingle();
    if (!doc) return say("That document no longer exists.");

    // The row goes first. If storage removal fails afterwards the file is
    // orphaned, which costs a few megabytes; doing it the other way round would
    // leave a document listed in the portal whose file has already gone, and a
    // link to it would break in a buyer's inbox.
    const { error } = await owned(supabase.from("documents").delete().eq("id", id));
    if (error) return say(`Could not remove it: ${error.message}`);

    await supabase.storage.from("vault").remove([doc.storage_path]);
    return say(`Removed “${doc.title}”. Any links already sent for it have stopped working.`);
  }

  return say("Unknown action.");
};
