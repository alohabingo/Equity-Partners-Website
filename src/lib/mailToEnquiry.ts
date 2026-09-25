/**
 * Turning an inbound email into a buyer enquiry.
 *
 * The hard part is working out WHO the enquiry is from. A form notification is
 * sent by the website, not by the buyer — so taking the From address would fold
 * every buyer who ever used the form into a single contact. The submitter is
 * found instead from the Reply-To header, or from the fields the notification
 * prints in its body under Name / Email / Phone labels.
 *
 * Order of trust: Reply-To header, then an address labelled in the body, then
 * the From address. Anything found only in the body is flagged so the enquiry
 * can be glanced at rather than trusted silently.
 *
 * Two things this file deliberately does NOT do any more, because both of them
 * lost real enquiries:
 *
 * It does not decide from the sender alone. A notification can come from a form
 * service, from the site's own no-reply address, or from the mailbox it is
 * being delivered to — and a list of known form services cannot keep up with
 * that. What identifies a form submission is that the body names a person, so
 * that is what is checked. Mail with nobody in it is refused, and refused
 * loudly: see the rejection log in projectMailSync.
 *
 * And it does not assume a particular HTML shape. Email templates are built out
 * of tables, so a label and its value routinely end up side by side rather than
 * on separate lines; a reader that only understood "Label:" or a label on its
 * own line went blind the day the template was redesigned.
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

/**
 * Local-parts that are a machine rather than a person.
 *
 * Split in two, because the two behave differently. A bounce or a postmaster
 * notice never carries a buyer and is dropped outright. A no-reply or
 * notifications address is not a person either — it must never become the
 * contact — but it is exactly what a website's own form mailer sends as, so its
 * mail is still read for a submitter.
 */
const BOUNCE_LOCALPARTS = ["mailer-daemon", "postmaster", "bounce", "bounces"];
const NOTIFIER_LOCALPARTS = [
  "noreply", "no-reply", "donotreply", "do-not-reply", "notifications", "notification",
];

export const emailDomain = (address: string) => address.toLowerCase().split("@")[1] ?? "";
const localPart = (address: string) => address.toLowerCase().split("@")[0] ?? "";

const hasLocalPart = (address: string, list: string[]) =>
  list.some((l) => localPart(address) === l || localPart(address).startsWith(l + "+"));

export const isForwarder = (address: string) =>
  FORWARDER_DOMAINS.some((d) => emailDomain(address) === d || emailDomain(address).endsWith("." + d));

/** A machine address: never the buyer, whatever else it may be carrying. */
export const isRobot = (address: string) =>
  hasLocalPart(address, BOUNCE_LOCALPARTS) || hasLocalPart(address, NOTIFIER_LOCALPARTS);

/** A bounce or postmaster notice — mail that can never contain a buyer. */
export const isBounce = (address: string) => hasLocalPart(address, BOUNCE_LOCALPARTS);

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

/**
 * The named HTML entities that turn up in names and addresses.
 *
 * Not a complete table — it does not need to be. It needs to cover what a
 * Catalan, Spanish or French name is escaped to, because "Alex Mu&ntilde;oz"
 * stored verbatim is a name nobody can search for and a greeting nobody wants
 * to receive. Numeric entities are handled generically below.
 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú",
  agrave: "à", egrave: "è", igrave: "ì", ograve: "ò", ugrave: "ù",
  Agrave: "À", Egrave: "È", Igrave: "Ì", Ograve: "Ò", Ugrave: "Ù",
  acirc: "â", ecirc: "ê", icirc: "î", ocirc: "ô", ucirc: "û",
  Acirc: "Â", Ecirc: "Ê", Icirc: "Î", Ocirc: "Ô", Ucirc: "Û",
  auml: "ä", euml: "ë", iuml: "ï", ouml: "ö", uuml: "ü",
  Auml: "Ä", Euml: "Ë", Iuml: "Ï", Ouml: "Ö", Uuml: "Ü",
  ntilde: "ñ", Ntilde: "Ñ", ccedil: "ç", Ccedil: "Ç",
  atilde: "ã", otilde: "õ", Atilde: "Ã", Otilde: "Õ",
  aring: "å", Aring: "Å", oslash: "ø", Oslash: "Ø", szlig: "ß",
  ordf: "ª", ordm: "º", iquest: "¿", iexcl: "¡", deg: "°",
  mdash: "—", ndash: "–", hellip: "…", middot: "·", bull: "•",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
  euro: "€", pound: "£", copy: "©", reg: "®", trade: "™",
};

const safeChar = (code: number): string =>
  Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";

export function decodeEntities(text: string): string {
  return (text ?? "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeChar(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => safeChar(Number.parseInt(dec, 10)))
    .replace(/&([A-Za-z][A-Za-z0-9]{1,9});/g, (whole, name) => NAMED_ENTITIES[name] ?? whole);
}

/**
 * HTML → text, keeping line structure so labelled fields stay readable.
 *
 * Table cells end a line as well as table rows. That one detail is what makes a
 * "label | value" layout readable at all: without it a whole row collapses into
 * "NAME Alex Muñoz" and the label cannot be told from what it labels.
 */
