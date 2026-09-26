import { pageAlternates } from "@/lib/seo";

export const metadata = {
  alternates: pageAlternates("/"),
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10">
        <span className="font-display text-xl tracking-tight">Sprungjob</span>
        <a
          href="#so-funktionierts"
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
        >
          So funktioniert&rsquo;s
        </a>
      </header>

      <main className="flex flex-col">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pt-12 pb-24 sm:px-10 sm:pt-20 sm:pb-32">
          <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                Jobbörse für Quereinsteiger
              </p>
              <h1 className="font-display mt-6 text-[13vw] leading-[0.95] font-medium tracking-tight sm:text-6xl lg:text-7xl">
                Jobs für
                <br />
                Quereinsteiger.
                <br />
                <span className="italic text-accent">CVs</span>, die
                <br />
                etwas hermachen.
              </h1>
              <p className="mt-8 max-w-md text-lg text-muted">
                Stellen für Quereinsteiger in Deutschland durchsuchen, einen
                Job auswählen und direkt den passenden Lebenslauf erstellen.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="/jobs"
                  className="inline-flex items-center bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-accent-ink transition-opacity hover:opacity-90"
                >
                  Jobs ansehen
                </a>
                <a
                  href="#so-funktionierts"
                  className="font-mono text-xs uppercase tracking-widest text-foreground underline decoration-line underline-offset-4 hover:decoration-accent"
                >
                  Wie es funktioniert
                </a>
              </div>
            </div>

            <CvMockup className="hidden lg:block" />
          </div>
        </section>

        {/* How it works */}
        <section
          id="so-funktionierts"
          className="border-t border-line"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Drei Schritte.
            </h2>
            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-3">
              <Step
                number="01"
                title="Suchen"
                body="Offene Stellen für Quereinsteiger-Berufe, live aus der Jobsuche der Bundesagentur für Arbeit."
              />
              <Step
                number="02"
                title="Auswählen"
                body="Ein Job, der passt. Kein endloses Scrollen durch fachfremde Anzeigen."
              />
              <Step
                number="03"
                title="CV erstellen"
                body="Ein Lebenslauf aus deinem Profil — als PDF, bereit zum Versenden."
              />
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section id="jobs" className="border-t border-line bg-surface">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-6 py-24 sm:px-10 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display max-w-lg text-3xl tracking-tight sm:text-4xl">
              Bereit für den nächsten Schritt?
            </h2>
            <a
              href="/jobs"
              className="inline-flex items-center bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-accent-ink transition-opacity hover:opacity-90"
            >
              Jobs durchsuchen
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>&copy; {new Date().getFullYear()} Sprungjob</span>
          <div className="flex items-center gap-4">
            <span>Jobdaten: Jobsuche der Bundesagentur für Arbeit</span>
            <a href="/impressum" className="hover:text-foreground">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-foreground">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Step({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <span className="font-mono text-xs text-accent">{number}</span>
      <h3 className="font-display mt-3 text-xl">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}

function CvMockup({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mx-auto aspect-[3/4] w-full max-w-xs border border-line bg-[var(--background)] p-6 shadow-[8px_8px_0_0_var(--accent)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-full border border-line" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2.5 w-3/4 bg-foreground/80" />
            <div className="h-1.5 w-1/2 bg-muted/60" />
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-line" />

        <div className="mt-6 grid grid-cols-5 gap-4">
          <div className="col-span-3 space-y-3">
            <div className="h-1.5 w-1/3 bg-accent" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-muted/40" />
              <div className="h-1.5 w-5/6 bg-muted/40" />
              <div className="h-1.5 w-2/3 bg-muted/40" />
            </div>
            <div className="h-1.5 w-1/3 bg-accent mt-4" />
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-muted/40" />
              <div className="h-1.5 w-4/6 bg-muted/40" />
            </div>
          </div>
          <div className="col-span-2 space-y-3">
            <div className="h-1.5 w-1/2 bg-accent" />
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1.5 w-full bg-line" />
              ))}
            </div>
            <div className="h-1.5 w-1/2 bg-accent mt-4" />
            <div className="flex flex-wrap gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-10 border border-line" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
