import { CVProfile } from "@/lib/cv";
import { esc, filled, page, skillLevel } from "./shared";

// Kompakt — big bold centered name, bold uppercase section labels in a left
// column, bold organisation lines, square-bulleted roles with dates flush
// right and small round sub-bullets; set tight to fit one A4 page. Modelled on
// zachscrivena/simple-resume-cv (Unlicense); reimplemented in HTML/CSS, no
// code copied.

const INK = "#111";

export function render(profile: CVProfile): string {
  const { experience, education, skills, strengths } = filled(profile);

  const role = (text: string, right: string, bullets: string[] = []) => `
      <div class="role">
        <div class="row"><span>${text}</span><span>${right}</span></div>
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}
      </div>`;

  const org = (name: string, where: string) =>
    name ? `<div class="org"><strong>${esc(name)}</strong>${where ? `, ${esc(where)}` : ""}</div>` : "";

  const experienceHtml = experience
    .map(
      (e) => `
      <div class="entry">
        ${org(e.company, e.location)}
        ${role(esc(e.title), esc(e.dates), e.bullets)}
      </div>`,
    )
    .join("");

  const educationHtml = education
    .map(
      (e) => `
      <div class="entry">
        ${org(e.school, "")}
        ${role(esc(e.degree), esc(e.dates))}
      </div>`,
    )
    .join("");

  const skillsHtml = skills.map((s) => role(esc(s.name), skillLevel(s.rating))).join("");

  const section = (label: string, content: string) =>
    content ? `<section><h2>${label}</h2><div>${content}</div></section>` : "";

  const address = [profile.tagline, profile.location].filter(Boolean).map(esc).join(", ");
  const contact = [profile.email, profile.phone, profile.homepage].filter(Boolean).map(esc).join(" &nbsp;•&nbsp; ");

  const css = `
  /* Margin on follow-up pages so text doesn't start at the paper edge; page 1 uses .page padding. */
  @page { margin: 12mm 0; }
  @page :first { margin-top: 0; }
  body {
    margin: 0; background: #fff; color: ${INK};
    font-family: 'Times New Roman', Times, 'Liberation Serif', serif; font-size: 10.5pt; line-height: 1.3;
  }
  .page { padding: 12mm 16mm; }
  header { text-align: center; margin-bottom: 10pt; }
  h1 { font-size: 28pt; font-weight: bold; margin: 0; line-height: 1.1; }
  header p { margin: 1pt 0 0; font-size: 9.5pt; }
  section { display: grid; grid-template-columns: 34mm 1fr; gap: 8pt; margin-top: 9pt; }
  h2 { font-size: 10pt; font-weight: bold; text-transform: uppercase; margin: 0; }
  .entry { break-inside: avoid; }
  .entry + .entry { margin-top: 5pt; }
  .role { position: relative; padding-left: 11pt; }
  .role::before { content: ""; position: absolute; left: 1pt; top: 0.5em; width: 4pt; height: 4pt; background: ${INK}; }
  .row { display: flex; justify-content: space-between; gap: 10pt; }
  .row span:last-child { white-space: nowrap; }
  ul { margin: 1pt 0 0; padding-left: 12pt; font-size: 9.5pt; }
  li { margin: 0; }
  p.strengths { margin: 0; }`;

  const body = `
  <div class="page">
    <header>
      <h1>${esc(profile.name || "Dein Name")}</h1>
      ${address ? `<p>${address}</p>` : ""}
      ${contact ? `<p>${contact}</p>` : ""}
    </header>
    ${section("Erfahrung", experienceHtml)}
    ${section("Ausbildung", educationHtml)}
    ${section("Kenntnisse", skillsHtml)}
    ${section("Stärken", strengths.length ? `<p class="strengths">${strengths.map(esc).join(", ")}</p>` : "")}
  </div>`;

  return page(profile, css, body);
}
