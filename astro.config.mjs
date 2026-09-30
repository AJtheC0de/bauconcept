// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import rehypePlaceholder from './src/lib/rehype-placeholder.mjs';

export default defineConfig({
  site: 'https://bauconcept-schweiz.ch',
  trailingSlash: 'always',
  // Unterseiten beim Hovern/Antippen vorladen → schnellerer, weicherer Seitenwechsel
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // Alle Seiten statisch; nur /api/* läuft als Vercel Function (prerender = false)
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      // Danke-Seite und Platzhalter-Projekte (noindex) nicht in die Sitemap
      filter: (page) => !page.includes('/danke/') && !page.includes('/projekte/platzhalter-'),
    }),
  ],
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_FROM: envField.string({ context: 'server', access: 'secret', optional: true }),
      MAIL_TO: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  markdown: {
    // [PLATZHALTER …] in Projekt-/Job-Texten gelb markieren
    processor: unified({ rehypePlugins: [rehypePlaceholder] }),
  },
  image: {
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
