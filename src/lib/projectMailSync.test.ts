import { ingestSentPage } from "./projectMailSync";

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

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
