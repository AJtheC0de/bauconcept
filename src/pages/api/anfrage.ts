import type { APIRoute } from 'astro';
import { site } from '../../config/site';
import { str, isEmail, isSpam, readFiles, sendMail, respond } from '../../lib/mail';

export const prerender = false;

const redirects = { ok: '/danke/', error: '/kontakt/?status=fehler#anfrageformular' };

export const POST: APIRoute = async ({ request }) => {
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return respond(request, { ok: false, message: 'Die Anfrage konnte nicht gelesen werden. Sind die Dateien zu gross?' }, redirects);
  }

  // Spam still «erfolgreich» beantworten, damit Bots nichts lernen
  if (isSpam(fd)) return respond(request, { ok: true }, redirects);

  const name = str(fd, 'name', 200);
  const email = str(fd, 'email', 200);
  const ort = str(fd, 'projektort', 200);
  const nachricht = str(fd, 'nachricht');

  if (!name || !isEmail(email) || !ort || !nachricht) {
    return respond(request, { ok: false, message: 'Bitte füllen Sie Name, E-Mail, Projektort und Kurzbeschreibung aus.' }, redirects);
  }

  const files = await readFiles(fd);
  if ('error' in files) return respond(request, { ok: false, message: files.error }, redirects);

  const sent = await sendMail({
    subject: `Projektanfrage: ${str(fd, 'leistung', 100) || 'Allgemein'} – ${ort}`,
    replyTo: email,
    rows: [
      ['Name', name],
      ['E-Mail', email],
      ['Telefon', str(fd, 'telefon', 100)],
      ['Projektort', ort],
      ['Leistung', str(fd, 'leistung', 100)],
      ['Zeitraum', str(fd, 'zeitraum', 200)],
      ['Beschreibung', nachricht],
      ['Anhänge', files.attachments.map((a) => a.filename).join(', ')],
    ],
    attachments: files.attachments,
  });

  return respond(
    request,
    sent
      ? { ok: true }
      : { ok: false, message: `Der Versand hat nicht funktioniert. Bitte rufen Sie uns an (${site.phone.display}) oder schreiben Sie an ${site.email}.` },
    redirects,
  );
};
