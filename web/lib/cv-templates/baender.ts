import { CVProfile } from "@/lib/cv";
import { contactItems, esc, filled, page } from "./shared";

// Bänder — full-width horizontal bands: grey header with a thin uppercase
// name, orange tagline band, photo next to a key/value list, then alternating
// grey/white rows for experience and education with the section name set
// vertically beside an orange bar. Inspired by jankapunkt/latexcv "rows" (MIT);
// reimplemented in HTML/CSS, no code copied.

const DARK = "#666";
const ORANGE = "#ff9800";
const GREY = "#d4d4d4";
const INK = "#222";
const MUTED = "#777";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactItems(profile).join(" · ");

  const entries = (items: { title: string; org: string; dates: string; bullets: string[] }[]) =>
    items
      .map(
        (i) => `
        <div class="entry">
          <div class="row"><span><strong>${esc(i.title)}</strong>${i.org ? ` <span class="muted">(${i.org})</span>` : ""}</span><span class="muted">${esc(i.dates)}</span></div>
          ${i.bullets.length ? `<ul>${i.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
        </div>`,
      )
      .join("");

  const experienceHtml = entries(
    experience.map((e) => ({
      title: e.title || e.company,
      org: e.title ? [e.company, e.location].filter(Boolean).map(esc).join(", ") : esc(e.location),
      dates: e.dates,
      bullets: e.bullets,
    })),
  );
  const educationHtml = entries(
    education.map((e) => ({ title: e.degree || e.school, org: e.degree ? esc(e.school) : "", dates: e.dates, bullets: [] })),
  );

  const facts: [string, string][] = [
    ["Skills", skills.map((s) => esc(s.name)).join(", ")],
    ["Stärken", strengths.map(esc).join(", ")],
    ["Wohnort", esc(profile.location)],
  ];
  const factsHtml = facts
    .filter(([, v]) => v)
    .map(([k, v]) => `<div class="fact"><span class="key">› ${k}:</span><span>${v}</span></div>`)
    .join("");

  const band = (cls: string, title: string, content: string) =>
    content
      ? `<section class="band ${cls}"><div class="content">${content}</div><div class="label"><span>${title}</span></div></section>`
      : "";

  const css = `
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Raleway', Arial, sans-serif; font-size: 10pt; line-height: 1.4;
  }
  header { background: ${DARK}; color: #fff; text-align: center; padding: 6mm 12mm 4mm; }
  .contact { font-size: 8.5pt; color: #e6e6e6; margin: 0 0 3pt; }
  h1 { font-size: 30pt; font-weight: 300; text-transform: uppercase; letter-spacing: 0.04em; margin: 0; line-height: 1.15; }
  .tagline { background: ${ORANGE}; color: #fff; text-align: center; font-size: 12pt; padding: 4pt 12mm; margin: 0; }
  .intro { display: flex; gap: 8mm; align-items: flex-start; padding: 6mm 12mm; }
  .photo { width: 36mm; height: 42mm; object-fit: cover; flex-shrink: 0; }
  .fact { display: grid; grid-template-columns: 26mm 1fr; margin-bottom: 4pt; }
  .key { color: ${ORANGE}; }
  /* The page has no margin (bands run edge to edge); clone repeats the band padding on every printed page. */
  .band { display: grid; grid-template-columns: 1fr 22mm; padding: 8mm 0 8mm 12mm; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
  .band.grey { background: ${GREY}; }
  .content { padding-right: 8mm; }
  .label { border-left: 2pt solid ${ORANGE}; margin: 4mm 0; display: flex; justify-content: center; }
  .label span { writing-mode: vertical-rl; font-size: 22pt; font-weight: 300; text-transform: uppercase; letter-spacing: 0.04em; }
  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 7pt; }
  .row { display: flex; justify-content: space-between; gap: 10pt; border-bottom: 0.75pt solid rgba(0,0,0,0.12); padding-bottom: 2pt; }
  .muted { color: ${MUTED}; }
  ul { list-style: none; margin: 3pt 0 0; padding: 0; }
  li { margin: 2pt 0; padding-left: 12pt; position: relative; }
  li::before { content: "›"; color: ${ORANGE}; font-weight: 700; position: absolute; left: 2pt; }
  footer { background: ${DARK}; color: #e6e6e6; text-align: center; font-size: 8.5pt; padding: 3pt; }`;

  const body = `
  <header>
    ${contact ? `<p class="contact">${contact}</p>` : ""}
    <h1>${esc(profile.name || "Dein Name")}</h1>
  </header>
  ${profile.tagline ? `<p class="tagline">›› ${esc(profile.tagline)} ‹‹</p>` : ""}
  ${
    factsHtml || profile.photo
      ? `<div class="intro">${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}<div>${factsHtml}</div></div>`
      : ""
  }
  ${band("grey", "Erfahrung", experienceHtml)}
  ${band("white", "Ausbildung", educationHtml)}
  ${profile.homepage ? `<footer>${esc(profile.homepage)}</footer>` : ""}`;

  return page(profile, css, body);
}
