import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client for code that runs OUTSIDE Astro.
 *
 * `src/lib/supabase.ts` reads `import.meta.env.PUBLIC_SUPABASE_URL` at module
 * scope. That is correct inside Astro, where Vite provides it — but a Netlify
 * scheduled function is bundled on its own, `import.meta.env` is undefined
 * there, and reading a property off it throws while the module is still being
 * loaded. Not when the sync runs: when the file is imported.
 *
 * That is exactly what happened. The scheduled function began importing
 * projectMailSync, which imports supabase.ts, and the function died on load —
 * taking the fund inbox sync down with it, because a module that never
 * finishes loading runs none of its exports.
 *
 * So this file reads the environment the way zoho-sync.ts already does, and
 * reads it LAZILY, inside the function. A missing variable then produces a
 * clear error from the job that needed it, rather than killing every job in
 * the same bundle.
 */
function env(key: string): string {
  const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;
  return metaEnv?.[key] ?? (typeof process !== "undefined" ? process.env?.[key] : undefined) ?? "";
}

export function serviceClient() {
  const url = env("PUBLIC_SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url) throw new Error("PUBLIC_SUPABASE_URL is not set");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
