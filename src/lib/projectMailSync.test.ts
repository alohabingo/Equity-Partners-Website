import { ingestSentPage } from "./projectMailSync";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

/** A stand-in for the database that records what would have been written. */
function fakeDb(alreadySeen: string[] = []) {
  const inserted: any[] = [];
  const db = {
    from(_table: string) {
      return {
        select: () => ({
          in: async () => ({ data: alreadySeen.map((id) => ({ zoho_message_id: id })) }),
        }),
        insert: async (row: any) => { inserted.push(row); return { error: null }; },
      };
    },
  };
  return { db, inserted };
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
  is(r, { attached: 1, unmatched: 0 }, "a reply to a known buyer is attached");
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
  is(r, { attached: 0, unmatched: 1 }, "mail to someone who is not a buyer is left alone");
  is(inserted.length, 0, "and invents no enquiry — an outgoing email is not a lead");
}

// ---- running it twice must not duplicate ----
{
  const { db, inserted } = fakeDb(["m1"]);
  const r = await ingestSentPage(ctx(db), [msg()], buyers);
  is(r, { attached: 0, unmatched: 0 }, "a message already stored is skipped");
  is(inserted.length, 0, "so pressing Sync now repeatedly is safe");
}

// ---- the overlap window ----
{
  const { db } = fakeDb();
  const floor = Date.parse("2026-09-09T00:00:00Z");
  const r = await ingestSentPage(ctx(db), [msg()], buyers, floor);
  is(r, { attached: 0, unmatched: 0 }, "anything older than the sync floor is ignored");
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
  is(await ingestSentPage(ctx(db), [], buyers), { attached: 0, unmatched: 0 }, "an empty Sent page");
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

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
