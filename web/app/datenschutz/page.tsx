import Link from "next/link";
import { pageAlternates } from "@/lib/seo";

export const metadata = {
  title: "Datenschutz — Sprungjob",
  alternates: pageAlternates("/datenschutz"),
};

export default function DatenschutzPage() {
  return (
    <div className="flex flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10">
        <Link href="/" className="font-display text-xl tracking-tight">
          Sprungjob
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 sm:px-10">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          Datenschutzerklärung
        </h1>

        <div className="mt-10 max-w-2xl space-y-8 text-sm text-foreground">
          <Block title="Verantwortlicher">
            <p>
              Eugen Koepplin — Sprungjob
              <br />
              c/o Autorenglück #14009
              <br />
              Albert-Einstein-Straße 47
              <br />
              02977 Hoyerswerda
              <br />
              E-Mail: info@sprungjob.de
            </p>
          </Block>

          <Block title="Hosting">
            <p>
              Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
              Covina, CA 91723, USA gehostet. Beim Aufruf der Seiten verarbeitet
              Vercel technisch notwendige Daten (z. B. IP-Adresse, Zeitpunkt,
              aufgerufene Seite, Browser) in Server-Logfiles, um die Website
              auszuliefern und abzusichern. Rechtsgrundlage ist Art. 6 Abs. 1
              lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb). Vercel
              ist unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
          </Block>

          <Block title="Reichweitenmessung">
            <p>
              Wir nutzen Vercel Web Analytics, um anonym zu zählen, welche
              Seiten aufgerufen werden. Es werden keine Cookies gesetzt und
              keine Profile über Besucher gebildet; Besucher werden nur über
              einen täglich wechselnden Hash unterschieden, der keine
              Rückschlüsse auf einzelne Personen zulässt. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </Block>

          <Block title="Jobsuche">
            <p>
              Suchbegriffe (Ort, Spezialisierung) werden von unserem Server an
              die Jobsuche der Bundesagentur für Arbeit weitergeleitet, um
              passende Stellen abzurufen. Ihre IP-Adresse wird dabei nicht an
              die Bundesagentur übermittelt. Beim Klick auf &bdquo;Zur
              Anzeige&ldquo; verlassen Sie Sprungjob; dort gelten die
              Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
          </Block>

          <Block title="CV-Editor">
            <p>
              Alle Angaben im CV-Editor, einschließlich eines Fotos, werden
              ausschließlich lokal in Ihrem Browser (localStorage) gespeichert
              und nicht an uns übertragen. Auch das PDF wird in Ihrem Browser
              erzeugt. Sie können die Daten jederzeit löschen, indem Sie die
              Websitedaten für sprungjob.de in Ihrem Browser entfernen.
            </p>
          </Block>

          <Block title="Schriftarten">
            <p>
              Alle Schriftarten werden von unserem eigenen Server geladen. Es
              besteht keine Verbindung zu Google Fonts.
            </p>
          </Block>

          <Block title="Ihre Rechte">
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
              Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
              Interessen (Art. 15–21 DSGVO). Wenden Sie sich dazu an
              info@sprungjob.de. Außerdem können Sie sich bei einer
              Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO).
            </p>
          </Block>

          <p className="text-xs text-muted">Stand: September 2026</p>
        </div>
      </main>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {title}
      </p>
      <div className="mt-2 leading-relaxed">{children}</div>
    </div>
  );
}
