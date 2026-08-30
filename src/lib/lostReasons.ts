/**
 * Why a buyer fell through.
 *
 * Nine reasons, chosen to be countable and to be answerable honestly at the
 * moment someone gives up on a lead — which is when the reason is known and
 * before it turns into "I think they went cold".
 *
 * `went_quiet` is first among the soft ones on purpose: it is the commonest way
 * a sale actually dies, and a list without it pushes people into picking a
 * sharper reason than they really have, which is worse than no data.
 *
 * `residency` is here because of where this business is: an Andorran purchase
 * is often a residency or tax decision as much as a property one, and losing on
 * that is a different problem from losing on price.
 *
 * Not an enum and not a table, for the same reason the stages are not: the list
 * will be refined once a year of losses is in, and that should be an edit here
 * rather than a migration.
 */
export const LOST_REASONS = [
  { key: "price",        label: "Price",                   hint: "Too expensive, or would not meet ours" },
  { key: "bought_elsewhere", label: "Bought elsewhere",    hint: "Went with another development" },
  { key: "financing",    label: "Financing",               hint: "Mortgage or funds fell through" },
  { key: "timing",       label: "Timing",                  hint: "Not now — may come back" },
  { key: "wrong_fit",    label: "Wrong fit",               hint: "Size, layout, floor, location" },
  { key: "residency",    label: "Residency or tax",        hint: "Andorran residency or tax plans changed" },
  { key: "went_quiet",   label: "Went quiet",              hint: "Stopped replying, no reason given" },
  { key: "not_a_buyer",  label: "Never a real buyer",      hint: "Browsing, an agent, or mis-qualified" },
  { key: "other",        label: "Other",                   hint: "Say what happened in the note" },
] as const;

export type LostReason = (typeof LOST_REASONS)[number]["key"];

export const LOST_REASON_KEYS: string[] = LOST_REASONS.map((r) => r.key);

export const isLostReason = (value: unknown): value is LostReason =>
  typeof value === "string" && LOST_REASON_KEYS.includes(value);

export const lostReasonLabel = (key: string | null | undefined): string =>
  LOST_REASONS.find((r) => r.key === key)?.label ?? "Not recorded";

/**
 * Is this record missing the one thing that makes the loss useful later?
 *
 * A lost lead with no reason is not an error — the stage is the truth and must
 * always be recordable, even in a hurry. It is a gap to be chased, which is a
 * different thing, and this is what the chasing is driven by.
 */
export const needsLostReason = (lead: { stage?: string | null; lost_reason?: string | null }): boolean =>
  lead.stage === "not_proceeding" && !lead.lost_reason;

/** The note, tidied. Two sentences at most is the intent; the cap is a backstop. */
export const MAX_LOST_NOTE = 500;

export function tidyLostNote(raw: string | null | undefined): string {
  return (raw ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_LOST_NOTE);
}

/** How many losses of each reason, biggest first — the point of the whole thing. */
export function lostTally(rows: { lost_reason?: string | null }[]) {
  const counts = new Map<string, number>();
  for (const r of rows) {
    if (!r.lost_reason) continue;
    counts.set(r.lost_reason, (counts.get(r.lost_reason) ?? 0) + 1);
  }
  return LOST_REASONS
    .map((r) => ({ key: r.key, label: r.label, count: counts.get(r.key) ?? 0 }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);
}
