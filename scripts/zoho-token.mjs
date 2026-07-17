/**
 * One-time helper: exchange a Zoho Self Client grant code for a refresh
 * token, and look up your Mail account ID.
 *
 * Usage (from the site/ folder):
 *   node scripts/zoho-token.mjs <client_id> <client_secret> <grant_code> [region]
 *
 * region: eu (default) | com | in — where your Zoho account lives.
 * The grant code expires ~10 minutes after you generate it, so run this
 * right away.
 */

const [clientId, clientSecret, grantCode, region = "eu"] = process.argv.slice(2);

if (!clientId || !clientSecret || !grantCode) {
  console.log("Usage: node scripts/zoho-token.mjs <client_id> <client_secret> <grant_code> [eu|com|in]");
  process.exit(1);
}

const accounts = `https://accounts.zoho.${region}`;
const mail = `https://mail.zoho.${region}`;

const params = new URLSearchParams({
  grant_type: "authorization_code",
  client_id: clientId,
  client_secret: clientSecret,
  code: grantCode,
});

const tokenRes = await fetch(`${accounts}/oauth/v2/token?${params}`, { method: "POST" });
const tokens = await tokenRes.json();

if (!tokens.refresh_token) {
  console.error("Token exchange failed:", JSON.stringify(tokens, null, 2));
  console.error("\nMost common cause: the grant code expired (10 min) or the region is wrong.");
  process.exit(1);
}

const acctRes = await fetch(`${mail}/api/accounts`, {
  headers: { Authorization: `Zoho-oauthtoken ${tokens.access_token}` },
});
const accountsData = await acctRes.json();
const account = accountsData?.data?.[0];

console.log("\nAdd these to site/.env AND Netlify environment variables:\n");
console.log(`ZOHO_CLIENT_ID=${clientId}`);
console.log(`ZOHO_CLIENT_SECRET=${clientSecret}`);
console.log(`ZOHO_REFRESH_TOKEN=${tokens.refresh_token}`);
console.log(`ZOHO_ACCOUNT_ID=${account?.accountId ?? "<not found — check Mail is active>"}`);
console.log(`ZOHO_FROM_ADDRESS=${account?.primaryEmailAddress ?? "info@equitypartner.fund"}`);
console.log(`ZOHO_API_BASE=${mail}`);
