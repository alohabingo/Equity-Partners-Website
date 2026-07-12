import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://equitypartners.fund',
  integrations: [
    sitemap({
      filter: (page) => !/\/test\/?$/.test(page),
    }),
  ],
  vite: {
    cacheDir: '/tmp/vite-ep-cache'
  }
});