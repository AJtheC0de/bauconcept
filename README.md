# bauconcept-schweiz.ch

Website der Bau Concept Schweiz GmbH (Tiefbau & Strassenbau, Zug).
Astro 7 · Tailwind CSS 4 · statisch generiert, Formulare als Vercel Function mit Resend.

## Setup

Voraussetzung: **Node.js ≥ 22.12** (siehe `.node-version`; mit fnm/nvm: `fnm use`).

```bash
npm install
cp .env.example .env   # Werte eintragen (nur für lokale Formular-Tests nötig)
npm run dev            # http://localhost:4321
npm run build          # Produktions-Build nach dist/
npm run check          # TypeScript-/Astro-Prüfung
npm run check:seo      # nach dem Build: Title/Description-Länge, genau eine H1, Überschriften-Hierarchie
```

## Projektstruktur

```
src/
  config/site.ts          ← ALLE Firmen- und Kontaktdaten (Adresse, Telefon, E-Mail, Ansprechperson, Gemeinden, Claims)
  data/services.ts        ← die 4 Leistungen: Texte, Aufgabenliste, Glossar, Ablauf, SEO-Title/Description
  content/projekte/*.md   ← Referenzprojekte (eine Datei pro Projekt)
  content/jobs/*.md       ← Stellenausschreibungen (eine Datei pro Stelle)
  content.config.ts       ← Felder/Schema für Projekte und Jobs
  assets/brand/           ← Logo-Varianten (aus Logo.png erzeugt)
  assets/projekte/        ← Projektfotos
  components/             ← Header, Footer, Formulare, Karten, Media (Bild/Platzhalter) …
  pages/                  ← eine Datei pro Seite; api/anfrage.ts + api/bewerbung.ts = Formularversand
  styles/global.css       ← Design-Tokens (Farben, Schriften) und Basis-Styles
public/                   ← Favicons, OG-Bild, robots.txt
CONTENT-TODO.md           ← Liste aller fehlenden Inhalte für den Kunden
```

Texte in `[PLATZHALTER: …]` werden auf der Website automatisch **gelb markiert**. Vor dem Livegang: `grep -rn PLATZHALTER src` muss leer sein.

## Deployment (GitHub → Vercel)

1. Repository auf GitHub pushen.
2. In Vercel: *Add New → Project* → Repository importieren. Framework wird als **Astro** erkannt; Build-Einstellungen nicht ändern.
3. *Settings → Environment Variables* (Production + Preview):
   | Variable | Wert |
   |---|---|
   | `RESEND_API_KEY` | API-Key aus resend.com |
   | `MAIL_FROM` | z. B. `Website Bau Concept <website@bauconcept-schweiz.ch>` |
   | `MAIL_TO` | Empfänger der Anfragen (leer = E-Mail aus `site.ts`) |
4. *Settings → Domains*: `bauconcept-schweiz.ch` und `www.bauconcept-schweiz.ch` hinzufügen; **www → Apex weiterleiten** (die kanonische URL ist `https://bauconcept-schweiz.ch`). DNS-Einträge beim Domain-Provider gemäss Vercel-Anleitung setzen.
5. **Resend:** Domain `bauconcept-schweiz.ch` in Resend hinzufügen und die DNS-Einträge (SPF/DKIM) setzen – sonst werden keine Mails versendet.
6. Nach dem ersten Deployment: Testanfrage über `/kontakt/` absenden und Eingang prüfen.

Jeder Push auf `main` löst automatisch ein neues Deployment aus; Pull Requests bekommen eine Preview-URL.

Die Formular-Function läuft in Frankfurt (`vercel.json` → `fra1`).

## Formulare

- `/api/anfrage/` (Projektanfrage) und `/api/bewerbung/` (Kurzbewerbung) – Code in `src/pages/api/`, Logik in `src/lib/mail.ts`.
- Spamschutz: Honeypot-Feld + Mindest-Ausfüllzeit (3 s). Kein reCAPTCHA.
- **Upload-Limit 4 MB gesamt** (PDF/JPG/PNG). Grund: Vercel Functions akzeptieren max. 4,5 MB pro Anfrage. Für grössere Dateien wird im Formular auf E-Mail verwiesen. Wenn 10 MB nötig sind: Upload direkt in Vercel Blob (Client-Upload) umbauen.
- Ohne JavaScript funktionieren die Formulare auch (Weiterleitung auf `/danke/` bzw. Fehlermeldung).

