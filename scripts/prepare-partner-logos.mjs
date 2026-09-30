// Erzeugt einfarbig weisse Negativ-Versionen der Partnerlogos für das dunkle Logo-Band.
//   farbige Flächen → weiss
//   weisse Formen INNERHALB der grössten farbigen Fläche (z. B. «A» im Anliker-Quadrat) → ausgestanzt (transparent)
//   bereits weisse Logos bleiben unverändert
// Aufruf: node scripts/prepare-partner-logos.mjs   (Quellen: logos/, Ziel: src/assets/partner/)
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/assets/partner';
const HEIGHT = 200; // Arbeitshöhe in px (Anzeige ca. 30–45 px, genügt für 2x/3x)
const logos = [
  { src: 'logos/AnlikerLogo.png', out: 'anliker.png' },
  { src: 'logos/walologo.png', out: 'walo.png' },
  { src: 'logos/Loetscher-Tiefbau_RGB-ohne-HG.png', out: 'loetscher-tiefbau.png' },
];

mkdirSync(OUT, { recursive: true });

for (const l of logos) {
  const trimmed = await sharp(l.src).trim().png().toBuffer();
  const { data, info } = await sharp(trimmed).resize({ height: HEIGHT }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const px = (x, y) => (y * W + x) * 4;
  const isWhite = (i) => data[i] > 215 && data[i + 1] > 215 && data[i + 2] > 215;
  const isColored = (i) => data[i + 3] > 40 && !isWhite(i);

  // Farbige Flächen finden (Flood-Fill) – mit Bounding-Box und Durchschnittsfarbe
  const seen = new Uint8Array(W * H);
  const comps = [];
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const k = y * W + x;
      if (seen[k] || !isColored(k * 4)) continue;
      const stack = [k];
      seen[k] = 1;
      let n = 0, r = 0, g = 0, b = 0, x0 = x, x1 = x, y0 = y, y1 = y;
      while (stack.length) {
        const c = stack.pop();
        const cx = c % W, cy = (c / W) | 0, ci = c * 4;
        n++; r += data[ci]; g += data[ci + 1]; b += data[ci + 2];
        x0 = Math.min(x0, cx); x1 = Math.max(x1, cx); y0 = Math.min(y0, cy); y1 = Math.max(y1, cy);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = cx + dx, ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const nk = ny * W + nx;
          if (!seen[nk] && isColored(nk * 4)) { seen[nk] = 1; stack.push(nk); }
        }
      }
      comps.push({ n, x0, x1, y0, y1, c: [r / n, g / n, b / n] });
    }
  comps.sort((a, b) => b.n - a.n);

  // Grösste Fläche + angrenzende Teile gleicher Farbe zusammenführen
  // (weisse Linien können eine Fläche zerschneiden, z. B. das «A» im Anliker-Quadrat)
  let box = comps[0] && comps[0].n > W * H * 0.03 ? { ...comps[0] } : null;
  if (box) {
    const near = (a, b, gap = 4) => a.x0 - gap <= b.x1 && b.x0 - gap <= a.x1 && a.y0 - gap <= b.y1 && b.y0 - gap <= a.y1;
    const sameColor = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 60;
    let merged = true;
    while (merged) {
      merged = false;
      for (const c of comps) {
        if (c.used || c === comps[0] || !sameColor(c.c, comps[0].c) || !near(box, c)) continue;
        c.used = true;
        merged = true;
        box = { ...box, x0: Math.min(box.x0, c.x0), x1: Math.max(box.x1, c.x1), y0: Math.min(box.y0, c.y0), y1: Math.max(box.y1, c.y1) };
      }
    }
  }

  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const i = px(x, y);
      if (data[i + 3] === 0) continue;
      const inBox = box && x >= box.x0 && x <= box.x1 && y >= box.y0 && y <= box.y1;
      if (isWhite(i) && inBox) data[i + 3] = 0; // ausstanzen
      data[i] = data[i + 1] = data[i + 2] = 255;
    }

  await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(`${OUT}/${l.out}`);
  console.log(`${l.out}: ${W}x${H}${box ? ` (Fläche ausgestanzt: ${box.x1 - box.x0}x${box.y1 - box.y0})` : ''}`);
}
