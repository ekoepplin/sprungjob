import { CVProfile } from "@/lib/cv";
import { contactWithIcons, esc, filled, icon, type IconName, page, skillLevel } from "./shared";

// Elegant — centered small-caps name, icon + small-caps section titles over a
// grey rule, serif body with dates flush right. Inspired by billryan/resume
// (MIT); reimplemented in HTML/CSS, no code copied.

const INK = "#111";
const RULE = "#b5b5b5";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);
  const contact = contactWithIcons(profile)
    .map((c) => `<span>${icon(c.icon)} ${c.text}</span>`)
    .join(`<span class="sep">·</span>`);

  const section = (ic: IconName, title: string, content: string) =>
    content ? `<section><h2>${icon(ic)} ${title}</h2>${content}</section>` : "";

  const experienceHtml = experience
    .map(
      (e) => `
      <div class="entry">
        <div class="row"><span><strong>${esc(e.company || e.title)}</strong>${e.location ? ` ${esc(e.location)}` : ""}</span><span>${esc(e.dates)}</span></div>
        ${e.company && e.title ? `<div class="sub"><em>${esc(e.title)}</em></div>` : ""}
        ${e.bullets.length ? `<ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`,
    )
    .join("");

  const educationHtml = education
    .map(
      (e) => `
      <div class="entry">
        <div class="row"><strong>${esc(e.school || e.degree)}</strong><span>${esc(e.dates)}</span></div>
        ${e.school && e.degree ? `<div class="sub"><em>${esc(e.degree)}</em></div>` : ""}
      </div>`,
    )
    .join("");

  const skillsHtml = skills.length
    ? `<ul>${skills.map((s) => `<li>${esc(s.name)}: ${skillLevel(s.rating)}</li>`).join("")}</ul>`
    : "";
  const strengthsHtml = strengths.length
    ? `<ul>${strengths.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`
    : "";

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Times New Roman', Times, 'Liberation Serif', serif; font-size: 11pt; line-height: 1.35;
  }
  .page { padding: 16mm 20mm; }
  header { text-align: center; }
  h1, h2 { font-family: 'Lato', Arial, sans-serif; font-weight: 400; font-variant: small-caps; }
  h1 { font-size: 26pt; letter-spacing: 0.02em; margin: 0; line-height: 1.1; }
  .tagline { font-family: 'Lato', Arial, sans-serif; margin: 3pt 0 0; }
  .contact { font-family: 'Lato', Arial, sans-serif; font-size: 9.5pt; margin: 5pt 0 0; }
  .sep { margin: 0 6pt; }
  h2 { font-size: 14pt; letter-spacing: 0.03em; margin: 12pt 0 6pt; padding-bottom: 2pt; border-bottom: 0.75pt solid ${RULE}; }
  h2 .icon { font-size: 11pt; margin-right: 3pt; vertical-align: -0.05em !important; }
  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 7pt; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .sub { margin-top: 1pt; }
  ul { margin: 3pt 0 0; padding-left: 16pt; }
  li { margin: 1pt 0; }`;

  const body = `
  <div class="page">
    <header>
      <h1>${esc(profile.name || "Dein Name")}</h1>
      ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
      ${contact ? `<p class="contact">${contact}</p>` : ""}
    </header>
    ${section("briefcase", "Berufserfahrung", experienceHtml)}
    ${section("cap", "Ausbildung", educationHtml)}
    ${section("tools", "Kenntnisse", skillsHtml)}
    ${section("heart", "Stärken", strengthsHtml)}
  </div>`;

  return page(profile, css, body);
}
