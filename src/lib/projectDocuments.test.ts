/**
 * Tests for the document block that gets appended to a reply.
 *
 *   npx esbuild src/lib/projectDocuments.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * The escaping tests are the ones that matter: document titles are typed by
 * hand and then rendered into an email as HTML, so a stray angle bracket in
 * "Plans <final>" must not be able to rearrange the message.
 */
import { humanSize, fileKind, escapeHtml, documentBlockHtml } from "./projectDocuments";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};
const has = (label: string, haystack: string, needle: string) =>
  check(label, haystack.includes(needle), true);
const hasnt = (label: string, haystack: string, needle: string) =>
  check(label, haystack.includes(needle), false);

// ---- sizes ----
check("bytes", humanSize(512), "512 B");
check("kilobytes", humanSize(2048), "2.0 kB");
check("megabytes", humanSize(4_500_000), "4.3 MB");
check("big numbers lose the decimal", humanSize(15_000_000), "14 MB");
check("nothing for a missing size", humanSize(null), "");
check("nothing for zero", humanSize(0), "");

// ---- file kinds ----
check("pdf", fileKind("application/pdf"), "PDF");
check("image", fileKind("image/png"), "Image");
check("spreadsheet", fileKind("text/csv"), "Spreadsheet");
check("unknown", fileKind(null), "File");

// ---- escaping ----
check("escapes the four", escapeHtml(`<a "b" & c>`), "&lt;a &quot;b&quot; &amp; c&gt;");

const nasty = documentBlockHtml(
  [{ title: 'Plans <script>alert(1)</script>', url: "https://x.test/d/abc?a=1&b=2", mime_type: "application/pdf", file_size: 1024 }],
  new Date("2026-09-26T00:00:00Z"),
);
hasnt("a title cannot open a tag", nasty, "<script>");
has("the title is escaped instead", nasty, "&lt;script&gt;");
has("an ampersand in the url is escaped", nasty, "a=1&amp;b=2");

// ---- the block itself ----
const one = documentBlockHtml(
  [{ title: "Nanta Alta brochure", url: "https://x.test/d/abc", mime_type: "application/pdf", file_size: 4_500_000 }],
  new Date("2026-09-26T00:00:00Z"),
);
has("names the document", one, "Nanta Alta brochure");
has("says what it is", one, "PDF, 4.3 MB");
has("singular heading for one", one, ">Document<");
has("states the expiry date", one, "26 September 2026");

const two = documentBlockHtml(
  [
    { title: "Brochure", url: "https://x.test/d/a", mime_type: "application/pdf", file_size: 100 },
    { title: "Price list", url: "https://x.test/d/b", mime_type: null, file_size: null },
  ],
  new Date("2026-09-26T00:00:00Z"),
);
has("plural heading for two", two, ">Documents<");
check("one list item each", (two.match(/<li/g) ?? []).length, 2);
has("a document with no metadata still lists", two, "Price list");

// Nothing chosen must produce nothing at all — not an empty "Documents" heading
// sitting under someone's signature.
check("no documents, no block", documentBlockHtml([], new Date()), "");

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
