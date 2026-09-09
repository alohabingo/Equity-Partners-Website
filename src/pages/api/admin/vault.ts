export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import { UPLOAD_RULES, pathLooksIssued, uploadRefusal } from "../../../lib/uploads";
import { readStoredObject } from "../../../lib/storedObject";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

/**
 * Document Vault actions (super admin only, enforced by RLS + storage policies):
 *   action=upload       file, title, category
 *   action=delete_doc   id
 *   action=create_link  document_id, label, expires_days, max_views
 *   action=revoke_link  id
 */
export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const action = form.get("action")?.toString() ?? "";
  const get = (k: string) => form.get(k)?.toString() ?? "";
  const supabase = supabaseServer(cookies, request);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "unauthenticated" }, 401);

  /**
   * The file is already in storage — the browser sent it there directly with a
   * signed ticket, because posting it through this function meant a 6 MB
   * platform cap that killed the request before any of this code ran. What
   * arrives here is a claim, so the path shape, the object's existence and its
   * real size and type are all checked rather than believed.
   */
  if (action === "upload") {
    const title = get("title").trim();
    const category = get("category") || "general";
    const path = get("storage_path").trim();

    if (!path) return json({ ok: false, error: "no_file" }, 422);
    if (!pathLooksIssued("vault", path)) return json({ ok: false, error: "bad_path" }, 422);

    const stored = await readStoredObject(supabase, UPLOAD_RULES.vault.bucket, path);
    if (!stored) return json({ ok: false, error: "upload_unfinished" }, 422);

    const refusal = uploadRefusal("vault", { type: stored.mimeType, size: stored.size });
    if (refusal) {
      await supabase.storage.from(UPLOAD_RULES.vault.bucket).remove([path]);
      return json({ ok: false, error: refusal }, 422);
    }

    const { error: dbErr } = await supabase.from("documents").insert({
      title: title || get("file_name") || "Document",
      category,
      storage_path: path,
      file_size: stored.size,
      mime_type: stored.mimeType,
      uploaded_by: user.id,
    });
    if (dbErr) {
      await supabase.storage.from("vault").remove([path]);
      return json({ ok: false, error: dbErr.message }, 403);
    }
    return redirect("/admin/vault");
  }

  if (action === "delete_doc") {
    const id = get("id");
    const { data: doc } = await supabase.from("documents").select("storage_path").eq("id", id).single();
    if (!doc) return json({ ok: false, error: "not_found" }, 404);
    await supabase.storage.from("vault").remove([doc.storage_path]);
    const { error } = await supabase.from("documents").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect("/admin/vault");
  }

  if (action === "create_link") {
    const documentId = get("document_id");
    const label = get("label").trim() || null;
    const expiresDays = Math.min(Math.max(Number(get("expires_days")) || 7, 1), 365);
    const maxViewsRaw = Number(get("max_views"));
    const maxViews = Number.isFinite(maxViewsRaw) && maxViewsRaw > 0 ? Math.floor(maxViewsRaw) : null;

    const { error } = await supabase.from("document_links").insert({
      document_id: documentId,
      label,
      expires_at: new Date(Date.now() + expiresDays * 24 * 3600 * 1000).toISOString(),
      max_views: maxViews,
      created_by: user.id,
    });
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect("/admin/vault");
  }

  if (action === "revoke_link") {
    const { error } = await supabase
      .from("document_links")
      .update({ revoked: true })
      .eq("id", get("id"));
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect("/admin/vault");
  }

  return json({ ok: false, error: "unknown_action" }, 400);
};
