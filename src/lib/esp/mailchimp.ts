import { createHash } from "node:crypto";
import type { EspProvider, NewSubscriber } from "./types";

/**
 * Mailchimp implementation. API key format: "xxxx-us21" — the suffix
 * after the dash is the datacenter used in the API hostname.
 */
export function mailchimpProvider(apiKey: string, listId: string): EspProvider {
  const dc = apiKey.split("-").pop();
  const API = `https://${dc}.api.mailchimp.com/3.0`;
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const memberId = (email: string) =>
    createHash("md5").update(email.toLowerCase()).digest("hex");

  return {
    name: "Mailchimp",

    async addSubscriber({ email, name, locale }: NewSubscriber) {
      const res = await fetch(`${API}/lists/${listId}/members/${memberId(email)}`, {
        method: "PUT", // upsert
        headers,
        body: JSON.stringify({
          email_address: email,
          status_if_new: "subscribed",
          status: "subscribed",
          language: locale ?? "en",
          merge_fields: name ? { FNAME: name } : {},
        }),
      });
      if (!res.ok) throw new Error(`Mailchimp addSubscriber failed: ${res.status} ${await res.text()}`);
      const data = await res.json();
      return { contactId: String(data.id) };
    },

    async removeSubscriber(email: string) {
      const res = await fetch(`${API}/lists/${listId}/members/${memberId(email)}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: "unsubscribed" }),
      });
      if (!res.ok && res.status !== 404) {
        throw new Error(`Mailchimp removeSubscriber failed: ${res.status}`);
      }
    },
  };
}
