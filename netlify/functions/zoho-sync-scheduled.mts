import { runZohoSync } from "../../src/lib/zoho-sync";
import { syncAllProjectMailboxes } from "../../src/lib/projectMailSync";

/**
 * Automatic Zoho mail sync — runs every 10 minutes in production.
 *
 * Two jobs, kept separate because they do different things:
 *  1. The fund inbox: matches new mail to EXISTING leads.
 *  2. Each connected project mailbox: matches to an existing buyer enquiry, or
 *     creates a new unclaimed one when the sender is someone we don't know yet.
 *
 * A failure in one must not stop the other, so they're settled independently.
 */
export default async () => {
  const [fund, projects] = await Promise.allSettled([
    runZohoSync(),
    syncAllProjectMailboxes(),
  ]);

  const result = {
    fund: fund.status === "fulfilled" ? fund.value : { ok: false, error: String(fund.reason) },
    projects: projects.status === "fulfilled" ? projects.value : { ok: false, error: String(projects.reason) },
  };

  console.log("zoho-sync:", JSON.stringify(result));
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  schedule: "*/10 * * * *",
};
