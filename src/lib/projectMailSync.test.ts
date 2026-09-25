import { ingestSentPage, ingestPage, localeFromForm } from "./projectMailSync";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

/** A stand-in for the database that records what would have been written. */
function fakeDb(alreadySeen: string[] = [], orphans: any[] = []) {
  const inserted: any[] = [];
  const updated: any[] = [];
  const db = {
    from(_table: string) {
      // The orphan lookup is a chain of filters ending in an awaited thenable;
      // every link returns the same object so the order of calls does not
      // matter, and awaiting it yields the rows the test was given.
      const chain: any = {
        eq: () => chain, is: () => chain, gte: () => chain, lte: () => chain,
        in: async () => ({ data: alreadySeen.map((id) => ({ zoho_message_id: id })) }),
        then: (resolve: any) => resolve({ data: orphans }),
      };
      return {
        select: () => chain,
        insert: async (row: any) => { inserted.push(row); return { error: null }; },
        update: (patch: any) => ({ eq: async (_c: string, id: string) => { updated.push({ id, ...patch }); return { error: null }; } }),
      };
    },
  };
  return { db, inserted, updated };
}

const ctx = (db: any) => ({
  db,
  account: { email: "sales@nantaalta.com", zoho_account_id: "acc" },
  project: { mailbox: "sales@nantaalta.com" },
});

const msg = (over: any = {}) => ({
  messageId: "m1",
  folderId: "sent",
  fromAddress: "sales@nantaalta.com",
  toAddress: "buyer@example.com",
  subject: "Re: Nanta Alta",
  summary: "Thanks for your interest…",
  receivedTime: String(Date.parse("2026-09-08T10:00:00Z")),
  ...over,
});

const buyers = new Map([["buyer@example.com", "inq-1"], ["second@example.com", "inq-2"]]);

// ---- the whole point: a reply written in Zoho reaches the right thread ----
{
  const { db, inserted } = fakeDb();
  const r = await ingestSentPage(ctx(db), [msg()], buyers);
  is(r, { attached: 1, unmatched: 0, adopted: 0, duplicates: 0 }, "a reply to a known buyer is attached");
  is(inserted[0]?.inquiry_id, "inq-1", "to THAT buyer's thread, matched by recipient");
  is(inserted[0]?.direction, "outbound", "and filed as something we sent, not received");
  is(inserted[0]?.from_email, "sales@nantaalta.com", "from the project mailbox");
  is(inserted[0]?.to_email, "buyer@example.com", "to the buyer");
  is(inserted[0]?.sent_by, null,
     "with no portal user credited — it was written in Zoho, and guessing would be a lie");
  is(inserted[0]?.sent_at, "2026-09-08T10:00:00.000Z", "stamped when it was actually sent");
  is(typeof inserted[0]?.body_html === "string" && inserted[0].body_html.length > 0,
     true, "falling back to the summary when the body cannot be fetched");
}

// ---- who it is NOT for ----
{
  const { db, inserted } = fakeDb();
  const r = await ingestSentPage(ctx(db), [msg({ toAddress: "accountant@elsewhere.com" })], buyers);
  is(r, { attached: 0, unmatched: 1, adopted: 0, duplicates: 0 }, "mail to someone who is not a buyer is left alone");
  is(inserted.length, 0, "and invents no enquiry — an outgoing email is not a lead");
}

// ---- running it twice must not duplicate ----
{
  const { db, inserted } = fakeDb(["m1"]);
  const r = await ingestSentPage(ctx(db), [msg()], buyers);
  is(r, { attached: 0, unmatched: 0, adopted: 0, duplicates: 0 }, "a message already stored is skipped");
  is(inserted.length, 0, "so pressing Sync now repeatedly is safe");
}

// ---- the overlap window ----
{
  const { db } = fakeDb();
  const floor = Date.parse("2026-09-09T00:00:00Z");
  const r = await ingestSentPage(ctx(db), [msg()], buyers, floor);
  is(r, { attached: 0, unmatched: 0, adopted: 0, duplicates: 0 }, "anything older than the sync floor is ignored");
}

