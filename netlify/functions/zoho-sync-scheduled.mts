/**
 * Automatic Zoho mail sync — runs every 10 minutes in production.
 *
 * Two jobs, kept separate because they do different things:
 *  1. The fund inbox: matches new mail to EXISTING leads.
 *  2. Each connected project mailbox: matches to an existing buyer enquiry, or
 *     creates a new one when the sender is someone we don't know yet.
 *
 * Each job is imported INSIDE the handler, in its own try/catch. That looks
 * fussier than two top-level imports, and it is there for a reason: a top-level
 * import that throws while loading kills the whole function, so a fault in one
 * job silently stops the other. That is not hypothetical — adding the project
 * mailbox job took the fund sync down with it for a day, because the module it
 * pulled in read import.meta.env at load time and that is undefined here.
 *
 * Nothing about "both syncs stopped" was visible from the portal, which is why
 * isolation is worth the extra lines: whatever else breaks, the other job runs
 * and its error is in the log with a name attached.
 */
type JobResult = { ok: boolean; [k: string]: unknown };

async function run(name: string, job: () => Promise<JobResult>): Promise<JobResult> {
  try {
    return await job();
  } catch (e) {
    const error = e instanceof Error ? `${e.message}` : String(e);
    console.error(`zoho-sync: ${name} failed —`, error);
    return { ok: false, job: name, error };
  }
}

export default async () => {
  const [fund, projects] = await Promise.all([
    run("fund", async () => {
      const m = await import("../../src/lib/zoho-sync");
      return (await m.runZohoSync()) as JobResult;
    }),
    run("projects", async () => {
      const m = await import("../../src/lib/projectMailSync");
      // Returns one result per connected mailbox; flatten it to a single ok so
      // the log line says at a glance whether anything needs looking at.
      const byProject = await m.syncAllProjectMailboxes();
      const results = Object.values(byProject) as { ok: boolean }[];
      return { ok: results.every((r) => r.ok), mailboxes: results.length, byProject };
    }),
  ]);

  console.log("zoho-sync:", JSON.stringify({ fund, projects }));
  return new Response(JSON.stringify({ fund, projects }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  schedule: "*/10 * * * *",
};