export function htmlToText(html: string): string {
  return decodeEntities(
    (html ?? "")
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|tr|td|th|h[1-6]|li|blockquote)>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t ]+/g, " ")
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

/** The fields worth keeping, and what a form might call each of them. */
const LABELS: Record<"name" | "email" | "phone" | "message" | "language" | "reference", string[]> = {
  name: ["name", "full name", "your name", "nombre", "nom", "naam", "nom complet", "volledige naam"],
  email: ["email", "e-mail", "email address", "correo", "correo electrónico", "correu", "e-mailadres", "courriel", "adresse e-mail"],
  phone: ["phone", "phone number", "telephone", "tel", "mobile", "teléfono", "telefono", "telèfon",
          "telefoon", "telefoonnummer", "téléphone", "portable"],
  message: ["message", "how can we help", "comments", "enquiry", "inquiry", "mensaje", "missatge", "bericht", "vraag"],
  language: ["language", "idioma", "llengua", "lang", "taal", "langue"],
  reference: ["reference", "ref", "reference number", "referentie", "référence"],
};

/**
 * Labels a notification may print that we do not store.
 *
 * They are listed anyway so they are recognised AS labels: a label the reader
 * does not know is just a line of prose to it, and prose sitting between two
 * fields is what turns "the message" into half the template.
 */
const OTHER_LABELS = [
  "preferred time", "preferred contact time", "best time to call", "timeframe", "time frame",
  "purpose", "source", "subject", "country", "budget", "company", "project", "property",
  "interest", "interested in", "when", "date", "submitted", "sent from", "page",
];

const ALL_LABELS: string[] = [...Object.values(LABELS).flat(), ...OTHER_LABELS]
  // Longest first, so "email address" is not read as "email" with a value of
  // "address".
  .sort((a, b) => b.length - a.length);

/** A form's way of writing "they left this blank". */
const EMPTY_VALUES = new Set(["", "-", "—", "–", "n/a", "na", "none", "not given", "not provided"]);
const isBlank = (value: string) => EMPTY_VALUES.has(value.trim().toLowerCase());

const bareLabel = (line: string) => line.replace(/[:*·|]+\s*$/, "").trim().toLowerCase();
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type Pair = { label: string; value: string; endLine: number };

function looseMatch(line: string): { label: string; value: string } | null {
  const trimmed = line.trim();
  const label = ALL_LABELS.find((l) => new RegExp(`^${escapeRe(l)}\\s+\\S`, "i").test(trimmed));
  if (!label) return null;
  const value = trimmed.slice(label.length).trim();
  return value ? { label, value } : null;
}

/**
 * Every labelled field in the body, in the order they appear.
 *
 * Three shapes are read, because all three are in use:
 *
 *   Name: Alex Muñoz          one line, separated by a colon or a dash
 *   Name                      the label on its own line, the value beneath —
 *   Alex Muñoz                what a stacked template produces
 *   NAME    Alex Muñoz        label and value side by side, which is what a
 *                             two-column table collapses to
 *
 * The third is only trusted when at least two of them appear. On its own it is
 * indistinguishable from an ordinary sentence that happens to open with one of
 * these words — "Email me after six" would otherwise be read as an email field
 * — and two such rows together is a form, not a coincidence.
 */
