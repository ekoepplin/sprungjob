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
  @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400 600; font-display: swap; src: url('/fonts/inter-latin.woff2') format('woff2'); }`;

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
${css}
</style>
</head>
<body>
${body}
</body>
</html>`;
}
