import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://equitypartners.fund',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    cacheDir: '/tmp/vite-ep-cache'
  }
});