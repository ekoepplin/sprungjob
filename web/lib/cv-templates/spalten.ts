import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page, skillLevel } from "./shared";

// Spalten — huge light name with the last name darker, thin rule, narrow left
// column (education, skills, strengths) and wide right column (experience),
// thin uppercase section titles. Inspired by deedy/Deedy-Resume (Apache-2.0);
// reimplemented in HTML/CSS, no code copied.

const INK = "#1a1a1a";
const LIGHT = "#8c8c8c";
const TEXT = "#333";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactItems(profile).join(" | ");

  // "Maria Schneider" → light "Maria", regular "Schneider".
  const name = (profile.name || "Dein Name").trim();
  const split = name.lastIndexOf(" ");
  const nameHtml =
    split > 0
      ? `<span class="first">${esc(name.slice(0, split))}</span> <span class="last">${esc(name.slice(split + 1))}</span>`
      : `<span class="last">${esc(name)}</span>`;

  const experienceHtml = experience
    .map(
      (e) => `
      <div class="entry">
        <h3>${esc(e.company || e.title)}${e.company && e.title ? ` <span class="role">| ${esc(e.title)}</span>` : ""}</h3>
        <div class="meta">${[e.dates, e.location].filter(Boolean).map(esc).join(" | ")}</div>
        ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`,
    )
    .join("");

  const educationHtml = education
    .map(
      (e) => `
      <div class="entry">
        <h3>${esc(e.school || e.degree)}</h3>
        ${e.school && e.degree ? `<div class="degree">${esc(e.degree)}</div>` : ""}
        ${e.dates ? `<div class="meta">${esc(e.dates)}</div>` : ""}
      </div>`,
    )
    .join("");

  // Deedy groups skills by experience ("Over 5000 lines: …"); here by rating, best first.
  const skillsHtml = [5, 4, 3, 2, 1]
    .map((r) => {
      const names = skills.filter((s) => s.rating === r).map((s) => esc(s.name));
      return names.length ? `<h4>${skillLevel(r)}</h4><p>${names.join(" • ")}</p>` : "";
    })
    .join("");

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 12mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${TEXT};
    font-family: 'Lato', Arial, sans-serif; font-weight: 300; font-size: 10pt; line-height: 1.35;
  }
  .page { padding: 12mm 13mm; }
  header { text-align: center; padding-bottom: 7pt; border-bottom: 0.75pt solid ${LIGHT}; }
  h1 { font-size: 36pt; font-weight: 300; margin: 0; line-height: 1.05; }
  .first { color: ${LIGHT}; }
  .last { color: ${INK}; font-weight: 400; }
  .tagline, .contact { font-family: 'Raleway', 'Lato', sans-serif; margin: 3pt 0 0; font-size: 9.5pt; color: ${TEXT}; }
  .columns { display: grid; grid-template-columns: 32% 1fr; gap: 16pt; margin-top: 8pt; }
  h2 { font-size: 16pt; font-weight: 300; text-transform: uppercase; color: ${LIGHT}; margin: 8pt 0 3pt; letter-spacing: 0.01em; }
  h3 { font-size: 10.5pt; font-weight: 700; text-transform: uppercase; color: ${INK}; margin: 0; letter-spacing: 0.02em; }
  .role { font-weight: 400; text-transform: none; font-variant: small-caps; letter-spacing: 0.03em; }
  h4 { font-size: 9.5pt; font-weight: 700; text-transform: uppercase; color: ${INK}; margin: 5pt 0 0; }
  .degree { font-variant: small-caps; font-weight: 400; color: ${INK}; letter-spacing: 0.02em; }
  .meta { font-family: 'Raleway', 'Lato', sans-serif; font-size: 8.5pt; font-weight: 400; color: ${TEXT}; }
  .entry { break-inside: avoid; margin-bottom: 7pt; }
  p { margin: 0; }
  ul { margin: 2pt 0 0; padding-left: 14pt; }
  li { margin: 0.5pt 0; }`;

  const body = `
  <div class="page">
    <header>
      <h1>${nameHtml}</h1>
      ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      ${contact ? `<p class="contact">${contact}</p>` : ""}
    </header>
    <div class="columns">
      <div>
        ${educationHtml ? `<section><h2>Ausbildung</h2>${educationHtml}</section>` : ""}
        ${skillsHtml ? `<section><h2>Skills</h2>${skillsHtml}</section>` : ""}
        ${strengths.length ? `<section><h2>Stärken</h2><p>${strengths.map(esc).join("<br />")}</p></section>` : ""}
      </div>
      <div>
        ${experienceHtml ? `<section><h2>Erfahrung</h2>${experienceHtml}</section>` : ""}
      </div>
    </div>
  </div>`;

  return page(profile, css, body);
}