export function labelledFields(text: string): Pair[] {
  const lines = (text ?? "").split("\n");
  const strict: Pair[] = [];
  const loose: Pair[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const bare = bareLabel(line);

    // The label alone on its line: the value is what follows, up to the next
    // label. For a message that may be several paragraphs.
    const exact = ALL_LABELS.find((l) => l === bare);
    if (exact) {
      const rest: string[] = [];
      // Where the value ENDS, not where the label sits: the line after the last
      // field is where the person's own words begin, and being one line out
      // there puts a reference number at the top of the message.
      let last = i;
      for (let j = i + 1; j < lines.length; j++) {
        const next = lines[j].trim();
        if (ALL_LABELS.includes(bareLabel(next))) break;
        if (looseMatch(next)) break;
        if (next) { rest.push(next); last = j; }
        if (rest.length && !LABELS.message.includes(exact)) break;
      }
      if (rest.length) strict.push({ label: exact, value: rest.join("\n"), endLine: last });
      continue;
    }

    // "Label: value" on one line.
    const inline = ALL_LABELS.find((l) =>
      new RegExp(`^${escapeRe(l)}\\s*[:\\-–]\\s*\\S`, "i").test(line));
    if (inline) {
      const value = line.slice(inline.length).replace(/^\s*[:\-–]\s*/, "").trim();
      if (value) strict.push({ label: inline, value, endLine: i });
      continue;
    }

    // "LABEL   value" — a table row, flattened.
    const hit = looseMatch(line);
    if (hit) loose.push({ ...hit, endLine: i });
  }

  return [...strict, ...(loose.length >= 2 ? loose : [])]
    .sort((a, b) => a.endLine - b.endLine);
}

function fieldFrom(pairs: Pair[], field: keyof typeof LABELS): string {
  const names = LABELS[field];
  const hit = pairs.find((p) => names.includes(p.label));
  if (!hit || isBlank(hit.value)) return "";
  return hit.value.trim();
}

/** The value of one field, or "" — blanks and em-dashes count as nothing. */
export function fieldFromBody(text: string, field: keyof typeof LABELS): string {
  return fieldFrom(labelledFields(text), field);
}

/**
 * What the person actually wrote.
 *
 * A labelled Message field when there is one. When there is not — and the newer
 * templates do not label it, they print the fields and then the person's words
 * under a rule — everything after the last labelled field. Falling back to the
 * whole body would put the letterhead, nine field labels and a reference number
 * into the one line the queue shows.
 */
function messageFrom(pairs: Pair[], text: string): string {
  const labelled = fieldFrom(pairs, "message");
  if (labelled) return stripServiceFooter(labelled);

  if (pairs.length >= 2) {
    const lastLine = Math.max(...pairs.map((p) => p.endLine));
    const tail = (text ?? "").split("\n").slice(lastLine + 1)
      .filter((l) => !/^[\s\-–—_=*·|]*$/.test(l))
      .join("\n")
      .trim();
    if (tail) return stripServiceFooter(tail);
  }
  return stripServiceFooter(text);
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
  /** From the form when it asks for one — the portal has a field for it. */
  phone: string;
  /** "ES", "en-GB", "Català" … as the form wrote it; normalised by the caller. */
  language: string;
  /** The form's own reference, so a row here can be tied back to the email. */
  reference: string;
  /** Where the address came from — "body" means treat it as needing a glance. */
  source: "reply-to" | "body" | "from" | "none";
  /** True when the sender is a form mailer or robot rather than the buyer. */
  viaForwarder: boolean;
};

const guess = (over: Partial<BuyerGuess>): BuyerGuess => ({
  email: "", name: "", message: "", phone: "", language: "", reference: "",
  source: "none", viaForwarder: false, ...over,
});

