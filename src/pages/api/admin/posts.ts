export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const slugify = (v: string) =>
  v.toLowerCase().trim()
    .replace(/[àáâä]/g, "a").replace(/[èéêë]/g, "e").replace(/[ìíîï]/g, "i")
    .replace(/[òóôö]/g, "o").replace(/[ùúûü]/g, "u").replace(/[ñ]/g, "n").replace(/[ç]/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/[\s_]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

/** Parse "Label | https://url" lines into the sources jsonb shape. */
function parseSources(raw: string): { label: string; href: string }[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return href ? { label, href } : { label: line, href: line };
    });
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  // The delete button submits an extra action=delete alongside the hidden action=save.
  const actions = form.getAll("action").map(String);
  const action = actions.includes("delete") ? "delete" : "save";
  const supabase = supabaseServer(cookies, request);
  const get = (k: string) => form.get(k)?.toString() ?? "";

  if (action === "delete") {
    const id = get("id");
    if (!id) return json({ ok: false }, 422);
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) return json({ ok: false, error: error.message }, 403);
    return redirect("/admin/blog");
  }

  // save (create or update)
  const id = get("id");
  const title = get("title").trim();
  const locale = ["en", "es", "ca"].includes(get("locale")) ? get("locale") : "en";
  const status = ["draft", "published", "archived"].includes(get("status")) ? get("status") : "draft";
  const slug = slugify(get("slug") || title);

  if (!title || !slug) return json({ ok: false, error: "title_required" }, 422);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const payload: Record<string, unknown> = {
    title,
    slug,
    locale,
    status,
    excerpt: get("excerpt").trim() || null,
    body: get("body"),
    cover_image: get("cover_image").trim() || null,
    category: get("category").trim() || null,
    read_time: get("read_time").trim() || null,
    sources: parseSources(get("sources")),
    meta_title: get("meta_title").trim() || null,
    meta_description: get("meta_description").trim() || null,
    og_image: get("og_image").trim() || null,
    updated_at: new Date().toISOString(),
  };

  // Set published_at the first time a post goes live (editable afterwards).
  const publishedAtInput = get("published_at").trim();
  if (publishedAtInput) payload.published_at = new Date(publishedAtInput).toISOString();
  else if (status === "published") payload.published_at = new Date().toISOString();

  let saved;
  if (id) {
    const { data, error } = await supabase.from("posts").update(payload).eq("id", id).select("id").single();
    if (error) return json({ ok: false, error: error.message }, 403);
    saved = data;
  } else {
    payload.author_id = user?.id ?? null;
    const { data, error } = await supabase.from("posts").insert(payload).select("id").single();
    if (error) {
      const dup = error.message.includes("duplicate") || error.code === "23505";
      return json({ ok: false, error: dup ? "slug_exists" : error.message }, dup ? 409 : 403);
    }
    saved = data;
  }

  return redirect(`/admin/blog/${saved.id}?saved=1`);
};
