import { runZohoSync } from "../../src/lib/zoho-sync";

/**
 * Automatic Zoho inbox sync — runs every 10 minutes in production.
 * Matches new inbox mail to leads and stores it in inquiry_messages.
 */
export default async () => {
  const result = await runZohoSync();
  console.log("zoho-sync:", JSON.stringify(result));
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  schedule: "*/10 * * * *",
};
