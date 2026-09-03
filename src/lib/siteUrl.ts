/**
 * Where a link we put in an email should point.
 *
 * An invitation is read on someone else's machine, hours or days later. So the
 * address inside it has to be the public site — never whatever host happened to
 * serve the request that sent it. Building the link from the request origin is
 * the obvious thing to do and it is wrong exactly once: when the invitation is
 * sent from a dev server, every recipient gets a link to their own localhost,
 * which refuses the connection. That happened, and this is the guard against it.
 *
 * The order is: an explicit setting wins; otherwise a real public origin is
 * trusted (so Netlify deploy previews keep working on their own domain); a
 * local or private address is never trusted and falls back to production.
 */

/** The live site. The one address that is always safe to put in an email. */
export const PRODUCTION_ORIGIN = "https://equitypartners.fund";

/** Hosts that mean "this machine" and can never appear in someone else's inbox. */
export function isLocalOrigin(origin: string): boolean {
  let host: string;
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    return true; // unparseable is not something we mail out
  }
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host === "0.0.0.0" || host === "::1" || host === "[::1]") return true;
  if (host === "127.0.0.1" || host.startsWith("127.")) return true;
  // RFC1918 — a LAN address is as unreachable to a recipient as localhost is.
  if (host.startsWith("10.") || host.startsWith("192.168.")) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (host.endsWith(".local")) return true;
  return false;
}

/**
 * The origin to use when building a link for an email.
 *
 * @param requestOrigin  the origin the request came in on, e.g. `url.origin`
 * @param configured     an explicit override, e.g. `import.meta.env.PUBLIC_SITE_URL`
 */
export function emailLinkOrigin(
  requestOrigin?: string | null,
  configured?: string | null,
): string {
  const explicit = (configured ?? "").trim().replace(/\/+$/, "");
  if (explicit && !isLocalOrigin(explicit)) return explicit;

  const from = (requestOrigin ?? "").trim().replace(/\/+$/, "");
  if (from && !isLocalOrigin(from)) return from;

  return PRODUCTION_ORIGIN;
}

/** The full address an invited colleague should land on. */
export function setPasswordUrl(
  requestOrigin?: string | null,
  configured?: string | null,
): string {
  return `${emailLinkOrigin(requestOrigin, configured)}/admin/set-password`;
}
