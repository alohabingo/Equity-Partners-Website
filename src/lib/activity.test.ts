/**
 * Tests for the activity log's small decisions.
 *
 *   npx esbuild src/lib/activity.test.ts --bundle --platform=node --outfile=/tmp/a.cjs && node /tmp/a.cjs
 */
import {
  ACTIVITY_KINDS, isActivityKind, activityLabel, activityTitle, activityIcon,
  tidyActivityBody, activityWhen, loggedLate, MAX_ACTIVITY_BODY,
} from "./activity";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

// The keys are a database CHECK constraint as well as a dropdown. If the two
// ever drift, every save fails at the last step with a Postgres error.
check("four kinds, and the keys the constraint allows",
  ACTIVITY_KINDS.map((k) => k.key), ["call", "email", "online_meeting", "meeting"]);

check("a known kind is accepted", isActivityKind("online_meeting"), true);
check("anything else is not", isActivityKind("smoke_signal"), false);
check("and neither is a non-string", isActivityKind(3), false);

check("labels read as a person would say them", activityLabel("meeting"), "In person");
check("history names it in the past tense", activityTitle("call"), "Phone call logged");
check("an unknown kind still reads as something", activityTitle("nonsense"), "Contact logged");
check("and still has an icon", activityIcon(null), "•");

// Pasted out of a mail client, which is where most of these come from.
check("blank runs collapse and the ends are trimmed",
  tidyActivityBody("  Talked it through.\n\n\n\nWants plans.  \n"),
  "Talked it through.\n\nWants plans.");
check("windows line endings do not survive",
  tidyActivityBody("one\r\ntwo"), "one\ntwo");
check("a very long description is capped",
  tidyActivityBody("x".repeat(MAX_ACTIVITY_BODY + 500)).length, MAX_ACTIVITY_BODY);
check("an empty body stays empty, for the caller to reject",
  tidyActivityBody("   \n  "), "");

// The one that matters for the feed's order.
check("the history sorts by when it HAPPENED",
  activityWhen({ happened_at: "2026-08-03T09:00:00Z", created_at: "2026-08-05T17:00:00Z" }),
  "2026-08-03T09:00:00Z");
check("written up two days later",
  loggedLate({ happened_at: "2026-08-03T09:00:00Z", created_at: "2026-08-05T17:00:00Z" }), 2);
check("written up on the spot",
  loggedLate({ happened_at: "2026-08-05T17:00:00Z", created_at: "2026-08-05T17:02:00Z" }), 0);
check("a future happened_at does not go negative",
  loggedLate({ happened_at: "2026-08-09T09:00:00Z", created_at: "2026-08-05T17:00:00Z" }), 0);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
