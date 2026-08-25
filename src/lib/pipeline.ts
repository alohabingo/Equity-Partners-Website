/**
 * The buyer pipeline — single source of truth.
 *
 * Stages live in `inquiries.stage` as TEXT, deliberately not a Postgres enum:
 * the existing `inquiry_status` enum is exactly why changing that kind of thing
 * is awkward. Renaming, reordering or adding a stage should be an edit here,
 * not a migration.
 *
 * `shade` is the stage's colour. Stages are an ORDERED scale, so they run light
 * to dark in one hue — progress direction is then readable at a glance, which it
 * isn't if each stage gets an unrelated colour.
 */
export const BUYER_STAGES = [
  { key: "new",            label: "New",            shade: "#d3ece0" },
  { key: "contacted",      label: "Contacted",      shade: "#addcc6" },
  { key: "info_sent",      label: "Info sent",      shade: "#86caab" },
  { key: "viewing_booked", label: "Viewing booked", shade: "#5fb891" },
  { key: "offer",          label: "Offer",          shade: "#3da177" },
  { key: "reserved",       label: "Reserved",       shade: "#2b7f5d" },
  { key: "completed",      label: "Completed",      shade: "#1d5c42", terminal: true },
  { key: "lost",           label: "Lost",           shade: "#c3cfe0", terminal: true },
] as const;

export type BuyerStageKey = (typeof BUYER_STAGES)[number]["key"];

export const BUYER_STAGE_KEYS: string[] = BUYER_STAGES.map((s) => s.key);

/** Stages that still count as live in the pipeline. */
export const OPEN_STAGE_KEYS: string[] = BUYER_STAGES.filter((s) => !("terminal" in s && s.terminal)).map((s) => s.key);

export const stageLabel = (key: string | null | undefined): string =>
  BUYER_STAGES.find((s) => s.key === key)?.label ?? "New";

export const stageShade = (key: string | null | undefined): string =>
  BUYER_STAGES.find((s) => s.key === key)?.shade ?? "#d3ece0";

export const isValidStage = (key: unknown): key is BuyerStageKey =>
  typeof key === "string" && BUYER_STAGE_KEYS.includes(key);

/** An enquiry we've replied to is chased after this many working days of silence. */
export const OVERDUE_WORKING_DAYS = 2;

/**
 * Working days elapsed since `from`, weekends excluded.
 *
 * No public-holiday calendar by decision: weekends alone mean a Friday-afternoon
 * enquiry surfaces on Tuesday rather than Sunday, which is the behaviour that
 * actually matters, and a holiday list is a maintenance burden for a rounding error.
 */
export function workingDaysSince(from: string | Date, now: Date = new Date()): number {
  const start = new Date(from);
  if (Number.isNaN(start.getTime())) return 0;

  let days = 0;
  const cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(0, 0, 0, 0);

  while (cursor < end) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) days += 1;
  }
  return days;
}
