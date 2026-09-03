import { emailLinkOrigin, isLocalOrigin, setPasswordUrl, PRODUCTION_ORIGIN } from "./siteUrl";

let pass = 0, fail = 0;
const is = (got: unknown, want: unknown, msg: string) => {
  const ok = got === want;
  ok ? pass++ : fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}${ok ? "" : `\n        got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`);
};

// --- what an unusable host looks like ---
is(isLocalOrigin("http://localhost:3000"), true, "localhost is local");
is(isLocalOrigin("http://localhost:4321"), true, "localhost on any port is local");
is(isLocalOrigin("http://127.0.0.1:8888"), true, "127.0.0.1 is local");
is(isLocalOrigin("http://0.0.0.0:3000"), true, "0.0.0.0 is local");
is(isLocalOrigin("http://192.168.1.20:3000"), true, "LAN address is local");
is(isLocalOrigin("http://10.0.0.4:3000"), true, "10.x is local");
is(isLocalOrigin("http://172.16.4.4:3000"), true, "172.16.x is local");
is(isLocalOrigin("http://mac-mini.local:3000"), true, ".local is local");
is(isLocalOrigin("not a url"), true, "garbage is never mailed out");
is(isLocalOrigin("https://equitypartners.fund"), false, "the live site is public");
is(isLocalOrigin("https://deploy-preview-12--ep.netlify.app"), false, "a deploy preview is public");
is(isLocalOrigin("http://172.32.0.1"), false, "172.32 is outside the private range");

// --- the bug that sent three dead invitations ---
is(
  setPasswordUrl("http://localhost:3000", null),
  `${PRODUCTION_ORIGIN}/admin/set-password`,
  "an invite sent from the dev server points at the LIVE site",
);
is(
  setPasswordUrl("http://localhost:3000", ""),
  `${PRODUCTION_ORIGIN}/admin/set-password`,
  "empty override does not reintroduce localhost",
);

// --- normal operation ---
is(
  setPasswordUrl("https://equitypartners.fund", null),
  "https://equitypartners.fund/admin/set-password",
  "an invite sent from the live site points at the live site",
);
is(
  emailLinkOrigin("https://deploy-preview-12--ep.netlify.app", null),
  "https://deploy-preview-12--ep.netlify.app",
  "a deploy preview keeps its own domain so previews stay testable",
);

// --- the explicit setting wins ---
is(
  emailLinkOrigin("https://deploy-preview-12--ep.netlify.app", "https://portal.equitypartners.fund"),
  "https://portal.equitypartners.fund",
  "PUBLIC_SITE_URL overrides the request origin",
);
is(
  emailLinkOrigin("https://equitypartners.fund", "https://portal.equitypartners.fund/"),
  "https://portal.equitypartners.fund",
  "a trailing slash in the setting is trimmed (no // in the link)",
);
is(
  emailLinkOrigin("https://equitypartners.fund", "http://localhost:3000"),
  "https://equitypartners.fund",
  "even a misconfigured PUBLIC_SITE_URL cannot mail out localhost",
);
is(
  emailLinkOrigin(null, null),
  PRODUCTION_ORIGIN,
  "no origin at all still yields a usable link",
);

console.log(`\n${fail === 0 ? `ALL ${pass} PASS` : `${fail} FAILED`}`);
if (fail) process.exit(1);
