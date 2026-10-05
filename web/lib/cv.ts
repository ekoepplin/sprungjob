export type CVExperience = {
  title: string;
  company: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type CVEducation = {
  degree: string;
  school: string;
  dates: string;
};

export type CVSkill = {
  name: string;
  rating: number; // 1-5
};

export type CVProfile = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  homepage: string;
  photo: string; // data URL, empty string if none
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  strengths: string[];
};

export const emptyProfile: CVProfile = {
  name: "",
  tagline: "",
  email: "",
  phone: "",
  location: "",
  homepage: "",
  photo: "",
  experience: [
    { title: "", company: "", dates: "", location: "", bullets: [""] },
  ],
  education: [{ degree: "", school: "", dates: "" }],
  skills: [{ name: "", rating: 3 }],
  strengths: [],
};

// Neutral avatar so templates with a photo slot show it in the sample.
const SAMPLE_PHOTO = `data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120' width='600' height='600'><rect width='120' height='120' fill='#d9dde3'/><circle cx='60' cy='46' r='22' fill='#a3abb7'/><path d='M18 120c0-26 19-42 42-42s42 16 42 42z' fill='#a3abb7'/></svg>",
)}`;

/** Shown in the preview while the JobSeeker hasn't typed anything; never stored. */
export const sampleProfile: CVProfile = {
  name: "Max Mustermann",
  tagline: "Quereinsteiger in die Logistik mit 8 Jahren Erfahrung im Einzelhandel",
  email: "max.mustermann@example.com",
  phone: "+49 30 1234567",
  location: "Berlin",
  homepage: "example.com/max-mustermann",
  photo: SAMPLE_PHOTO,
  experience: [
    {
      title: "Lagerhelfer (Aushilfe)",
      company: "Nordlicht Logistik GmbH",
      dates: "2024 – heute",
      location: "Berlin",
      bullets: [
        "Wareneingang prüfen, einlagern und im Lagersystem buchen",
        "Kommissionierung von ca. 150 Positionen pro Schicht",
        "Staplerschein erworben, Einsatz im Hochregallager",
      ],
    },
    {
      title: "Stellvertretender Filialleiter",
      company: "Frischmarkt Mustermann KG",
      dates: "2018 – 2024",
      location: "Berlin",
      bullets: [
        "Dienstplanung für ein Team von 12 Mitarbeitenden",
        "Warenbestellung und Bestandskontrolle, Inventurverlust um 20 % gesenkt",
        "Einarbeitung von Auszubildenden und Aushilfen",
      ],
    },
    {
      title: "Verkäufer",
      company: "Frischmarkt Mustermann KG",
      dates: "2016 – 2018",
      location: "Potsdam",
      bullets: [
        "Kassenabwicklung und Kundenberatung im Tagesgeschäft",
        "Annahme und Kontrolle von Lieferungen",
      ],
    },
  ],
  education: [
    { degree: "Staplerschein (DGUV G 308)", school: "TÜV Rheinland Akademie", dates: "2024" },
    { degree: "Kaufmann im Einzelhandel (IHK)", school: "OSZ Handel I, Berlin", dates: "2013 – 2016" },
    { degree: "Mittlerer Schulabschluss", school: "Lessing-Schule, Potsdam", dates: "2013" },
  ],
  skills: [
    { name: "Warenwirtschaftssysteme", rating: 4 },
    { name: "Gabelstapler", rating: 3 },
    { name: "Microsoft Excel", rating: 3 },
    { name: "Personalplanung", rating: 4 },
    { name: "Englisch", rating: 2 },
  ],
  strengths: ["Zuverlässig", "Teamfähig", "Belastbar", "Organisiert"],
};

/** True while every text field is empty (ratings don't count). */
export function isBlankProfile(p: CVProfile): boolean {
  return [
    p.name, p.tagline, p.email, p.phone, p.location, p.homepage, p.photo,
    ...p.experience.flatMap((e) => [e.title, e.company, e.dates, e.location, ...e.bullets]),
    ...p.education.flatMap((e) => [e.degree, e.school, e.dates]),
    ...p.skills.map((s) => s.name),
    ...p.strengths,
  ].every((t) => !t.trim());
}

export const CV_STORAGE_KEY = "sprungjob:cv-profile";
// Kept apart from the profile: a CV is JobSeeker data + a CVTemplate.
export const CV_TEMPLATE_STORAGE_KEY = "sprungjob:cv-template";
