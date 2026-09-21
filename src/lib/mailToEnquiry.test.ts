/**
 * Tests for the inbound-mail parser.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/mailToEnquiry.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * Two real notifications are kept here verbatim, because they are the two
 * shapes this file has to keep working against: the Web3Forms one the mailbox
 * was first connected to, and the one nantaalta.com started sending in
 * September 2026, whose redesign lost every submission for eleven days.
 */
import {
  extractBuyer, shouldIgnore, stripServiceFooter, htmlToText, decodeEntities,
  labelledFields, rejectionReason,
} from "./mailToEnquiry";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

const OURS = ["sales@nantaalta.com"];

// ---------------------------------------------------------------- Web3Forms
const web3 = {
  from: "notify@web3forms.com",
  replyTo: "resalanevera@gmail.com",
  subject: "New Submission on nantaalta.com",
  bodyHtml: `<p>Hello,</p><p>A new form has been submitted on your website. Details below.</p>
    <h3>Name</h3><p>Sergi</p>
    <h3>Email</h3><p><a href="mailto:resalanevera@gmail.com">resalanevera@gmail.com</a></p>
    <h3>Message</h3><p>I would like to receive the full brochure and pricing details for Nanta Alta Phase 1.</p>`,
};

const a = extractBuyer(web3, OURS);
check("web3forms: buyer email from Reply-To", a.email, "resalanevera@gmail.com");
check("web3forms: name from the body", a.name, "Sergi");
check("web3forms: message from the body", a.message,
  "I would like to receive the full brochure and pricing details for Nanta Alta Phase 1.");
check("web3forms: flagged as via a forwarder", a.viaForwarder, true);
check("web3forms: address source", a.source, "reply-to");

const b = extractBuyer({ ...web3, replyTo: null }, OURS);
check("no Reply-To: falls back to the body address", b.email, "resalanevera@gmail.com");
check("no Reply-To: source is flagged as body", b.source, "body");
check("no Reply-To: name still found", b.name, "Sergi");

// ------------------------------------------------- the redesigned Nanta Alta
/**
 * The template the site started sending in September 2026: a letterhead, a
 * two-column table of fields, a rule, then what the person wrote. No Message
 * label anywhere, and — as every HTML email is — built out of table cells.
 */
const card = `
<div style="background:#2b2b2b;padding:40px">
 <table role="presentation"><tr><td>
  <p style="letter-spacing:.2em;color:#999">NANTA ALTA &middot; ENCAMP, ANDORRA</p>
  <h1>New private enquiry</h1>
  <table role="presentation">
    <tr><td style="color:#999">NAME</td><td>Alex Mu&ntilde;oz</td></tr>
    <tr><td style="color:#999">EMAIL</td><td><a href="mailto:alexmunoz91@gmail.com">alexmunoz91@gmail.com</a></td></tr>
    <tr><td style="color:#999">PHONE</td><td>663088494</td></tr>
    <tr><td style="color:#999">PREFERRED TIME</td><td>&mdash;</td></tr>
    <tr><td style="color:#999">TIMEFRAME</td><td>&mdash;</td></tr>
    <tr><td style="color:#999">PURPOSE</td><td>&mdash;</td></tr>
    <tr><td style="color:#999">LANGUAGE</td><td>ES</td></tr>
    <tr><td style="color:#999">SOURCE</td><td>direct</td></tr>
    <tr><td style="color:#999">REFERENCE</td><td>NA-131165</td></tr>
  </table>
  <hr>
  <p>Me gustar&iacute;a recibir el folleto completo y los detalles de precios de Nanta Alta Fase 1. Y saber en qu&eacute; zona de encamp es.</p>
 </td></tr></table>
</div>`;

const said = "Me gustaría recibir el folleto completo y los detalles de precios de Nanta Alta Fase 1. Y saber en qué zona de encamp es.";

// Sent from the site's own no-reply address, with no Reply-To at all: the
// hardest version, and the one where everything has to come out of the body.
const noreply = { from: "noreply@nantaalta.com", replyTo: null, subject: "New private enquiry", bodyHtml: card };
const c = extractBuyer(noreply, OURS);
check("redesigned form: the submitter is found", c.email, "alexmunoz91@gmail.com");
check("redesigned form: the name as they wrote it", c.name, "Alex Muñoz");
check("redesigned form: the phone number is kept", c.phone, "663088494");
check("redesigned form: the language they chose", c.language, "ES");
check("redesigned form: the form's reference", c.reference, "NA-131165");
check("redesigned form: the message is what they wrote, not the whole card", c.message, said);
check("redesigned form: flagged as needing a glance", c.source, "body");
check("redesigned form: counted as a website form, not a direct email", c.viaForwarder, true);
check("redesigned form: nothing is dropped before the body is read",
  shouldIgnore(noreply, OURS), null);

// Blank fields print as an em-dash. An em-dash is not a preferred time.
check("redesigned form: an em-dash is an empty answer", c.reference && extractBuyer({
  ...noreply, bodyHtml: card.replace("<td>663088494</td>", "<td>&mdash;</td>"),
}, OURS).phone, "");

