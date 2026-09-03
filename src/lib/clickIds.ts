/**
 * Advertising click ids, captured because they cannot be recovered later.
 *
 * When someone clicks a Google or Meta ad, the destination URL carries an id
 * identifying that click. It is present exactly once — on the landing page, in
 * the query string — and then it is gone. Nothing in the database, the ad
 * account, or the browser can reconstruct it afterwards.
 *
 * That matters because of how this business actually closes. Somebody clicks an
 * ad, reads for ten minutes, leaves, and enquires three weeks later after an
 * email exchange. Google and Meta see the click; the portal sees the
 * reservation; only the click id connects them. Capturing it now is what makes
 * it possible, one day, to tell Google "this click was worth a villa" instead
 * of "this click was worth an unknown amount, probably nothing".
 *
 * Held in memory on every page, but only written to storage with the visitor's
 * consent — an advertising identifier stored on someone's device is exactly
 * what the banner asks permission for. A visitor who refuses simply arrives
 * unattributed, which is the honest outcome and matches what the pixel does.
 */

/**
 * The parameters worth keeping, and who sends them.
 *
 * `wbraid` and `gbraid` look like clutter and are not: they are what Google
 * sends instead of `gclid` when a click comes from an iOS app or Safari with
 * tracking limited. Leaving them out would mean losing attribution on a large
 * share of exactly the affluent iPhone traffic this site is trying to reach.
 */
export const CLICK_ID_PARAMS = ["gclid", "wbraid", "gbraid", "fbclid", "msclkid"] as const;
export type ClickIdParam = (typeof CLICK_ID_PARAMS)[number];
export type ClickIds = Partial<Record<ClickIdParam, string>>;

/** Google's longest click-through window. Older than this and it cannot be uploaded anyway. */
export const CLICK_ID_TTL_DAYS = 90;

/** A stored id is worthless past the attribution window, so it carries its date. */
export type StoredClickIds = { ids: ClickIds; at: string };

/** Long enough for any real id, short enough that a junk query string is ignored. */
const MAX_LEN = 512;

/** Pull whatever ad ids are present out of a query string. */
export function parseClickIds(search: string): ClickIds {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  } catch {
    return {};
  }
  const out: ClickIds = {};
  for (const key of CLICK_ID_PARAMS) {
    const raw = params.get(key);
    if (!raw) continue;
    const value = raw.trim();
    // A click id is an opaque token. Anything with whitespace or absurd length
    // is somebody else's parameter that happens to share a name.
    if (!value || value.length > MAX_LEN || /\s/.test(value)) continue;
    out[key] = value;
  }
  return out;
}

export const hasClickIds = (ids: ClickIds): boolean => Object.keys(ids).length > 0;

/**
 * Merge a fresh capture over what is already held.
 *
 * Newest wins per id: someone who clicks a second ad a week later should be
 * credited to the click that actually brought them back. Ids not present in the
 * new capture survive, so arriving via Google and later via Meta keeps both.
 */
export const mergeClickIds = (existing: ClickIds, incoming: ClickIds): ClickIds => ({
  ...existing,
  ...incoming,
});

export function packClickIds(ids: ClickIds, now: Date = new Date()): string {
  return JSON.stringify({ ids, at: now.toISOString() } satisfies StoredClickIds);
}

/**
 * Read back what was stored, discarding anything expired or malformed.
 *
 * Returns `{}` rather than throwing on junk: this runs on every page load of
 * the public site, and a corrupted value must never be able to break a page.
 */
export function unpackClickIds(raw: string | null, now: Date = new Date()): ClickIds {
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};
  const { ids, at } = parsed as Partial<StoredClickIds>;
  if (!ids || typeof ids !== "object" || typeof at !== "string") return {};

  const stamped = Date.parse(at);
  if (Number.isNaN(stamped)) return {};
  const ageDays = (now.getTime() - stamped) / 86_400_000;
  if (ageDays < 0 || ageDays > CLICK_ID_TTL_DAYS) return {};

  const out: ClickIds = {};
  for (const key of CLICK_ID_PARAMS) {
    const value = (ids as Record<string, unknown>)[key];
    if (typeof value === "string" && value && value.length <= MAX_LEN) out[key] = value;
  }
  return out;
}

/** What gets written to the enquiry row: the ids alone, or null when there are none. */
export const clickIdsForRow = (ids: ClickIds): ClickIds | null =>
  hasClickIds(ids) ? ids : null;
