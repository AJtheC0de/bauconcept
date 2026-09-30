import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { serviceSlugs } from './data/services';

const projekte = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projekte' }),
  schema: ({ image }) => {
    const media = z.object({
      /** Echtes Foto (Pfad relativ zur .md-Datei, z. B. ../../assets/projekte/xy.jpg). Fehlt es, wird ein Platzhalter angezeigt. */
      image: image().optional(),
      alt: z.string().optional(),
      /** Beschriftung des Platzhalters, z. B. «Foto: Belagseinbau» */
      label: z.string(),
    });
    return z.object({
      title: z.string(),
      /** Kurzbeschreibung für Karten und Meta-Description (max. 155 Zeichen) */
      description: z.string().max(155),
      ort: z.string(),
      jahr: z.string(),
      auftraggeber: z.string().optional(),
      leistungen: z.array(z.enum(serviceSlugs)).min(1),
      // Kartenfelder
      aufgabe: z.string(),
      eigeneLeistung: z.string(),
      ergebnis: z.string(),
      cover: media,
      galerie: z.array(media).default([]),
      /** Auf der Startseite zeigen */
      featured: z.boolean().default(false),
      /** Sortierung (höher = weiter oben) */
      order: z.number().default(0),
      /** true = Platzhalter: noindex, nicht in der Sitemap */
      platzhalter: z.boolean().default(false),
    });
  },
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    pensum: z.string(),
    eintritt: z.string(),
    aufgaben: z.array(z.string()),
    profil: z.array(z.string()),
    /** false = Stelle ausgeblendet */
    aktiv: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

export const collections = { projekte, jobs };
