import { OVERDUE_WORKING_DAYS, workingDaysSince } from "./pipeline";

/**
 * Whether anyone has decided this enquiry is a real buyer yet.
 *
 * Separate from stage on purpose: stage says how far along a sale is, triage
 * says whether there is a sale at all. Spam does not belong in the pipeline's
 * vocabulary, and a rejected enquiry must not be able to sit in a stage count.
 */
export type Triage = "pending" | "converted" | "rejected";

/** Why an enquiry was turned away. Kept short so the list stays one glance. */
export const REJECT_REASONS = [
  { value: "spam", label: "Spam" },
  { value: "not_a_buyer", label: "Not a real buyer" },
  { value: "duplicate", label: "Duplicate" },
  { value: "wrong_project", label: "Wrong project" },
  { value: "other", label: "Other" },
] as const;

export const rejectReasonLabel = (value: string | null): string =>
  REJECT_REASONS.find((r) => r.value === value)?.label ?? "No reason given";

/** A row from the `enquiry_state` view. */
export type EnquiryRow = {
  id: string;
  project_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  locale: string | null;
  message: string | null;
  stage: string | null;
  source_page: string | null;
  /** Legacy. Ownership was removed; nothing writes this any more. */
  assigned_to: string | null;
  triage: Triage;
  triage_reason: string | null;
  triaged_at: string | null;
  triaged_by: string | null;
  created_at: string;
  last_direction: "inbound" | "outbound" | null;
  last_sent_at: string | null;
  last_activity_at: string;
  /** Who wrote the most recent message, when it was one of ours. */
  last_sent_by: string | null;
  waiting_on_us: boolean | null;
  message_count: number;
  note_count: number;
};

/**
 * Which attention bucket an enquiry falls into.
 *
 * Order matters and is not arbitrary. Triage outranks everything, because until
 * someone has said "this is a real buyer" the other questions are meaningless -
 * spam is not work at all. Rejected drops out entirely. Each enquiry lands in
 * exactly ONE bucket so the queue counts add up to the number of people rather
 * than double-counting the same one in two rows.
 *
 * There is deliberately no "unclaimed" bucket. Ownership was removed: at this
 * team's size an enquiry nobody had ticked their name against was not a problem
 * to solve, it was an extra step that let real work look handled. What matters
 * is whether the BUYER is waiting, which the two middle buckets answer, and who
 * has actually done something, which is recorded rather than assigned.
 */
export type Bucket = "triage" | "waiting" | "overdue" | "settled" | "rejected";

export function bucketOf(e: EnquiryRow, now: Date = new Date()): Bucket {
  if (e.triage === "rejected") return "rejected";
  if (e.triage === "pending") return "triage";
  // Not `if (waiting_on_us)`. Null means there is no mail on the thread at all -
  // a form submission nobody has answered - and that is waiting on us every bit
  // as much as an unanswered reply. Removing the unclaimed bucket would
  // otherwise have let those fall straight through to "settled" and vanish.
  if (e.waiting_on_us !== false) return "waiting";
  if (
    e.last_direction === "outbound" &&
    workingDaysSince(e.last_activity_at, now) >= OVERDUE_WORKING_DAYS
  ) {
    return "overdue";
  }
  return "settled";
}

/** In the pipeline at all - i.e. not turned away. */
export const isLive = (e: EnquiryRow) => e.triage !== "rejected";

export const needsAttention = (e: EnquiryRow, now?: Date) => {
  const b = bucketOf(e, now);
  return b !== "settled" && b !== "rejected";
};

export const BUCKET_LABELS: Record<Exclude<Bucket, "settled" | "rejected">, string> = {
  triage: "New — real buyer, or not?",
  waiting: "Waiting on us",
  overdue: `No answer in ${OVERDUE_WORKING_DAYS} working days`,
};

/** Compact age: 40m, 4h, 2d, 3w. */
export function shortAge(iso: string, now: Date = new Date()): string {
  const mins = Math.max(0, Math.round((now.getTime() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins}m`;
  if (mins < 60 * 24) return `${Math.round(mins / 60)}h`;
  const days = Math.round(mins / (60 * 24));
  if (days < 14) return `${days}d`;
  return `${Math.round(days / 7)}w`;
}

export const LOCALE_LABEL: Record<string, string> = { en: "English", es: "Español", ca: "Català" };

export const LOCALE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "ca", label: "Català" },
] as const;

/**
 * What goes in the little flag. Unknown shows "?", not "EN" - the old default
 * flagged a Catalan buyer as English, and a flag that is always the same is
 * decoration rather than information.
 */
export const localeChip = (locale: string | null | undefined): string =>
  locale ? locale.toUpperCase() : "?";

export const localeTitle = (locale: string | null | undefined): string =>
  locale ? (LOCALE_LABEL[locale] ?? locale) : "Language unknown — set it here";

/** Strip tags for a one-line preview of an email body. */
export const plain = (html: string | null | undefined, max = 120): string => {
  const text = (html ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
};
