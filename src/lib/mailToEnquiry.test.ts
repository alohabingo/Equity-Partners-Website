/**
 * Tests for the inbound-mail parser.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/mailToEnquiry.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * The first case is a real Web3Forms notification from nantaalta.com, kept
 * verbatim: it is the shape everything else has to keep working against.
 */
import { extractBuyer, shouldIgnore, stripServiceFooter } from "./mailToEnquiry";

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

// ---- the form service's own trailer ----
// Verbatim from the first real submission through the connected mailbox. All of
// it lands in the one line the queue shows, so "I'd like the brochure" reads as
// an IP address and a spam link unless it is cut.
const trailer = `This is a portal connection test message
Visitor IP: 217.148.133.158. Report Spam .
Don't want these emails anymore?
Manage Notifications .
This e-mail was sent from
https://www.nantaalta.com/
Powered by
Web3Forms`;
check("real Web3Forms trailer is cut whole", stripServiceFooter(trailer), "This is a portal connection test message");
check("a multi-paragraph message survives",
  stripServiceFooter("Hello,\n\nI would like the brochure.\n\nVisitor IP: 1.2.3.4\nPowered by\nWeb3Forms"),
  "Hello,\n\nI would like the brochure.");
check("no trailer, nothing removed",
  stripServiceFooter("Just a plain email."), "Just a plain email.");
check("a message that is only a trailer ends up empty",
  stripServiceFooter("Visitor IP: 9.9.9.9\nPowered by\nWeb3Forms"), "");
check("cuts at the earliest marker, not the first listed",
  stripServiceFooter("Real words.\nUnsubscribe\nVisitor IP: 1.1.1.1"), "Real words.");

// Why every pattern is anchored to its own line: buyers write these words too,
// and eating a real sentence would be far worse than leaving a footer in.
check("'powered by' inside a sentence is left alone",
  stripServiceFooter("The villa is powered by geothermal heating. Can you confirm?"),
  "The villa is powered by geothermal heating. Can you confirm?");
check("an IP mentioned mid-sentence is left alone",
  stripServiceFooter("Our office powered by solar; my visitor IP question is separate."),
  "Our office powered by solar; my visitor IP question is separate.");

check("extractBuyer returns the trimmed message",
  extractBuyer({ from: "notify@web3forms.com", replyTo: "buyer@example.com", subject: "New Submission",
    bodyHtml: "<h3>Message</h3><p>Send me the floorplans.</p><p>Visitor IP: 1.2.3.4</p><p>Powered by</p><p>Web3Forms</p>" }).message,
  "Send me the floorplans.");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
