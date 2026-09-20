# Sprungjob

A job board for career changers (Quereinsteiger) seeking work in Germany: they browse job postings, pick one, and generate a CV from a template.

## Language

**JobSeeker**:
An account holder using the platform to find work and generate a CV. Always a career changer in this domain — profession-agnostic, scoped via the Jobsuche API's `quereinstieg` filter rather than one target profession.
_Avoid_: User, Candidate, Applicant

**Job**:
A job posting fetched live from Bundesagentur für Arbeit's Jobsuche service, via an interface BA has publicly stated is not intended for third-party automated use (see [[0001-unofficial-jobsuche-api-as-job-source]]). Sprungjob does not create, own, or have a licensed right to this data.
_Avoid_: Listing, Posting, Vacancy, Stelle

**CVTemplate**:
A swappable visual design definition used to render a JobSeeker's CV data into a document. AltaCV is the first (and currently only) CVTemplate.
_Avoid_: Theme, Layout, Design

**CV**:
The document generated from a JobSeeker's data via a CVTemplate.
_Avoid_: Resume, Lebenslauf (fine as UI-facing German label, but the domain term stays CV)
