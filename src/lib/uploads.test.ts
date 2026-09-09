import {
  UPLOAD_RULES, isUploadKind, safeFileName, safeFolder,
  storagePathFor, uploadRefusal, pathLooksIssued,
} from "./uploads";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got  ${JSON.stringify(got)}\n        want ${JSON.stringify(want)}`}`);
};

// ---- the file name can never become a path ----
is(safeFileName("Brochure Phase 1.pdf"), "Brochure_Phase_1.pdf", "spaces become underscores");
is(safeFileName("../../etc/passwd"), "passwd", "a traversal attempt keeps only the last name");
is(safeFileName("..\\..\\windows\\system32\\x.dll"), "x.dll", "backslashes are paths too");
is(safeFileName("....//evil.pdf"), "evil.pdf", "leading dots are stripped");
is(safeFileName(".hidden"), "hidden", "no hidden files");
is(safeFileName(""), "file", "an empty name still has to be something");
is(safeFileName("///"), "file", "so does a name that is only separators");
// The property matters, not the exact string: whatever comes out must contain
// only characters that cannot change what a path means.
is(/^[A-Za-z0-9._-]+$/.test(safeFileName("é&$ünïcode!.pdf")), true,
   `accents and symbols are replaced (${safeFileName("é&$ünïcode!.pdf")})`);
is(safeFileName("é&$ünïcode!.pdf").endsWith(".pdf"), true, "and the extension survives");
is(safeFileName("a".repeat(300) + ".pdf").length <= 120, true, "an absurd name is trimmed");

is(safeFolder("portfolio", "blog"), "portfolio", "a known folder is kept");
is(safeFolder("../secret", "blog"), "blog", "a folder cannot be a path");
is(safeFolder("", "blog"), "blog", "empty falls back");
is(safeFolder("UPPER", "blog"), "blog", "only the shape we allow");

// ---- where things land ----
const opts = { now: new Date("2026-09-09T00:00:00Z"), id: "abcd1234" };
is(storagePathFor("media", "Photo One.PNG", { ...opts, folder: "portfolio" }),
   "portfolio/2026-09-09-abcd1234.png", "an image lands in its dated folder");
is(storagePathFor("media", "x.png", opts), "blog/2026-09-09-abcd1234.png", "unknown folder falls back to blog");
is(storagePathFor("project_document", "Brochure Phase 1.pdf", { ...opts, projectSlug: "nanta-alta" }),
   "projects/nanta-alta/abcd1234-Brochure_Phase_1.pdf", "a project document sits under its project");
is(storagePathFor("project_document", "b.pdf", { ...opts, projectSlug: "../other" }),
   "projects/unfiled/abcd1234-b.pdf", "a forged slug cannot escape the projects folder");
is(storagePathFor("vault", "Deed.pdf", opts), "2026/abcd1234-Deed.pdf", "fund paperwork is filed by year");

// ---- what is refused, and with a sentence ----
is(uploadRefusal("project_document", { type: "application/pdf", size: 5_000_000 }), null,
   "the brochure that failed live is fine — it was never the file's fault");
is(uploadRefusal("project_document", { type: "application/pdf", size: 40 * 1024 * 1024 }), null,
   "40 MB is allowed now, and can actually be delivered");
is(
  (uploadRefusal("project_document", { type: "application/pdf", size: 60 * 1024 * 1024 }) ?? "").includes("50 MB"),
  true, "over 50 MB is refused, naming the real limit",
);
is(uploadRefusal("project_document", { type: "", size: 0 }), "That file is empty.", "an empty file");
is(
  (uploadRefusal("media", { type: "application/pdf", size: 100 }) ?? "").includes("images"),
  true, "a PDF is not an image",
);
is(uploadRefusal("media", { type: "image/svg+xml", size: 100 }), null,
   "SVG is allowed for staff media");
is(
  uploadRefusal("project_document", { type: "image/svg+xml", size: 100 }) !== null,
  true,
  "but NOT as a document — those get shared outside, and an SVG can carry script",
);
is(uploadRefusal("media", { type: "image/jpeg", size: 9 * 1024 * 1024 }) !== null, true,
   "images are still capped at 8 MB");

// ---- the path check that stops a forged claim ----
is(pathLooksIssued("project_document", "projects/nanta-alta/abcd1234-Brochure.pdf", "nanta-alta"), true,
   "a path we issued is recognised");
is(pathLooksIssued("project_document", "projects/nanta-alta/abcd1234-B.pdf", "ordino-prestige"), false,
   "a document cannot be attached to a different project's file");
is(pathLooksIssued("project_document", "../vault/2026/secret.pdf", "nanta-alta"), false, "no traversal");
is(pathLooksIssued("project_document", "/etc/passwd", "nanta-alta"), false, "no absolute paths");
is(pathLooksIssued("vault", "2026/abcd1234-Deed.pdf"), true, "a vault path is recognised");
is(pathLooksIssued("vault", "2026/not-a-uuid-Deed.pdf"), false, "an invented id is refused");
is(pathLooksIssued("media", "blog/2026-09-09-abcd1234.png"), true, "a media path is recognised");
is(pathLooksIssued("media", "blog/anything.png"), false, "a hand-written media path is refused");
is(pathLooksIssued("vault", ""), false, "empty is not a path");

// ---- the three kinds agree with themselves ----
is(isUploadKind("vault"), true, "vault is a kind");
is(isUploadKind("nonsense"), false, "nonsense is not");
is(UPLOAD_RULES.project_document.bucket, "vault", "project documents share the private bucket");
is(UPLOAD_RULES.media.bucket, "media", "images use the public one");

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED, ${pass} passed`}`);
if (fail) process.exit(1);
