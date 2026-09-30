import type { ImageMetadata } from 'astro';
import anliker from '../assets/partner/anliker.png';
import walo from '../assets/partner/walo.png';
import loetscher from '../assets/partner/loetscher-tiefbau.png';

/**
 * Partner- und Lieferantenlogos für das Logo-Band auf der Startseite.
 * Nur mit Einverständnis der Partner verwenden!
 *
 * Neues Logo: Original (PNG/SVG, transparenter Hintergrund) nach logos/ legen, in
 * scripts/prepare-partner-logos.mjs eintragen und `node scripts/prepare-partner-logos.mjs` ausführen.
 * Das Skript erzeugt eine einfarbig weisse Negativ-Version in src/assets/partner/ – hier importieren.
 */
export interface Partner {
  name: string;
  logo?: ImageMetadata;
  url?: string;
}

export const partners: Partner[] = [
  { name: 'Anliker', logo: anliker },
  { name: 'Walo', logo: walo },
  { name: 'Lötscher Tiefbau', logo: loetscher },
];

/** Ab dieser Anzahl läuft das Band als Endlos-Laufband, darunter als ruhige Reihe */
export const MARQUEE_MIN = 1;
