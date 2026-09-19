# Use the unofficial Bundesagentur Jobsuche API as sole job source

Bundesagentur für Arbeit publishes no official public API for Jobsuche. We're using the reverse-engineered endpoint documented by the community `bundesAPI/jobsuche-api` project (`https://rest.arbeitsagentur.de/jobboerse/jobsuche-service/pc/v6/jobs`, header `X-API-Key: jobboerse-jobsuche`, no registration required) — verified working 2026-09-19. It's the only Bundesagentur-native source, matching the decision to scope Jobby to German jobs from this one agency.

Risk: unofficial means no documented rate limits, no ToS guarantee, and the endpoint could change or be blocked without notice. Mitigation: fetch and cache listings server-side on a schedule rather than proxying the API live on every JobSeeker request.
