export const prerender = false;

import type { APIRoute } from "astro";
import { supabaseServer } from "../../../lib/supabase";
import {
  UPLOAD_RULES, isUploadKind, storagePathFor, uploadRefusal, type UploadKind,
} from "../../../lib/uploads";

const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

/**
 * Hand the browser a single-use ticket to put ONE file at ONE place.
 *
 * The file itself never comes here. It used to, and that was the bug: on
 * Netlify every route is a Lambda with a 6 MB cap on the whole request, so a
 * brochure died at the platform before any of our code ran — with a raw gateway
 * error, because the friendly message lives in code that never executed. It
 * worked on a development machine, where there is no Lambda, which is why it
 * looked fine everywhere anyone tested.
 *
 * What stays on the server is the part that matters: whether this person may
 * upload at all, and where the file is allowed to land. The path is built here
 * from a random id — the browser does not get to choose it — so a signed ticket
 * cannot be pointed at somebody else's file to overwrite it.
 */
export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = supabaseServer(cookies, request);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return json({ ok: false, error: "Not signed in." }, 401);

  const { data: profile } = await supabase
    .from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role = profile?.role ?? null;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Bad request." }, 400);
  }

  const kind = body.kind;
  if (!isUploadKind(kind)) return json({ ok: false, error: "Unknown upload type." }, 422);

  /**
   * Who may put what where.
   *
   * Storage's own policies enforce this too, and would refuse the write even if
   * this check were wrong. It is repeated here so the person gets a sentence
   * rather than a signed URL that fails silently a moment later.
   */
  const mayUpload = kind === "media"
    ? role === "super_admin" || role === "content_editor"
    : role === "super_admin";
  if (!mayUpload) return json({ ok: false, error: "You do not have permission to upload here." }, 403);

  const fileName = String(body.fileName ?? "");
  const fileType = String(body.fileType ?? "");
  const fileSize = Number(body.fileSize ?? 0);
  if (!fileName) return json({ ok: false, error: "Choose a file to upload." }, 422);

  const refusal = uploadRefusal(kind as UploadKind, { type: fileType, size: fileSize });
  if (refusal) return json({ ok: false, error: refusal }, 422);

  // A project document has to belong to a project that exists, and the slug
  // decides the folder — so it is resolved here rather than taken on trust.
  let projectSlug: string | undefined;
  if (kind === "project_document") {
    const slug = String(body.projectSlug ?? "");
    const { data: project } = await supabase
      .from("projects").select("slug").eq("slug", slug).maybeSingle();
    if (!project) return json({ ok: false, error: "Unknown project." }, 404);
    projectSlug = project.slug;
  }

  const rules = UPLOAD_RULES[kind as UploadKind];
  const path = storagePathFor(kind as UploadKind, fileName, {
    folder: String(body.folder ?? ""),
    projectSlug,
  });

  const { data, error } = await supabase.storage
    .from(rules.bucket)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return json({ ok: false, error: error?.message ?? "Could not start the upload." }, 403);
  }

  // The full signed URL is returned so the browser can PUT straight to it with
  // an ordinary fetch — no Supabase library needed on the page, and no second
  // copy of our keys shipped to it.
  return json({
    ok: true,
    path: data.path,
    token: data.token,
    signedUrl: data.signedUrl,
    bucket: rules.bucket,
  });
};
