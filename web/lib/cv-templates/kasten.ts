import { CVProfile } from "@/lib/cv";
import { esc, filled, page, skillLevel } from "./shared";

// Kasten — section titles in light-grey framed boxes, name and tagline top
// left, contact top right, bulleted entries with italic role and dates and
// dash sub-points. Inspired by sc932/resume (MIT); reimplemented in HTML/CSS,
// no code copied.

const INK = "#111";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);

  const entry = (head: string, where: string, sub: string, dates: string, bullets: string[]) => `
      <div class="entry">
        <div class="row"><strong>${head}</strong><span>${where}</span></div>
        ${sub || dates ? `<div class="row"><em>${sub}</em><em>${dates}</em></div>` : ""}
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`;

  const experienceHtml = experience
    .map((e) => entry(esc(e.company || e.title), esc(e.location), e.company ? esc(e.title) : "", esc(e.dates), e.bullets))
    .join("");
  const educationHtml = education
    .map((e) => entry(esc(e.school || e.degree), "", e.school ? esc(e.degree) : "", esc(e.dates), []))
    .join("");
  const skillsHtml = skills.length
    ? `<ul class="plain">${skills.map((s) => `<li><strong>${esc(s.name)}:</strong> ${skillLevel(s.rating)}</li>`).join("")}</ul>`
    : "";
  const strengthsHtml = strengths.length
    ? `<ul class="plain">${strengths.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>`
    : "";

  const section = (title: string, content: string) =>
    content ? `<section><h2>${title}</h2>${content}</section>` : "";

  const left = [profile.tagline, profile.location].filter(Boolean).map(esc);
  const right = [profile.email, profile.phone, profile.homepage].filter(Boolean).map(esc);

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 14mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Latin Modern Roman', 'CMU Serif', 'Times New Roman', Times, 'Liberation Serif', serif;
    font-size: 11pt; line-height: 1.3;
  }
  .page { padding: 16mm 18mm; }
  header { display: flex; justify-content: space-between; gap: 16pt; }
  h1 { font-size: 16pt; font-weight: bold; margin: 0; letter-spacing: 0.02em; }
  header p { margin: 0; }
  .right { text-align: right; }
  h2 {
    font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 12pt; font-weight: 700;
    background: #ececec; border: 0.75pt solid #444; box-shadow: 0 0 0 2.5pt #c4c4c4;
    padding: 3pt 8pt; margin: 0 2.5pt 12pt;
  }
  /* Spacing on the section, not the h2: a top margin on the boxed h2 makes Chrome paint a stray rule at a page break. */
  section { padding-top: 20pt; }
  .entry { position: relative; padding: 0 12pt 0 18pt; break-inside: avoid; }
  .entry::before { content: "•"; position: absolute; left: 4pt; top: 6pt; font-size: 12pt; }
  .entry + .entry { margin-top: 8pt; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  ul { margin: 3pt 0 0; padding-left: 18pt; list-style: none; }
  li { position: relative; margin: 1.5pt 0; }
  li::before { content: "–"; position: absolute; left: -12pt; }
  ul.plain { padding-left: 30pt; }
  ul.plain li::before { content: "•"; }`;

  const body = `
  <div class="page">
    <header>
      <div>
        <h1>${esc(profile.name || "Dein Name")}</h1>
        ${left.map((l) => `<p>${l}</p>`).join("")}
      </div>
      <div class="right">${right.map((r) => `<p>${r}</p>`).join("")}</div>
    </header>
    ${section("Berufserfahrung", experienceHtml)}
    ${section("Ausbildung", educationHtml)}
    ${section("Kenntnisse", skillsHtml)}
    ${section("Stärken", strengthsHtml)}
  </div>`;

  return page(profile, css, body);
}
