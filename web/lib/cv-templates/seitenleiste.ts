import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page } from "./shared";

// Seitenleiste — dark left sidebar with photo, contact, skills and strengths;
// experience and education on the right. Inspired by Twenty Seconds CV
// (spagnuolocarmine/TwentySecondsCurriculumVitae-LaTex) and jankapunkt/latexcv
// "sidebar" (both MIT); reimplemented in HTML/CSS, no code copied.

const SIDEBAR = "#2a2420";
const SIDEBAR_INK = "#f3ece1";
const SIDEBAR_MUTED = "#b8ab9a";
const ACCENT = "#e2662f";
const INK = "#191411";
const MUTED = "#6b6259";
const LINE = "#dfd6c9";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);

  const timeline = (items: { head: string; dates: string; sub: string; bullets: string[] }[]) =>
    items
      .map(
        (i) => `
        <div class="item">
          <div class="dates">${esc(i.dates)}</div>
          <div>
            <div class="title">${esc(i.head)}</div>
            ${i.sub ? `<div class="sub">${i.sub}</div>` : ""}
            ${i.bullets.length ? `<ul>${i.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
          </div>
        </div>`,
      )
      .join("");

  const experienceHtml = timeline(
    experience.map((e) => ({
      head: e.title,
      dates: e.dates,
      sub: [e.company, e.location].filter(Boolean).map(esc).join(" · "),
      bullets: e.bullets,
    })),
  );
  const educationHtml = timeline(
    education.map((e) => ({ head: e.degree, dates: e.dates, sub: esc(e.school), bullets: [] })),
  );

  const contact = contactItems(profile)
    .map((c) => `<li>${c}</li>`)
    .join("");
  const skillsHtml = skills
    .map(
      (s) => `
        <div class="skill">
          <span>${esc(s.name)}</span>
          <span class="bar"><span style="width:${(s.rating / 5) * 100}%"></span></span>
        </div>`,
    )
    .join("");

  const css = `
  body {
    margin: 0; color: ${INK};
    font-family: 'Inter', Arial, sans-serif; font-size: 10pt; line-height: 1.45;
  }
  /* position: fixed repeats the sidebar colour on every printed page. */
  .sidebar-bg { position: fixed; top: 0; bottom: 0; left: 0; width: 66mm; background: ${SIDEBAR}; z-index: -1; }
  .layout { display: grid; grid-template-columns: 66mm 1fr; min-height: 297mm; }
  aside { color: ${SIDEBAR_INK}; padding: 16mm 8mm; }
  .photo { display: block; width: 36mm; height: 36mm; object-fit: cover; border-radius: 50%; margin: 0 auto 8mm; border: 2pt solid ${ACCENT}; }
  h1 { font-family: 'Fraunces', serif; font-size: 22pt; font-weight: 600; line-height: 1.1; margin: 0; }
  .tagline { color: ${SIDEBAR_MUTED}; margin: 6pt 0 0; }
  aside h2 { color: ${ACCENT}; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.12em; margin: 18pt 0 8pt; }
  aside ul { list-style: none; padding: 0; margin: 0; }
  aside li { margin: 0 0 4pt; word-break: break-word; }
  .skill { margin-bottom: 7pt; }
  .bar { display: block; height: 3pt; background: rgba(255,255,255,0.15); margin-top: 3pt; border-radius: 2pt; }
  .bar span { display: block; height: 100%; background: ${ACCENT}; border-radius: 2pt; }
  .tag { display: inline-block; border: 1px solid ${SIDEBAR_MUTED}; border-radius: 10pt; padding: 1pt 7pt; margin: 0 4pt 4pt 0; font-size: 8.5pt; }
  /* The page has no margin (the sidebar runs edge to edge); clone repeats main's padding on every printed page. */
  main { padding: 16mm 12mm 16mm 10mm; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  main h2 {
    font-family: 'Fraunces', serif; font-size: 14pt; font-weight: 600; margin: 0 0 10pt;
    padding-bottom: 4pt; border-bottom: 1px solid ${LINE};
  }
  main section + section { margin-top: 18pt; }
  .item { display: grid; grid-template-columns: 26mm 1fr; gap: 8pt; break-inside: avoid; }
  .item + .item { margin-top: 10pt; }
  .dates { color: ${MUTED}; font-size: 8.5pt; padding-top: 1.5pt; }
  .title { font-weight: 600; }
  .sub { color: ${ACCENT}; font-size: 9pt; }
  main ul { margin: 3pt 0 0; padding-left: 12pt; }
  main li { margin: 1.5pt 0; }`;

  const body = `
  <div class="sidebar-bg"></div>
  <div class="layout">
    <aside>
      ${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}
      <h1>${esc(profile.name || "Dein Name")}</h1>
      ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      ${contact ? `<h2>Kontakt</h2><ul>${contact}</ul>` : ""}
      ${skillsHtml ? `<h2>Skills</h2>${skillsHtml}` : ""}
      ${strengths.length ? `<h2>Stärken</h2>${strengths.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}` : ""}
    </aside>
    <main>
      ${experienceHtml ? `<section><h2>Berufserfahrung</h2>${experienceHtml}</section>` : ""}
      ${educationHtml ? `<section><h2>Ausbildung</h2>${educationHtml}</section>` : ""}
    </main>
  </div>`;

  return page(profile, css, body);
}