/**
 * Who this email is from, as a buyer.
 *
 * `ourAddresses` are the mailbox's own addresses. They are passed in so that a
 * notification the website sends FROM the very address it is delivered to
 * cannot be filed as an enquiry from ourselves — not a hypothetical tidiness
 * rule but one of the ways these submissions went missing.
 */
export function extractBuyer(mail: ParsedMail, ourAddresses: string[] = []): BuyerGuess {
  const text = htmlToText(mail.bodyHtml ?? "");
  const pairs = labelledFields(text);

  const ours = new Set(ourAddresses.map((a) => a.toLowerCase().trim()).filter(Boolean));
  const usable = (address: string) =>
    Boolean(address) && !isForwarder(address) && !isRobot(address) && !ours.has(address);

  const fields = {
    name: fieldFrom(pairs, "name"),
    phone: fieldFrom(pairs, "phone"),
    language: fieldFrom(pairs, "language"),
    reference: fieldFrom(pairs, "reference"),
    message: messageFrom(pairs, text),
  };
  const bodyEmail = (fieldFrom(pairs, "email").match(EMAIL_RE)?.[0] ?? "").toLowerCase();

  const from = (mail.from ?? "").toLowerCase().trim();
  const replyTo = (mail.replyTo ?? "").toLowerCase().trim();
  const viaForwarder = isForwarder(from) || isRobot(from) || ours.has(from);

  // Reply-To wins, as long as it isn't the form mailer talking to itself.
  if (usable(replyTo)) {
    return guess({ ...fields, email: replyTo, name: fields.name || nameFromEmail(replyTo), source: "reply-to", viaForwarder });
  }

  // A labelled address in the body is next best — and for a template that sets
  // no Reply-To at all, it is the only thing there is.
  if (usable(bodyEmail)) {
    return guess({ ...fields, email: bodyEmail, name: fields.name || nameFromEmail(bodyEmail), source: "body", viaForwarder });
  }

  // A direct email from a real person.
  if (usable(from)) {
    return guess({ ...fields, email: from, name: fields.name || nameFromEmail(from), source: "from", viaForwarder: false });
  }

  return guess({ ...fields, viaForwarder });
}

/** "resalanevera@gmail.com" → "Resalanevera". Better than showing an address as a name. */
export function nameFromEmail(address: string): string {
  const raw = localPart(address).replace(/[._-]+/g, " ").trim();
  return raw.replace(/\b\w/g, (c) => c.toUpperCase()) || address;
}

/**
 * Mail we never want to become an enquiry, decided from the envelope alone.
 *
 * Only what can be judged without reading the body, because this runs before
 * the body is fetched. Everything else — including mail from a no-reply
 * address, and mail from our own address — is now decided by whether a person
 * can be found inside it, and is refused in the open rather than dropped here
 * in silence. A list of known form services could not keep up with a website
 * that sends its own notifications, and every miss was invisible.
 */
export function shouldIgnore(mail: ParsedMail, _ourAddresses: string[] = []): string | null {
  const from = (mail.from ?? "").toLowerCase().trim();
  if (!from) return "no sender";
  if (isBounce(from)) return "bounce or postmaster notice";
  const subject = (mail.subject ?? "").toLowerCase();
  if (/^(out of office|automatic reply|undeliverable|delivery status notification)/.test(subject)) {
    return "auto-reply or bounce";
  }
  return null;
}

/** "Re: …", "Fwd: …" — a message in a conversation, not the start of one. */
export const isReplySubject = (subject: string | null | undefined): boolean =>
  /^\s*(re|r|fwd|fw|rv|tr)\s*[:\]]/i.test(String(subject ?? ""));

/** Why an email could not become an enquiry, in words that name the cause. */
export function rejectionReason(mail: ParsedMail, ourAddresses: string[] = []): string {
  const from = (mail.from ?? "").toLowerCase().trim();
  if (ourAddresses.map((a) => a.toLowerCase().trim()).includes(from)) {
    return "sent from this mailbox's own address, and nobody named inside it";
  }
  if (isForwarder(from) || isRobot(from)) {
    return "automated sender, and nobody named inside it";
  }
  return "no usable sender address";
}
