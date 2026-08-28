/**
 * Tests for enquiry bucketing.
 *
 * No test runner is configured in this project, so run it directly:
 *   npx esbuild src/lib/enquiries.test.ts --bundle --platform=node --outfile=/tmp/t.cjs && node /tmp/t.cjs
 *
 * What matters here is not each label but the ORDER, and the fact that every
 * enquiry lands in exactly one bucket. The queue counts are sums over these
 * buckets, so a row that could fall into two would make the counts overstate
 * the work - and a rejected one that stayed in any queue would put spam back in
 * front of a person, which is the whole thing triage exists to prevent.
 */
import { bucketOf, needsAttention, isLive, type EnquiryRow, phoneKey, samePhone, sameEmail, sourceLabel } from "./enquiries";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

const now = new Date("2026-08-26T12:00:00Z");
const ago = (days: number) => new Date(now.getTime() - days * 86_400_000).toISOString();

// An enquiry we have answered, today. Every case below is this, changed once.
const base = {
  id: "1", project_id: "p", name: "Buyer", email: "b@example.com", phone: null,
  locale: "en", message: null, stage: "info", source_page: null,
  triage: "converted", triage_reason: null, triaged_at: null, triaged_by: "u1",
  assigned_to: null, created_at: ago(1),
  last_direction: "outbound", last_sent_at: ago(0), last_activity_at: ago(0),
  last_sent_by: "u1",
  waiting_on_us: false, message_count: 2, note_count: 0,
} as EnquiryRow;

const of = (patch: Partial<EnquiryRow>) => ({ ...base, ...patch }) as EnquiryRow;

check("untriaged is 'to triage'", bucketOf(of({ triage: "pending" }), now), "triage");
check("untriaged outranks waiting-on-us",
  bucketOf(of({ triage: "pending", waiting_on_us: true, last_direction: "inbound" }), now), "triage");
check("untriaged outranks overdue",
  bucketOf(of({ triage: "pending", last_activity_at: ago(30) }), now), "triage");
check("rejected outranks everything",
  bucketOf(of({ triage: "rejected", waiting_on_us: true }), now), "rejected");

// The case removing the unclaimed bucket could easily have lost: a form
// submission with no mail behind it has waiting_on_us = null, and treating null
// as "not waiting" would have dropped it into settled, where nobody looks.
check("a converted form enquiry nobody has answered is waiting on us",
  bucketOf(of({ waiting_on_us: null, last_direction: null, message_count: 0 }), now), "waiting");
check("they replied and we haven't",
  bucketOf(of({ waiting_on_us: true, last_direction: "inbound" }), now), "waiting");
check("our reply, then silence past the rule", bucketOf(of({ last_activity_at: ago(9) }), now), "overdue");
check("answered and recent is settled", bucketOf(base, now), "settled");

check("rejected never asks for attention",
  needsAttention(of({ triage: "rejected" }), now), false);
check("untriaged always asks for attention", needsAttention(of({ triage: "pending" }), now), true);
check("rejected is not live", isLive(of({ triage: "rejected" })), false);
check("pending is live", isLive(of({ triage: "pending" })), true);

// The property the queue counts rely on.
const many = [
  of({ triage: "pending" }),
  of({ triage: "rejected" }),
  of({ waiting_on_us: null, last_direction: null }),
  of({ waiting_on_us: true, last_direction: "inbound" }),
  of({ last_activity_at: ago(9) }),
  base,
];
check("every enquiry lands in exactly one bucket",
  many.map((e) => bucketOf(e, now)).length, many.length);
check("the queue groups account for every enquiry needing attention",
  many.filter((e) => needsAttention(e, now)).length,
  (["triage", "waiting", "overdue"] as const)
    .map((b) => many.filter((e) => bucketOf(e, now) === b).length)
    .reduce((a, b) => a + b, 0));

// ---- matching a person who is already here ----
//
// The same buyer writes their number three different ways across three
// conversations. If these are too strict the same person gets added twice and
// two people quote them different prices; too loose and two genuine buyers get
// merged, which is worse.
check("international and local forms match", samePhone("+376 812 345", "00376812345"), true);
check("spacing and punctuation are ignored", samePhone("+376-812-345", "+376 812345"), true);
check("different numbers do not match", samePhone("+376 812 345", "+376 812 999"), false);
check("an empty number matches nothing", samePhone("", "+376 812 345"), false);
check("a too-short number matches nothing", samePhone("123", "123"), false);
check("phoneKey takes the last nine digits", phoneKey("+34 600 123 456"), "600123456");

check("email case is ignored", sameEmail("Ingrid@Example.com", "ingrid@example.com"), true);
check("surrounding space is ignored", sameEmail("  a@b.co ", "a@b.co"), true);
check("an empty email matches nothing", sameEmail("", ""), false);
check("different emails do not match", sameEmail("a@b.co", "c@b.co"), false);

check("source labels read as words", sourceLabel("walk_in"), "Walk-in");
check("an unknown source is not invented", sourceLabel("carrier_pigeon"), "Unknown");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
