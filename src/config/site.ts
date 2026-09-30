/**
 * Zentrale Firmen- und Kontaktdaten.
 * ALLE Seiten, Formulare, Schema.org-Daten und der Footer lesen von hier.
 * Texte in [PLATZHALTER: …] werden auf der Website gelb markiert und sind in CONTENT-TODO.md aufgeführt.
 */

export const site = {
  name: 'Bau Concept Schweiz GmbH',
  shortName: 'Bau Concept Schweiz',
  url: 'https://bauconcept-schweiz.ch',
  locale: 'de-CH',

  address: {
    street: 'Ibelweg 18A',
    zip: '6300',
    city: 'Zug',
    canton: 'ZG',
    country: 'CH',
  },

  phone: {
    display: '078 605 59 82',
    href: 'tel:+41786055982',
    e164: '+41786055982',
  },

  // Vom Kunden zu bestätigen – auf der Visitenkarte steht bauconcept-schweiz@gmx.ch
  email: 'info@bauconcept-schweiz.ch',

  // Handelsregister (Quelle: SHAB/Moneyhouse, Neueintragung 03.07.2026) – für Impressum und Datenschutz
  legal: {
    name: 'BauConcept-Schweiz gmbh', // exakte Schreibweise gemäss Handelsregister
    form: 'Gesellschaft mit beschränkter Haftung',
    seat: 'Baar', // Rechtssitz gemäss HR; Geschäftsadresse siehe address
    uid: 'CHE-380.193.829',
    hrNumber: 'CH-170.4.024.940-1',
    registry: 'Handelsregisteramt des Kantons Zug',
    registeredOn: '03.07.2026',
    managingDirector: 'Sermet Osmanoski',
  },

  // Karte «Ihr Ansprechpartner» (Startseite, Leistungsseiten, Unternehmen)
  contactPerson: {
    // Porträt später als Bild in src/assets/team/ ablegen und in ContactPerson.astro einbinden
    photoLabel: 'Foto: Porträt Ansprechperson',
  },

  // Antwortzeit, die nach dem Absenden eines Formulars genannt wird
  responseTime: 'innert 2 Tagen',

  // Einsatzgebiet: Sitz Zug + bediente Gemeinden (vom Kunden zu bestätigen)
  serviceArea: {
    region: 'Kanton Zug',
    municipalities: [
      'Zug',
      'Baar',
      'Cham',
      'Steinhausen',
      'Hünenberg',
      'Risch-Rotkreuz',
      'Walchwil',
      'Menzingen',
      'Neuheim',
      'Oberägeri',
      'Unterägeri',
    ],
    more: '[PLATZHALTER: weitere Regionen, z. B. angrenzende Gemeinden in LU/SZ/ZH]',
  },

  // Kennzahlen (Startseite + Unternehmen). Werte hier ändern – Zähler und Schema.org passen sich an.
  stats: {
    foundingYear: 2020,
    employees: 8,
    projects: 20,
  },

  claims: {
    footer: 'Tiefbau. Präzise. Zuverlässig.',
    values: 'Regional. Verlässlich. Persönlich.',
    slogan: 'Wir legen heute die Grundlage für morgen.',
    swiss: 'Aus der Schweiz. Für die Schweiz.',
  },

  // Cookieloses Analytics optional: 'plausible' | 'umami' | null (nur nach Absprache aktivieren)
  analytics: {
    provider: null as null | 'plausible' | 'umami',
    domain: 'bauconcept-schweiz.ch',
    umamiWebsiteId: '',
    scriptSrc: '', // z. B. https://plausible.io/js/script.js (oder selbst gehostet)
  },
} as const;

export const nav = [
  { label: 'Leistungen', href: '/leistungen/' },
  { label: 'Projekte', href: '/projekte/' },
  { label: 'Unternehmen', href: '/unternehmen/' },
  { label: 'Jobs', href: '/jobs/' },
  { label: 'Kontakt', href: '/kontakt/' },
] as const;

/** Upload-Grenzen. Vercel Functions akzeptieren max. 4,5 MB pro Anfrage – daher 4 MB gesamt. */
export const upload = {
  maxTotalBytes: 4 * 1024 * 1024,
  maxLabel: '4 MB',
  accept: '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png',
  mimeTypes: ['application/pdf', 'image/jpeg', 'image/png'],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.zip} ${site.address.city}`;
