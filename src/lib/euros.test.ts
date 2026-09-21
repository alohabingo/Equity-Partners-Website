import { formatEuros, parseEuros, priceFieldValue } from "./euros";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

is(formatEuros(1250000), "€1,250,000", "sign first, thousands marked");
is(formatEuros(18000), "€18,000", "a parking space");
is(formatEuros(950), "€950", "under a thousand, no separator");
is(formatEuros(1250000.6), "€1,250,001", "rounded to whole euros");

is(parseEuros("1250000"), 1250000, "plain digits");
is(parseEuros("1,250,000"), 1250000, "English commas");
is(parseEuros("1.250.000"), 1250000, "Spanish dots");
is(parseEuros("€1 250 000"), 1250000, "a sign and spaces");
is(parseEuros("€1,250,000"), 1250000, "what the box itself shows, back in");
is(parseEuros(""), null, "nothing is no price");
is(parseEuros("   "), null, "spaces are nothing");
is(parseEuros("€"), null, "a sign alone is nothing");
is(parseEuros("0"), null, "zero is no price");
is(parseEuros("abc"), null, "letters are nothing");
is(parseEuros(null), null, "null is nothing");

is(priceFieldValue(1250000), "€1,250,000", "a stored price opens formatted");
is(priceFieldValue(null), "", "no price opens empty, not €0");
is(priceFieldValue(0), "", "nor does zero");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
