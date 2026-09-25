/**
 * Tests for language detection.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/detectLocale.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * The first three cases are the three real enquiries that were sitting in the
 * portal when this was written - one of them Catalan, and all three stored as
 * English, which is what prompted it.
 */
import { detectLocale } from "./detectLocale";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = got === want;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

check("Ingrid's real message is Catalan",
  detectLocale("M'agradaria rebre el fullet complet i els detalls de preus de Nanta Alta Fase 1."), "ca");
check("Mathias's real message is English",
  detectLocale("I would like to receive the full brochure and pricing details for Nanta Alta Phase 1."), "en");
check("the portal test message is English",
  detectLocale("This is a portal connection test message"), "en");

check("plain Spanish",
  detectLocale("Quisiera recibir el folleto completo y los precios de Nanta Alta. Gracias."), "es");
check("Spanish inverted punctuation and accents",
  detectLocale("¿Podría enviarme más información sobre los precios, por favor?"), "es");
check("Catalan told from Spanish by its elisions",
  detectLocale("Bon dia, voldria saber el preu d'aquest habitatge amb vistes. Gràcies!"), "ca");

// Dutch and French, and the neighbours they must not be mistaken for.
check("plain Dutch",
  detectLocale("Goedendag, ik zou graag meer informatie ontvangen over de prijzen van de villa's."), "nl");
check("a Dutch sign-off alone is enough",
  detectLocale("Bedankt alvast. Met vriendelijke groet, Jan"), "nl");
check("plain French",
  detectLocale("Bonjour, je voudrais recevoir la brochure et les prix de Nanta Alta. Merci !"), "fr");
check("French elision is not mistaken for Catalan",
  detectLocale("Bonjour, j'aimerais avoir des détails sur l'appartement, s'il vous plaît."), "fr");
check("…and Catalan elision is still Catalan",
  detectLocale("Bon dia, m'agradaria saber el preu d'aquest habitatge. Gràcies!"), "ca");
check("English with the word 'brochure' stays English",
  detectLocale("Hello, could you send me the brochure and the price list please?"), "en");

// Refusing to answer is a feature. A wrong flag sends a buyer a template in a
// language they don't read; no flag just makes someone look.
check("too short to judge", detectLocale("Hola"), null);
check("empty", detectLocale(""), null);
check("null input", detectLocale(null), null);
check("no usable words", detectLocale("Nanta Alta 12345 ---- ????"), null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
