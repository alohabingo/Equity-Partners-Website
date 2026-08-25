import { OVERDUE_WORKING_DAYS, workingDaysSince } from "./pipeline";

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
  assigned_to: string | null;
  created_at: string;
  last_direction: "inbound" | "outbound" | null;
  last_sent_at: string | null;
  last_activity_at: string;
  waiting_on_us: boolean | null;
  message_count: number;
  note_count: number;
};

/**
 * Which attention bucket an enquiry falls into. Unclaimed wins over everything
 * else: an enquiry nobody owns is the worst case, and listing it twice would
 * make the queue counts lie.
 */
export type Bucket = "unclaimed" | "waiting" | "overdue" | "settled";

export function bucketOf(e: EnquiryRow, now: Date = new Date()): Bucket {
  if (!e.assigned_to) return "unclaimed";
  if (e.waiting_on_us) return "waiting";
  if (
    e.last_direction === "outbound" &&
    workingDaysSince(e.last_activity_at, now) >= OVERDUE_WORKING_DAYS
  ) {
    return "overdue";
  }
  return "settled";
}

export const needsAttention = (e: EnquiryRow, now?: Date) => bucketOf(e, now) !== "settled";

export const BUCKET_LABELS: Record<Exclude<Bucket, "settled">, string> = {
  unclaimed: "Unclaimed",
  waiting: "They replied, we haven't",
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

/** Strip tags for a one-line preview of an email body. */
export const plain = (html: string | null | undefined, max = 120): string => {
  const text = (html ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? text.slice(0, max - 1) + "…" : text;
};
