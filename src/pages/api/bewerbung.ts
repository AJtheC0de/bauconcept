import type { APIRoute } from 'astro';
import { site } from '../../config/site';
import { str, isSpam, readFiles, sendMail, respond } from '../../lib/mail';

export const prerender = false;

const redirects = { ok: '/danke/?typ=bewerbung', error: '/jobs/?status=fehler#bewerbung' };

export const POST: APIRoute = async ({ request }) => {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return respond(request, { ok: false, message: 'Die Bewerbung konnte nicht gelesen werden. Ist die Datei zu gross?' }, redirects);
  }

  if (isSpam(fd)) return respond(request, { ok: true }, redirects);

  const name = str(fd, 'name', 200);
  const telefon = str(fd, 'telefon', 100);
  const erfahrung = str(fd, 'erfahrung');

  if (!name || !telefon || !erfahrung) {
    return respond(request, { ok: false, message: 'Bitte fülle Name, Telefon und Beruf/Erfahrung aus.' }, redirects);
  }

  const files = await readFiles(fd);
  if ('error' in files) return respond(request, { ok: false, message: files.error }, redirects);

  const sent = await sendMail({
    subject: `Kurzbewerbung: ${name}`,
    rows: [
      ['Name', name],
      ['Telefon', telefon],
      ['Beruf & Erfahrung', erfahrung],
      ['Lebenslauf', files.attachments.map((a) => a.filename).join(', ') || '–'],
    ],
    attachments: files.attachments,
  });

  return respond(
    request,
    sent ? { ok: true } : { ok: false, message: `Der Versand hat nicht funktioniert. Ruf uns bitte an: ${site.phone.display}.` },
    redirects,
  );
};
