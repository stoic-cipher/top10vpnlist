import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [react(), tailwind(), mdx(), sitemap()],
  output: 'static',
  site: 'https://top10vpnlist.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
