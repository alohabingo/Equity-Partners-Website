/**
 * Confirming a file really is where the browser says it is.
 *
 * The bytes now go straight from the browser to storage, so when the metadata
 * arrives afterwards it is a claim, not a fact: "I uploaded a 40 MB PDF to this
 * path." Both halves of that are worth checking. The path is checked against
 * the shape we issue (see `pathLooksIssued`), and the size and type are read
 * back from storage here rather than believed — otherwise the file list could
 * be made to describe something the file is not.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type StoredObject = { size: number; mimeType: string };

export async function readStoredObject(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
): Promise<StoredObject | null> {
  const slash = path.lastIndexOf("/");
  const dir = slash === -1 ? "" : path.slice(0, slash);
  const name = slash === -1 ? path : path.slice(slash + 1);

  const { data, error } = await supabase.storage.from(bucket).list(dir, { search: name, limit: 100 });
  if (error || !data) return null;

  // `search` is a prefix match, so the exact name still has to be picked out —
  // "deed.pdf" and "deed.pdf.bak" would both come back.
  const found = data.find((o) => o.name === name);
  if (!found) return null;

  const meta = (found.metadata ?? {}) as Record<string, unknown>;
  const size = Number(meta.size ?? 0);
  return {
    size: Number.isFinite(size) ? size : 0,
    mimeType: typeof meta.mimetype === "string" ? meta.mimetype : "application/octet-stream",
  };
}
