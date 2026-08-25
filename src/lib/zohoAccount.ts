/**
 * Zoho Mail for a SPECIFIC connected mailbox.
 *
 * The older `zoho.ts` talks to one mailbox configured through environment
 * variables — the fund inbox. This module takes a mail_accounts row instead, so
 * each project can have its own mailbox without another round of environment
 * variables per project.
 *
 * Access tokens are cached in memory per account; refresh tokens are read from
 * the database by server-side code and never leave it.
 */

function env(key: string): string {
  const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;
  return metaEnv?.[key] ?? (typeof process !== "undefined" ? process.env[key] : undefined) ?? "";
}

export const oauthClientId = () => env("ZOHO_OAUTH_CLIENT_ID");
export const oauthClientSecret = () => env("ZOHO_OAUTH_CLIENT_SECRET");
export const isOAuthConfigured = () => Boolean(oauthClientId() && oauthClientSecret());

/** EU data centre: this account's mail lives on mail.zoho.eu. */
export const DEFAULT_API_BASE = "https://mail.zoho.eu";
export const accountsBaseFor = (apiBase: string) => apiBase.replace("//mail.", "//accounts.");

export const ZOHO_SCOPES = [
  "ZohoMail.accounts.READ",
  "ZohoMail.messages.READ",
  "ZohoMail.messages.CREATE",
  "ZohoMail.folders.READ",
].join(",");

export function authorizeUrl(redirectUri: string, state: string, apiBase = DEFAULT_API_BASE): string {
  const params = new URLSearchParams({
    client_id: oauthClientId(),
    response_type: "code",
    redirect_uri: redirectUri,
    scope: ZOHO_SCOPES,
    // offline + consent are what actually produce a refresh token. Without them
    // Zoho returns only a short-lived access token and the connection dies in an hour.
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `${accountsBaseFor(apiBase)}/oauth/v2/auth?${params}`;
}

export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
  apiBase = DEFAULT_API_BASE,
): Promise<{ refreshToken: string; accessToken: string }> {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: oauthClientId(),
    client_secret: oauthClientSecret(),
    redirect_uri: redirectUri,
    code,
  });
  const res = await fetch(`${accountsBaseFor(apiBase)}/oauth/v2/token?${params}`, { method: "POST" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) {
    throw new Error(`Zoho rejected the authorisation code: ${data.error ?? res.status}`);
  }
  if (!data.refresh_token) {
    // Usually means the app was authorised before and Zoho withheld a new refresh
    // token. prompt=consent should prevent it; if it happens, revoke access in
    // Zoho and connect again.
    throw new Error("Zoho returned no refresh token — revoke the app's access in Zoho and reconnect.");
  }
  return { refreshToken: data.refresh_token, accessToken: data.access_token };
}

/**
 * Access-token cache.
 *
 * Keyed on the REFRESH TOKEN, not on the mail_accounts row id. That matters: the
 * connect flow has no row yet, so it used to pass a placeholder id — and two
 * different mailboxes connected within the same hour shared a cache entry, so the
 * second one was identified as the first. The refresh token IS the identity, so
 * it is the only safe key.
 */
const tokenCache = new Map<string, { value: string; expiresAt: number }>();

export async function accessTokenFor(account: {
  id?: string;
  refresh_token: string;
  api_base: string;
}): Promise<string> {
  const cacheKey = account.refresh_token;
  const cached = tokenCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt - 60_000) return cached.value;

  const params = new URLSearchParams({
    refresh_token: account.refresh_token,
    client_id: oauthClientId(),
    client_secret: oauthClientSecret(),
    grant_type: "refresh_token",
  });
  const res = await fetch(`${accountsBaseFor(account.api_base)}/oauth/v2/token?${params}`, { method: "POST" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.access_token) {
    throw new Error(`Zoho token refresh failed: ${data.error ?? res.status}`);
  }
  tokenCache.set(cacheKey, {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  });
  return data.access_token;
}

async function zohoFetch(
  account: { id?: string; refresh_token: string; api_base: string },
  path: string,
  init: RequestInit = {},
): Promise<any> {
  const token = await accessTokenFor(account);
  const res = await fetch(`${account.api_base}/api${path}`, {
    ...init,
    headers: {
      ...(init.headers ?? {}),
      Authorization: `Zoho-oauthtoken ${token}`,
      "Content-Type": "application/json",
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Zoho ${path} failed: ${res.status} ${text.slice(0, 200)}`);
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

/** The mail account the connecting user signed in as. */
export async function fetchAccountInfo(account: { id?: string; refresh_token: string; api_base: string }) {
  const data = await zohoFetch(account, "/accounts");
  const first = data?.data?.[0];
  return {
    accountId: first?.accountId ? String(first.accountId) : "",
    primaryEmail: String(first?.primaryEmailAddress ?? first?.mailboxAddress ?? "").toLowerCase(),
  };
}

export type ZohoMessage = {
  messageId: string;
  folderId: string;
  fromAddress: string;
  toAddress: string;
  subject: string;
  summary: string;
  receivedTime: string;
};

export async function listRecentMessages(
  account: { id?: string; refresh_token: string; api_base: string; zoho_account_id: string },
  limit = 50,
): Promise<ZohoMessage[]> {
  const data = await zohoFetch(
    account,
    `/accounts/${account.zoho_account_id}/messages/view?limit=${limit}&sortorder=false`,
  );
  return (data?.data ?? []) as ZohoMessage[];
}

export async function fetchMessageContent(
  account: { id?: string; refresh_token: string; api_base: string; zoho_account_id: string },
  folderId: string,
  messageId: string,
): Promise<{ html: string; replyTo: string | null }> {
  const data = await zohoFetch(
    account,
    `/accounts/${account.zoho_account_id}/folders/${folderId}/messages/${messageId}/content`,
  );
  const d = data?.data ?? {};
  // Zoho names this inconsistently across endpoints, so try the likely keys
  // rather than assuming one.
  const replyTo =
    d.replyTo ?? d.replyToAddress ?? d.reply_to ?? d.headers?.["Reply-To"] ?? d.headers?.["reply-to"] ?? null;
  return {
    html: String(d.content ?? d.body ?? ""),
    replyTo: replyTo ? String(replyTo).toLowerCase() : null,
  };
}

export async function sendMessage(
  account: { id?: string; refresh_token: string; api_base: string; zoho_account_id: string; email: string },
  message: { to: string; subject: string; html: string; fromName?: string },
): Promise<void> {
  await zohoFetch(account, `/accounts/${account.zoho_account_id}/messages`, {
    method: "POST",
    body: JSON.stringify({
      fromAddress: message.fromName ? `${message.fromName} <${account.email}>` : account.email,
      toAddress: message.to,
      subject: message.subject,
      content: message.html,
      mailFormat: "html",
    }),
  });
}
