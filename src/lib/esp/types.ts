/**
 * Email Service Provider abstraction.
 * The rest of the codebase only ever talks to this interface —
 * swapping providers means changing ESP_* env vars, nothing else.
 */
export type NewSubscriber = {
  email: string;
  name?: string;
  locale?: string;
};

export interface EspProvider {
  /** Human-readable name for logs/admin UI. */
  readonly name: string;
  /** Add (or re-activate) a contact. Returns the provider's contact ID. */
  addSubscriber(sub: NewSubscriber): Promise<{ contactId: string }>;
  /** Remove/unsubscribe a contact. Must not throw if already absent. */
  removeSubscriber(email: string): Promise<void>;
}
