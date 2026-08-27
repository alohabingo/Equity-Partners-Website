/**
 * Tests for the two pure parts of sending a reply.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/enquiryReply.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * sendEnquiryReply itself talks to Zoho and Supabase, so it isn't covered here.
 * What IS covered is the part that would be silently wrong in production: the
 * escaping (a buyer's own words come back through the quote), and the subject,
 * which is what threads the exchange in the buyer's mail client.
 */
import { bodyToHtml, replySubject } from "./enquiryReply";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

check("paragraphs split on blank lines",
  bodyToHtml("Hi Ingrid\n\nThanks for getting in touch."),
  "<p>Hi Ingrid</p>\n<p>Thanks for getting in touch.</p>");
check("a single newline is a line break, not a paragraph",
  bodyToHtml("Line one\nLine two"), "<p>Line one<br>Line two</p>");
check("windows line endings", bodyToHtml("A\r\n\r\nB"), "<p>A</p>\n<p>B</p>");
check("markup is escaped, never executed",
  bodyToHtml('<script>alert("x")</script> & <b>'),
  '<p>&lt;script&gt;alert("x")&lt;/script&gt; &amp; &lt;b&gt;</p>');
check("stray blank lines and trailing spaces are dropped",
  bodyToHtml("\n\nOne\n\n\n\nTwo  \n\n"), "<p>One</p>\n<p>Two</p>");
check("accents survive", bodyToHtml("Gràcies, Ingrid"), "<p>Gràcies, Ingrid</p>");

check("a plain subject gets one Re:",
  replySubject("Nou missatge del formulari", "Nanta Alta"), "Re: Nou missatge del formulari");
check("Re: is never stacked", replySubject("Re: Nou missatge", "Nanta Alta"), "Re: Nou missatge");
check("case-insensitive, tolerates a space", replySubject("RE : viewing", "Nanta Alta"), "RE : viewing");
check("form enquiry with no mail behind it falls back to the project",
  replySubject(null, "Nanta Alta"), "Re: Your enquiry about Nanta Alta");
check("an empty subject falls back too",
  replySubject("   ", "Nanta Alta"), "Re: Your enquiry about Nanta Alta");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
