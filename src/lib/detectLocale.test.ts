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

// Refusing to answer is a feature. A wrong flag sends a buyer a template in a
// language they don't read; no flag just makes someone look.
check("too short to judge", detectLocale("Hola"), null);
check("empty", detectLocale(""), null);
check("null input", detectLocale(null), null);
check("no usable words", detectLocale("Nanta Alta 12345 ---- ????"), null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
