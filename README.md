# Sprungjob

Job-Board fuer Quereinsteiger: durchsuchbare Jobs aus der Bundesagentur-fuer-Arbeit-Jobsuche, direkt daraus einen Lebenslauf (CV) generieren — als PDF, im AltaCV-Design.

## Warum

Jobsuche fuer Berufswechsler ist muehsam: Stellenboersen sind auf ein Zielberuf zugeschnitten, CV-Vorlagen passen selten. Sprungjob kombiniert beides in einem Flow: Job finden, Profil ausfuellen, CV generieren.

- **JobSeeker** sucht Jobs, unabhaengig vom Zielberuf (`quereinstieg`-Filter der Jobsuche-API).
- **Job** kommt live von der BA-Jobsuche.
- **CVTemplate** ist ein austauschbares Design fuers CV. Aktuell: AltaCV.
- **CV** ist das generierte Dokument aus JobSeeker-Daten + CVTemplate.

Mehr Domain-Sprache in [`CONTEXT.md`](./CONTEXT.md).

## Open Source

Sprungjob ist Open Source, lizenziert unter [MIT](./LICENSE). Ziel des Projekts: Menschen kostenlos dabei helfen, einen Job zu finden und daraus einen Lebenslauf zu erstellen — kein kommerzielles Angebot. Beitraege, Forks, Issues willkommen.

**Wichtig:** Sprungjob nutzt die BA-Jobsuche ueber eine inoffizielle Schnittstelle — nicht die eigene, offizielle API der Bundesagentur. Details, Risiken und Begruendung sind intern dokumentiert (ADR 0001). Nicht als stabile Grundlage fuer einen oeffentlichen Launch gedacht, ohne die dort genannten Massnahmen.

## Stack

- Next.js (App Router) + React + TypeScript, in [`web/`](./web)
- Tailwind CSS
- CV-Rendering: HTML/CSS → PDF via Puppeteer (Headless-Chrome), kein LaTeX-Toolchain — siehe ADR 0002 (intern)

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
CONTEXT.md      Domain-Glossar
```

## Docs

- [`CONTEXT.md`](./CONTEXT.md) — Domain-Begriffe
