import {
  parseClickIds, unpackClickIds, packClickIds, mergeClickIds, hasClickIds,
  clickIdsForRow, CLICK_ID_TTL_DAYS,
} from "./clickIds";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

// ---- reading the landing URL ----
is(parseClickIds("?gclid=abc123"), { gclid: "abc123" }, "a Google click is captured");
is(parseClickIds("?fbclid=IwAR9xyz"), { fbclid: "IwAR9xyz" }, "a Meta click is captured");
is(
  parseClickIds("?utm_source=google&gclid=abc&utm_campaign=nanta"),
  { gclid: "abc" },
  "the id is found among other parameters",
);
is(
  parseClickIds("?wbraid=Cj0KCQ"),
  { wbraid: "Cj0KCQ" },
  "iOS/Safari clicks (wbraid) are captured, not just gclid",
);
is(parseClickIds("?gbraid=Ab12"), { gbraid: "Ab12" }, "gbraid is captured");
is(parseClickIds("gclid=noquestionmark"), { gclid: "noquestionmark" }, "a bare query string works");
is(parseClickIds(""), {}, "an ordinary visit captures nothing");
is(parseClickIds("?project=nanta"), {}, "unrelated parameters are ignored");
is(parseClickIds("?gclid="), {}, "an empty id is not stored");
is(parseClickIds("?gclid=" + encodeURIComponent("a b")), {}, "a value with whitespace is rejected");
is(parseClickIds("?gclid=" + "x".repeat(600)), {}, "an absurdly long value is rejected");
is(
  parseClickIds("?gclid=abc&fbclid=def"),
  { gclid: "abc", fbclid: "def" },
  "both platforms at once",
);

// ---- helpers ----
is(hasClickIds({}), false, "nothing captured is nothing captured");
is(hasClickIds({ gclid: "a" }), true, "something captured reads as captured");
is(clickIdsForRow({}), null, "an unattributed enquiry writes null, not an empty object");
is(clickIdsForRow({ gclid: "a" }), { gclid: "a" }, "an attributed enquiry writes the ids");

// ---- merging repeat visits ----
is(
  mergeClickIds({ gclid: "old" }, { gclid: "new" }),
  { gclid: "new" },
  "a second click on the same platform wins",
);
is(
  mergeClickIds({ gclid: "g" }, { fbclid: "f" }),
  { gclid: "g", fbclid: "f" },
  "arriving via Google then Meta keeps both",
);
is(mergeClickIds({ gclid: "g" }, {}), { gclid: "g" }, "an ordinary later visit erases nothing");

// ---- storage round trip and expiry ----
const now = new Date("2026-09-03T12:00:00Z");
is(
  unpackClickIds(packClickIds({ gclid: "abc" }, now), now),
  { gclid: "abc" },
  "what is written comes back",
);

const day = 86_400_000;
const fresh = new Date(now.getTime() - 89 * day);
is(
  unpackClickIds(packClickIds({ gclid: "abc" }, fresh), now),
  { gclid: "abc" },
  `an id ${CLICK_ID_TTL_DAYS - 1} days old is still usable`,
);
const stale = new Date(now.getTime() - 91 * day);
is(
  unpackClickIds(packClickIds({ gclid: "abc" }, stale), now),
  {},
  "past the attribution window it is discarded, not uploaded as a lie",
);

// ---- junk must never break a page ----
is(unpackClickIds(null, now), {}, "nothing stored");
is(unpackClickIds("", now), {}, "empty string");
is(unpackClickIds("not json", now), {}, "corrupted value");
is(unpackClickIds("[1,2,3]", now), {}, "wrong shape (array)");
is(unpackClickIds('{"ids":{"gclid":"a"}}', now), {}, "missing timestamp");
is(unpackClickIds('{"ids":{"gclid":"a"},"at":"nonsense"}', now), {}, "unparseable timestamp");
is(unpackClickIds('{"at":"2026-09-03T12:00:00Z"}', now), {}, "missing ids");
is(
  unpackClickIds('{"ids":{"gclid":123,"fbclid":"ok"},"at":"2026-09-03T12:00:00Z"}', now),
  { fbclid: "ok" },
  "a non-string id is dropped, the valid one survives",
);
is(
  unpackClickIds('{"ids":{"evil":"x","gclid":"a"},"at":"2026-09-03T12:00:00Z"}', now),
  { gclid: "a" },
  "only known parameters are read back",
);
const future = new Date(now.getTime() + 5 * day);
is(
  unpackClickIds(packClickIds({ gclid: "a" }, future), now),
  {},
  "a timestamp from the future (clock change) is not trusted",
);

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
