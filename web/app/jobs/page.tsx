import Link from "next/link";
import { searchDesignJobs } from "@/lib/jobsuche";
import { relativeGerman } from "@/lib/format";

export const metadata = {
  title: "Jobs — Sprungjob",
};

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const ort = typeof params.ort === "string" ? params.ort : "";
  const spezialisierung =
    typeof params.spezialisierung === "string" ? params.spezialisierung : "";
  const page = Number(params.page ?? "1") || 1;

  let result: Awaited<ReturnType<typeof searchDesignJobs>> | null = null;
  let error: string | null = null;
  try {
    result = await searchDesignJobs({ ort, spezialisierung, page });
  } catch {
    error = "Jobsuche derzeit nicht erreichbar. Bitte später erneut versuchen.";
  }

  const hasMore = result ? page * result.size < result.total : false;

  // Newest first — the Jobsuche API has no server-side sort param, so this
  // only orders the jobs loaded on this page, not all 88k+ results.
  const jobs = result ? [...result.jobs] : [];
  jobs.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  return (
    <div className="flex flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 sm:px-10">
        <Link href="/" className="font-display text-xl tracking-tight">
          Sprungjob
        </Link>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          Jobbörse für Quereinsteiger
        </span>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 pb-24 sm:px-10">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
          Jobs für Quereinsteiger.
        </h1>

        <form className="mt-10 flex flex-wrap items-end gap-6 border-b border-line pb-10">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Ort
            </span>
            <input
              type="text"
              name="ort"
              defaultValue={ort}
              placeholder="z. B. Berlin"
              className="border-b border-line bg-transparent px-1 py-1.5 text-lg outline-none placeholder:text-muted/60 focus:border-accent"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Spezialisierung
            </span>
            <input
              type="text"
              name="spezialisierung"
              defaultValue={spezialisierung}
              placeholder="z. B. Motion, UX, Junior"
              className="border-b border-line bg-transparent px-1 py-1.5 text-lg outline-none placeholder:text-muted/60 focus:border-accent"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-accent-ink transition-opacity hover:opacity-90"
          >
            Suchen
          </button>
        </form>

        <div className="mt-10">
          {error && <p className="text-muted">{error}</p>}

          {result && result.jobs.length === 0 && (
            <p className="text-muted">Keine Treffer. Andere Filter probieren.</p>
          )}

          {result && result.total > 0 && (
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {result.total} {result.total === 1 ? "Treffer" : "Treffer"}
            </p>
          )}

          <ul className="mt-6 divide-y divide-line border-t border-line">
            {jobs.map((job) => (
              <li
                key={job.refnr}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="font-display text-2xl">{job.title}</h2>
                  <p className="mt-1 text-sm text-muted">
                    {[job.company, job.location].filter(Boolean).join(" · ")}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent">
                    {relativeGerman(job.publishedAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-6">
                  <a
                    href={job.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-foreground underline decoration-line underline-offset-4 hover:decoration-accent"
                  >
                    Zur Anzeige
                  </a>
                  <Link
                    href={{
                      pathname: "/cv",
                      query: {
                        title: job.title,
                        company: job.company ?? "",
                      },
                    }}
                    className="inline-flex items-center bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-accent-ink transition-opacity hover:opacity-90"
                  >
                    CV erstellen
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <Link
                href={{
                  pathname: "/jobs",
                  query: { ort, spezialisierung, page: page + 1 },
                }}
                className="font-mono text-xs uppercase tracking-widest text-foreground underline decoration-line underline-offset-4 hover:decoration-accent"
              >
                Weitere laden
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-auto border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <span>&copy; {new Date().getFullYear()} Sprungjob</span>
          <span>Jobdaten: Jobsuche der Bundesagentur für Arbeit</span>
        </div>
      </footer>
    </div>
  );
}
