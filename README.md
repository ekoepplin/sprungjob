# Jobby

Job-Board fuer Quereinsteiger: durchsuchbare Jobs aus der Bundesagentur-fuer-Arbeit-Jobsuche, direkt daraus einen Lebenslauf (CV) generieren — als PDF, im AltaCV-Design.

## Warum

Jobsuche fuer Berufswechsler ist muehsam: Stellenboersen sind auf ein Zielberuf zugeschnitten, CV-Vorlagen passen selten. Jobby kombiniert beides in einem Flow: Job finden, Profil ausfuellen, CV generieren.

- **JobSeeker** sucht Jobs, unabhaengig vom Zielberuf (`quereinstieg`-Filter der Jobsuche-API).
- **Job** kommt live von der BA-Jobsuche.
- **CVTemplate** ist ein austauschbares Design fuers CV. Aktuell: AltaCV.
- **CV** ist das generierte Dokument aus JobSeeker-Daten + CVTemplate.

Mehr Domain-Sprache in [`CONTEXT.md`](./CONTEXT.md).

## Open Source

Jobby ist Open Source, lizenziert unter [MIT](./LICENSE). Beitraege, Forks, Issues willkommen.

**Wichtig:** Jobby nutzt die BA-Jobsuche ueber eine inoffizielle Schnittstelle — nicht die eigene, offizielle API der Bundesagentur. Details, Risiken und Begruendung stehen in [ADR 0001](./docs/adr/0001-unofficial-jobsuche-api-as-job-source.md). Nicht als stabile Grundlage fuer einen oeffentlichen Launch gedacht, ohne die dort genannten Massnahmen.

## Stack

- Next.js (App Router) + React + TypeScript, in [`web/`](./web)
- Tailwind CSS
- CV-Rendering: HTML/CSS → PDF via Puppeteer (Headless-Chrome), kein LaTeX-Toolchain — siehe [ADR 0002](./docs/adr/0002-html-css-pdf-rendering-not-latex.md)

## Loslegen

```bash
cd web
npm install
npm run dev
```

Dann [http://localhost:3000](http://localhost:3000) oeffnen.

## Struktur

```
web/            Next.js App
  app/jobs/     Jobsuche
  app/cv/       CV-Editor
  app/api/jobs/ API-Route, ruft Jobsuche ab
  lib/          Jobsuche-Client, CV-Template-Rendering
docs/adr/       Architecture Decision Records
CONTEXT.md      Domain-Glossar
```

## Docs

- [`CONTEXT.md`](./CONTEXT.md) — Domain-Begriffe
- [`docs/adr/`](./docs/adr) — Architekturentscheidungen
