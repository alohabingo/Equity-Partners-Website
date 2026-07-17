export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

/** Upload an image to the public "media" bucket. Staff only (storage RLS). */
export const POST: APIRoute = async ({ request, cookies }) => {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return json({ ok: false, error: "no_file" }, 422);
  if (!ALLOWED.includes(file.type)) return json({ ok: false, error: "bad_type" }, 422);
  if (file.size > MAX_BYTES) return json({ ok: false, error: "too_large" }, 422);

  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `blog/${new Date().toISOString().slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const supabase = supabaseServer(cookies, request);
  const { error } = await supabase.storage
    .from("media")
    .upload(path, await file.arrayBuffer(), { contentType: file.type });

  if (error) return json({ ok: false, error: error.message }, 403);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return json({ ok: true, url: data.publicUrl });
};
