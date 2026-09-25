export type Locale = "en" | "es" | "ca" | "nl" | "fr";

/**
 * Guess which of the portal's languages an enquiry was written in.
 *
 * Mail arriving in the project inbox carries no language field, and the buyer
 * pipeline is EN/ES/CA - so without this every enquiry was stored as English,
 * including one written in Catalan. A flag that is always "EN" is not a flag,
 * it is decoration, and it would eventually pick the wrong reply template.
 *
 * Returns null rather than guessing when the text is too short or too close to
 * call. A wrong flag is worse than no flag: no flag makes someone look, a wrong
 * one sends a buyer a template in a language they don't read.
 */

/**
 * Word lists, not regexes with \b around them: JavaScript's \b is ASCII-only,
 * so a boundary after "això" or "está" never matches and the accented spelling
 * - the one that is actually diagnostic - would be silently skipped.
 */
const WORDS: Record<Locale, string[]> = {
  ca: [
    "agradaria", "voldria", "rebre", "fullet", "preus", "detalls", "adreça", "correu",
    "salutacions", "cordialment", "gràcies", "sisplau", "amb", "això", "però", "aquest",
    "aquesta", "aquests", "els", "les", "meva", "meu", "nostra", "vostè", "podeu", "puc",
    "tinc", "són", "molt", "bon", "dia", "habitatge", "preu", "vull", "saber",
  ],
  es: [
    "quisiera", "querría", "folleto", "precio", "precios", "información", "gracias",
    "saludos", "atentamente", "también", "está", "cómo", "con", "para", "los", "las",
    "del", "una", "muy", "pero", "esto", "este", "esta", "usted", "puedo", "tengo",
    "hay", "más", "recibir", "enviarme", "sobre", "podría",
  ],
  en: [
    "would", "like", "receive", "brochure", "pricing", "price", "details", "information",
    "thanks", "regards", "hello", "please", "the", "and", "for", "with", "you", "this",
    "that", "are", "have", "can", "is", "was", "our", "your", "message", "test", "send",
  ],
  // Only words that belong to one language. "brochure", "appartement", "villa",
  // "information" and the like are shared with a neighbour and would only blur
  // the count, so they are left to the languages that already have them.
  nl: [
    "graag", "ik", "wil", "zou", "willen", "ontvangen", "prijzen", "prijs", "informatie",
    "vriendelijke", "groet", "groeten", "bedankt", "dank", "hallo", "goedendag", "goedemiddag",
    "uw", "jullie", "het", "een", "van", "voor", "zijn", "niet", "ook", "maar", "wat", "hoe",
    "woning", "meer", "kunnen", "kunt", "mijn", "wij", "heb", "hebben", "alvast", "bezichtiging",
  ],
  fr: [
    "bonjour", "merci", "voudrais", "aimerais", "recevoir", "prix", "détails", "cordialement",
    "salutations", "je", "vous", "nous", "avec", "pour", "des", "une", "sur", "votre", "notre",
    "renseignements", "madame", "monsieur", "plaît", "très", "aussi", "mais", "où", "quel",
    "quelle", "serait", "possible", "logement", "visite", "être", "avoir", "tarifs",
  ],
};

const PHRASES: [Locale, RegExp][] = [
  ["ca", /si us plau/],
  ["es", /por favor/],
  ["en", /thank you/],
  ["fr", /s['’]il vous pla[iî]t/],
  ["nl", /met vriendelijke groet/],
];

const ALL: Locale[] = ["en", "es", "ca", "nl", "fr"];

export function detectLocale(text: string | null | undefined): Locale | null {
  const t = (text ?? "").toLowerCase();
  if (t.trim().length < 12) return null;

  const words = t.split(/[^\p{L}'’]+/u).filter(Boolean);
  const scores: Record<Locale, number> = { en: 0, es: 0, ca: 0, nl: 0, fr: 0 };

  for (const loc of ALL) {
    const set = new Set(WORDS[loc]);
    for (const w of words) if (set.has(w)) scores[loc]++;
  }
  for (const [loc, re] of PHRASES) if (re.test(t)) scores[loc] += 2;

  // Elision ("m'agradaria", "d'aquest") is Catalan and not Spanish, so it is
  // the single most useful signal for telling those two apart in a short text.
  // French elides too — "l'appartement", "d'information" — so the shared forms
  // go to whichever of the two the words already favour, and the ones only
  // French has ("j'aimerais", "c'est", "qu'il") go to French outright.
  const frOnly = words.filter((w) => /^(j|c|qu)['’]/.test(w)).length;
  const shared = words.filter((w) => /^[lmdsn]['’]/.test(w)).length;
  scores.fr += frOnly;
  if (scores.fr > scores.ca) scores.fr += shared; else scores.ca += shared;

  const ranked = (Object.entries(scores) as [Locale, number][]).sort((a, b) => b[1] - a[1]);
  const [top, second] = ranked;

  // Two thresholds, both deliberately cautious: enough evidence at all, and a
  // clear enough win over the runner-up.
  if (top[1] < 2) return null;
  if (second && second[1] > 0 && top[1] < second[1] * 1.5) return null;
  return top[0];
}