## Neues Referenzprojekt hinzufügen

1. Fotos nach `src/assets/projekte/` kopieren (JPG/PNG, Originalgrösse – Astro erzeugt AVIF/WebP in allen Grössen automatisch). Dateinamen ohne Leerzeichen, z. B. `dorfstrasse-baar-1.jpg`.
2. Neue Datei `src/content/projekte/dorfstrasse-baar.md` anlegen – der Dateiname wird zur URL (`/projekte/dorfstrasse-baar/`):

```markdown
---
title: 'Werkleitungsersatz Dorfstrasse'
description: 'Ersatz der Wasserleitung und Hausanschlüsse an der Dorfstrasse in Baar – vom Graben bis zum neuen Belag.'   # max. 155 Zeichen
ort: 'Baar'
jahr: '2026'
auftraggeber: 'Gemeinde Baar'          # optional, Zeile weglassen wenn nicht genannt
leistungen: ['leitungsbau-werkleitungen', 'aushub-erdarbeiten']
aufgabe: 'Ersatz der Wasserleitung inkl. 6 Hausanschlüsse'
eigeneLeistung: 'Grabarbeiten, Rohrbettung, Wiederherstellung Belag'
ergebnis: 'Übergabe nach 5 Wochen, Strasse etappenweise offen'
cover:
  image: '../../assets/projekte/dorfstrasse-baar-1.jpg'
  alt: 'Offener Leitungsgraben an der Dorfstrasse in Baar mit neuer Wasserleitung'
  label: 'Foto: Leitungsgraben'
galerie:
  - image: '../../assets/projekte/dorfstrasse-baar-2.jpg'
    alt: 'Hausanschluss wird verlegt'
    label: 'Foto: Hausanschluss'
featured: true      # Startseite zeigt 3 Projekte: zuerst featured, dann nach order
order: 10           # höher = weiter oben
---

## Ausgangslage
…

## Auftrag
…

## Herausforderung
…

## Lösung
…

## Ergebnis
…
```

Mögliche Werte für `leistungen`: `aushub-erdarbeiten`, `strassenbau-belaege`, `leitungsbau-werkleitungen`, `kanalisation-entwaesserung`. Das Projekt erscheint automatisch auf `/projekte/`, im Filter und bei den passenden Leistungsseiten unter «Passende Projekte».

3. Die Platzhalter-Projekte (`platzhalter-*.md`) löschen, sobald echte Projekte da sind. Solange sie existieren, sind sie `noindex` und nicht in der Sitemap.

## Neue Stelle hinzufügen

Datei `src/content/jobs/<name>.md` anlegen (Vorlage: `platzhalter-stelle.md`). Mit `aktiv: false` wird eine Stelle ausgeblendet, ohne sie zu löschen. Sind keine aktiven Stellen vorhanden, zeigt `/jobs/` einen Hinweis auf Initiativbewerbungen.

## Partner-Logos (Logo-Band auf der Startseite)

1. Original-Logo (PNG mit transparentem Hintergrund) nach `logos/` legen.
2. In `scripts/prepare-partner-logos.mjs` eintragen und `node scripts/prepare-partner-logos.mjs` ausführen – erzeugt eine einfarbig weisse Negativ-Version in `src/assets/partner/` (farbige Flächen → weiss, weisse Formen darin → ausgestanzt).
3. In `src/data/partners.ts` importieren und eintragen (`url` optional).

Das Band läuft endlos (reines CSS, pausiert bei Hover/Fokus, steht bei «Bewegung reduzieren» still). Logos werden optisch gleich gross dargestellt (gleiche Fläche statt gleiche Höhe). Band entfernen: `<LogoMarquee />` in `src/components/TrustBand.astro` löschen.

## Animationen

