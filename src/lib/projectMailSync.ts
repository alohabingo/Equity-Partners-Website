// serviceClient, not supabase.ts: this file is imported by a Netlify
// scheduled function, where supabase.ts throws on load. See serviceClient.ts.
import { serviceClient } from "./serviceClient";
import { listRecentMessages, fetchMessageContent, listFolders, findSentFolder } from "./zohoAccount";
import { extractBuyer, shouldIgnore, htmlToText } from "./mailToEnquiry";
import { detectLocale } from "./detectLocale";

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
  /** Replies written in Zoho rather than the portal, picked up from Sent. */
  sentAttached?: number;
  error?: string;
};

/** How far back to look the first time a mailbox is connected. */
const FIRST_RUN_DAYS = 30;


type Ctx = {
  db: any;
  account: any;
  project: any;
  projectId: string;
  ourAddresses: string[];
};

/**
 * Turn a page of mail into enquiries and thread messages.
 *
 * Extracted so the ten-minute sync and the whole-history import run the exact
 * same code. Two paths that each decided for themselves who the buyer is, or
 * what counts as ignorable, would drift — and the second one would only ever be
 * exercised on the rare day someone imports a backlog, which is precisely when
 * nobody would notice it behaving differently.
 */
async function ingestPage(ctx: Ctx, messages: any[], floor: number) {
  const db = ctx.db;
  let created = 0, appended = 0, ignored = 0;

  // Everything already stored, so a re-run can't duplicate.
  const { data: seenRows } = await db
    .from("inquiry_messages")
    .select("zoho_message_id")
    .in("zoho_message_id", messages.map((m) => m.messageId));
  const seen = new Set((seenRows ?? []).map((r: any) => r.zoho_message_id));

  for (const msg of messages) {
    if (seen.has(msg.messageId)) continue;

    const receivedAt = Number(msg.receivedTime) || Date.now();
    if (receivedAt < floor) continue;

    const skip = shouldIgnore({ from: msg.fromAddress, subject: msg.subject }, ctx.ourAddresses);
    if (skip) { ignored += 1; continue; }

    let html = msg.summary ?? "";
    let replyTo: string | null = null;
    try {
      const content = await fetchMessageContent(ctx.account, msg.folderId, msg.messageId);
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
      // The SUBJECT is what makes this line diagnosable. "Could not identify a
      // sender in mail from noreply@web3forms.com" describes the parser's
      // problem and says nothing about which email it was — so there is no way
      // to tell a form service's own account notice from a real buyer whose
      // address we failed to read, and those are opposite problems.
      const subject = (msg.subject ?? "").trim();
      await db.from("ingest_log").insert({
        project_id: ctx.projectId,
        outcome: "rejected",
        reason: `No buyer address found — from ${msg.fromAddress}` +
          (subject ? `, subject “${subject.slice(0, 120)}”` : ", no subject"),
      });
      continue;
    }

    // Match on the buyer's address, scoped to this project.
    const { data: existing } = await db
      .from("inquiries")
      .select("id")
      .eq("project_id", ctx.projectId)
      .ilike("email", buyer.email)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    let inquiryId = existing?.id ?? null;

    if (!inquiryId) {
      const { data: inserted, error } = await db
        .from("inquiries")
        .insert({
          project_id: ctx.projectId,
          audience: "buyer",
          stage: "new",
          type: "general",
          status: "new",
          name: buyer.name || buyer.email,
          email: buyer.email,
          message: buyer.message?.slice(0, 5000) || null,
          // Guessed from what they wrote, or left null. Hard-coding "en" here
          // is what put a Catalan buyer behind an EN flag.
          locale: detectLocale(buyer.message),
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
      to_email: msg.toAddress ?? ctx.project.mailbox ?? "",
      sent_at: new Date(receivedAt).toISOString(),
    });
  }

  return { created, appended, ignored };
}

/**
 * Attach a page of SENT mail to the buyers it was written to.
 *
 * Shared by the routine sync and the whole-history import for the same reason
 * `ingestPage` is: two copies would drift, and the copy that only runs during a
 * rare backlog import is exactly the one whose drift nobody would notice.
 *
 * Matched by RECIPIENT, not sender — the sender is always us. And attached only
 * to enquiries that already exist: an outgoing email cannot tell us whether its
 * recipient was ever a buyer, and inventing a lead from one would produce a
 * thread with nothing incoming, which is a person who never contacted us.
 */
// Exported for tests: this is the rule that decides whose thread a reply
// lands on, and it is worth being able to check directly.
export async function ingestSentPage(
  ctx: { db: any; account: any; project: any },
  messages: any[],
  byEmail: Map<string, string>,
  floor = 0,
): Promise<{ attached: number; unmatched: number; adopted: number; duplicates: number }> {
  const { db, account, project } = ctx;
  let attached = 0, unmatched = 0, adopted = 0, duplicates = 0;
  if (messages.length === 0) return { attached, unmatched, adopted, duplicates };

  const { data: seenRows } = await db
    .from("inquiry_messages")
    .select("zoho_message_id")
    .in("zoho_message_id", messages.map((m) => m.messageId));
  const seen = new Set((seenRows ?? []).map((r: any) => r.zoho_message_id));

  for (const msg of messages) {
    if (seen.has(msg.messageId)) continue;

    const sentAt = Number(msg.receivedTime) || Date.now();
    if (sentAt < floor) continue;

    const recipients = addressesIn(msg.toAddress);
    const match = recipients.map((a) => byEmail.get(a)).find(Boolean);
    if (!match) { unmatched += 1; continue; }

    /**
     * Is this message already on the thread, written by us?
     *
     * When the portal sends, it records the message immediately. Until now it
     * did so without Zoho's id, so reading the Sent folder later found nothing
     * to recognise and filed a SECOND row for an email that had gone out once.
     * On screen those two are indistinguishable from a genuine double send,
     * which is exactly how this was reported.
     *
     * Sending now keeps the id, so new messages match on it. This is for the
     * ones already in the database without one, and for any future path that
     * forgets: an outbound row to the same person, within a few minutes, with
     * no id, IS this message. It is adopted — given the id — rather than
     * duplicated, which also repairs the history as the sync runs.
     */
    const window = 3 * 60_000;
    const { data: nearby } = await db
      .from("inquiry_messages")
      .select("id, to_email, subject, zoho_message_id")
      .eq("inquiry_id", match)
      .eq("direction", "outbound")
      .gte("sent_at", new Date(sentAt - window).toISOString())
      .lte("sent_at", new Date(sentAt + window).toISOString());

    const toSamePerson = (nearby ?? []).filter((r: any) =>
      recipients.includes(String(r.to_email ?? "").toLowerCase()));

    const orphan = toSamePerson.find((r: any) => !r.zoho_message_id);
    if (orphan) {
      await db.from("inquiry_messages")
        .update({ zoho_message_id: msg.messageId })
        .eq("id", orphan.id);
      adopted += 1;
      continue;
    }

    /**
     * The same email, filed twice by Zoho.
     *
     * When a message is sent from Apple Mail (or any IMAP client) through
     * Zoho, Zoho's server saves a copy to Sent — and the client saves its own
     * copy to Sent as well. Two objects, two ids, one email, fifteen to forty
     * seconds apart. The recipient got it once. Zoho's web app shows it twice;
     * Apple Mail, which recognises them as one message, shows it once.
     *
     * Dedup by id cannot see this, because the ids differ. Same person, same
     * subject, within three minutes IS the same email — nobody sends an
     * identical subject to one buyer twice inside that window on purpose — so
     * the second filing is left where it is and not put on the thread.
     */
    const norm = (v: unknown) => String(v ?? "").trim().toLowerCase();
    const twin = toSamePerson.find((r: any) =>
      r.zoho_message_id && r.zoho_message_id !== msg.messageId && norm(r.subject) === norm(msg.subject));
    if (twin) { duplicates += 1; continue; }

    let html = msg.summary ?? "";
    try {
      const content = await fetchMessageContent(account as any, msg.folderId, msg.messageId);
      html = content.html || html;
    } catch {
      /* the summary is enough to show that a reply went out */
    }

    await db.from("inquiry_messages").insert({
      inquiry_id: match,
      direction: "outbound",
      zoho_message_id: msg.messageId,
      subject: msg.subject ?? null,
      body_html: html,
      from_email: project.mailbox ?? account.email,
      to_email: recipients[0] ?? "",
      // Left null on purpose: this was sent from Zoho, not from the portal, so
      // there is no portal user to credit. Guessing one would be a lie in the
      // one place the team relies on for who said what.
      sent_by: null,
      sent_at: new Date(sentAt).toISOString(),
    });
    attached += 1;
  }

  return { attached, unmatched, adopted, duplicates };
}

/** Every buyer this project knows, so recipients match without a query each. */
async function buyersByEmail(db: any, projectId: string): Promise<Map<string, string>> {
  const { data: people } = await db
    .from("inquiries").select("id, email").eq("project_id", projectId);
  const byEmail = new Map<string, string>();
  for (const p of people ?? []) {
    if (p.email) byEmail.set(String(p.email).toLowerCase(), p.id);
  }
  return byEmail;
}

export async function syncProjectMailbox(projectId: string, limit = 50): Promise<SyncResult> {
  const db = serviceClient();
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

    const counts = await ingestPage(
      { db, account, project, projectId, ourAddresses: [project.mailbox, account.email].filter(Boolean) as string[] },
      messages,
      floor,
    );

    /**
     * ...and the newest page of the Sent folder.
     *
     * The inbox alone was the whole sync, which meant a reply written in Zoho
     * rather than in the portal never appeared on the thread — the buyer's side
     * of the conversation showed, ours did not, and the lead sat in Follow ups
     * looking ignored. "Sync now" reads as "make this current", so it now reads
     * both directions.
     *
     * One extra page, not a walk: this stays a quick button. The deep backfill
     * is still Import mail history.
     *
     * Failing here must not fail the sync. The inbox is the half that creates
     * enquiries, and losing that because a Sent folder could not be listed
     * would trade a missing reply for a missing buyer.
     */
    let sentCounts = { attached: 0, unmatched: 0 };
    try {
      const sent = findSentFolder(await listFolders(account as any));
      if (sent) {
        const byEmail = await buyersByEmail(db, projectId);
        if (byEmail.size > 0) {
          const sentMessages = await listRecentMessages(account as any, limit, 1, sent.folderId);
          sentCounts = await ingestSentPage({ db, account, project }, sentMessages, byEmail, floor);
        }
      }
    } catch {
      /* the inbox half already succeeded; a Sent hiccup is not a failed sync */
    }

    await markSynced(db, account.id, projectId, null);
    return {
      ok: true,
      scanned: messages.length,
      ...counts,
      // Counted separately so the notice can say a reply was picked up, rather
      // than folding it into "appended" where it would look like buyer mail.
      sentAttached: sentCounts.attached,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "unknown";
    await markSynced(db, account.id, projectId, error);
    return { ok: false, scanned: 0, created: 0, appended: 0, ignored: 0, error };
  }
}

/**
 * Walk the whole mailbox backwards and import everything it finds.
 *
 * The ten-minute sync only ever reads the most recent page, and on the day a
 * mailbox is first connected it deliberately stops at 30 days — a sensible
 * default that also means anything older than that was never imported at all.
 * This is the one-off that goes back and gets it.
 *
 * Paging stops at the first short page (the end of the mailbox), at the cutoff
 * if one is given, or at the page cap — which exists because every message
 * costs a second API call to fetch its body, and an unbounded walk through a
 * years-old mailbox would sit there for a very long time and rate-limit itself.
 */
export async function importProjectMailboxHistory(
  projectId: string,
  opts: { pageSize?: number; maxPages?: number; sinceDays?: number | null } = {},
): Promise<SyncResult & { pages: number; reachedEnd: boolean; oldest: string | null }> {
  const pageSize = opts.pageSize ?? 50;
  const maxPages = opts.maxPages ?? 20;
  const floor = opts.sinceDays ? Date.now() - opts.sinceDays * 86_400_000 : 0;

  const db = serviceClient();
  const base = { ok: true, scanned: 0, created: 0, appended: 0, ignored: 0, pages: 0, reachedEnd: false, oldest: null as string | null };

  const { data: account } = await db
    .from("mail_accounts").select("*").eq("project_id", projectId).maybeSingle();
  if (!account?.zoho_account_id) return { ...base, ok: false, error: "mailbox not connected" };

  const { data: project } = await db
    .from("projects").select("id, slug, mailbox").eq("id", projectId).maybeSingle();
  if (!project) return { ...base, ok: false, error: "project not found" };

  const ctx = {
    db, account, project, projectId,
    ourAddresses: [project.mailbox, account.email].filter(Boolean) as string[],
  };

  let scanned = 0, created = 0, appended = 0, ignored = 0, pages = 0;
  let reachedEnd = false;
  let oldest: number | null = null;

  try {
    for (let page = 0; page < maxPages; page++) {
      const messages = await listRecentMessages(account as any, pageSize, page * pageSize + 1);
      pages += 1;
      if (messages.length === 0) { reachedEnd = true; break; }

      scanned += messages.length;
      for (const m of messages) {
        const t = Number(m.receivedTime);
        if (t && (oldest === null || t < oldest)) oldest = t;
      }

      const counts = await ingestPage(ctx, messages, floor);
      created += counts.created;
      appended += counts.appended;
      ignored += counts.ignored;

      // A short page is the end of the mailbox. Past the cutoff there is
      // nothing further back worth reading, since the list is newest first.
      if (messages.length < pageSize) { reachedEnd = true; break; }
      if (floor > 0 && messages.every((m) => (Number(m.receivedTime) || 0) < floor)) {
        reachedEnd = true;
        break;
      }
    }

    await markSynced(db, account.id, projectId, null);
    return {
      ok: true, scanned, created, appended, ignored, pages, reachedEnd,
      oldest: oldest ? new Date(oldest).toISOString() : null,
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : "unknown";
    await markSynced(db, account.id, projectId, error);
    return {
      ok: false, scanned, created, appended, ignored, pages, reachedEnd,
      oldest: oldest ? new Date(oldest).toISOString() : null, error,
    };
  }
}

/** Every address on a To/Cc line, lowercased. */
function addressesIn(field: string | null | undefined): string[] {
  return (field ?? "")
    .toLowerCase()
    .match(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/g) ?? [];
}

export type SentImportResult = {
  ok: boolean;
  scanned: number;
  attached: number;
  unmatched: number;
  pages: number;
  reachedEnd: boolean;
  error?: string;
};

/**
 * Import replies that were sent from this mailbox OUTSIDE the portal.
 *
 * The routine sync reads the inbox, so a buyer who was answered in Zoho before
 * the portal existed shows here as someone nobody ever replied to — sitting in
 * Follow ups, with the thread showing only their side of it. That is worse than
 * a gap: it is the portal being confidently wrong about who is waiting.
 *
 * Deliberately attaches to EXISTING enquiries only. A sent message whose
 * recipient has no enquiry is left alone rather than used to invent one: we
 * cannot know from an outgoing email whether that person was ever a buyer, and
 * a thread with no inbound message would be a lead nobody ever sent us.
 */
export async function importSentHistory(
  projectId: string,
  opts: { pageSize?: number; maxPages?: number } = {},
): Promise<SentImportResult> {
  const pageSize = opts.pageSize ?? 50;
  const maxPages = opts.maxPages ?? 20;

  const db = serviceClient();
  const base = { ok: true, scanned: 0, attached: 0, unmatched: 0, pages: 0, reachedEnd: false };

  const { data: account } = await db
    .from("mail_accounts").select("*").eq("project_id", projectId).maybeSingle();
  if (!account?.zoho_account_id) return { ...base, ok: false, error: "mailbox not connected" };

  const { data: project } = await db
    .from("projects").select("id, mailbox").eq("id", projectId).maybeSingle();
  if (!project) return { ...base, ok: false, error: "project not found" };

  try {
    const sent = findSentFolder(await listFolders(account as any));
    if (!sent) return { ...base, ok: false, error: "no Sent folder found in this mailbox" };

    const byEmail = await buyersByEmail(db, projectId);
    if (byEmail.size === 0) return { ...base, reachedEnd: true };

    let scanned = 0, attached = 0, unmatched = 0, pages = 0, reachedEnd = false;

    for (let page = 0; page < maxPages; page++) {
      const messages = await listRecentMessages(account as any, pageSize, page * pageSize + 1, sent.folderId);
      pages += 1;
      if (messages.length === 0) { reachedEnd = true; break; }
      scanned += messages.length;

      const page_counts = await ingestSentPage(
        { db, account, project }, messages, byEmail,
      );
      attached += page_counts.attached;
      unmatched += page_counts.unmatched;

      if (messages.length < pageSize) { reachedEnd = true; break; }
    }

    return { ok: true, scanned, attached, unmatched, pages, reachedEnd };
  } catch (e) {
    return { ...base, ok: false, error: e instanceof Error ? e.message : "unknown" };
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
  const db = serviceClient();
  const { data: accounts } = await db.from("mail_accounts").select("project_id");
  const out: Record<string, SyncResult> = {};
  for (const a of accounts ?? []) {
    out[a.project_id] = await syncProjectMailbox(a.project_id);
  }
  return out;
}
