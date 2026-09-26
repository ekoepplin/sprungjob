import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page, skillLevel } from "./shared";

// Klassisch — one column, black on white, no photo or graphics, so applicant
// tracking systems read it in order. Inspired by sb2nov/resume and
// dnl-blkv/mcdowell-cv (both MIT); reimplemented in HTML/CSS, no code copied.

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactItems(profile).join(" &nbsp;|&nbsp; ");

  const experienceHtml = experience
    .map(
      (e) => `
      <div class="entry">
        <div class="row"><strong>${esc(e.title)}</strong><span>${esc(e.dates)}</span></div>
        <div class="row sub"><em>${esc(e.company)}</em><em>${esc(e.location)}</em></div>
        ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`,
    )
    .join("");

  const educationHtml = education
    .map(
      (e) => `
      <div class="entry">
        <div class="row"><strong>${esc(e.degree)}</strong><span>${esc(e.dates)}</span></div>
        <div class="row sub"><em>${esc(e.school)}</em></div>
      </div>`,
    )
    .join("");

  const skillsHtml = skills
    .map((s) => `<li><strong>${esc(s.name)}</strong>: ${skillLevel(s.rating)}</li>`)
    .join("");

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: #111;
    font-family: Georgia, 'Times New Roman', serif; font-size: 10.5pt; line-height: 1.4;
  }
  .page { padding: 18mm 20mm; }
  header { text-align: center; }
  h1 { font-size: 24pt; font-weight: normal; margin: 0; }
  .tagline { font-style: italic; margin: 3pt 0 0; }
  .contact { font-size: 9.5pt; margin: 6pt 0 0; }
  h2 {
    font-size: 10pt; font-weight: bold; text-transform: uppercase;
    /* No letter-spacing or small-caps: both make PDF text extract as "B E R U F…", which ATS parsers miss. */
    border-bottom: 0.75pt solid #111; margin: 16pt 0 6pt; padding-bottom: 2pt;
  }
  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 8pt; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .sub { font-size: 10pt; }
  ul { margin: 3pt 0 0; padding-left: 14pt; }
  li { margin: 1pt 0; }
  .plain { list-style: none; padding: 0; margin: 0; }`;

  const body = `
  <div class="page">
    <header>
      <h1>${esc(profile.name || "Dein Name")}</h1>
      ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      ${contact ? `<p class="contact">${contact}</p>` : ""}
    </header>
    ${experienceHtml ? `<section><h2>Berufserfahrung</h2>${experienceHtml}</section>` : ""}
    ${educationHtml ? `<section><h2>Ausbildung</h2>${educationHtml}</section>` : ""}
    ${skillsHtml ? `<section><h2>Kenntnisse</h2><ul class="plain">${skillsHtml}</ul></section>` : ""}
    ${strengths.length ? `<section><h2>Stärken</h2><p>${strengths.map(esc).join(", ")}</p></section>` : ""}
  </div>`;

  return page(profile, css, body);
}
