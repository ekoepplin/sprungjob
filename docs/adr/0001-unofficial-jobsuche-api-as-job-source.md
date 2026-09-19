---
status: accepted, risk not fully resolved — revisit before any public launch
---

# Use the unofficial Bundesagentur Jobsuche API as sole job source

Bundesagentur für Arbeit (BA) publishes no official public API for Jobsuche. We use the endpoint their own mobile app talks to internally (`https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v6/jobs`, header `X-API-Key: jobboerse-jobsuche`), documented by the community `bundesAPI/jobsuche-api` project — not something we registered for; it's a shared, publicly-known key with no per-user identity, verified working 2026-09-19. It's the only BA-native source, matching the decision to scope Jobby to German jobs from this one agency.

## The actual legal/intent picture (researched 2026-09-19)

This is not a clean "unofficial but fine" situation — BA has taken an active position against exactly this kind of use, and it's worth being precise about it rather than hand-waving:

- BA has publicly stated the interface is **"not designed for mass access or mass evaluation using technical means"** — i.e. not just undocumented, but explicitly not meant for what a live job-board search does.
- In 2021 BA called the reverse-engineered API documentation **"technically and legally problematic"** and responded by adding CAPTCHAs / anti-automation measures specifically to block this kind of third-party use.
- That blocking attempt failed technically within days; the open-data project's docs stayed up and are still the basis for the key we use.
- BA **never sent a cease-and-desist or filed suit** against the documentation project or, as far as is known, against anyone building on it. ([netzpolitik.org, 2021](https://netzpolitik.org/2021/open-data-arbeitsagentur-kaempft-gegen-offene-schnittstelle/))

So: untested in court, no known enforcement precedent either way, but BA's *stated intent* directly conflicts with Jobby's core mechanism (automated querying of their job data to power a public product). "Nobody's been sued" is not the same as "this is sanctioned."

## Consequence / mitigation

Acceptable for prototyping and continued local development. **Not to be treated as a stable foundation for a real public launch** without one of:
- reaching out to BA directly for explicit permission, or
- lining up a licensed/alternative job-data source as fallback, or
- an actual legal opinion, since this write-up is risk-awareness, not legal advice.

Separately from the legal question: fetch and cache listings server-side on a schedule rather than proxying the API live on every JobSeeker request, both because the endpoint is fragile (could change/break without notice) and because hammering it live only sharpens the "mass automated use" problem BA already objects to.
