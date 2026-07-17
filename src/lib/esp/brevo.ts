import type { EspProvider, NewSubscriber } from "./types";

const API = "https://api.brevo.com/v3";

export function brevoProvider(apiKey: string, listId: string): EspProvider {
  const headers = {
    "api-key": apiKey,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return {
    name: "Brevo",

    async addSubscriber({ email, name, locale }: NewSubscriber) {
      const res = await fetch(`${API}/contacts`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          email,
          attributes: {
            FIRSTNAME: name ?? "",
            LANGUAGE: (locale ?? "en").toUpperCase(),
          },
          listIds: [Number(listId)],
          updateEnabled: true, // makes this idempotent for existing contacts
        }),
      });
      // 201 = created (body has id), 204 = updated existing (no body)
      if (res.status === 204) return { contactId: email };
      if (!res.ok) throw new Error(`Brevo addSubscriber failed: ${res.status} ${await res.text()}`);
      const data = await res.json();
      return { contactId: String(data.id) };
    },

    async removeSubscriber(email: string) {
      const res = await fetch(`${API}/contacts/${encodeURIComponent(email)}`, {
        method: "DELETE",
        headers,
      });
      // 404 = already gone → fine
      if (!res.ok && res.status !== 404) {
        throw new Error(`Brevo removeSubscriber failed: ${res.status}`);
      }
    },
  };
}
