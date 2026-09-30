/**
 * Fotos der festen Seiten (Symbolbilder, KI-generiert – zeigen keine realen Projekte).
 * Echtes Foto einsetzen: Datei in src/assets/fotos/ mit gleichem Namen ersetzen – fertig.
 * Projektfotos gehören NICHT hierher, sondern in die jeweilige .md-Datei unter src/content/projekte/.
 */
import type { ImageMetadata } from 'astro';
import type { ServiceSlug } from './services';
import hero from '../assets/fotos/hero-startseite.jpg';
import aushub from '../assets/fotos/leistung-aushub-erdarbeiten.jpg';
import strassenbau from '../assets/fotos/leistung-strassenbau-belaege.jpg';
import leitungsbau from '../assets/fotos/leistung-leitungsbau-werkleitungen.jpg';
import kanalisation from '../assets/fotos/leistung-kanalisation-entwaesserung.jpg';
import unternehmen from '../assets/fotos/unternehmen-baustelle.jpg';
import kontakt from '../assets/fotos/kontakt-baustelle.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
}

export const photos = {
  hero: { src: hero, alt: 'Bagger hebt einen Leitungsgraben in einer Wohnstrasse aus, ein Bauarbeiter gibt Handzeichen' },
  unternehmen: { src: unternehmen, alt: 'Bauleute besprechen einen Bauplan auf der Motorhaube eines Firmenwagens, im Hintergrund ein Bagger' },
  kontakt: { src: kontakt, alt: 'Schutzhelm, Bauplan und Tablet auf Betonsteinen, im Hintergrund ein Bagger auf der Baustelle' },
} satisfies Record<string, Photo>;

export const servicePhotos: Record<ServiceSlug, Photo> = {
  'aushub-erdarbeiten': { src: aushub, alt: 'Ausgehobene Baugrube für ein Einfamilienhaus, Bagger belädt einen Lastwagen mit Aushub' },
  'strassenbau-belaege': { src: strassenbau, alt: 'Belagseinbau einer Quartierstrasse mit Fertiger und Walze, Arbeiter ziehen den Asphalt am Randstein ab' },
  'leitungsbau-werkleitungen': { src: leitungsbau, alt: 'Gesicherter Leitungsgraben mit Schutzrohren und blauer Wasserleitung, ein Arbeiter verbindet die Leitung' },
  'kanalisation-entwaesserung': { src: kanalisation, alt: 'Betonrohr für die Kanalisation wird in einen gesicherten Graben abgesenkt, daneben ein Schachtelement' },
};
