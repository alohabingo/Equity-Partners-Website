import {
  parseConsent, serializeConsent, hasAnswered, allows,
  CONSENT_FIXTURES, CONSENT_KEY, CONSENT_CATEGORIES,
} from "./consent";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

// ---- the shared table, also run against the inline reader in the browser ----
for (const c of CONSENT_FIXTURES) {
  is(parseConsent(c.raw), c.expect, `parse: ${c.why}`);
}

// ---- the migration is the whole point of not re-asking ----
is(parseConsent("accepted")?.analytics, true, "a bundled Accept allows analytics");
is(parseConsent("accepted")?.marketing, true, "a bundled Accept allows marketing");
is(parseConsent("rejected")?.marketing, false, "a bundled Reject refuses marketing");
is(hasAnswered("accepted"), true, "a migrated visitor is NOT asked again");
is(hasAnswered("rejected"), true, "including one who refused");
is(parseConsent("accepted")?.at, null,
   "no timestamp is invented for a migrated answer");

// ---- unanswered is not the same as refused ----
is(hasAnswered(null), false, "never answered means the banner shows");
is(allows(null, "analytics"), false, "and nothing runs in the meantime");
is(allows(null, "marketing"), false, "for either purpose");
is(hasAnswered('{"analytics":false,"marketing":false,"at":null}'), true,
   "someone who refused both HAS answered — the banner must not nag them");

// ---- the two purposes are independent, which is the point ----
const analyticsOnly = '{"analytics":true,"marketing":false,"at":"2026-09-03T10:00:00.000Z"}';
is(allows(analyticsOnly, "analytics"), true, "analytics-only: Google Analytics may run");
is(allows(analyticsOnly, "marketing"), false, "analytics-only: the Meta pixel may NOT");
const marketingOnly = '{"analytics":false,"marketing":true,"at":"2026-09-03T10:00:00.000Z"}';
is(allows(marketingOnly, "marketing"), true, "marketing-only: the pixel may run");
is(allows(marketingOnly, "analytics"), false, "marketing-only: Analytics may NOT");

// ---- round trip ----
const state = { analytics: true, marketing: false, at: "2026-09-03T10:00:00.000Z" };
is(parseConsent(serializeConsent(state)), state, "what is written comes back unchanged");
is(
  parseConsent(serializeConsent({ analytics: false, marketing: false, at: null })),
  { analytics: false, marketing: false, at: null },
  "a refusal round-trips as an answer, not as silence",
);

// ---- junk can never grant anything ----
for (const junk of ["not json", "[1,2,3]", "{}", "null", "true", '{"analytics":1,"marketing":1}']) {
  is(allows(junk, "marketing"), false, `junk (${junk}) never grants marketing`);
  is(hasAnswered(junk), false, `junk (${junk}) means ask again`);
}

// ---- guards ----
is(CONSENT_KEY, "cookie_consent_v2", "the key is unchanged, so nobody is re-asked");
is([...CONSENT_CATEGORIES], ["analytics", "marketing"], "essential is not a category — it is not a choice");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
