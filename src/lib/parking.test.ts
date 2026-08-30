/**
 * Tests for the parking helpers.
 *
 *   npx esbuild src/lib/parking.test.ts --bundle --platform=node --outfile=/tmp/p.cjs && node /tmp/p.cjs
 *
 * The naming and the price parsing are the two places a quiet mistake would
 * show up as real damage: a duplicate space name is a space sold twice, and a
 * mis-read price is a number someone quotes to a buyer.
 */
import {
  PARKING_STATES, isParkingState, parkingStateLabel,
  parseParkingPrice, parkingPrice, parkingCodes, parkingTally,
} from "./parking";

let pass = 0, fail = 0;
const check = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) console.log(`      got:  ${JSON.stringify(got)}\n      want: ${JSON.stringify(want)}`);
  ok ? pass++ : fail++;
};

// These keys are also a CHECK constraint in the database.
check("the three states, in selling order",
  PARKING_STATES.map((s) => s.key), ["available", "reserved", "sold"]);
check("a known state is accepted", isParkingState("reserved"), true);
check("anything else is not", isParkingState("pending"), false);
check("an unknown state still reads as something", parkingStateLabel("nonsense"), "Available");

// What people actually type into a price box.
check("plain digits", parseParkingPrice("18000"), 18000);
check("a dot as a thousands separator", parseParkingPrice("18.000"), 18000);
check("a comma as one", parseParkingPrice("18,000"), 18000);
check("a currency symbol and a space", parseParkingPrice("€18 000"), 18000);
check("nothing typed is no price, not zero", parseParkingPrice(""), null);
check("neither is a stray symbol", parseParkingPrice("—"), null);
check("zero is not a price either", parseParkingPrice("0"), null);

check("a price reads as money", parkingPrice(18000), "€18,000");
check("no price reads as a dash", parkingPrice(null), "—");

// Naming a run of spaces.
check("a first batch numbers from one",
  parkingCodes("P", 3, new Set()), ["P1", "P2", "P3"]);
check("a second batch does not collide with the first",
  parkingCodes("P", 3, new Set(["P1", "P2", "P3"])), ["P4", "P5", "P6"]);
check("a gap in the middle is filled before carrying on",
  parkingCodes("P", 3, new Set(["P1", "P3"])), ["P2", "P4", "P5"]);
check("an empty prefix falls back rather than making bare numbers",
  parkingCodes("", 2, new Set()), ["P1", "P2"]);
check("a prefix keeps its own shape",
  parkingCodes("Garage ", 2, new Set()), ["Garage1", "Garage2"]);

check("the tally counts every state and the total",
  parkingTally([{ state: "available" }, { state: "sold" }, { state: "sold" }]),
  { available: 1, reserved: 0, sold: 2, total: 3 });
check("an empty car park tallies to zeroes",
  parkingTally([]), { available: 0, reserved: 0, sold: 0, total: 0 });

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
