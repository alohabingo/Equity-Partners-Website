import { supabaseAdmin } from "./supabase";
import { listRecentMessages, fetchMessageContent } from "./zohoAccount";
import { extractBuyer, shouldIgnore, htmlToText } from "./mailToEnquiry";

/**
 * Pull a project mailbox and turn its mail into enquiries.
 *
 * Known sender  -> the message is appended to that person's existing thread.
 * Unknown sender -> a new UNCLAIMED enquiry, so it lands in "Needs you".
 *
 * The sender we match on is the BUYER, not the envelope From: form
 * notifications arrive from the form service, so using From would fold every
 * buyer who ever used the form into one contact. See mailToEnquiry.ts.
 */

export type SyncResult = {
  ok: boolean;
  scanned: number;
  created: number;
  appended: number;
  ignored: number;
  error?: string;
};

/** How far back to look the first time a mailbox is connected. */
const FIRST_RUN_DAYS = 30;

export async function syncProjectMailbox(projectId: string, limit = 50): Promise<SyncResult> {
  const db = supabaseAdmin();
  const empty: SyncResult = { ok: true, scanned: 0, created: 0, appended: 0, ignored: 0 };

  const { data: account } = await db
    .from("mail_accounts").select("*").eq("project_id", projectId).maybeSingle();
  if (!account?.zoho_account_id) return { ...empty, ok: false, error: "mailbox not connected" };

  const { data: project } = await db
    .from("projects").select("id, slug, mailbox").eq("id", projectId).maybeSingle();
  if (!project) return { ...empty, ok: false, error: "project not found" };

  try {
    const messages = await listRecentMessages(account as any, limit);
    if (messages.length === 0) {
      await markSynced(db, account.id, projectId, null);
      return empty;
    }

    const firstRun = !account.last_sync_at;
    const floor = firstRun
      ? Date.now() - FIRST_RUN_DAYS * 86_400_000
      : new Date(account.last_sync_at).getTime() - 5 * 60_000; // small overlap, dedup handles it

    // Everything already stored, so a re-run can't duplicate.
    const { data: seenRows } = await db
      .from("inquiry_messages")
      .select("zoho_message_id")
      .in("zoho_message_id", messages.map((m) => m.messageId));
    const seen = new Set((seenRows ?? []).map((r) => r.zoho_message_id));

    const ourAddresses = [project.mailbox, account.email].filter(Boolean) as string[];
    let created = 0, appended = 0, ignored = 0;

    for (const msg of messages) {
      if (seen.has(msg.messageId)) continue;

      const receivedAt = Number(msg.receivedTime) || Date.now();
      if (receivedAt < floor) continue;

      const skip = shouldIgnore({ from: msg.fromAddress, subject: msg.subject }, ourAddresses);
      if (skip) { ignored += 1; continue; }

      let html = msg.summary ?? "";
      let replyTo: string | null = null;
      try {
        const content = await fetchMessageContent(account as any, msg.folderId, msg.messageId);
        html = content.html || html;
        replyTo = content.replyTo;
      } catch {
        /* fall back to the summary; the buyer may still be findable in it */
      }

      const buyer = extractBuyer({
        from: msg.fromAddress,
        replyTo,
        subject: msg.subject,
        bodyHtml: html,
      });

      if (!buyer.email) {
        ignored += 1;
        await db.from("ingest_log").insert({
          project_id: projectId,
          outcome: "rejected",
          reason: `could not identify a sender in mail from ${msg.fromAddress}`,
        });
        continue;
      }

      // Match on the buyer's address, scoped to this project.
      const { data: existing } = await db
        .from("inquiries")
        .select("id")
        .eq("project_id", projectId)
        .ilike("email", buyer.email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      let inquiryId = existing?.id ?? null;

      if (!inquiryId) {
        const { data: inserted, error } = await db
          .from("inquiries")
          .insert({
            project_id: projectId,
            audience: "buyer",
            stage: "new",
            type: "general",
            status: "new",
            name: buyer.name || buyer.email,
            email: buyer.email,
            message: buyer.message?.slice(0, 5000) || null,
            locale: "en",
            source_page: buyer.viaForwarder ? "website form" : "direct email",
            // Flagged when the address came from the body rather than a header,
            // so it can be given a glance instead of trusted silently.
            details: buyer.source === "body" ? { needs_review: true, matched_by: "body" } : {},
            created_at: new Date(receivedAt).toISOString(),
          })
          .select("id")
          .single();
        if (error) continue;
        inquiryId = inserted.id;
        created += 1;
        await db.from("enquiry_events").insert({
          inquiry_id: inquiryId,
          kind: "received",
          detail: { via: buyer.viaForwarder ? "form" : "email", source: buyer.source },
        });
      } else {
        appended += 1;
      }

      await db.from("inquiry_messages").insert({
        inquiry_id: inquiryId,
        direction: "inbound",
        zoho_message_id: msg.messageId,
        subject: msg.subject ?? null,
        body_html: html,
        from_email: buyer.email,
        to_email: msg.toAddress ?? project.mailbox ?? "",
        sent_at: new Date(receivedAt).toISOString(),
      });
    }

    await markSynced(db, account.id, projectId, null);
    return { ok: true, scanned: messages.length, created, appended, ignored };
  } catch (e) {
    const error = e instanceof Error ? e.message : "unknown";
    await markSynced(db, account.id, projectId, error);
    return { ok: false, scanned: 0, created: 0, appended: 0, ignored: 0, error };
  }
}

async function markSynced(db: any, accountId: string, projectId: string, error: string | null) {
  const now = new Date().toISOString();
  await db.from("mail_accounts")
    .update({ last_sync_at: now, last_sync_error: error }).eq("id", accountId);
  await db.from("projects")
    .update({ mailbox_last_sync_at: now, mailbox_last_error: error }).eq("id", projectId);
}

/** Sync every project that has a connected mailbox. */
export async function syncAllProjectMailboxes(): Promise<Record<string, SyncResult>> {
  const db = supabaseAdmin();
  const { data: accounts } = await db.from("mail_accounts").select("project_id");
  const out: Record<string, SyncResult> = {};
  for (const a of accounts ?? []) {
    out[a.project_id] = await syncProjectMailbox(a.project_id);
  }
  return out;
}
