/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: import("./lib/supabase").AdminUser;
    /** Starred projects for the sidebar, resolved in middleware. */
    /** name is already resolved: nav_name if set, otherwise the project name. */
    sidebarProjects?: { slug: string; name: string }[];
  }
}
