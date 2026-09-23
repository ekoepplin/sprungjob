import Link from "next/link";

export const metadata = {
  title: "Impressum — Sprungjob",
};

export default function ImpressumPage() {
  return (
    <div className="flex flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10">
        <Link href="/" className="font-display text-xl tracking-tight">
          Sprungjob
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 sm:px-10">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          Impressum
        </h1>

        <div className="mt-10 max-w-md space-y-8 text-sm text-foreground">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Angaben gemäß § 5 DDG
            </p>
            <p className="mt-2">
              Eugen Koepplin — Sprungjob
              <br />
              c/o Autorenglück #14009
              <br />
              Albert-Einstein-Straße 47
              <br />
              02977 Hoyerswerda
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Kontakt
            </p>
            <p className="mt-2">E-Mail: info@sprungjob.de</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV
            </p>
            <p className="mt-2">Eugen Koepplin, Anschrift wie oben</p>
          </div>
        </div>
      </main>
    </div>
  );
}
