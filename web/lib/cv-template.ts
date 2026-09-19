import { CVProfile } from "@/lib/cv";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const ACCENT = "#b33f1e";
const INK = "#191411";
const MUTED = "#6b6259";
const LINE = "#dfd6c9";
const PAPER = "#f6f1ea";

export function renderCvHtml(profile: CVProfile): string {
  const contact = [profile.email, profile.phone, profile.location, profile.homepage]
    .filter(Boolean)
    .map(esc)
    .join(" &nbsp;&middot;&nbsp; ");

  const experience = profile.experience
    .filter((e) => e.title || e.company)
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
            e.bullets.filter(Boolean).length
              ? `<ul>${e.bullets
                  .filter(Boolean)
                  .map((b) => `<li>${esc(b)}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </div>`,
    )
    .join('<div class="divider"></div>');

  const education = profile.education
    .filter((e) => e.degree || e.school)
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

  const skills = profile.skills
    .filter((s) => s.name)
    .map(
      (s) => `
        <div class="skill">
          <span class="skill-name">${esc(s.name)}</span>
          <span class="skill-bar"><span style="width:${(s.rating / 5) * 100}%"></span></span>
        </div>`,
    )
    .join("");

  const strengths = profile.strengths
    .filter(Boolean)
    .map((s) => `<span class="tag">${esc(s)}</span>`)
    .join("");

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name || "CV")}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
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
  }
</style>
</head>
<body>
  <div class="page">
    <h1>${esc(profile.name || "Dein Name")}</h1>
    ${profile.tagline ? `<p class="tagline">${esc(profile.tagline)}</p>` : ""}
    ${contact ? `<p class="contact">${contact}</p>` : ""}
    <div class="head-divider"></div>
    <div class="columns">
      <div>
        ${experience ? `<section><h2>Berufserfahrung</h2>${experience}</section>` : ""}
      </div>
      <div>
        ${education ? `<section><h2>Ausbildung</h2>${education}</section>` : ""}
        ${skills ? `<section><h2>Skills</h2>${skills}</section>` : ""}
        ${strengths ? `<section><h2>Stärken</h2>${strengths}</section>` : ""}
      </div>
    </div>
  </div>
</body>
</html>`;
}