// ---- several recipients, and the buyer is not first ----
{
  const { db, inserted } = fakeDb();
  const r = await ingestSentPage(
    ctx(db), [msg({ toAddress: "lawyer@firm.com, buyer@example.com" })], buyers);
  is(r.attached, 1, "a buyer copied alongside others is still found");
  is(inserted[0]?.inquiry_id, "inq-1", "and the thread is theirs");
}

// ---- case, and a display name around the address ----
{
  const { db, inserted } = fakeDb();
  await ingestSentPage(ctx(db), [msg({ toAddress: "Buyer Name <BUYER@Example.com>" })], buyers);
  is(inserted[0]?.inquiry_id, "inq-1", "a display name and odd casing still match");
}

// ---- a page with nothing on it ----
{
  const { db } = fakeDb();
  is(await ingestSentPage(ctx(db), [], buyers), { attached: 0, unmatched: 0, adopted: 0, duplicates: 0 }, "an empty Sent page");
}

// ---- two buyers in one page ----
{
  const { db, inserted } = fakeDb();
  const r = await ingestSentPage(ctx(db), [
    msg({ messageId: "a", toAddress: "buyer@example.com" }),
    msg({ messageId: "b", toAddress: "second@example.com" }),
  ], buyers);
  is(r.attached, 2, "two replies, two threads");
  is(inserted.map((i) => i.inquiry_id), ["inq-1", "inq-2"], "each to its own buyer");
}

// ---- THE duplicate bug: a message the portal already recorded ----
{
  // What the portal wrote when it sent: no Zoho id, because the send discarded it.
  const orphan = { id: "row-9", to_email: "buyer@example.com" };
  const { db, inserted, updated } = fakeDb([], [orphan]);
  const r = await ingestSentPage(ctx(db), [msg()], buyers);
  is(r, { attached: 0, unmatched: 0, adopted: 1, duplicates: 0 },
     "REGRESSION: an email the portal already recorded is ADOPTED, not filed twice");
  is(inserted.length, 0, "so the thread does not show the same email twice");
  is(updated[0]?.id, "row-9", "the existing row is the one kept");
  is(updated[0]?.zoho_message_id, "m1",
     "and it gains the Zoho id, so the next sync recognises it immediately");
}

// ---- adoption must not steal a DIFFERENT person's message ----
{
  const orphan = { id: "row-9", to_email: "someone.else@example.com" };
  const { db, inserted, updated } = fakeDb([], [orphan]);
  const r = await ingestSentPage(ctx(db), [msg()], buyers);
  is(r.adopted, 0, "a row addressed to someone else is not adopted");
  is(updated.length, 0, "nothing is rewritten");
  is(inserted.length, 1, "the message is filed on its own");
}

// ---- Zoho's double filing of one Apple Mail send ----
{
  // Already on the thread: the FIRST copy Zoho stored, with its own id.
  const first = { id: "row-1", to_email: "buyer@example.com", subject: "Re: Nanta Alta", zoho_message_id: "copy-A" };
  const { db, inserted, updated } = fakeDb([], [first]);
  const second = msg({ messageId: "copy-B", receivedTime: String(Date.parse("2026-09-08T10:00:25Z")) });
  const r = await ingestSentPage(ctx(db), [second], buyers);
  is(r.duplicates, 1, "REGRESSION: the second filing of the same email is recognised as a duplicate");
  is(inserted.length, 0, "and NOT put on the thread a second time");
  is(updated.length, 0, "and the first copy is left exactly as it was");
}

// ---- but a genuinely different email to the same person is not swallowed ----
{
  const first = { id: "row-1", to_email: "buyer@example.com", subject: "Your brochure", zoho_message_id: "copy-A" };
  const { db, inserted } = fakeDb([], [first]);
  const r = await ingestSentPage(ctx(db), [msg({ messageId: "copy-B", subject: "Viewing on Friday?" })], buyers);
  is(r.duplicates, 0, "a different subject minutes later is a different email");
  is(inserted.length, 1, "and is filed");
}



