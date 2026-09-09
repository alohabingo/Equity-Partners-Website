/**
 * Sending a file, from the browser, without going through our own server.
 *
 * Three places upload files and all three used to post the bytes to an API
 * route, which on Netlify meant squeezing them through a 6 MB Lambda request
 * body. This is the replacement, in one place so the three cannot drift: ask
 * for a ticket, put the file where the ticket says, hand back the path so the
 * caller can record what it is.
 *
 * Runs in the browser. Errors are thrown with the sentence the server wrote,
 * because the caller's job is to show it, not to invent one.
 */

export type UploadKind = "media" | "vault" | "project_document";

export type UploadTicket = {
  path: string;
  signedUrl: string;
  bucket: string;
};

export type UploadExtras = { folder?: string; projectSlug?: string };

/** Ask whether this file may be uploaded, and where it should go. */
export async function requestUploadTicket(
  kind: UploadKind,
  file: File,
  extras: UploadExtras = {},
): Promise<UploadTicket> {
  const res = await fetch("/api/admin/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      kind,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      ...extras,
    }),
  });

  let body: any = null;
  try { body = await res.json(); } catch { /* fall through to the generic message */ }
  if (!res.ok || !body?.ok) {
    throw new Error(body?.error || "Could not start the upload.");
  }
  return { path: body.path, signedUrl: body.signedUrl, bucket: body.bucket };
}

/**
 * Put the bytes where the ticket says.
 *
 * A plain PUT: the signed URL carries its own single-use token, so nothing here
 * needs a key or a library. This is the request that used to be capped at 6 MB
 * and now is not — it never touches our server.
 */
export async function putToSignedUrl(ticket: UploadTicket, file: File): Promise<void> {
  const res = await fetch(ticket.signedUrl, {
    method: "PUT",
    headers: { "content-type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!res.ok) {
    // Storage answers with a JSON message when it can; a network failure gives
    // nothing, and "the upload did not finish" is more use than a status code.
    let detail = "";
    try { detail = ((await res.json()) as any)?.message ?? ""; } catch { /* ignore */ }
    throw new Error(detail || `The upload did not finish (${res.status}).`);
  }
}

/** Both halves, for the common case. Returns the stored path. */
export async function uploadFile(
  kind: UploadKind,
  file: File,
  extras: UploadExtras = {},
): Promise<string> {
  const ticket = await requestUploadTicket(kind, file, extras);
  await putToSignedUrl(ticket, file);
  return ticket.path;
}
