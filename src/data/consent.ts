import { site } from '../config/site';

/**
 * Einwilligungs-Kategorien und Dienste.
 * Banner (CookieBanner.astro) und Datenschutzerklärung lesen beide von hier.
 * Wird eine Kategorie/ein Dienst hinzugefügt: CONSENT_VERSION erhöhen → alle Besucher werden neu gefragt.
 */
export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'bc-consent';
export const CONSENT_MAX_AGE_DAYS = 365;

export type ConsentCategory = 'necessary' | 'media' | 'statistics';

export interface ConsentService {
  name: string;
  provider: string;
  purpose: string;
  storage: string;
  transfer: string;
  privacyUrl?: string;
}

export interface ConsentGroup {
  id: ConsentCategory;
  title: string;
  description: string;
  required?: boolean;
  services: ConsentService[];
}

const analyticsName = site.analytics.provider === 'plausible' ? 'Plausible Analytics' : 'Umami Analytics';

export const consentGroups: ConsentGroup[] = [
  {
    id: 'necessary',
    title: 'Notwendig',
    description: 'Speichert Ihre Auswahl in diesem Fenster, damit wir Sie nicht bei jedem Besuch erneut fragen. Kein Cookie, keine Weitergabe.',
    required: true,
    services: [
      {
        name: 'Einwilligungs-Speicher',
        provider: `${site.legal.name} (diese Website)`,
        purpose: 'Merkt sich, welche Kategorien Sie erlaubt haben.',
        storage: `Local Storage «${CONSENT_STORAGE_KEY}» in Ihrem Browser, ${CONSENT_MAX_AGE_DAYS / 30 | 0} Monate`,
        transfer: 'Keine – die Angabe verlässt Ihr Gerät nicht.',
      },
    ],
  },
  {
    id: 'media',
    title: 'Externe Medien',
    description: 'Inhalte von Drittanbietern, konkret die interaktive Karte auf der Kontaktseite. Beim Laden werden Daten (u. a. Ihre IP-Adresse) an den Anbieter übertragen.',
    services: [
      {
        name: 'Google Maps',
        provider: 'Google Ireland Limited, Irland / Google LLC, USA',
        purpose: 'Anzeige unseres Standorts und Routenplanung auf der Kontaktseite.',
        storage: 'Cookies und ähnliche Technologien von Google; Speicherdauer gemäss Google, teils mehrere Monate.',
        transfer: 'Übermittlung in die USA möglich (Swiss-U.S. Data Privacy Framework).',
        privacyUrl: 'https://policies.google.com/privacy',
      },
    ],
  },
  // Nur sichtbar, wenn in site.ts ein Analytics-Tool aktiviert ist
  ...(site.analytics.provider
    ? [
        {
          id: 'statistics' as const,
          title: 'Statistik',
          description: 'Anonyme Reichweitenmessung, damit wir sehen, welche Seiten hilfreich sind. Ohne Cookies und ohne Profilbildung.',
          services: [
            {
              name: analyticsName,
              provider: analyticsName,
              purpose: 'Zählt Seitenaufrufe anonymisiert.',
              storage: 'Keine Cookies, keine dauerhafte Kennung.',
              transfer: '[PLATZHALTER: Serverstandort des Anbieters prüfen]',
            },
          ],
        },
      ]
    : []),
];

export const optionalCategories = consentGroups.filter((g) => !g.required).map((g) => g.id);
