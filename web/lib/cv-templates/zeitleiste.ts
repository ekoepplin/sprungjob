import { CVProfile } from "@/lib/cv";
import { contactWithIcons, esc, filled, icon, type IconName, page, skillLevel } from "./shared";

// Zeitleiste — light first name + small-caps last name in navy, icon contact
// lines, round photo top right, centered tagline, icon + small-caps section
// titles over a rule, dates right-aligned left of a vertical line, chevron
// bullets and small boxed tags. Inspired by darwiin/yaac-another-awesome-cv
// (LPPL 1.3c); only the visual style is reimplemented in HTML/CSS, no code copied.

const NAVY = "#1c2b72";
const INK = "#1e1e1e";
const MUTED = "#555";
const LINE = "#9a9a9a";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactWithIcons(profile)
    .map((c) => `<li>${icon(c.icon)} ${c.text}</li>`)
    .join("");

  const name = (profile.name || "Dein Name").trim();
  const split = name.lastIndexOf(" ");
  const nameHtml =
    split > 0
      ? `${esc(name.slice(0, split))} <span class="last">${esc(name.slice(split + 1))}</span>`
      : `<span class="last">${esc(name)}</span>`;

  const section = (ic: IconName, title: string, content: string) =>
    content ? `<section><h2>${icon(ic)} ${title}</h2>${content}</section>` : "";

  // "03/2021 – heute" → two lines, like the original's stacked dates.
  const dates = (d: string) =>
    d
      .split(/\s+[–-]\s+/)
      .map(esc)
      .join("<br />");

  const timeline = (items: { dates: string; head: string; sub: string; bullets: string[] }[]) =>
    items
      .map(
        (i) => `
        <div class="item">
          <div class="when">${dates(i.dates)}</div>
          <div class="what">
            <div class="head">${i.head}</div>
            ${i.sub ? `<div class="sub">${i.sub}</div>` : ""}
            ${i.bullets.length ? `<ul>${i.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
          </div>
        </div>`,
      )
      .join("");

  const experienceHtml = timeline(
    experience.map((e) => ({
      dates: e.dates,
      head: [e.title, e.company].filter(Boolean).map(esc).join(", "),
      sub: esc(e.location),
      bullets: e.bullets,
    })),
  );
  const educationHtml = timeline(
    education.map((e) => ({ dates: e.dates, head: esc(e.degree || e.school), sub: e.degree ? esc(e.school) : "", bullets: [] })),
  );

  const skillsHtml = skills.length
    ? `<table>${skills.map((s) => `<tr><th>${esc(s.name)}</th><td>${skillLevel(s.rating)}</td></tr>`).join("")}</table>`
    : "";
  const strengthsHtml = strengths.map((s) => `<span class="tag">${esc(s)}</span>`).join("");

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Source Sans 3', Arial, sans-serif; font-size: 10.5pt; line-height: 1.35;
  }
  .page { padding: 14mm 16mm; }
  header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12pt; }
  h1 { font-size: 22pt; font-weight: 300; color: ${NAVY}; margin: 0; line-height: 1.1; }
  .last { font-weight: 400; font-variant: small-caps; letter-spacing: 0.02em; }
  .contact { list-style: none; margin: 3pt 0 0; padding: 0; font-size: 9.5pt; }
  .contact .icon { color: ${INK}; margin-right: 2pt; }
  .photo { width: 30mm; height: 30mm; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
  .tagline { text-align: center; color: ${NAVY}; font-size: 16pt; margin: 10pt 0 4pt; }
  h2 {
    display: flex; align-items: center; gap: 6pt; font-size: 15pt; font-weight: 400;
    font-variant: small-caps; color: ${NAVY}; margin: 14pt 0 8pt; padding-bottom: 2pt; border-bottom: 0.75pt solid ${INK};
  }
  table { border-collapse: collapse; }
  th { text-align: right; font-weight: 400; padding: 1pt 10pt 1pt 0; white-space: nowrap; }
  td { padding: 1pt 0; }
  .item { display: grid; grid-template-columns: 26mm 1fr; break-inside: avoid; }
  .item + .item { margin-top: 10pt; }
  .when { text-align: right; font-weight: 600; font-size: 9.5pt; padding: 1pt 8pt 0 0; border-right: 0.75pt solid ${LINE}; }
  .what { padding-left: 8pt; }
  .head { font-weight: 400; }
  .sub { color: ${MUTED}; font-style: italic; font-size: 9.5pt; }
  .what ul { list-style: none; margin: 2pt 0 0; padding: 0; }
  .what li { position: relative; padding-left: 16pt; margin: 1pt 0; }
  .what li::before { content: "›"; position: absolute; left: 5pt; font-weight: 700; }
  .tag { display: inline-block; border: 0.75pt solid ${LINE}; border-radius: 2pt; padding: 0 4pt; margin: 0 3pt 3pt 0; font-size: 8.5pt; }`;

  const body = `
  <div class="page">
    <header>
      <div>
        <h1>${nameHtml}</h1>
        ${contact ? `<ul class="contact">${contact}</ul>` : ""}
      </div>
      ${profile.photo ? `<img class="photo" src="${esc(profile.photo)}" alt="" />` : ""}
    </header>
    ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
    ${section("tools", "Kompetenzen", skillsHtml)}
    ${section("briefcase", "Berufserfahrung", experienceHtml)}
    ${section("cap", "Ausbildung", educationHtml)}
    ${section("heart", "Stärken", strengthsHtml)}
  </div>`;

  return page(profile, css, body);
}
