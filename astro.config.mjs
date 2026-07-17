import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SUPABASE_URL = env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

// Blog articles and portfolio pages are server-rendered (live CMS content),
// so the sitemap integration can't discover them by crawling the build.
// Fetch the published slugs at build time and add them as custom pages.
let cmsUrls = [];
const base = (locale) => `https://equitypartners.fund${locale === 'en' ? '' : '/' + locale}`;
try {
  if (SUPABASE_URL && SUPABASE_KEY) {
    const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` };
    const [postsRes, itemsRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/posts?select=slug,locale&status=eq.published`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/portfolio_items?select=slug,locale,kind&status=eq.published`, { headers }),
    ]);
    if (postsRes.ok) {
      const rows = await postsRes.json();
      cmsUrls.push(...rows.map((r) => `${base(r.locale)}/blog/${r.slug}/`));
    }
    if (itemsRes.ok) {
      const rows = await itemsRes.json();
      cmsUrls.push(
        ...rows.map((r) => `${base(r.locale)}/${r.kind === 'project' ? 'projects' : 'opportunities'}/${r.slug}/`)
      );
    }
  }
} catch {
  /* sitemap simply omits CMS pages when the fetch fails */
}

export default defineConfig({
  site: 'https://equitypartners.fund',
  // Marketing pages stay static (prerendered). Pages that opt out with
  // `export const prerender = false` (admin portal, blog, API routes) run
  // as Netlify server functions.
  adapter: netlify(),
  integrations: [
    sitemap({
      filter: (page) => !/\/test\/?$/.test(page) && !page.includes('/admin'),
      customPages: cmsUrls,
    }),
  ],
  vite: {
    cacheDir: '/tmp/vite-ep-cache'
  }
});
