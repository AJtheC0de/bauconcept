import { Resend } from 'resend';
import { RESEND_API_KEY, MAIL_FROM, MAIL_TO } from 'astro:env/server';
import { site, upload } from '../config/site';

export interface FormResult {
  ok: boolean;
  message?: string;
}

const MIN_FILL_MS = 3000;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const str = (fd: FormData, key: string, max = 5000) => {
  const v = fd.get(key);
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
};

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Honeypot und Mindest-Ausfüllzeit. true = vermutlich Spam. */
export const isSpam = (fd: FormData) => {
  if (str(fd, 'website')) return true;
  const t = Number(str(fd, '_t'));
  return Number.isFinite(t) && t > 0 && Date.now() - t < MIN_FILL_MS;
};

/** Dateien prüfen und für Resend aufbereiten */
export const readFiles = async (fd: FormData) => {
  const files = fd.getAll('dateien').filter((f): f is File => f instanceof File && f.size > 0);
  const total = files.reduce((s, f) => s + f.size, 0);
  if (total > upload.maxTotalBytes) return { error: `Dateien zu gross (max. ${upload.maxLabel}).` } as const;
  const bad = files.find((f) => !(upload.mimeTypes as readonly string[]).includes(f.type));
  if (bad) return { error: `Dateityp nicht erlaubt: ${bad.name}. Erlaubt sind PDF, JPG und PNG.` } as const;
  const attachments = await Promise.all(
    files.map(async (f) => ({ filename: f.name.replace(/[^\w.\-äöüÄÖÜ ]/g, '_'), content: Buffer.from(await f.arrayBuffer()) })),
  );
  return { attachments } as const;
};

export const sendMail = async (opts: {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) => {
  if (!RESEND_API_KEY || !MAIL_FROM) {
    console.error('[mail] RESEND_API_KEY oder MAIL_FROM fehlt');
    return false;
  }
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse">${opts.rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${esc(k)}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join('')}</table>`;
  const text = opts.rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: MAIL_TO || site.email,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html,
    text,
    attachments: opts.attachments,
  });
  if (error) {
    console.error('[mail] Resend-Fehler', error);
    return false;
  }
  return true;
};

/** Antwort: JSON für fetch(), sonst Redirect (Formular ohne JavaScript) */
export const respond = (request: Request, result: FormResult, redirects: { ok: string; error: string }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(null, { status: 303, headers: { Location: result.ok ? redirects.ok : redirects.error } });
};
