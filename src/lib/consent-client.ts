/**
 * Einwilligung im Browser lesen/speichern (Local Storage, kein Cookie).
 * Wird von CookieBanner.astro und GoogleMap.astro importiert – Vite bündelt es nur einmal.
 */
import { CONSENT_MAX_AGE_DAYS, CONSENT_STORAGE_KEY, CONSENT_VERSION, type ConsentCategory } from '../data/consent';

export type Choices = Partial<Record<ConsentCategory, boolean>>;
interface Stored {
  v: number;
  ts: number;
  choices: Choices;
}

const CHANGE = 'bc:consent';
const OPEN = 'bc:consent-open';

export const readConsent = (): Choices | null => {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Stored;
    const expired = Date.now() - data.ts > CONSENT_MAX_AGE_DAYS * 864e5;
    if (data.v !== CONSENT_VERSION || expired) return null;
    return { ...data.choices, necessary: true };
  } catch {
    return null;
  }
};

export const saveConsent = (choices: Choices) => {
  const previous = readConsent();
  const next = { ...choices, necessary: true };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ v: CONSENT_VERSION, ts: Date.now(), choices: next } satisfies Stored));
  } catch {
    /* Privater Modus o. ä.: Auswahl gilt dann nur für diesen Seitenaufruf */
  }
  window.dispatchEvent(new CustomEvent<Choices>(CHANGE, { detail: next }));
  // Widerruf: bereits geladene Drittinhalte lassen sich nur durch Neuladen entfernen
  const revoked = previous && (Object.keys(previous) as ConsentCategory[]).some((k) => previous[k] && !next[k]);
  if (revoked) location.reload();
};

export const hasConsent = (category: ConsentCategory) => readConsent()?.[category] === true;

export const onConsent = (fn: (choices: Choices) => void) => {
  window.addEventListener(CHANGE, (e) => fn((e as CustomEvent<Choices>).detail));
};

export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN));
export const onOpenConsent = (fn: () => void) => window.addEventListener(OPEN, fn);