Sektionen mit `data-animate` bekommen per JS `is-armed` (Startzustand) und beim Sichtbarwerden `is-active` (Script in `BaseLayout.astro`). Die Übergänge stehen im `<style>` der jeweiligen Komponente (`ProcessSteps.astro`, `TrustBand.astro`). Ohne JavaScript oder bei «Bewegung reduzieren» wird direkt der Endzustand gezeigt.

## Fotos der festen Seiten (aktuell KI-Symbolbilder)

Liegen in `src/assets/fotos/`, zugeordnet in `src/data/photos.ts` (inkl. Alt-Texte). Echtes Foto einsetzen: Datei mit **gleichem Namen** ersetzen, Alt-Text in `photos.ts` anpassen, und den Bildnachweis im Impressum (`src/pages/impressum.astro`) aktualisieren, sobald keine KI-Bilder mehr verwendet werden. Projektfotos gehören nicht hierher, sondern in die Projekt-.md-Dateien.

## Fotos für feste Seiten einsetzen

Bilder in `src/assets/` ablegen und in der jeweiligen Seite dem `Media`-Baustein übergeben:

```astro
---
import heroFoto from '../assets/fotos/bagger-baustelle.jpg';
---
<Media image={heroFoto} alt="Bagger hebt einen Graben aus" label="…" eager />
```

`eager` nur beim Hero-Bild (oberstes Bild der Seite) setzen, alle anderen Bilder laden lazy. Porträt der Ansprechperson: `src/components/ContactPerson.astro`.

## Design-Tokens

In `src/styles/global.css` (`@theme`). Bronze `#A6824E` ist aus dem Logo gemessen.

| Token | Wert | Einsatz |
|---|---|---|
| `ink` | `#1A1A1A` | Dunkle Sektionen, Text |
| `bronze` | `#A6824E` | Buttons, Linien, Icons auf Dunkel (4.9 : 1 auf `ink`) |
| `bronze-700` | `#7C5F35` | Bronze-**Text** auf Hell (5.9 : 1 auf Weiss) |
| `bronze-300` | `#C39A5E` | kleiner Bronze-Text auf Dunkel (6.7 : 1) |
| `stone` | `#F4F2EE` | helle Wechsel-Sektionen |

Bronze `#A6824E` auf Weiss hat nur 3.5 : 1 → **nie für Fliesstext auf Hell verwenden.**

Schriften (selbst gehostet über `@fontsource`, kein Google-CDN): Barlow Condensed (Headlines), Barlow (Text), Nothing You Could Do (nur Slogan auf `/unternehmen/`).

## Cookie-Banner / Einwilligung

- Kategorien und Dienste: `src/data/consent.ts` (Banner **und** Datenschutz-Tabelle lesen von dort). Neuer Dienst → dort eintragen und `CONSENT_VERSION` erhöhen (alle werden neu gefragt).
- Logik im Browser: `src/lib/consent-client.ts` (`hasConsent('media')`, `onConsent(fn)`, `saveConsent({...})`). Speicherung im Local Storage `bc-consent`, 12 Monate, kein Cookie.
- Banner: `src/components/CookieBanner.astro`. Erneut öffnen mit jedem Element mit `data-consent-open` (Footer «Cookie-Einstellungen», Datenschutzseite).
- Google Maps (`src/components/GoogleMap.astro`) lädt erst nach Einwilligung «Externe Medien» oder Klick auf «Karte laden».
- Die Website selbst setzt keine Cookies. Werden Karte und Analytics entfernt, kann auch der Banner raus (`<CookieBanner />` in `BaseLayout.astro`).

## Analytics (optional)

Standardmässig aus. Für ein cookieloses Tool in `src/config/site.ts` → `analytics.provider` auf `'plausible'` oder `'umami'` setzen und `scriptSrc` eintragen. Die Kategorie «Statistik» erscheint dann automatisch im Banner und in der Datenschutz-Tabelle; das Script lädt nur nach Einwilligung. `CONSENT_VERSION` erhöhen.

## Qualität

Lighthouse (Mobile, lokal gemessen): Performance 98, Accessibility 100, Best Practices 100, SEO 100 auf allen Hauptseiten.
