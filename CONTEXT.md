# Jobby

A job board for graphic designers seeking work in Germany: they browse job postings, pick one, and generate a CV from a template.

## Language

**JobSeeker**:
An account holder using the platform to find work and generate a CV. Always a graphic designer in this domain (no other professions targeted in v1).
_Avoid_: User, Candidate, Applicant

**Job**:
A job posting sourced live from Bundesagentur für Arbeit's Jobsuche service. Jobby does not create or own Job data — it's fetched and cached from an external source.
_Avoid_: Listing, Posting, Vacancy, Stelle

**CVTemplate**:
A swappable visual design definition used to render a JobSeeker's CV data into a document. AltaCV is the first (and currently only) CVTemplate.
_Avoid_: Theme, Layout, Design

**CV**:
The document generated from a JobSeeker's data via a CVTemplate.
_Avoid_: Resume, Lebenslauf (fine as UI-facing German label, but the domain term stays CV)