// =====================================================================
// The inbox half: a website form notification becoming an enquiry.
//
// This is the path that quietly stopped working when nantaalta.com redesigned
// its enquiry form in September 2026. Every submission for the next eleven days
// arrived in the mailbox, was dropped without a line in the log, and never
// reached the queue. The notification below is that template.
// =====================================================================

const notification = `
<div style="background:#2b2b2b;padding:40px"><table role="presentation"><tr><td>
  <p style="letter-spacing:.2em">NANTA ALTA &middot; ENCAMP, ANDORRA</p>
  <h1>New private enquiry</h1>
  <table role="presentation">
    <tr><td>NAME</td><td>Alex Mu&ntilde;oz</td></tr>
    <tr><td>EMAIL</td><td><a href="mailto:alexmunoz91@gmail.com">alexmunoz91@gmail.com</a></td></tr>
    <tr><td>PHONE</td><td>663088494</td></tr>
    <tr><td>PREFERRED TIME</td><td>&mdash;</td></tr>
    <tr><td>LANGUAGE</td><td>ES</td></tr>
    <tr><td>SOURCE</td><td>direct</td></tr>
    <tr><td>REFERENCE</td><td>NA-131165</td></tr>
  </table>
  <hr>
  <p>Me gustar&iacute;a recibir el folleto completo y los detalles de precios de Nanta Alta Fase 1.</p>
</td></tr></table></div>`;

/**
 * A database stand-in for the inbox path: records every insert, and answers the
 * "have I seen this message" and "do I already know this buyer" lookups.
 */
function inboxDb(knownBuyer: string | null = null) {
  const rows: Record<string, any[]> = { inquiries: [], inquiry_messages: [], enquiry_events: [], ingest_log: [] };
  const db = {
    from(table: string) {
      const chain: any = {
        eq: () => chain, ilike: () => chain, order: () => chain, limit: () => chain,
        in: async () => ({ data: [] }),
        maybeSingle: async () => ({ data: knownBuyer ? { id: knownBuyer } : null }),
      };
      return {
        select: () => chain,
        insert: (row: any) => {
          rows[table] = rows[table] ?? [];
          rows[table].push(row);
          return {
            select: () => ({ single: async () => ({ data: { id: "new-inq" }, error: null }) }),
            then: (resolve: any) => resolve({ error: null }),
          };
        },
      };
    },
  };
  return { db, rows };
}

const inbox = (db: any) => ({
  db,
  account: { email: "sales@nantaalta.com", zoho_account_id: "acc" },
  project: { id: "proj", mailbox: "sales@nantaalta.com" },
  projectId: "proj",
  ourAddresses: ["sales@nantaalta.com"],
  // No mailbox behind the test: the body is handed over directly.
  fetchContent: async () => ({ html: notification, replyTo: null }),
});

const inbound = (over: any = {}) => ({
  messageId: "in-1",
  folderId: "inbox",
  fromAddress: "noreply@nantaalta.com",
  toAddress: "sales@nantaalta.com",
  subject: "New private enquiry",
  summary: "",
  receivedTime: String(Date.parse("2026-09-15T09:00:00Z")),
  ...over,
});

