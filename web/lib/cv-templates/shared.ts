import { CVEducation, CVExperience, CVProfile, CVSkill } from "@/lib/cv";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Self-hosted (public/fonts) — loading from Google would send visitor IPs to Google (DSGVO).
const fontFaces = `
  @font-face { font-family: 'Fraunces'; font-style: normal; font-weight: 400 600; font-display: swap; src: url('/fonts/fraunces-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400 600; font-display: swap; src: url('/fonts/inter-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Lato'; font-style: normal; font-weight: 300; font-display: swap; src: url('/fonts/lato-300-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Lato'; font-style: normal; font-weight: 400; font-display: swap; src: url('/fonts/lato-400-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Lato'; font-style: normal; font-weight: 700; font-display: swap; src: url('/fonts/lato-700-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Raleway'; font-style: normal; font-weight: 300 700; font-display: swap; src: url('/fonts/raleway-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Source Sans 3'; font-style: normal; font-weight: 300 700; font-display: swap; src: url('/fonts/source-sans-3-latin.woff2') format('woff2'); }
  @font-face { font-family: 'Roboto Slab'; font-style: normal; font-weight: 400 700; font-display: swap; src: url('/fonts/roboto-slab-latin.woff2') format('woff2'); }`;

/** The profile without the blank rows the editor keeps around for input. */
export function filled(profile: CVProfile): {
  experience: (CVExperience & { bullets: string[] })[];
  education: CVEducation[];
  skills: CVSkill[];
  strengths: string[];
} {
  return {
    experience: profile.experience
      .filter((e) => e.title || e.company)
      .map((e) => ({ ...e, bullets: e.bullets.filter(Boolean) })),
    education: profile.education.filter((e) => e.degree || e.school),
    // The number input can hold anything (empty → 0, typed 9); templates size bars/dots from it.
    skills: profile.skills
      .filter((s) => s.name)
      .map((s) => ({ ...s, rating: Math.min(5, Math.max(1, Math.round(s.rating) || 1)) })),
    strengths: profile.strengths.filter(Boolean),
  };
}

/** Text for a 1–5 rating, for templates that list skills as text (ATS-readable). */
export function skillLevel(rating: number): string {
  return [
    "Grundkenntnisse",
    "Erweiterte Kenntnisse",
    "Gute Kenntnisse",
    "Sehr gute Kenntnisse",
    "Expertenwissen",
  ][rating - 1];
}

/** Email, phone, location, homepage — escaped, empty ones dropped. */
export function contactItems(profile: CVProfile): string[] {
  return [profile.email, profile.phone, profile.location, profile.homepage]
    .filter(Boolean)
    .map(esc);
}

// Simple 24×24 glyphs standing in for the FontAwesome icons several originals use.
const ICONS = {
  mail: `<path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 6l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/>`,
  phone: `<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/>`,
  pin: `<path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>`,
  link: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
  briefcase: `<path fill-rule="evenodd" d="M10 3h4a2 2 0 0 1 2 2v1h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4V5a2 2 0 0 1 2-2zm0 3h4V5h-4z"/>`,
  cap: `<path d="M12 3L1 9l11 6 9-4.9V17h2V9zM5 13.2v4L12 21l7-3.8v-4L12 17z"/>`,
  tools: `<path d="M3 6h9M16 6h5M3 12h3M10 12h11M3 18h11M18 18h3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="6" r="2.5"/><circle cx="8" cy="12" r="2.5"/><circle cx="16" cy="18" r="2.5"/>`,
  calendar: `<path d="M4 6h16v14H4z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 6h16v4H4zM8 3v4M16 3v4" stroke="currentColor" stroke-width="2"/>`,
  heart: `<path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.3 5 6.6 5c2 0 3.5 1.1 4.4 2.5h2C13.9 6.1 15.4 5 17.4 5c3.3 0 5.5 3.3 4.1 6.7C19.5 16.4 12 21 12 21z"/>`,
};
export type IconName = keyof typeof ICONS;

/** Inline icon sized to the surrounding text and drawn in its colour. */
export function icon(name: IconName): string {
  return `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="width:1em;height:1em;vertical-align:-0.125em">${ICONS[name]}</svg>`;
}

/** Like contactItems, with a matching icon per entry. */
export function contactWithIcons(profile: CVProfile): { icon: IconName; text: string }[] {
  const items: [IconName, string][] = [
    ["mail", profile.email],
    ["phone", profile.phone],
    ["pin", profile.location],
    ["link", profile.homepage],
  ];
  return items.filter(([, v]) => v).map(([i, v]) => ({ icon: i, text: esc(v) }));
}

/** A complete A4 document. `css` and `body` are trusted template markup. */
export function page(profile: CVProfile, css: string, body: string): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<title>${esc(profile.name || "CV")}</title>
<style>${fontFaces}
  @page { size: A4; margin: 0; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
  * { box-sizing: border-box; }
  /* Never leave a section title alone at the bottom of a printed page. */
  h2 { break-after: avoid; break-inside: avoid; }
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;
}
