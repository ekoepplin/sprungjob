import { CVProfile } from "@/lib/cv";
import { contactWithIcons, esc, filled, icon, page } from "./shared";

// Seitenleiste — light-grey left sidebar with round photo, blue name, contact
// lines behind blue icon circles, tall skill bars; on the right, section
// titles whose first three letters sit in a blue box, dates in a narrow
// column. Modelled on Twenty Seconds CV
// (spagnuolocarmine/TwentySecondsCurriculumVitae-LaTex, MIT); reimplemented
// in HTML/CSS, no code copied.

const SIDEBAR = "#e6e6e6";
const BLUE = "#1c5a8d";
const INK = "#1e1e1e";
const GREY = "#555";
const BAR_BG = "#c3c3c3";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);

  // Twenty Seconds highlights the first three letters of each main section title.
  const heading = (title: string) =>
    `<h2><span class="hl">${title.slice(0, 3)}</span>${title.slice(3)}</h2>`;
  const sideHeading = (title: string) => `<h3><span>${title}</span></h3>`;

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

  const contact = contactWithIcons(profile)
    .map((c) => `<li><span class="bubble">${icon(c.icon)}</span><span>${c.text}</span></li>`)
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
    font-family: 'Source Sans 3', Arial, sans-serif; font-size: 10pt; line-height: 1.4;
  }
  /* position: fixed repeats the sidebar colour on every printed page. */
  .sidebar-bg { position: fixed; top: 0; bottom: 0; left: 0; width: 72mm; background: ${SIDEBAR}; z-index: -1; }
  .layout { display: grid; grid-template-columns: 72mm 1fr; min-height: 297mm; }
  aside { padding: 12mm 8mm 12mm 8mm; }
  .photo { display: block; width: 50mm; height: 50mm; object-fit: cover; border-radius: 50%; margin: 0 auto 6mm; }
  h1 { font-size: 26pt; font-weight: 400; color: ${BLUE}; line-height: 1.1; margin: 0; }
  .tagline { color: #333; font-size: 13pt; text-align: right; margin: 2pt 0 8pt; }
  aside ul { list-style: none; padding: 0; margin: 0; }
  aside li { display: flex; align-items: center; gap: 8pt; margin: 0 0 5pt; word-break: break-word; }
  .bubble {
    flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center;
    width: 17pt; height: 17pt; border-radius: 50%; background: ${BLUE}; color: #fff; font-size: 9pt;
  }
  h3 { display: flex; align-items: center; gap: 6pt; font-size: 17pt; font-weight: 400; color: #333; margin: 14pt 0 6pt; }
  h3::after { content: ""; flex: 1; height: 1px; background: #333; }
  .skill { margin-bottom: 5pt; }
  .bar { display: block; height: 8pt; background: ${BAR_BG}; margin-top: 1pt; }
  .bar span { display: block; height: 100%; background: ${BLUE}; }
  .strengths { margin: 0; }
  /* The page has no margin (the sidebar runs edge to edge); clone repeats main's padding on every printed page. */
  main { padding: 12mm 12mm 12mm 7mm; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  main h2 { font-size: 20pt; font-weight: 400; color: ${GREY}; margin: 0 0 8pt; }
  .hl { background: ${BLUE}; color: #fff; border-radius: 4pt; padding: 0 2pt; }
  main section + section { margin-top: 14pt; }
  .item { display: grid; grid-template-columns: 27mm 1fr; gap: 6pt; break-inside: avoid; }
  .item + .item { margin-top: 8pt; }
  .dates { font-size: 9.5pt; }
  .title { color: ${GREY}; }
  .sub { color: ${INK}; }
  main ul { margin: 2pt 0 0; padding-left: 12pt; }
  main li { margin: 1pt 0; }`;

  const body = `
  <div class="sidebar-bg"></div>
  <div class="layout">
    <aside>
      ${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}
      <h1>${esc(profile.name || "Dein Name")}</h1>
      ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      ${contact ? `<ul>${contact}</ul>` : ""}
      ${skillsHtml ? `${sideHeading("Skills")}${skillsHtml}` : ""}
      ${strengths.length ? `${sideHeading("Stärken")}<p class="strengths">${strengths.map(esc).join("<br />")}</p>` : ""}
    </aside>
    <main>
      ${experienceHtml ? `<section>${heading("Berufserfahrung")}${experienceHtml}</section>` : ""}
      ${educationHtml ? `<section>${heading("Ausbildung")}${educationHtml}</section>` : ""}
    </main>
  </div>`;

  return page(profile, css, body);
}
