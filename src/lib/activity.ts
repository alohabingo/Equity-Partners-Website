/**
 * Contact that happened away from the portal.
 *
 * Four kinds, deliberately. "Phone call, email, online meeting, in person" is
 * the whole vocabulary a small sales team uses on the phone to each other, and
 * a longer list — site visit, notary appointment, WhatsApp — turns a two-second
 * log into a decision. Anything finer belongs in the description.
 *
 * `email` is here even though the portal sends and receives email itself: a
 * reply sent from someone's phone is still contact, and leaving it out means
 * the history quietly disagrees with what happened.
 */
export const ACTIVITY_KINDS = [
  { key: "call",           label: "Phone call",     icon: "☎", past: "Phone call logged" },
  { key: "email",          label: "Email",          icon: "✉", past: "Email logged" },
  { key: "online_meeting", label: "Online meeting", icon: "🖥", past: "Online meeting logged" },
  { key: "meeting",        label: "In person",      icon: "🤝", past: "Meeting logged" },
] as const;

export type ActivityKind = (typeof ACTIVITY_KINDS)[number]["key"];

export const ACTIVITY_KIND_KEYS: string[] = ACTIVITY_KINDS.map((k) => k.key);

export const isActivityKind = (key: unknown): key is ActivityKind =>
  typeof key === "string" && ACTIVITY_KIND_KEYS.includes(key);

const find = (key: string | null | undefined) => ACTIVITY_KINDS.find((k) => k.key === key);

export const activityLabel = (key: string | null | undefined): string =>
  find(key)?.label ?? "Contact";

export const activityIcon = (key: string | null | undefined): string =>
  find(key)?.icon ?? "•";

/** How the history names it, in the past tense the rest of the feed uses. */
export const activityTitle = (key: string | null | undefined): string =>
  find(key)?.past ?? "Contact logged";

/**
 * What a person typed, made safe to store.
 *
 * Collapses runs of blank lines and trims, so a description pasted out of a
 * mail client does not arrive with six empty lines in it, and caps the length —
 * a log is a sentence or two, and anything longer is a note.
 */
export const MAX_ACTIVITY_BODY = 2000;

export function tidyActivityBody(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, MAX_ACTIVITY_BODY);
}

/**
 * The moment a log belongs at in the history.
 *
 * `happened_at` always, never `created_at`. Monday's call written up on
 * Wednesday belongs on Monday: a history sorted by typing time tells you about
 * the person doing the admin, not about the buyer.
 */
export const activityWhen = (row: { happened_at: string; created_at?: string }): string =>
  row.happened_at ?? row.created_at ?? "";

/**
 * Was this written up later than it happened?
 *
 * Worth showing, quietly: "logged 2 days later" is the difference between a
 * record written from notes and one written from memory.
 */
export function loggedLate(row: { happened_at: string; created_at: string }): number {
  const a = new Date(row.happened_at).getTime();
  const b = new Date(row.created_at).getTime();
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.max(0, Math.floor((b - a) / 86_400_000));
}
