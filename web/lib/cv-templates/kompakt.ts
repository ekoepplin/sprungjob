import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page, skillLevel } from "./shared";

// Kompakt — dense layout aimed at a single A4 page: section labels in a
// narrow left column, one-line entry heads, skills inline. Inspired by
// Cicatrice/cv4tw "compact" and dnl-blkv/mcdowell-cv (both MIT);
// reimplemented in HTML/CSS, no code copied.

const ACCENT = "#3f6b4f";
const INK = "#1b1f1c";
const MUTED = "#636b65";
const LINE = "#d9ded9";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);

  const entry = (head: string, dates: string, bullets: string[]) => `
      <div class="entry">
        <div class="row"><span>${head}</span><span class="dates">${esc(dates)}</span></div>
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`;

  const experienceHtml = experience
    .map((e) =>
      entry(
        `<strong>${esc(e.title)}</strong>${e.company ? ` — ${esc(e.company)}` : ""}${e.location ? `<span class="muted">, ${esc(e.location)}</span>` : ""}`,
        e.dates,
        e.bullets,
      ),
    )
    .join("");

  const educationHtml = education
    .map((e) =>
      entry(`<strong>${esc(e.degree)}</strong>${e.school ? ` — ${esc(e.school)}` : ""}`, e.dates, []),
    )
    .join("");

  const skillsHtml = skills
    .map((s) => `${esc(s.name)} <span class="muted">(${skillLevel(s.rating)})</span>`)
    .join(" &nbsp;·&nbsp; ");

  const section = (label: string, content: string) =>
    content ? `<section><h2>${label}</h2><div>${content}</div></section>` : "";

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Inter', Arial, sans-serif; font-size: 9pt; line-height: 1.38;
  }
  .page { padding: 12mm 14mm; }
  header { display: flex; align-items: center; gap: 12pt; padding-bottom: 8pt; border-bottom: 1.5pt solid ${ACCENT}; }
  .who { flex: 1; }
  h1 { font-family: 'Fraunces', serif; font-size: 20pt; font-weight: 600; margin: 0; line-height: 1.1; }
  .tagline { color: ${ACCENT}; margin: 2pt 0 0; }
  .contact { list-style: none; margin: 0; padding: 0; text-align: right; color: ${MUTED}; font-size: 8.5pt; }
  .photo { width: 22mm; height: 22mm; object-fit: cover; border-radius: 3pt; }
  section { display: grid; grid-template-columns: 28mm 1fr; gap: 10pt; padding: 7pt 0; border-bottom: 1px solid ${LINE}; }
  section:last-child { border-bottom: 0; }
  h2 { font-size: 8pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${ACCENT}; margin: 1pt 0 0; }
  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 5pt; }
  .row { display: flex; justify-content: space-between; gap: 10pt; }
  .dates, .muted { color: ${MUTED}; }
  .dates { white-space: nowrap; font-size: 8.5pt; }
  ul { margin: 1.5pt 0 0; padding-left: 11pt; }
  li { margin: 0.5pt 0; }`;

  const contact = contactItems(profile)
    .map((c) => `<li>${c}</li>`)
    .join("");

  const body = `
  <div class="page">
    <header>
      <div class="who">
        <h1>${esc(profile.name || "Dein Name")}</h1>
        ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      </div>
      ${contact ? `<ul class="contact">${contact}</ul>` : ""}
      ${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}
    </header>
    ${section("Erfahrung", experienceHtml)}
    ${section("Ausbildung", educationHtml)}
    ${section("Skills", skillsHtml)}
    ${section("Stärken", strengths.map(esc).join(" &nbsp;·&nbsp; "))}
  </div>`;

  return page(profile, css, body);
}
