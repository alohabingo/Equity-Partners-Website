/**
 * The buyer pipeline — single source of truth.
 *
 * Stages live in `inquiries.stage` as TEXT, deliberately not a Postgres enum:
 * the existing `inquiry_status` enum is exactly why changing that kind of thing
 * is awkward. Renaming, reordering or adding a stage should be an edit here,
 * not a migration.
 *
 * Each stage carries four colours, not one.
 *
 * `shade` is the full-strength colour, used for bars and swatches. `tint`,
 * `edge` and `ink` are the pill: a pale fill, a soft border and dark readable
 * text, which is the treatment the unit STATE control uses and therefore what
 * every control of this kind in the portal looks like.
 *
 * The pill trio is written out rather than computed from `shade`, because
 * computing it does not work here. The unit states are three different HUES, so
 * a mechanical tint of each stays distinguishable. These stages are one hue at
 * four lightnesses — tint them all to the same paleness and you get four
 * identical near-white greens, and the colour stops saying anything. Instead the
 * fill DEEPENS as the stage advances, which keeps the sense of progress that the
 * light-to-dark scale was there to give in the first place.
 *
 * "Not proceeding" is deliberately outside that progression, in grey: it is not
 * further along than anything, it is off to one side.
 *
 * Four live stages, not eight. The longer list had Contacted, Info sent,
 * Viewing booked and Offer as separate steps, and for a development of twenty-
 * five units that is more bookkeeping than anyone keeps up with — and a stage
 * nobody moves records into is worse than no stage at all, because the list
 * still looks maintained.
 */
export const BUYER_STAGES = [
  { key: "new",            label: "New enquiry",         shade: "#d3ece0",
    tint: "#eff7f3", edge: "#cfe4d9", ink: "#4a7a66" },
  { key: "info",           label: "Information sharing", shade: "#86caab",
    tint: "#e4f3ec", edge: "#bcdccb", ink: "#2f7a58" },
  { key: "reservation",    label: "Reservation",         shade: "#3da177",
    tint: "#d8efe4", edge: "#a9d5bf", ink: "#1f6f4d" },
  { key: "delivery",       label: "Property delivery",   shade: "#1d5c42",
    tint: "#cde9db", edge: "#93cbb1", ink: "#17553c", terminal: true },
  // Kept off the live list rather than deleted. Every dead lead has to go
  // SOMEWHERE: without an exit they sit in Information sharing forever, and
  // within a year that stage is mostly ghosts - which is how a team stops
  // believing its own pipeline.
  { key: "not_proceeding", label: "Not proceeding",      shade: "#c3cfe0",
    tint: "#eef1f5", edge: "#d5dde7", ink: "#5c6f88", terminal: true },
] as const;

export type BuyerStageKey = (typeof BUYER_STAGES)[number]["key"];

export const BUYER_STAGE_KEYS: string[] = BUYER_STAGES.map((s) => s.key);

/** Stages that still count as live in the pipeline. */
export const OPEN_STAGE_KEYS: string[] = BUYER_STAGES.filter((s) => !("terminal" in s && s.terminal)).map((s) => s.key);

export const stageLabel = (key: string | null | undefined): string =>
  BUYER_STAGES.find((s) => s.key === key)?.label ?? "New enquiry";

/**
 * Whole days since a date. Calendar days, not working days: "in this stage for
 * 40 days" is a statement about how long the buyer has been waiting, and buyers
 * do not stop waiting at the weekend.
 */
export function daysSince(from: string | Date, now: Date = new Date()): number {
  const start = new Date(from);
  if (Number.isNaN(start.getTime())) return 0;
  const a = new Date(start); a.setHours(0, 0, 0, 0);
  const b = new Date(now); b.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000));
}

/**
 * How long a buyer has spent in each stage, in days.
 *
 * Reconstructed from the stage_changed events rather than stored, because a
 * stored "days in stage" is a number that has to be maintained by every code
 * path that moves anyone, and the one that forgets is the one you find out
 * about a year later.
 *
 * Time is SUMMED per stage, not taken from the last visit. A buyer who goes
 * back from Reservation to Information sharing has genuinely spent time in
 * Information sharing twice, and hiding the first visit would make a stalling
 * sale look fresher than it is.
 */
export function stageDurations(
  createdAt: string,
  events: { detail: any; created_at: string }[],
  now: Date = new Date(),
): { totals: Record<string, number>; current: string; enteredCurrentAt: string } {
  // Oldest first — this reads as a journey, and the events arrive newest first.
  const moves = [...events]
    .filter((e) => e?.detail?.to)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const legs: { stage: string; from: number }[] = [
    { stage: moves[0]?.detail?.from ?? "new", from: new Date(createdAt).getTime() },
  ];
  for (const m of moves) legs.push({ stage: m.detail.to, from: new Date(m.created_at).getTime() });

  const totals: Record<string, number> = {};
  for (let i = 0; i < legs.length; i++) {
    const until = i + 1 < legs.length ? legs[i + 1].from : now.getTime();
    const days = Math.max(0, Math.floor((until - legs[i].from) / 86400000));
    totals[legs[i].stage] = (totals[legs[i].stage] ?? 0) + days;
  }

  const last = legs[legs.length - 1];
  return {
    totals,
    current: last.stage,
    enteredCurrentAt: new Date(last.from).toISOString(),
  };
}

export const stageShade = (key: string | null | undefined): string =>
  BUYER_STAGES.find((s) => s.key === key)?.shade ?? "#d3ece0";

/**
 * Background, text and border for a stage pill — the same shape of value
 * unitStateTheme returns, so the two controls can be styled by identical CSS.
 */
export function stageTheme(key: string | null | undefined) {
  const st = BUYER_STAGES.find((s) => s.key === key) ?? BUYER_STAGES[0];
  return { bg: st.tint, ink: st.ink, border: st.edge, colour: st.shade };
}

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
