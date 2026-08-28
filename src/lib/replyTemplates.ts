/**
 * Saved replies, in the three languages the business sells in.
 *
 * A template is never sent as it stands. It is dropped into the composer, where
 * whoever is replying reads it, changes it and then presses send. That single
 * fact decides most of the behaviour below: when this code is unsure, it leaves
 * something visibly odd rather than quietly guessing, because a human is going
 * to look at the result before a buyer ever does.
 */

export type TemplateLocale = "en" | "es" | "ca";

export const TEMPLATE_LOCALES: readonly TemplateLocale[] = ["en", "es", "ca"] as const;

export const TEMPLATE_LOCALE_LABEL: Record<TemplateLocale, string> = {
  en: "English",
  es: "Español",
  ca: "Català",
};

export type ReplyTemplate = {
  id: string;
  name: string;
  body_en: string;
  body_es: string;
  body_ca: string;
  position: number;
  /** Which project owns it. NULL means it belongs to the starter kit. */
  project_id?: string | null;
  /** The starter this was copied from, where that starter still exists. */
  source_id?: string | null;
};

/**
 * One list of columns, so the four places that read templates cannot drift into
 * fetching different shapes of the same row.
 */
export const TEMPLATE_COLUMNS = "id, name, body_en, body_es, body_ca, position, project_id, source_id";

/** What the editing screen tells people they can write. */
export const TEMPLATE_PLACEHOLDERS = [
  { token: "{{name}}", describes: "the buyer's first name" },
  { token: "{{project}}", describes: "the project they enquired about" },
  { token: "{{sender}}", describes: "whoever is sending the reply" },
] as const;

export type TemplateVars = {
  name?: string | null;
  project?: string | null;
  sender?: string | null;
};

export type Rendered = {
  body: string;
  /** The language actually used, which is not always the one asked for. */
  locale: TemplateLocale;
  /** True when the wanted language was empty and English was used instead. */
  fellBack: boolean;
  /** False when there is nothing written in any language yet. */
  usable: boolean;
};

/** Anything that isn't one of our three is treated as English. */
export function asTemplateLocale(value: string | null | undefined): TemplateLocale {
  return TEMPLATE_LOCALES.includes(value as TemplateLocale) ? (value as TemplateLocale) : "en";
}

export function bodyIn(t: ReplyTemplate, locale: TemplateLocale): string {
  const raw = locale === "es" ? t.body_es : locale === "ca" ? t.body_ca : t.body_en;
  return (raw ?? "").trim();
}

/** Which languages this template has actually been written in. */
export function writtenIn(t: ReplyTemplate): TemplateLocale[] {
  return TEMPLATE_LOCALES.filter((l) => bodyIn(t, l) !== "");
}

const TITLES = new Set(["mr", "mrs", "ms", "miss", "dr", "sr", "sra", "srta", "st"]);

/**
 * Tidy the capitals on a name, but only where it is safe to.
 *
 * Web forms are full of "sergey", full of "MARIA", and full of "McDonald". The
 * first two are worth fixing. "Correcting" the third into "Mcdonald" is the kind
 * of small insult people remember - so a name written in MIXED case is left
 * exactly as its owner typed it, and only all-lower or all-upper is touched.
 */
function recase(word: string): string {
  const hasUpper = /[A-ZÀ-Þ]/.test(word);
  const hasLower = /[a-zà-þ]/.test(word);
  if (hasUpper && hasLower) return word;
  return word
    .toLowerCase()
    .replace(/(^|[-'’])([a-zà-þ])/g, (_m, sep: string, ch: string) => sep + ch.toUpperCase());
}

/**
 * The name to greet someone by.
 *
 * Returns "" rather than a guess whenever the field does not look like a name -
 * it is routinely a whole email address, a company, or empty. An empty result is
 * handled: "Hi {{name}}," becomes "Hi,", which reads fine in all three
 * languages. A wrong one becomes "Hi sergey@gmail.com,", which does not.
 *
 * A leading title keeps the word after it, because "Sr. García" and "Mr Smith"
 * are how those people expect to be addressed, and dropping to "García" alone
 * would be a downgrade in formality that nobody asked for.
 */
export function greetingName(full: string | null | undefined): string {
  const raw = (full ?? "").trim();
  if (!raw || raw.includes("@") || raw.length > 60) return "";

  const words = raw.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";

  const first = words[0];
  const bare = first.replace(/\.$/, "").toLowerCase();

  if (TITLES.has(bare) && words[1]) return `${recase(first)} ${recase(words[1])}`;
  if (TITLES.has(bare)) return "";

  // A "name" of five words is a sentence someone typed into the wrong box.
  if (words.length > 4) return "";

  return recase(first);
}

/**
 * Close up the gaps a missing value leaves behind.
 *
 * Without this, an enquiry with no name renders "Hi ," and a project with no
 * name renders "interest in ." Both are small enough to survive a skim read and
 * embarrassing enough to matter once sent.
 */
export function tidy(text: string): string {
  return text
    .replace(/[ \t]+([,.!?;:])/g, "$1")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

/**
 * Substitute the placeholders.
 *
 * An unrecognised placeholder is LEFT IN PLACE. Deleting it would leave a
 * grammatical sentence with a hole in the middle, which reads as finished;
 * leaving "{{bedrooms}}" sitting in the composer is obviously unfinished, and
 * the person about to press send is the one who can fix it.
 */
export function fillTemplate(body: string, vars: TemplateVars): string {
  const values: Record<string, string> = {
    name: greetingName(vars.name),
    project: (vars.project ?? "").trim(),
    sender: (vars.sender ?? "").trim(),
  };

  const filled = body.replace(/\{\{\s*([a-z_]+)\s*\}\}/gi, (whole, key: string) => {
    const k = key.toLowerCase();
    return k in values ? values[k] : whole;
  });

  return tidy(filled);
}

/**
 * A template, in the buyer's language where we have it, ready for the composer.
 *
 * The fallback is one-way on purpose: a missing Catalan version falls back to
 * English, never to Spanish. They are close enough that a Spanish reply to a
 * Catalan speaker looks like carelessness rather than a language gap, and in
 * Andorra that particular carelessness is not neutral.
 */
export function renderTemplate(
  t: ReplyTemplate,
  want: string | null | undefined,
  vars: TemplateVars,
): Rendered {
  const wanted = asTemplateLocale(want);
  const direct = bodyIn(t, wanted);

  if (direct) {
    return { body: fillTemplate(direct, vars), locale: wanted, fellBack: false, usable: true };
  }

  const english = bodyIn(t, "en");
  if (english) {
    return { body: fillTemplate(english, vars), locale: "en", fellBack: wanted !== "en", usable: true };
  }

  return { body: "", locale: wanted, fellBack: false, usable: false };
}
