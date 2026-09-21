import { suggestBuildingCode, normaliseBuildingCode, buildingCodeError, unitName } from "./buildingCode";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

// ---- what the form suggests ----
is(suggestBuildingCode("Aire"), "A", "Aire → A");
is(suggestBuildingCode("Brisa"), "B", "Brisa → B");
is(suggestBuildingCode("cielo"), "C", "and it is upper-case whatever was typed");
is(suggestBuildingCode("Block D"), "D", "Block D → D, not B: the letter after the label is the identity");
is(suggestBuildingCode("Building 2"), "2", "Building 2 → 2");
is(suggestBuildingCode("Bloque C"), "C", "in Spanish too");
is(suggestBuildingCode("Torre 12"), "12", "a two-digit token survives");
is(suggestBuildingCode("Nanta Alta"), "N", "a two-word NAME is not a label + token — first letter");
is(suggestBuildingCode("Ordino Prestige Residences"), "O", "nor is a three-word one");
is(suggestBuildingCode("Édifice"), "E", "accents are dropped so the name types from any keyboard");
is(suggestBuildingCode(""), "", "nothing yet, nothing suggested");
is(suggestBuildingCode("   "), "", "whitespace is nothing");

// ---- cleaning what was typed ----
is(normaliseBuildingCode("a"), "A", "upper-cased");
is(normaliseBuildingCode(" b "), "B", "trimmed");
is(normaliseBuildingCode("bl-2"), "BL2", "punctuation removed");
is(normaliseBuildingCode("ABCD"), "ABC", "at most three characters — the unit name has to stay short");
is(normaliseBuildingCode("a 1"), "A1", "no spaces inside");
is(normaliseBuildingCode("!!"), "", "punctuation alone is nothing");

is(buildingCodeError(""), "A building needs a short code — the letter its units are named with, like A.", "an empty code is refused with a sentence");
is(buildingCodeError("A"), null, "a letter is fine");

// ---- the unit names themselves ----
is(unitName("A", 0, 1), "A0.1", "building A, ground floor, first unit");
is(unitName("A", 2, 3), "A2.3", "building A, second floor, third unit");
is(unitName("C", 12, 4), "C12.4", "floors past 9 stay unambiguous because of the dot");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
