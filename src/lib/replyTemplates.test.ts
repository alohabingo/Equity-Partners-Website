/**
 * Tests for the saved replies.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/replyTemplates.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * Almost everything here is about the two ways a template can quietly go out
 * wrong: greeting someone by something that is not their name, and answering a
 * Catalan buyer in a language nobody chose.
 */
import {
  greetingName, fillTemplate, tidy, renderTemplate, asTemplateLocale,
  writtenIn, bodyIn, type ReplyTemplate,
} from "./replyTemplates";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

// ---- who are we greeting ----

check("first name only", greetingName("Sergey Ivanov"), "Sergey");
check("a lowercase form entry gets its capital", greetingName("sergey ivanov"), "Sergey");
check("SHOUTING is calmed down", greetingName("MARIA FERRER"), "Maria");
check("mixed case is never touched", greetingName("McDonald"), "McDonald");
check("apostrophes capitalise correctly", greetingName("o'brien"), "O'Brien");
check("so do hyphens", greetingName("jean-pierre dupont"), "Jean-Pierre");
check("accents survive", greetingName("àngel puig"), "Àngel");

check("an email in the name box is not a name", greetingName("sergey@gmail.com"), "");
check("nothing is not a name", greetingName("   "), "");
check("null is not a name", greetingName(null), "");
check("a sentence in the name box is not a name", greetingName("please send me the brochure today"), "");

check("an English title keeps the surname", greetingName("Mr Smith"), "Mr Smith");
check("a Spanish title keeps the surname", greetingName("Sr. García"), "Sr. García");
check("a title with nothing after it is unusable", greetingName("Mr"), "");

// ---- substitution ----

const HELLO = "Hi {{name}},\n\nThank you for your interest in {{project}}.\n\n{{sender}}";

check(
  "everything present",
  fillTemplate(HELLO, { name: "Sergey Ivanov", project: "Nanta Alta", sender: "Bing" }),
  "Hi Sergey,\n\nThank you for your interest in Nanta Alta.\n\nBing",
);

// The one that matters: a nameless enquiry must not render "Hi ,".
check(
  "a missing name closes the gap instead of leaving one",
  fillTemplate(HELLO, { name: null, project: "Nanta Alta", sender: "Bing" }),
  "Hi,\n\nThank you for your interest in Nanta Alta.\n\nBing",
);

check(
  "an unknown placeholder is left visible rather than silently deleted",
  fillTemplate("Ready in {{completion}}.", { project: "Nanta Alta" }),
  "Ready in {{completion}}.",
);

check("whitespace inside the braces still matches", fillTemplate("Hi {{ name }}!", { name: "Ana" }), "Hi Ana!");
check("case inside the braces still matches", fillTemplate("Hi {{NAME}}!", { name: "Ana" }), "Hi Ana!");
check("tidy closes a space before punctuation", tidy("Hi ,\nyes ."), "Hi,\nyes.");
check("tidy does not eat newlines", tidy("one\n\ntwo"), "one\n\ntwo");

// ---- which language ----

const T = (over: Partial<ReplyTemplate> = {}): ReplyTemplate => ({
  id: "t1", name: "First reply", position: 0,
  body_en: "Hi {{name}}", body_es: "Hola {{name}}", body_ca: "Hola {{name}}, benvingut",
  ...over,
});

check("asks for Catalan, gets Catalan",
  renderTemplate(T(), "ca", { name: "Ana" }),
  { body: "Hola Ana, benvingut", locale: "ca", fellBack: false, usable: true });

check("asks for Catalan with none written, falls back to English and says so",
  renderTemplate(T({ body_ca: "" }), "ca", { name: "Ana" }),
  { body: "Hi Ana", locale: "en", fellBack: true, usable: true });

// Not to Spanish. Spanish and Catalan are close enough that answering a Catalan
// speaker in Spanish reads as a choice rather than a gap - and in Andorra that
// particular choice is not a neutral one.
check("a missing Catalan version never falls back to Spanish",
  renderTemplate(T({ body_ca: "", body_en: "" }), "ca", { name: "Ana" }).usable,
  false);

check("English asked for and present is not a fallback",
  renderTemplate(T(), "en", { name: "Ana" }).fellBack, false);

check("an unknown language is treated as English",
  renderTemplate(T(), "fr", { name: "Ana" }),
  { body: "Hi Ana", locale: "en", fellBack: false, usable: true });

check("an unknown buyer language is treated as English",
  renderTemplate(T(), null, { name: "Ana" }).locale, "en");

check("a blank template is unusable rather than empty-but-fine",
  renderTemplate(T({ body_en: "", body_es: "", body_ca: "" }), "en", {}).usable, false);

check("asTemplateLocale normalises", [asTemplateLocale("es"), asTemplateLocale("fr"), asTemplateLocale(null)], ["es", "en", "en"]);
check("writtenIn reports the gaps", writtenIn(T({ body_es: "   " })), ["en", "ca"]);
check("bodyIn trims", bodyIn(T({ body_en: "  hi  " }), "en"), "hi");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
