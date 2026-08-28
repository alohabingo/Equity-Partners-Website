/**
 * A project's documents, and how they reach a buyer.
 *
 * Nothing is ever attached to an email. Every document goes out as a link that
 * belongs to one buyer and one enquiry, which buys three things a 12MB
 * attachment cannot: it does not bounce, it can be withdrawn after it has been
 * sent, and its view count says whether that particular person actually opened
 * it. A price list that can never be recalled is a bad idea in a business where
 * prices change.
 */

export const DOCUMENT_CATEGORIES = [
  { value: "brochure", label: "Brochure" },
  { value: "floorplans", label: "Floor plans" },
  { value: "pricing", label: "Price list" },
  { value: "legal", label: "Contracts & legal" },
  { value: "general", label: "Other" },
] as const;

export type DocumentCategory = (typeof DOCUMENT_CATEGORIES)[number]["value"];

export const categoryLabel = (value: string | null | undefined): string =>
  DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label ?? "Other";

/**
 * How long a link sent to a buyer stays alive.
 *
 * Long enough to survive a holiday and a slow decision; short enough that a
 * price list forwarded to a stranger a year from now has already stopped
 * working. There is deliberately NO view limit: a buyer re-reading the brochure
 * is the entire point, and being cut off mid-consideration would be a strange
 * thing to do to someone about to spend a million euros.
 */
export const LINK_EXPIRY_DAYS = 30;

export type ProjectDocument = {
  id: string;
  title: string;
  category: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  created_at: string;
};

export function humanSize(bytes: number | null | undefined): string {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n < 1024) return `${n} B`;
  const units = ["kB", "MB", "GB"];
  let value = n / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}

/** A short, human word for the file type — "PDF", not "application/pdf". */
export function fileKind(mime: string | null | undefined): string {
  const m = (mime ?? "").toLowerCase();
  if (m.includes("pdf")) return "PDF";
  if (m.startsWith("image/")) return "Image";
  if (m.includes("spreadsheet") || m.includes("excel") || m.includes("csv")) return "Spreadsheet";
  if (m.includes("word") || m.includes("document")) return "Document";
  if (m.includes("zip") || m.includes("compressed")) return "Archive";
  return "File";
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type SentLink = {
  title: string;
  url: string;
  mime_type?: string | null;
  file_size?: number | null;
};

/**
 * The block of links appended to a reply.
 *
 * Deliberately plain HTML with inline styles: this is read in Gmail, Outlook and
 * a phone, none of which honour a stylesheet, and a broken layout on a brochure
 * link is the first impression a buyer gets of the development.
 *
 * The expiry is stated. A link that silently stops working looks like a broken
 * website; a link that said it would expire looks like a company that handles
 * its paperwork carefully.
 */
export function documentBlockHtml(items: SentLink[], expiresAt: Date): string {
  if (items.length === 0) return "";

  const when = expiresAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const rows = items
    .map((d) => {
      const meta = [fileKind(d.mime_type), humanSize(d.file_size)].filter(Boolean).join(", ");
      return (
        `<li style="margin:0 0 6px 0;">` +
        `<a href="${escapeHtml(d.url)}" style="color:#2e7d54;font-weight:600;">${escapeHtml(d.title)}</a>` +
        (meta ? `<span style="color:#8a97a8;font-size:13px;"> — ${escapeHtml(meta)}</span>` : "") +
        `</li>`
      );
    })
    .join("");

  return (
    `<div style="margin-top:22px;padding-top:14px;border-top:1px solid #e2e8f1;">` +
    `<p style="margin:0 0 8px 0;font-weight:700;">${items.length === 1 ? "Document" : "Documents"}</p>` +
    `<ul style="margin:0;padding-left:18px;">${rows}</ul>` +
    `<p style="margin:10px 0 0 0;color:#8a97a8;font-size:13px;">` +
    `These links were made for you and stop working on ${escapeHtml(when)}.` +
    `</p></div>`
  );
}
