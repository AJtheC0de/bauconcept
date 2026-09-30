// Prüft gebaute Seiten: Title ≤ 60, Description ≤ 155, genau eine H1, keine Sprünge in der Überschriftenhierarchie, kein «ß».
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'dist/client';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => {
  const p = join(d, f);
  statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p);
});
walk(root);

let problems = 0;
for (const f of files.sort()) {
  const html = readFileSync(f, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '';
  const main = html.replace(/<footer[\s\S]*<\/footer>/, '');
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  const h1 = levels.filter((l) => l === 1).length;
  const jumps = levels.filter((l, i) => i > 0 && l > levels[i - 1] + 1).length;
  const issues = [];
  const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  if (decode(title).length > 60) issues.push(`title ${decode(title).length}`);
  if (!desc || decode(desc).length > 155) issues.push(`desc ${decode(desc).length}`);
  if (h1 !== 1) issues.push(`h1 x${h1}`);
  if (jumps) issues.push(`heading-jumps ${jumps} (${levels.join(',')})`);
  if (html.includes('ß')) issues.push('ß gefunden');
  if (issues.length) problems++;
  console.log(`${issues.length ? '✗' : '✓'} ${f.replace(root, '')}  [${decode(title).length}/${decode(desc).length}] ${issues.join(' · ')}`);
}
process.exit(problems ? 1 : 0);
