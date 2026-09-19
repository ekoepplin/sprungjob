const BASE_URL = "https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v6/jobs";
const API_KEY = "jobboerse-jobsuche";

// Scope of the whole platform: roles open to career changers (see CONTEXT.md / Q6).
// Uses the Jobsuche API's own quereinstieg filter, not a text search term.

export type JobListing = {
  refnr: string;
  title: string;
  company: string | null;
  location: string | null;
  publishedAt: string | null;
  externalUrl: string | null;
};

export type JobSearchResult = {
  jobs: JobListing[];
  total: number;
  page: number;
  size: number;
};

type RawJob = {
  referenznummer: string;
  stellenangebotsTitel: string;
  firma?: string;
  stellenlokationen?: { adresse?: { ort?: string; plz?: string } }[];
  datumErsteVeroeffentlichung?: string;
  externeURL?: string;
};

export async function searchDesignJobs(params: {
  ort?: string;
  spezialisierung?: string;
  page?: number;
}): Promise<JobSearchResult> {
  const search = new URLSearchParams({
    quereinstieg: "true",
    page: String(params.page ?? 1),
    size: "20",
  });
  if (params.spezialisierung) search.set("was", params.spezialisierung);
  if (params.ort) search.set("wo", params.ort);

  const res = await fetch(`${BASE_URL}?${search.toString()}`, {
    headers: { "X-API-Key": API_KEY },
    // Jobsuche has no documented caching policy; keep results fresh but
    // avoid hammering the (unofficial) endpoint on every render.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Jobsuche request failed: ${res.status}`);
  }

  const data = await res.json();
  const raw: RawJob[] = data.ergebnisliste ?? [];

  return {
    jobs: raw.map((job) => ({
      refnr: job.referenznummer,
      title: job.stellenangebotsTitel,
      company: job.firma ?? null,
      location: job.stellenlokationen?.[0]?.adresse?.ort ?? null,
      publishedAt: job.datumErsteVeroeffentlichung ?? null,
      externalUrl: job.externeURL ?? null,
    })),
    total: data.maxErgebnisse ?? raw.length,
    page: data.page ?? 1,
    size: data.size ?? raw.length,
  };
}