// The same notification sent FROM the mailbox it is delivered to — a common
// way to wire a form, and one that used to be discarded as our own outbound.
const self = extractBuyer({ ...noreply, from: "sales@nantaalta.com" }, OURS);
check("form sent from our own address: still finds the buyer", self.email, "alexmunoz91@gmail.com");
check("form sent from our own address: we never become the buyer", self.email === "sales@nantaalta.com", false);

// And with Reply-To set, the header still wins — but the body still supplies
// the name, which is better than a name invented from the address.
const withReply = extractBuyer({ ...noreply, replyTo: "alexmunoz91@gmail.com" }, OURS);
check("Reply-To present: header wins", withReply.source, "reply-to");
check("Reply-To present: name still comes from the body", withReply.name, "Alex Muñoz");

// ------------------------------------------------------------ direct emails
const d = extractBuyer({
  from: "marta.puig@example.com",
  replyTo: null,
  subject: "Villa 4",
  bodyHtml: "<p>Bon dia, m'interessa la vila 4.</p>",
}, OURS);
check("direct email: uses From", d.email, "marta.puig@example.com");
check("direct email: not via a forwarder", d.viaForwarder, false);
check("direct email: name derived from address", d.name, "Marta Puig");
check("direct email: the message is the whole note", d.message, "Bon dia, m'interessa la vila 4.");

// A sentence that happens to open with a field name is not a field. One such
// line is prose; it takes two to be a form.
const e = extractBuyer({
  from: "marta.puig@example.com", replyTo: null, subject: "Villa 4",
  bodyHtml: "<p>Email me after six, please.</p><p>I am away until Friday.</p>",
}, OURS);
check("a sentence starting with a label is left alone", e.email, "marta.puig@example.com");
check("…and is kept as the message", e.message, "Email me after six, please.\nI am away until Friday.");

const f = extractBuyer({ from: "notify@web3forms.com", replyTo: "notify@web3forms.com", subject: "x", bodyHtml: "<p>nothing useful</p>" }, OURS);
check("forwarder only: refuses to invent a buyer", f.email, "");
check("forwarder only: source none", f.source, "none");

// ------------------------------------------------------------- what we drop
check("drops bounces", shouldIgnore({ from: "mailer-daemon@zoho.eu" }, OURS), "bounce or postmaster notice");
check("drops out-of-office", shouldIgnore({ from: "someone@example.com", subject: "Out of office: re Villa 4" }, []), "auto-reply or bounce");
check("allows a real buyer", shouldIgnore({ from: "marta@example.com", subject: "Villa 4" }, OURS), null);
check("allows the form service through", shouldIgnore({ from: "notify@web3forms.com", subject: "New Submission" }, OURS), null);
// The change that matters: a no-reply sender is no longer judged by its
// address. It is read, and refused only if nobody is named inside it.
check("a no-reply sender is read, not discarded", shouldIgnore({ from: "noreply@nantaalta.com", subject: "New private enquiry" }, OURS), null);
check("our own address is read, not discarded", shouldIgnore({ from: "sales@nantaalta.com", subject: "New private enquiry" }, OURS), null);

const newsletter = { from: "noreply@someportal.com", replyTo: null, subject: "Your weekly digest", bodyHtml: "<p>Here are this week's listings.</p>" };
check("a genuine no-reply newsletter still becomes nobody", extractBuyer(newsletter, OURS).email, "");
check("…and says why, in words", rejectionReason(newsletter, OURS), "automated sender, and nobody named inside it");
check("mail from ourselves with nobody in it says so",
  rejectionReason({ from: "sales@nantaalta.com", bodyHtml: "<p>note to self</p>" }, OURS),
  "sent from this mailbox's own address, and nobody named inside it");

// ----------------------------------------------------------------- entities
check("an escaped name is decoded", decodeEntities("Alex Mu&ntilde;oz"), "Alex Muñoz");
check("numeric entities too", decodeEntities("Mu&#241;oz &#x2014; Andorra"), "Muñoz — Andorra");
check("an unknown entity is left as it is", decodeEntities("A &weird; thing"), "A &weird; thing");
check("table cells end a line", htmlToText("<tr><td>NAME</td><td>Alex</td></tr>"), "NAME\nAlex");

// ------------------------------------------------------------- field reader
check("reads a two-column row", labelledFields("NAME Alex Muñoz\nEMAIL a@b.com").map((p) => [p.label, p.value]),
  [["name", "Alex Muñoz"], ["email", "a@b.com"]]);
check("reads a colon row", labelledFields("Name: Alex\nEmail: a@b.com").map((p) => [p.label, p.value]),
  [["name", "Alex"], ["email", "a@b.com"]]);
check("reads a stacked row", labelledFields("Name\nAlex\nEmail\na@b.com").map((p) => [p.label, p.value]),
  [["name", "Alex"], ["email", "a@b.com"]]);
check("one loose line alone is not a form", labelledFields("Email me after six").length, 0);

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
    bodyHtml: "<h3>Message</h3><p>Send me the floorplans.</p><p>Visitor IP: 1.2.3.4</p><p>Powered by</p><p>Web3Forms</p>" }, OURS).message,
  "Send me the floorplans.");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
