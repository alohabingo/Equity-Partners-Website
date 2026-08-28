export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { DOCUMENT_CATEGORIES } from "../../../lib/projectDocuments";

/**
 * A project's documents: upload, retitle, remove.
 *
 * They live in the same private "vault" bucket and the same documents table as
 * the fund's own paperwork, separated only by project_id. One store means one
 * set of storage rules and one redemption route that is already proven, rather
 * than a second, younger copy of both.
 */

const MAX_BYTES = 50 * 1024 * 1024;

const ALLOWED = [
  "application/pdf",
  "image/jpeg", "image/png", "image/webp", "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv", "text/plain",
  "application/zip", "application/x-zip-compressed",
];

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

  // ---- upload ----
  if (action === "upload") {
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) return say("Choose a file to upload.");
    if (file.size > MAX_BYTES) return say("That file is over 50 MB — too big to send as a link.");
    if (!ALLOWED.includes(file.type)) {
      return say(`${file.type || "That file type"} isn't allowed. PDFs, images, Office files, CSV and ZIP are.`);
    }

    const category = CATEGORY_VALUES.includes(get("category")) ? get("category") : "general";
    const title = get("title") || file.name.replace(/\.[^.]+$/, "");

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `projects/${project.slug}/${crypto.randomUUID().slice(0, 8)}-${safeName}`;

    const { error: upErr } = await supabase.storage
      .from("vault")
      .upload(path, await file.arrayBuffer(), { contentType: file.type || "application/octet-stream" });
    if (upErr) return say(`Upload failed: ${upErr.message}`);

    const { error: dbErr } = await supabase.from("documents").insert({
      project_id: project.id,
      title,
      category,
      storage_path: path,
      file_size: file.size,
      mime_type: file.type || "application/octet-stream",
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
