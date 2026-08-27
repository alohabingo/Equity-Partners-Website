/**
 * Turning an inbound email into a buyer enquiry.
 *
 * The hard part is working out WHO the enquiry is from. A form notification is
 * sent by the form service, not the buyer — Nanta Alta's arrives from
 * notify@web3forms.com — so taking the From address would fold every buyer who
 * ever used the form into a single contact. Web3Forms sets Reply-To to the
 * submitter, and writes the details into the body under Name / Email / Message
 * labels, so we have two independent ways to find the real person.
 *
 * Order of trust: Reply-To header, then an address labelled in the body, then
 * the From address. Anything found only in the body is flagged so the enquiry
 * can be glanced at rather than trusted silently.
 */

/** Senders that are plumbing, never a contact. */
export const FORWARDER_DOMAINS = [
  "web3forms.com",
  "formspree.io",
  "getform.io",
  "basin.com",
  "netlify.com",
  "formsubmit.co",
];

/** Local-parts that never represent a person worth replying to. */
const ROBOT_LOCALPARTS = [
  "noreply", "no-reply", "donotreply", "do-not-reply", "mailer-daemon",
  "postmaster", "bounce", "bounces", "notifications", "notification",
];

export const emailDomain = (address: string) => address.toLowerCase().split("@")[1] ?? "";
const localPart = (address: string) => address.toLowerCase().split("@")[0] ?? "";

export const isForwarder = (address: string) =>
  FORWARDER_DOMAINS.some((d) => emailDomain(address) === d || emailDomain(address).endsWith("." + d));

export const isRobot = (address: string) =>
  ROBOT_LOCALPARTS.some((l) => localPart(address) === l || localPart(address).startsWith(l + "+"));

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

/** HTML → text, keeping line structure so labelled fields stay on their own lines. */
export function htmlToText(html: string): string {
  return (html ?? "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|h[1-6]|li)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .split("\n").map((l) => l.trim()).join("\n")
    .trim();
}

/**
 * Everything a form service staples to the bottom of its own notification:
 * the visitor's IP, a Report Spam link, unsubscribe blurb, "Powered by".
 *
 * None of it is the buyer's words, and all of it lands in the one line the
 * queue shows - so "I'd like the brochure" reads as an IP address and a spam
 * link instead. Cut at the EARLIEST marker found: the trailer is contiguous, so
 * the first one that appears is where the person stopped writing.
 *
 * Each pattern is anchored to its own line, or is a phrase no buyer writes, so
 * a message that happens to mention one of these words survives intact.
 */
const FOOTER_MARKERS: RegExp[] = [
  /^\s*visitor ip\s*:/im,
  /^\s*report (spam|abuse)\b/im,
  /don'?t want these emails/i,
  /^\s*manage notifications\b/im,
  /this e-?mail was sent from/i,
  /^\s*powered by\s*$/im,
  /^\s*unsubscribe\s*$/im,
];

export function stripServiceFooter(text: string): string {
  let cut = (text ?? "").length;
  for (const re of FOOTER_MARKERS) {
    const at = text.match(re)?.index;
    if (at !== undefined && at < cut) cut = at;
  }
  return text.slice(0, cut).trim();
}

const LABELS: Record<"name" | "email" | "message", string[]> = {
  name: ["name", "full name", "nombre", "nom"],
  email: ["email", "e-mail", "email address", "correo", "correu"],
  message: ["message", "how can we help", "comments", "enquiry", "inquiry", "mensaje", "missatge"],
};

/**
 * Pull a labelled field out of a form-notification body. Handles both
 * "Label: value" on one line and Web3Forms' style, where the label sits on its
 * own line and the value follows underneath.
 */
export function fieldFromBody(text: string, field: keyof typeof LABELS): string {
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const bare = line.replace(/[:*]+\s*$/, "").trim().toLowerCase();

    for (const label of LABELS[field]) {
      if (bare === label) {
        // Label alone on its line — the value is the next non-empty line, and
        // for a message it's everything up to the next label.
        const rest: string[] = [];
        for (let j = i + 1; j < lines.length; j++) {
          const next = lines[j].trim();
          const nextBare = next.replace(/[:*]+\s*$/, "").toLowerCase();
          const isAnotherLabel = Object.values(LABELS).some((ls) => ls.includes(nextBare));
          if (isAnotherLabel) break;
          if (next) rest.push(next);
          if (rest.length && field !== "message") break;
        }
        if (rest.length) return rest.join("\n").trim();
      }

      const inline = new RegExp(`^${label}\\s*[:\\-–]\\s*(.+)$`, "i").exec(line.trim());
      if (inline?.[1]?.trim()) return inline[1].trim();
    }
  }
  return "";
}

