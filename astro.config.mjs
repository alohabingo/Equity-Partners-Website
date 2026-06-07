import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://equitypartners.fund',
  integrations: [
    sitemap({
      filter: (page) => !/\/test\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    cacheDir: '/tmp/vite-ep-cache'
  }
});