// ---- the enquiry that was being lost ----
{
  const { db, rows } = inboxDb();
  const r = await ingestPage(inbox(db) as any, [inbound()], 0);
  is(r.created, 1, "a form notification from the site's own no-reply address becomes an enquiry");
  const inq = rows.inquiries[0] ?? {};
  is(inq.email, "alexmunoz91@gmail.com", "filed under the person who filled the form in");
  is(inq.name, "Alex Muñoz", "under their own name, accents and all");
  is(inq.phone, "663088494", "with the phone number the form collected");
  is(inq.locale, "es", "in the language they chose, not one guessed for them");
  is(inq.source_page, "website form", "marked as having come from the website");
  is(inq.message, "Me gustaría recibir el folleto completo y los detalles de precios de Nanta Alta Fase 1.",
     "and the message is what they wrote, not the whole card");
  is(inq.details, { needs_review: true, matched_by: "body", reference: "NA-131165" },
     "flagged for a glance, and carrying the reference printed on the email");
  is(rows.ingest_log.length, 0, "nothing rejected");
  is(rows.inquiry_messages[0]?.direction, "inbound", "the email itself is kept on the thread");
}

// ---- the same form, wired to send from the mailbox's own address ----
{
  const { db, rows } = inboxDb();
  const r = await ingestPage(inbox(db) as any, [inbound({ fromAddress: "sales@nantaalta.com" })], 0);
  is(r.created, 1, "a form that sends from our own address still reaches the queue");
  is(rows.inquiries[0]?.email, "alexmunoz91@gmail.com", "and still under the buyer, never under us");
}

// ---- but our own reply, quoting the buyer underneath, is still us ----
{
  const { db, rows } = inboxDb();
  const r = await ingestPage(
    inbox(db) as any,
    [inbound({ fromAddress: "sales@nantaalta.com", subject: "Re: New private enquiry" })],
    0,
  );
  is(r.created, 0, "a reply we wrote is not read as an enquiry, even though it quotes the buyer");
  is(rows.ingest_log[0]?.outcome, "ignored", "and it is logged rather than dropped in silence");
}

// ---- and when there is genuinely nobody in it, it says so ----
{
  const { db, rows } = inboxDb();
  const ctx = { ...inbox(db), fetchContent: async () => ({ html: "<p>Your weekly digest.</p>", replyTo: null }) };
  const r = await ingestPage(ctx as any, [inbound({ fromAddress: "noreply@someportal.com", subject: "Weekly digest" })], 0);
  is(r.created, 0, "a real no-reply newsletter does not become an enquiry");
  is(rows.ingest_log.length, 1, "but it leaves a line saying what happened to it");
  is(rows.ingest_log[0]?.outcome, "rejected", "as a rejection");
  is(/automated sender.*Weekly digest/.test(rows.ingest_log[0]?.reason ?? ""), true,
     "naming the sender and the subject");
}

// ---- a bounce is dropped, and that is logged too ----
{
  const { db, rows } = inboxDb();
  const r = await ingestPage(inbox(db) as any, [inbound({ fromAddress: "mailer-daemon@zoho.eu" })], 0);
  is(r.created, 0, "a bounce creates nothing");
  is(rows.ingest_log[0]?.outcome, "ignored", "and is logged as ignored rather than silently dropped");
}

// ---- an existing buyer's second submission joins their thread ----
{
  const { db, rows } = inboxDb("inq-existing");
  const r = await ingestPage(inbox(db) as any, [inbound()], 0);
  is([r.created, r.appended], [0, 1], "a second enquiry from the same person is appended, not duplicated");
  is(rows.inquiry_messages[0]?.inquiry_id, "inq-existing", "onto the thread they already have");
}


// ---- the language a form says the person chose ----
is(["ES", "es-ES", "Español", "Castellano"].map(localeFromForm), ["es", "es", "es", "es"], "Spanish, however it is written");
is(["CA", "Català", "catalan"].map(localeFromForm), ["ca", "ca", "ca"], "Catalan — including with its accent, which used to be missed");
is(["NL", "nl-BE", "Nederlands", "Dutch", "Néerlandais"].map(localeFromForm), ["nl", "nl", "nl", "nl", "nl"], "Dutch");
is(["FR", "fr-FR", "Français", "French", "Francés"].map(localeFromForm), ["fr", "fr", "fr", "fr", "fr"], "French");
is(["", "Deutsch", "—", "cats"].map(localeFromForm), [null, null, null, null], "anything else is not guessed at");
console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
