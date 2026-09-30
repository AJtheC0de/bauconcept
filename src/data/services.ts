import type { IconName } from '../lib/icons';

export type ServiceSlug =
  | 'aushub-erdarbeiten'
  | 'strassenbau-belaege'
  | 'leitungsbau-werkleitungen'
  | 'kanalisation-entwaesserung';

export interface Service {
  slug: ServiceSlug;
  title: string;
  /** Kurzform für Tags, Filter und Formular-Auswahl */
  short: string;
  icon: IconName;
  /** Zwei konkrete Sätze für die Leistungskarte */
  teaser: string;
  /** 3–4 Stichworte für die Karte (nur, was auch in tasks steht) */
  tags: string[];
  seo: { title: string; description: string };
  h1: string;
  intro: string[];
  tasks: string[];
  /** Fachbegriffe kurz für Laien erklärt */
  glossary: { term: string; text: string }[];
  process: { title: string; text: string }[];
  photoLabel: string;
}

export const services: Service[] = [
  {
    slug: 'aushub-erdarbeiten',
    title: 'Aushub & Erdarbeiten',
    short: 'Aushub & Erdarbeiten',
    icon: 'excavator',
    teaser:
      'Wir heben Baugruben, Gräben und Fundamente aus und bereiten den Baugrund für Ihr Bauvorhaben vor. Aushubmaterial führen wir ab oder bauen es, wo möglich, wieder ein.',
    tags: ['Baugruben', 'Gräben', 'Planie', 'Hinterfüllung'],
    seo: {
      title: 'Aushub & Erdarbeiten Zug | Bau Concept Schweiz',
      description:
        'Aushub und Erdarbeiten in Zug: Baugruben, Gräben, Planie und Hinterfüllung. Bau Concept Schweiz GmbH – Ihr Ansprechpartner für den Baugrund.',
    },
    h1: 'Aushub & Erdarbeiten in Zug',
    intro: [
      'Jedes Bauwerk beginnt im Boden. Bevor gebaut wird, muss der Baugrund ausgehoben, geprüft und tragfähig vorbereitet sein. Genau hier setzen wir an: Wir übernehmen Aushub und Erdarbeiten für Neubauten, Umbauten und Umgebungsarbeiten in Zug und Umgebung.',
      'Ob Einfamilienhaus, Garagenzufahrt oder Leitungsgraben: Wir klären vorab, wie viel Material bewegt wird, wohin es geht und was wieder eingebaut werden kann. So bleiben Ablauf und Kosten nachvollziehbar.',
    ],
    tasks: [
      'Baugruben für Neu- und Anbauten ausheben',
      'Gräben für Leitungen und Fundamente',
      'Humusabtrag und Zwischenlagerung',
      'Planie und Feinplanie (Gelände auf die richtige Höhe bringen)',
      'Hinterfüllen und Verdichten',
      'Abtransport und Entsorgung von Aushubmaterial',
      '[PLATZHALTER: weitere Leistung, z. B. Rückbau / Abbruch kleinerer Bauteile]',
    ],
    glossary: [
      { term: 'Planie', text: 'Das Gelände wird exakt auf die geplante Höhe und Neigung gebracht – die Grundlage für alles, was darauf gebaut wird.' },
      { term: 'Hinterfüllen', text: 'Der Raum zwischen Bauwerk und Baugrubenrand wird lagenweise wieder aufgefüllt und verdichtet.' },
      { term: 'Verdichten', text: 'Der eingebaute Boden wird maschinell gepresst, damit er später nicht absackt.' },
    ],
    process: [
      { title: 'Besichtigung', text: 'Wir schauen uns Grundstück, Zufahrt und Pläne vor Ort an.' },
      { title: 'Mengen & Entsorgung', text: 'Wir berechnen Aushubmengen und klären Deponie und Wiederverwendung.' },
      { title: 'Ausführung', text: 'Aushub, Sicherung und Zwischenlager nach Plan.' },
      { title: 'Hinterfüllen & Planie', text: 'Lagenweise verdichten und Gelände fertig abziehen.' },
    ],
    photoLabel: 'Foto: Bagger beim Aushub einer Baugrube',
  },
  {
    slug: 'strassenbau-belaege',
    title: 'Strassenbau & Beläge',
    short: 'Strassenbau & Beläge',
    icon: 'road',
    teaser:
      'Wir bauen und sanieren Strassen, Zufahrten und Plätze – vom tragfähigen Unterbau bis zum fertigen Belag. Auch Umgebungsarbeiten wie Randabschlüsse und Pflästerungen gehören dazu.',
    tags: ['Zufahrten', 'Plätze', 'Asphalt', 'Pflästerungen'],
    seo: {
      title: 'Strassenbau & Belagsarbeiten Zug | Bau Concept',
      description:
        'Strassenbau, Belags- und Asphaltarbeiten in Zug: Zufahrten, Plätze, Parkplätze und Umgebungsarbeiten vom Unterbau bis zum fertigen Belag.',
    },
    h1: 'Strassenbau & Beläge in Zug',
    intro: [
      'Eine Strasse, Zufahrt oder ein Platz hält nur so lange, wie der Unterbau trägt. Deshalb beginnen unsere Belagsarbeiten nicht beim Asphalt, sondern darunter: mit einem sauber aufgebauten, verdichteten Fundament.',
      'Wir übernehmen Strassenbau und Asphaltarbeiten in Zug für private Bauherren, Verwaltungen und Unternehmen – ebenso Plätze, Parkplätze und Umgebungsarbeiten rund ums Gebäude.',
    ],
    tasks: [
      'Neubau und Sanierung von Zufahrten, Wegen und Quartierstrassen',
      'Plätze und Parkplätze',
      'Fundationsschicht (Kofferung) erstellen',
      'Asphaltbeläge: Trag- und Deckschicht',
      'Randabschlüsse, Stellplatten und Rabatten',
      'Pflästerungen und Umgebungsarbeiten',
      'Belagsreparaturen und Anschlüsse an bestehende Beläge',
    ],
    glossary: [
      { term: 'Kofferung / Fundationsschicht', text: 'Eine verdichtete Kiesschicht unter dem Belag. Sie verteilt die Last und sorgt dafür, dass sich keine Spurrinnen oder Risse bilden.' },
      { term: 'Trag- und Deckschicht', text: 'Der Asphalt wird meist in zwei Lagen eingebaut: eine dicke, tragende Schicht und eine feinere, dichte Oberfläche.' },
      { term: 'Randabschluss', text: 'Steine oder Platten am Rand der Fläche. Sie halten den Belag seitlich und führen das Wasser.' },
    ],
    process: [
      { title: 'Zustand aufnehmen', text: 'Wir prüfen Untergrund, Gefälle und Entwässerung.' },
      { title: 'Unterbau', text: 'Aushub, Kofferung einbauen und verdichten.' },
      { title: 'Randabschlüsse', text: 'Randsteine setzen, Höhen und Gefälle festlegen.' },
      { title: 'Belag', text: 'Trag- und Deckschicht einbauen, Anschlüsse sauber schliessen.' },
    ],
    photoLabel: 'Foto: Belagseinbau mit Fertiger und Walze',
  },
  {
    slug: 'leitungsbau-werkleitungen',
    title: 'Leitungsbau & Werkleitungen',
    short: 'Leitungsbau & Werkleitungen',
    icon: 'pipe',
    teaser:
      'Wir verlegen Versorgungsleitungen für Wasser, Strom und Telekom – inklusive Graben, Rohrbettung und Wiederherstellung der Oberfläche. Hausanschlüsse und Leitungsersatz führen wir koordiniert mit den Werken aus.',
    tags: ['Wasser', 'Strom', 'Telekom', 'Hausanschlüsse'],
    seo: {
      title: 'Leitungsbau & Werkleitungsbau Zug | Bau Concept',
      description:
        'Leitungsbau und Werkleitungsbau in Zug: Wasser, Strom und Telekom sicher verlegt – Graben, Rohrbettung, Hausanschluss und Wiederherstellung.',
    },
    h1: 'Leitungsbau & Werkleitungen in Zug',
    intro: [
      'Werkleitungen sind die Leitungen im Boden, die ein Gebäude versorgen: Wasser, Strom und Telekommunikation. Sie müssen sicher, in der richtigen Tiefe und gut dokumentiert verlegt werden.',
      'Wir übernehmen den Werkleitungsbau in Zug vom Graben bis zur wiederhergestellten Oberfläche und stimmen uns dabei mit den zuständigen Werken und Ihrer Bauleitung ab.',
    ],
    tasks: [
      'Leitungsgräben ausheben und sichern',
      'Rohrbettung und Schutzrohre verlegen',
      'Wasserleitungen und Hausanschlüsse',
      'Rohrblöcke für Strom und Telekom',
      'Koordination mit Werken und Leitungsbetreibern',
      'Grabenauffüllung und Wiederherstellung von Belag oder Rasen',
    ],
    glossary: [
      { term: 'Werkleitungen', text: 'Sammelbegriff für die Versorgungsleitungen im Boden: Wasser, Strom, Telekom.' },
      { term: 'Rohrblock', text: 'Mehrere Schutzrohre, die gebündelt im Graben verlegt und einbetoniert werden. Kabel lassen sich später einziehen, ohne neu zu graben.' },
      { term: 'Hausanschluss', text: 'Die Verbindung zwischen der Leitung in der Strasse und Ihrem Gebäude.' },
    ],
    process: [
      { title: 'Abklärung', text: 'Leitungskataster prüfen, Werke kontaktieren, Bewilligungen klären.' },
      { title: 'Graben', text: 'Aushub mit Rücksicht auf bestehende Leitungen, Graben sichern.' },
      { title: 'Verlegen', text: 'Bettung, Rohre bzw. Schutzrohre verlegen, Abnahme durch das Werk.' },
      { title: 'Wiederherstellen', text: 'Graben verfüllen, verdichten und Oberfläche instand stellen.' },
    ],
    photoLabel: 'Foto: Offener Leitungsgraben mit Schutzrohren',
  },
  {
    slug: 'kanalisation-entwaesserung',
    title: 'Kanalisation & Entwässerung',
    short: 'Kanalisation & Entwässerung',
    icon: 'manhole',
    teaser:
      'Wir erstellen und erneuern Kanalisationsleitungen, Schächte und Hausanschlüsse. Damit Abwasser und Regenwasser sicher und normgerecht abfliessen.',
    tags: ['Abwasser', 'Meteorwasser', 'Schächte', 'Sickerleitungen'],
    seo: {
      title: 'Kanalisationsbau & Entwässerung Zug | Bau Concept',
      description:
        'Kanalisationsbau und Entwässerung in Zug: Abwasserleitungen, Schächte, Hausanschlüsse, Sickerleitungen und Platzentwässerung aus einer Hand.',
    },
    h1: 'Kanalisation & Entwässerung in Zug',
    intro: [
      'Abwasser und Regenwasser müssen zuverlässig vom Grundstück weg. Eine undichte oder falsch verlegte Leitung verursacht Schäden, die oft erst spät sichtbar werden.',
      'Wir übernehmen Kanalisationsbau und Entwässerungsarbeiten in Zug: von neuen Grundstücksentwässerungen über den Ersatz alter Leitungen bis zur Entwässerung von Plätzen und Zufahrten.',
    ],
    tasks: [
      'Schmutz- und Meteorwasserleitungen verlegen',
      'Kontroll- und Einlaufschächte setzen',
      'Hausanschlüsse an die öffentliche Kanalisation',
      'Ersatz und Sanierung bestehender Leitungen',
      'Sickerleitungen und Versickerungsanlagen',
      'Platz- und Strassenentwässerung',
    ],
    glossary: [
      { term: 'Meteorwasser', text: 'Regenwasser von Dächern und Plätzen. Es wird meist getrennt vom Schmutzwasser abgeleitet oder versickert.' },
      { term: 'Kontrollschacht', text: 'Ein Schacht im Leitungsnetz, über den Leitungen geprüft und gereinigt werden können.' },
      { term: 'Sickerleitung', text: 'Ein gelochtes Rohr, das Wasser aus dem Boden aufnimmt, z. B. rund um Kellerwände.' },
    ],
    process: [
      { title: 'Abklärung', text: 'Bestehende Leitungen, Gefälle und Anschlusspunkt klären.' },
      { title: 'Graben & Bettung', text: 'Aushub, Rohrbettung nach Vorgabe.' },
      { title: 'Leitungen & Schächte', text: 'Rohre mit Gefälle verlegen, Schächte setzen, Dichtheit prüfen.' },
      { title: 'Abschluss', text: 'Auffüllen, Oberfläche wiederherstellen, Dokumentation übergeben.' },
    ],
    photoLabel: 'Foto: Kanalisationsrohr im Graben mit Schacht',
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = services.map((s) => s.slug) as [ServiceSlug, ...ServiceSlug[]];

/** Allgemeiner Ablauf (Startseite) */
export const processSteps = [
  { title: 'Anfrage', text: 'Sie beschreiben Ihr Vorhaben per Formular oder Telefon – gerne mit Plänen oder Fotos.' },
  { title: 'Besichtigung & Klärung', text: 'Wir schauen uns die Situation vor Ort an und klären offene Fragen.' },
  { title: 'Offerte', text: 'Sie erhalten eine nachvollziehbare Offerte mit klaren Positionen.' },
  { title: 'Ausführung', text: 'Wir führen die Arbeiten aus und halten Sie über den Stand informiert.' },
  { title: 'Übergabe', text: 'Gemeinsame Abnahme vor Ort, saubere Baustelle, Unterlagen für Sie.' },
];
