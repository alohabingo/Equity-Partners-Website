export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

import { UPLOAD_RULES, pathLooksIssued, uploadRefusal } from "../../../lib/uploads";
import { readStoredObject } from "../../../lib/storedObject";

/**
 * Record an image that the browser has already put in the public "media"
 * bucket, and hand back its public URL.
 *
 * Nothing is stored in a table for media — the URL goes into the post or
 * portfolio item being edited — so this route exists to confirm the file
 * arrived and to turn its path into a link. The bytes no longer pass through
 * here: on Netlify this is a Lambda with a 6 MB request cap, which is why
 * uploads that worked on a development machine failed on the live site.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = supabaseServer(cookies, request);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "unauthenticated" }, 401);

  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return json({ ok: false, error: "bad_request" }, 400); }

  const path = String(body.path ?? "");
  if (!path || !pathLooksIssued("media", path)) return json({ ok: false, error: "bad_path" }, 422);

  const stored = await readStoredObject(supabase, UPLOAD_RULES.media.bucket, path);
  if (!stored) return json({ ok: false, error: "upload_unfinished" }, 422);

  const refusal = uploadRefusal("media", { type: stored.mimeType, size: stored.size });
  if (refusal) {
    await supabase.storage.from(UPLOAD_RULES.media.bucket).remove([path]);
    return json({ ok: false, error: refusal }, 422);
  }

  const { data } = supabase.storage.from(UPLOAD_RULES.media.bucket).getPublicUrl(path);
  return json({ ok: true, url: data.publicUrl });
};
