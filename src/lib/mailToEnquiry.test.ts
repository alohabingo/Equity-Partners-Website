/**
 * Tests for the inbound-mail parser.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/mailToEnquiry.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * The first case is a real Web3Forms notification from nantaalta.com, kept
 * verbatim: it is the shape everything else has to keep working against.
 */
import { extractBuyer, shouldIgnore } from "./mailToEnquiry";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

const web3 = {
  from: "notify@web3forms.com",
  replyTo: "resalanevera@gmail.com",
  subject: "New Submission on nantaalta.com",
  bodyHtml: `<p>Hello,</p><p>A new form has been submitted on your website. Details below.</p>
    <h3>Name</h3><p>Sergi</p>
    <h3>Email</h3><p><a href="mailto:resalanevera@gmail.com">resalanevera@gmail.com</a></p>
    <h3>Message</h3><p>I would like to receive the full brochure and pricing details for Nanta Alta Phase 1.</p>`,
};

const a = extractBuyer(web3);
check("web3forms: buyer email from Reply-To", a.email, "resalanevera@gmail.com");
check("web3forms: name from the body", a.name, "Sergi");
check("web3forms: message from the body", a.message,
  "I would like to receive the full brochure and pricing details for Nanta Alta Phase 1.");
check("web3forms: flagged as via a forwarder", a.viaForwarder, true);
check("web3forms: address source", a.source, "reply-to");

const b = extractBuyer({ ...web3, replyTo: null });
check("no Reply-To: falls back to the body address", b.email, "resalanevera@gmail.com");
check("no Reply-To: source is flagged as body", b.source, "body");
check("no Reply-To: name still found", b.name, "Sergi");

const c = extractBuyer({
  from: "marta.puig@example.com",
  replyTo: null,
  subject: "Villa 4",
  bodyHtml: "<p>Bon dia, m'interessa la vila 4.</p>",
});
check("direct email: uses From", c.email, "marta.puig@example.com");
check("direct email: not via a forwarder", c.viaForwarder, false);
check("direct email: name derived from address", c.name, "Marta Puig");

const d = extractBuyer({ from: "notify@web3forms.com", replyTo: "notify@web3forms.com", subject: "x", bodyHtml: "<p>nothing useful</p>" });
check("forwarder only: refuses to invent a buyer", d.email, "");
check("forwarder only: source none", d.source, "none");

check("ignores our own outbound", shouldIgnore({ from: "sales@nantaalta.com" }, ["sales@nantaalta.com"]), "sent by us");
check("ignores bounces", shouldIgnore({ from: "mailer-daemon@zoho.eu" }, ["sales@nantaalta.com"]), "automated sender");
check("ignores out-of-office", shouldIgnore({ from: "someone@example.com", subject: "Out of office: re Villa 4" }, []), "auto-reply or bounce");
check("allows a real buyer", shouldIgnore({ from: "marta@example.com", subject: "Villa 4" }, ["sales@nantaalta.com"]), null);
check("allows the forwarder through (it carries real buyers)", shouldIgnore({ from: "notify@web3forms.com", subject: "New Submission" }, ["sales@nantaalta.com"]), null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
