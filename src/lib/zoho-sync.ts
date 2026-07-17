/**
 * Zoho → Supabase inbox sync.
 * Pulls recent inbox messages and attaches any that were sent by a known
 * lead (matching inquiries.email) to that lead's message thread.
 * Idempotent: deduped on zoho_message_id. Shared by the admin
 * "Sync now" endpoint and the Netlify scheduled function.
 */
import { createClient } from "@supabase/supabase-js";
import { isZohoConfigured, listInboxMessages, getMessageContent } from "./zoho";

function env(key: string): string {
  const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;
  return metaEnv?.[key] ?? (typeof process !== "undefined" ? process.env[key] : undefined) ?? "";
}

export type SyncResult = {
  ok: boolean;
  scanned: number;
  matched: number;
  inserted: number;
  error?: string;
};

export async function runZohoSync(): Promise<SyncResult> {
  if (!isZohoConfigured()) {
    return { ok: false, scanned: 0, matched: 0, inserted: 0, error: "zoho_not_configured" };
  }

  const db = createClient(env("PUBLIC_SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"), {
    auth: { persistSession: false },
  });

  try {
    const messages = await listInboxMessages(50);
    if (messages.length === 0) return { ok: true, scanned: 0, matched: 0, inserted: 0 };

    // Map sender address → newest inquiry from that address.
    const senders = [...new Set(messages.map((m) => m.fromAddress?.toLowerCase()).filter(Boolean))];
    const { data: inquiries } = await db
      .from("inquiries")
      .select("id, email, created_at")
      .in("email", senders)
      .order("created_at", { ascending: false });

    const inquiryByEmail = new Map<string, string>();
    for (const inq of inquiries ?? []) {
      if (!inquiryByEmail.has(inq.email.toLowerCase())) inquiryByEmail.set(inq.email.toLowerCase(), inq.id);
    }

    const candidates = messages.filter((m) => inquiryByEmail.has(m.fromAddress?.toLowerCase()));
    if (candidates.length === 0) return { ok: true, scanned: messages.length, matched: 0, inserted: 0 };

    // Skip messages we already stored.
    const { data: existing } = await db
      .from("inquiry_messages")
      .select("zoho_message_id")
      .in("zoho_message_id", candidates.map((m) => m.messageId));
    const seen = new Set((existing ?? []).map((e) => e.zoho_message_id));

    let inserted = 0;
    for (const msg of candidates) {
      if (seen.has(msg.messageId)) continue;

      let body = "";
      try {
        body = await getMessageContent(msg.folderId, msg.messageId);
      } catch {
        body = msg.summary ?? "";
      }

      const { error } = await db.from("inquiry_messages").insert({
        inquiry_id: inquiryByEmail.get(msg.fromAddress.toLowerCase()),
        direction: "inbound",
        zoho_message_id: msg.messageId,
        subject: msg.subject ?? null,
        body_html: body,
        from_email: msg.fromAddress,
        to_email: msg.toAddress ?? "",
        sent_at: new Date(Number(msg.receivedTime) || Date.now()).toISOString(),
      });
      if (!error) inserted += 1;
    }

    return { ok: true, scanned: messages.length, matched: candidates.length, inserted };
  } catch (e) {
    return {
      ok: false, scanned: 0, matched: 0, inserted: 0,
      error: e instanceof Error ? e.message : "unknown",
    };
  }
}
