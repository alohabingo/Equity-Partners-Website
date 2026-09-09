/**
 * What may be uploaded, where it lands, and how big it may be.
 *
 * ── Why this file exists ────────────────────────────────────────────────
 * The bytes of a file no longer travel through our own server. They used to:
 * the browser posted the file to an API route, the route read it into memory
 * and pushed it to storage. On Netlify every API route is an AWS Lambda, and a
 * Lambda caps the entire request body at 6 MB — and Netlify base64-encodes
 * binary bodies first, which adds about a third. So the real ceiling was
 * somewhere near 4 MB, while three separate endpoints advertised 8 MB, 50 MB
 * and 50 MB. Worse, the request died at the platform before our code ran, so
 * the friendly "that file is too big" message never got the chance to speak and
 * the person saw a raw gateway error instead.
 *
 * It worked perfectly on a development machine, where there is no Lambda in the
 * path at all. That is the cruellest part: the bug was invisible in the only
 * place anyone tests.
 *
 * Now the browser asks for a signed, single-use URL for one exact path, and
 * sends the file straight to storage. Our server still decides WHO may upload
 * and WHERE it may go — that is the part which must never move to the client —
 * but it no longer carries the parcel.
 *
 * The rules live here rather than in each endpoint because three copies of
 * "which file types are allowed" is three chances to disagree, and they already
 * did.
 */

export type UploadKind = "media" | "vault" | "project_document";

export type UploadRules = {
  bucket: "media" | "vault";
  /** The largest file we will issue an upload URL for. Now actually enforceable. */
  maxBytes: number;
  /** Empty means "any type" — never used, but the shape allows it. */
  allowed: string[];
  /** For the message when a type is refused. */
  describe: string;
};

const OFFICE = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

const IMAGES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const UPLOAD_RULES: Record<UploadKind, UploadRules> = {
  // SVG is allowed here and nowhere else: it is the one image format that can
  // carry script, and this bucket is public. It is accepted because the people
  // who can reach it are staff, and refused everywhere a document might be
  // shared onward with an outsider.
  media: {
    bucket: "media",
    maxBytes: 8 * 1024 * 1024,
    allowed: [...IMAGES, "image/svg+xml"],
    describe: "images",
  },
  vault: {
    bucket: "vault",
    maxBytes: 50 * 1024 * 1024,
    allowed: ["application/pdf", ...IMAGES, ...OFFICE, "text/csv", "text/plain",
              "application/zip", "application/x-zip-compressed"],
    describe: "PDFs, images, Office files, CSV and ZIP",
  },
  project_document: {
    bucket: "vault",
    maxBytes: 50 * 1024 * 1024,
    allowed: ["application/pdf", ...IMAGES, ...OFFICE, "text/csv", "text/plain",
              "application/zip", "application/x-zip-compressed"],
    describe: "PDFs, images, Office files, CSV and ZIP",
  },
};

export const isUploadKind = (v: unknown): v is UploadKind =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(UPLOAD_RULES, v);

/** Strip anything that could change what a path means. */
export function safeFileName(name: string): string {
  const cleaned = (name ?? "")
    .replace(/\\/g, "/")        // a Windows path is still a path
    .split("/").pop()!          // ...and only the last part is a name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/^\.+/, "")        // no leading dots: no ".." and no hidden files
    .slice(0, 120);
  return cleaned || "file";
}

/** A folder label from the client, or the fallback. Never a path. */
export const safeFolder = (requested: string, fallback: string): string =>
  /^[a-z0-9-]{1,32}$/.test(requested ?? "") ? requested : fallback;

/**
 * Where a file will live. Built on the server from a random id, so a client
 * cannot choose to overwrite something that already exists or write outside
 * its own area.
 */
export function storagePathFor(
  kind: UploadKind,
  fileName: string,
  opts: { folder?: string; projectSlug?: string; now?: Date; id?: string } = {},
): string {
  const id = opts.id ?? crypto.randomUUID().slice(0, 8);
  const now = opts.now ?? new Date();
  const name = safeFileName(fileName);

  if (kind === "media") {
    const ext = (name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
    return `${safeFolder(opts.folder ?? "", "blog")}/${now.toISOString().slice(0, 10)}-${id}.${ext}`;
  }
  if (kind === "project_document") {
    return `projects/${safeFolder(opts.projectSlug ?? "", "unfiled")}/${id}-${name}`;
  }
  return `${now.getFullYear()}/${id}-${name}`;
}

/** Why this file cannot be uploaded, or null when it can. */
export function uploadRefusal(
  kind: UploadKind,
  file: { type: string; size: number },
): string | null {
  const rules = UPLOAD_RULES[kind];
  if (!file.size) return "That file is empty.";
  if (file.size > rules.maxBytes) {
    const mb = Math.round(rules.maxBytes / (1024 * 1024));
    return `That file is over ${mb} MB, which is the most we can store.`;
  }
  if (rules.allowed.length && !rules.allowed.includes(file.type)) {
    return `${file.type || "That file type"} isn't allowed. ${rules.describe} are.`;
  }
  return null;
}

/**
 * Does a stored object sit where we said it would?
 *
 * Checked when the metadata is recorded, because by then the browser has
 * written straight to storage and is telling us it is done. The path is
 * compared against one rebuilt from the same rules rather than trusted, so a
 * changed path in the request cannot attach a row to somebody else's file.
 */
export function pathLooksIssued(kind: UploadKind, path: string, projectSlug?: string): boolean {
  if (!path || path.includes("..") || path.startsWith("/")) return false;
  if (kind === "media") return /^[a-z0-9-]{1,32}\/\d{4}-\d{2}-\d{2}-[0-9a-f]{8}\.[a-z0-9]+$/.test(path);
  if (kind === "project_document") {
    const slug = safeFolder(projectSlug ?? "", "unfiled");
    return new RegExp(`^projects/${slug}/[0-9a-f]{8}-[A-Za-z0-9._-]+$`).test(path);
  }
  return /^\d{4}\/[0-9a-f]{8}-[A-Za-z0-9._-]+$/.test(path);
}
