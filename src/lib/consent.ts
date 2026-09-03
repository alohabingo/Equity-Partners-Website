/**
 * Where the visitor's cookie answer lives.
 *
 * One constant, imported by everything that reads or writes it — the banner,
 * the Meta pixel, Google Analytics, the click-id capture. Before this existed
 * the string "cookie_consent" was typed out in three files, which is fine right
 * up until one of them is changed and the others silently disagree about
 * whether the visitor said yes.
 *
 * The `_v2` suffix is doing real work. The first version of the banner asked
 * only about advertising; the site now also runs analytics. Anyone carrying an
 * answer to the old question has not answered the new one, so the key changes
 * and they are asked once more. Reusing the old key would have quietly
 * broadened a permission nobody granted.
 *
 * If the question widens again, bump this again. It costs one banner
 * impression per returning visitor and it is the only honest way to do it.
 */
export const CONSENT_KEY = "cookie_consent_v2";

export type ConsentAnswer = "accepted" | "rejected";

export const isAnswer = (v: unknown): v is ConsentAnswer =>
  v === "accepted" || v === "rejected";
