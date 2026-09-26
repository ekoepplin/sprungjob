import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page } from "./shared";

// Alta — two columns, serif headings, warm accent. Loosely inspired by
// AltaCV (github.com/liantze/AltaCV); reimplemented in HTML/CSS, no code copied.

const ACCENT = "#b33f1e";
const INK = "#191411";
const MUTED = "#6b6259";
const LINE = "#dfd6c9";
const PAPER = "#f6f1ea";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactItems(profile).join(" &nbsp;&middot;&nbsp; ");

  const experienceHtml = experience
    .map(
      (e) => `
        <div class="event">
          <div class="event-head">
            <span class="event-title">${esc(e.title)}</span>
            <span class="event-dates">${esc(e.dates)}</span>
          </div>
          <div class="event-sub">${esc(e.company)}${
            e.location ? ` &nbsp;&middot;&nbsp; ${esc(e.location)}` : ""
          }</div>
          ${
            e.bullets.length
              ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`
              : ""
          }
        </div>`,
    )
    .join('<div class="divider"></div>');

  const educationHtml = education
    .map(
      (e) => `
        <div class="event">
          <div class="event-head">
            <span class="event-title">${esc(e.degree)}</span>
            <span class="event-dates">${esc(e.dates)}</span>
          </div>
          <div class="event-sub">${esc(e.school)}</div>
        </div>`,
    )
    .join('<div class="divider"></div>');

  const skillsHtml = skills
    .map(
      (s) => `
        <div class="skill">
          <span class="skill-name">${esc(s.name)}</span>
          <span class="skill-bar"><span style="width:${(s.rating / 5) * 100}%"></span></span>
        </div>`,
    )
    .join("");

  const strengthsHtml = strengths.map((s) => `<span class="tag">${esc(s)}</span>`).join("");

  const css = `
  body {
    margin: 0;
    background: ${PAPER};
    color: ${INK};
    font-family: 'Inter', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.45;
  }
  .page { padding: 20mm 16mm; }
  h1 { font-family: 'Fraunces', serif; font-size: 30pt; font-weight: 600; margin: 0; }
  .tagline { color: ${ACCENT}; font-style: italic; font-size: 13pt; margin: 4pt 0 0; }
  .contact { margin: 10pt 0 0; color: ${MUTED}; font-size: 9pt; }
  .head-divider { height: 1px; background: ${LINE}; margin: 14pt 0 18pt; }
  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16pt; }
  .photo { width: 32mm; height: 32mm; object-fit: cover; border: 1px solid ${LINE}; border-radius: 50%; flex-shrink: 0; }
  .columns { display: grid; grid-template-columns: 3fr 2fr; gap: 22pt; }
  h2 {
    font-family: 'Fraunces', serif; font-size: 12pt; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.06em; color: ${ACCENT};
    margin: 0 0 10pt;
  }
  section + section { margin-top: 20pt; }
  .event + .event, .divider { margin-top: 10pt; }
  .event-head { display: flex; justify-content: space-between; gap: 8pt; }
  .event-title { font-weight: 600; }
  .event-dates, .event-sub { color: ${MUTED}; font-size: 9.5pt; }
  ul { margin: 4pt 0 0; padding-left: 14pt; }
  li { margin: 2pt 0; }
  .skill { margin-bottom: 8pt; }
  .skill-name { font-size: 9.5pt; }
  .skill-bar { display: block; height: 3pt; background: ${LINE}; margin-top: 3pt; }
  .skill-bar span { display: block; height: 100%; background: ${ACCENT}; }
  .tag {
    display: inline-block; border: 1px solid ${LINE}; border-radius: 2pt;
    padding: 2pt 7pt; margin: 0 5pt 5pt 0; font-size: 8.5pt; color: ${MUTED};
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
    <div class="head-divider"></div>
    <div class="columns">
      <div>
        ${experienceHtml ? `<section><h2>Berufserfahrung</h2>${experienceHtml}</section>` : ""}
      </div>
      <div>
        ${educationHtml ? `<section><h2>Ausbildung</h2>${educationHtml}</section>` : ""}
        ${skillsHtml ? `<section><h2>Skills</h2>${skillsHtml}</section>` : ""}
        ${strengthsHtml ? `<section><h2>Stärken</h2>${strengthsHtml}</section>` : ""}
      </div>
    </div>
  </div>`;

  return page(profile, css, body);
}
