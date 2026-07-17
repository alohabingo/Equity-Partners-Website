/**
 * Zoho Mail API service.
 * Works both inside Astro (import.meta.env) and inside Netlify scheduled
 * functions (process.env) via the `env()` getter.
 */

function env(key: string): string {
  const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;
  return metaEnv?.[key] ?? (typeof process !== "undefined" ? process.env[key] : undefined) ?? "";
}

export function isZohoConfigured(): boolean {
  return Boolean(
    env("ZOHO_CLIENT_ID") &&
    env("ZOHO_CLIENT_SECRET") &&
    env("ZOHO_REFRESH_TOKEN") &&
    env("ZOHO_ACCOUNT_ID")
  );
}

const apiBase = () => env("ZOHO_API_BASE") || "https://mail.zoho.eu";
const accountsBase = () => apiBase().replace("//mail.", "//accounts.");
export const zohoFromAddress = () => env("ZOHO_FROM_ADDRESS");

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.value;

  const params = new URLSearchParams({
    refresh_token: env("ZOHO_REFRESH_TOKEN"),
    client_id: env("ZOHO_CLIENT_ID"),
    client_secret: env("ZOHO_CLIENT_SECRET"),
    grant_type: "refresh_token",
  });
  const res = await fetch(`${accountsBase()}/oauth/v2/token?${params}`, { method: "POST" });
  if (!res.ok) throw new Error(`Zoho token refresh failed: ${res.status}`);
  const data = await res.json();
  if (!data.access_token) throw new Error(`Zoho token refresh rejected: ${JSON.stringify(data)}`);
  cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 };
  return cachedToken.value;
}

async function zohoFetch(path: string, init: RequestInit = {}): Promise<any> {
  const token = await getAccessToken();
  const res = await fetch(`${apiBase()}/api${path}`, {
    ...init,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });
  if (!res.ok) throw new Error(`Zoho API ${path} failed: ${res.status} ${await res.text()}`);
  return res.json();
}

/** Send an email through the Zoho mailbox (used for lead replies). */
export async function sendMail(opts: { to: string; subject: string; htmlBody: string }) {
  return zohoFetch(`/accounts/${env("ZOHO_ACCOUNT_ID")}/messages`, {
    method: "POST",
    body: JSON.stringify({
      fromAddress: zohoFromAddress(),
      toAddress: opts.to,
      subject: opts.subject,
      content: opts.htmlBody,
      mailFormat: "html",
    }),
  });
}

export type ZohoMessageSummary = {
  messageId: string;
  folderId: string;
  fromAddress: string;
  toAddress: string;
  subject: string;
  summary: string;
  receivedTime: string; // epoch ms as string
};

/** Newest inbox messages (summaries only). */
export async function listInboxMessages(limit = 50): Promise<ZohoMessageSummary[]> {
  const data = await zohoFetch(
    `/accounts/${env("ZOHO_ACCOUNT_ID")}/messages/view?limit=${limit}&sortorder=false`
  );
  return (data?.data ?? []) as ZohoMessageSummary[];
}

/** Full HTML body of one message. */
export async function getMessageContent(folderId: string, messageId: string): Promise<string> {
  const data = await zohoFetch(
    `/accounts/${env("ZOHO_ACCOUNT_ID")}/folders/${folderId}/messages/${messageId}/content`
  );
  return data?.data?.content ?? "";
}
