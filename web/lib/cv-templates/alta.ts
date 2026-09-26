import { CVProfile } from "@/lib/cv";
import { contactWithIcons, esc, filled, icon, page } from "./shared";

// Alta — bold uppercase slab name, dark-red uppercase section titles over a
// gold rule, red organisation lines, icon meta lines, dashed dividers, skill
// dots and outlined tags in a narrower right column. Modelled on AltaCV
// (github.com/liantze/AltaCV, LPPL 1.3c); only the visual style is
// reimplemented in HTML/CSS, no code copied.

const ACCENT = "#8f0d0d";
const HEADING = "#4d0a0a";
const GOLD = "#e3cf8f";
const INK = "#333";
const MUTED = "#666";
const DASH = "#c8c8c8";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactWithIcons(profile)
    .map((c) => `<span class="c">${icon(c.icon)} ${c.text}</span>`)
    .join("");

  const meta = (dates: string, location: string) =>
    dates || location
      ? `<div class="meta">${dates ? `<span>${icon("calendar")} ${esc(dates)}</span>` : ""}${
          location ? `<span>${icon("pin")} ${esc(location)}</span>` : ""
        }</div>`
      : "";

  const experienceHtml = experience
    .map(
      (e) => `
        <div class="event">
          ${e.title ? `<div class="title">${esc(e.title)}</div>` : ""}
          ${e.company ? `<div class="org">${esc(e.company)}</div>` : ""}
          ${meta(e.dates, e.location)}
          ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
        </div>`,
    )
    .join('<div class="divider"></div>');

  const educationHtml = education
    .map(
      (e) => `
        <div class="event">
          ${e.degree ? `<div class="title">${esc(e.degree)}</div>` : ""}
          ${e.school ? `<div class="org">${esc(e.school)}</div>` : ""}
          ${meta(e.dates, "")}
        </div>`,
    )
    .join('<div class="divider"></div>');

  const skillsHtml = skills
    .map(
      (s) => `
        <div class="skill">
          <span>${esc(s.name)}</span>
          <span class="dots">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= s.rating ? "on" : ""}"></i>`).join("")}</span>
        </div>`,
    )
    .join("");

  const strengthsHtml = strengths.map((s) => `<span class="tag">${esc(s)}</span>`).join("");

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Lato', Arial, sans-serif; font-size: 10pt; line-height: 1.4;
  }
  .page { padding: 14mm 14mm; }
  .head { display: flex; justify-content: space-between; align-items: center; gap: 16pt; }
  h1 { font-family: 'Roboto Slab', serif; font-size: 26pt; font-weight: 700; text-transform: uppercase; color: #000; margin: 0; line-height: 1.1; }
  .tagline { color: ${ACCENT}; font-weight: 700; font-size: 12.5pt; margin: 3pt 0 0; }
  .contact { display: flex; flex-wrap: wrap; gap: 2pt 14pt; margin: 6pt 0 0; font-size: 8pt; color: ${MUTED}; }
  .c .icon { color: ${ACCENT}; }
  .photo { width: 30mm; height: 30mm; object-fit: cover; border-radius: 50%; flex-shrink: 0; }
  .columns { display: grid; grid-template-columns: 56fr 40fr; gap: 18pt; margin-top: 14pt; }
  h2 {
    font-family: 'Roboto Slab', serif; font-size: 15pt; font-weight: 700; text-transform: uppercase;
    color: ${HEADING}; margin: 0 0 8pt; padding-bottom: 1pt; border-bottom: 2pt solid ${GOLD};
  }
  section + section { margin-top: 14pt; }
  .event { break-inside: avoid; }
  .title { font-size: 12pt; color: ${INK}; }
  .org { color: ${ACCENT}; font-weight: 700; }
  .meta { display: flex; gap: 22pt; color: ${MUTED}; font-size: 8.5pt; margin-top: 2pt; }
  .meta .icon { color: ${MUTED}; }
  .divider { border-top: 1px dashed ${DASH}; margin: 8pt 0; }
  ul { margin: 4pt 0 0; padding-left: 12pt; color: ${MUTED}; }
  li { margin: 1pt 0; }
  li::marker { color: #999; }
  .skill { display: flex; justify-content: space-between; align-items: center; font-weight: 700; padding: 5pt 0; }
  .skill + .skill { border-top: 1px dashed ${DASH}; }
  .dots i { display: inline-block; width: 8pt; height: 8pt; border-radius: 50%; background: #d3d3d3; margin-left: 3pt; }
  .dots i.on { background: ${ACCENT}; }
  .tag {
    display: inline-block; border: 1px solid #c8c8c8; border-radius: 3pt;
    padding: 1pt 5pt; margin: 0 4pt 4pt 0; color: ${MUTED};
  }`;

  const body = `
  <div class="page">
    <div class="head">
      <div>
        <h1>${esc(profile.name || "Dein Name")}</h1>
        ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
        ${contact ? `<p class="contact">${contact}</p>` : ""}
      </div>
      ${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}
    </div>
    <div class="columns">
      <div>
        ${experienceHtml ? `<section><h2>Berufserfahrung</h2>${experienceHtml}</section>` : ""}
      </div>
      <div>
        ${strengthsHtml ? `<section><h2>Stärken</h2>${strengthsHtml}</section>` : ""}
        ${skillsHtml ? `<section><h2>Skills</h2>${skillsHtml}</section>` : ""}
        ${educationHtml ? `<section><h2>Ausbildung</h2>${educationHtml}</section>` : ""}
      </div>
    </div>
  </div>`;

  return page(profile, css, body);
}
