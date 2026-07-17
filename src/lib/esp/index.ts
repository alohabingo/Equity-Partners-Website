import type { EspProvider } from "./types";
import { brevoProvider } from "./brevo";
import { mailchimpProvider } from "./mailchimp";

/**
 * Provider factory — reads ESP_* env vars.
 * Returns null when no provider is configured; callers must treat that
 * as "database only" mode (never an error). Swap ESPs by changing:
 *   ESP_PROVIDER=brevo | mailchimp | none
 *   ESP_API_KEY=...
 *   ESP_LIST_ID=...
 */
export function getEsp(): EspProvider | null {
  const provider = (import.meta.env.ESP_PROVIDER ?? "none").toLowerCase();
  const apiKey = import.meta.env.ESP_API_KEY;
  const listId = import.meta.env.ESP_LIST_ID;

  if (provider === "none" || !provider) return null;
  if (!apiKey || !listId) {
    console.warn(`ESP_PROVIDER=${provider} but ESP_API_KEY/ESP_LIST_ID missing — running database-only.`);
    return null;
  }

  switch (provider) {
    case "brevo":
      return brevoProvider(apiKey, listId);
    case "mailchimp":
      return mailchimpProvider(apiKey, listId);
    default:
      console.warn(`Unknown ESP_PROVIDER "${provider}" — running database-only.`);
      return null;
  }
}
