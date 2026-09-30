const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Markiert [PLATZHALTER…]-Stellen gelb. Ergebnis mit set:html ausgeben. */
export const ph = (s: string) =>
  escape(s).replace(/\[PLATZHALTER[^\]]*\]/g, (m) => `<mark class="ph-text">${m}</mark>`);

export const isPlaceholder = (s?: string) => !!s && s.includes('PLATZHALTER');

/** Platzhalter für Meta-Tags / Alt-Texte entfernen */
export const plain = (s: string) => s.replace(/\[PLATZHALTER:?\s*([^\]]*)\]/g, '$1').trim();
