import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page } from "./shared";

// Modern — centered header, light/bold name, accent-coloured section titles
// with a trailing rule, skill dots. Inspired by posquit0/Awesome-CV (LPPL 1.3c);
// only the visual style is reimplemented in HTML/CSS, no code copied.

const ACCENT = "#1f6f8b";
const INK = "#1d1d1f";
const MUTED = "#6e6e73";
const LINE = "#d2d2d7";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactItems(profile).join(`<span class="sep">|</span>`);

  // "Maria Schneider" → light "Maria", bold "Schneider".
  const name = (profile.name || "Dein Name").trim();
  const split = name.lastIndexOf(" ");
  const nameHtml =
    split > 0
      ? `<span class="first">${esc(name.slice(0, split))}</span> <span class="last">${esc(name.slice(split + 1))}</span>`
      : `<span class="last">${esc(name)}</span>`;

  // Awesome-CV colours the first three letters of each section title.
  const heading = (title: string) =>
    `<h2><span class="accent">${title.slice(0, 3)}</span>${title.slice(3)}<span class="rule"></span></h2>`;

  const experienceHtml = experience
    .map(
      (e) => `
      <div class="entry">
        <div class="row"><span class="title">${esc(e.title)}</span><span class="where">${esc(e.location)}</span></div>
        <div class="row"><span class="org">${esc(e.company)}</span><span class="dates">${esc(e.dates)}</span></div>
        ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`,
    )
    .join("");

  const educationHtml = education
    .map(
      (e) => `
      <div class="entry">
        <div class="row"><span class="title">${esc(e.degree)}</span><span class="dates">${esc(e.dates)}</span></div>
        <div class="row"><span class="org">${esc(e.school)}</span></div>
      </div>`,
    )
    .join("");

  const skillsHtml = skills
    .map(
      (s) => `
      <div class="skill">
        <span>${esc(s.name)}</span>
        <span class="dots">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= s.rating ? "on" : ""}"></i>`).join("")}</span>
      </div>`,
    )
    .join("");

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Inter', Arial, sans-serif; font-size: 10pt; line-height: 1.45;
  }
  .page { padding: 16mm 18mm; }
  header { text-align: center; }
  .photo { width: 28mm; height: 28mm; object-fit: cover; border-radius: 50%; margin-bottom: 6pt; }
  h1 { font-size: 28pt; line-height: 1.1; margin: 0; letter-spacing: -0.01em; }
  .first { font-weight: 400; color: ${MUTED}; }
  .last { font-weight: 600; }
  .tagline { color: ${ACCENT}; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.14em; margin: 6pt 0 0; }
  .contact { color: ${MUTED}; font-size: 8.5pt; margin: 8pt 0 0; }
  .sep { margin: 0 6pt; color: ${LINE}; }
  h2 { display: flex; align-items: center; font-size: 14pt; font-weight: 600; margin: 18pt 0 8pt; }
  .accent { color: ${ACCENT}; }
  .rule { flex: 1; height: 1px; background: ${LINE}; margin-left: 8pt; }
  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 9pt; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .title { font-weight: 600; }
  .where { color: ${ACCENT}; font-size: 9pt; }
  .org { color: ${MUTED}; font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.06em; }
  .dates { color: ${MUTED}; font-size: 8.5pt; font-style: italic; }
  ul { margin: 3pt 0 0; padding-left: 13pt; color: #3a3a3c; }
  li { margin: 1.5pt 0; }
  .skills { display: grid; grid-template-columns: 1fr 1fr; gap: 5pt 24pt; }
  .skill { display: flex; justify-content: space-between; align-items: center; }
  .dots i { display: inline-block; width: 6pt; height: 6pt; border-radius: 50%; background: ${LINE}; margin-left: 3pt; }
  .dots i.on { background: ${ACCENT}; }
  .strengths { color: #3a3a3c; margin: 0; }`;

  const body = `
  <div class="page">
    <header>
      ${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}
      <h1>${nameHtml}</h1>
      ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      ${contact ? `<p class="contact">${contact}</p>` : ""}
    </header>
    ${experienceHtml ? `<section>${heading("Berufserfahrung")}${experienceHtml}</section>` : ""}
    ${educationHtml ? `<section>${heading("Ausbildung")}${educationHtml}</section>` : ""}
    ${skillsHtml ? `<section>${heading("Skills")}<div class="skills">${skillsHtml}</div></section>` : ""}
    ${strengths.length ? `<section>${heading("Stärken")}<p class="strengths">${strengths.map(esc).join(" · ")}</p></section>` : ""}
  </div>`;

  return page(profile, css, body);
}