export type ParsedMail = {
  from: string;
  replyTo?: string | null;
  subject?: string | null;
  bodyHtml?: string | null;
};

export type BuyerGuess = {
  email: string;
  name: string;
  message: string;
  /** Where the address came from — "body" means treat it as needing a glance. */
  source: "reply-to" | "body" | "from" | "none";
  /** True when the sender is a form service or robot rather than the buyer. */
  viaForwarder: boolean;
};

export function extractBuyer(mail: ParsedMail): BuyerGuess {
  const text = htmlToText(mail.bodyHtml ?? "");
  const bodyName = fieldFromBody(text, "name");
  const bodyEmail = fieldFromBody(text, "email").match(EMAIL_RE)?.[0] ?? "";
  const bodyMessage = fieldFromBody(text, "message");

  // Labels are read from the RAW text - they sit above the trailer, so nothing
  // is lost - and only what we keep as the message is trimmed.
  const cleanText = stripServiceFooter(text);
  const cleanMessage = stripServiceFooter(bodyMessage);

  const from = (mail.from ?? "").toLowerCase().trim();
  const replyTo = (mail.replyTo ?? "").toLowerCase().trim();
  const viaForwarder = isForwarder(from) || isRobot(from);

  // Reply-To wins, as long as it isn't the forwarder talking to itself.
  if (replyTo && !isForwarder(replyTo) && !isRobot(replyTo)) {
    return {
      email: replyTo,
      name: bodyName || nameFromEmail(replyTo),
      message: cleanMessage || cleanText,
      source: "reply-to",
      viaForwarder,
    };
  }

  // A labelled address in the body is next best — this is the fallback that
  // keeps form notifications working if Reply-To ever goes missing.
  if (bodyEmail && !isForwarder(bodyEmail) && !isRobot(bodyEmail)) {
    return {
      email: bodyEmail,
      name: bodyName || nameFromEmail(bodyEmail),
      message: cleanMessage || cleanText,
      source: "body",
      viaForwarder,
    };
  }

  // A direct email from a real person.
  if (from && !viaForwarder) {
    return { email: from, name: bodyName || nameFromEmail(from), message: cleanText, source: "from", viaForwarder: false };
  }

  return { email: "", name: "", message: cleanText, source: "none", viaForwarder };
}

/** "resalanevera@gmail.com" → "Resalanevera". Better than showing an address as a name. */
export function nameFromEmail(address: string): string {
  const raw = localPart(address).replace(/[._-]+/g, " ").trim();
  return raw.replace(/\b\w/g, (c) => c.toUpperCase()) || address;
}

/** Mail we never want to become an enquiry. */
export function shouldIgnore(mail: ParsedMail, ourAddresses: string[]): string | null {
  const from = (mail.from ?? "").toLowerCase().trim();
  if (!from) return "no sender";
  if (ourAddresses.map((a) => a.toLowerCase()).includes(from)) return "sent by us";
  if (isRobot(from) && !isForwarder(from)) return "automated sender";
  const subject = (mail.subject ?? "").toLowerCase();
  if (/^(out of office|automatic reply|undeliverable|delivery status notification)/.test(subject)) {
    return "auto-reply or bounce";
  }
  return null;
}
