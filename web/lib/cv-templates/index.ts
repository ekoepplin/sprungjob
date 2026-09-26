import { CVProfile } from "@/lib/cv";
import * as alta from "./alta";
import * as kompakt from "./kompakt";
import * as klassisch from "./klassisch";
import * as modern from "./modern";
import * as seitenleiste from "./seitenleiste";

export type CVTemplate = {
  id: string;
  label: string;
  description: string;
  render: (profile: CVProfile) => string;
};

export const CV_TEMPLATES: CVTemplate[] = [
  {
    id: "alta",
    label: "Alta",
    description: "Zwei Spalten, warme Akzentfarbe, Foto rechts oben.",
    render: alta.render,
  },
  {
    id: "klassisch",
    label: "Klassisch",
    description: "Schlicht, einspaltig, ohne Foto — gut lesbar für Bewerbermanagement-Systeme.",
    render: klassisch.render,
  },
  {
    id: "seitenleiste",
    label: "Seitenleiste",
    description: "Dunkle Seitenleiste mit Foto, Kontakt und Skills.",
    render: seitenleiste.render,
  },
  {
    id: "modern",
    label: "Modern",
    description: "Zentrierter Kopf, klare Linien, Skills als Punkte.",
    render: modern.render,
  },
  {
    id: "kompakt",
    label: "Kompakt",
    description: "Dicht gesetzt, damit alles auf eine Seite passt.",
    render: kompakt.render,
  },
];

export const DEFAULT_TEMPLATE_ID = "alta";

/** Unknown or outdated ids (e.g. from localStorage) fall back to the default. */
export function getTemplate(id: string): CVTemplate {
  return (
    CV_TEMPLATES.find((t) => t.id === id) ??
    CV_TEMPLATES.find((t) => t.id === DEFAULT_TEMPLATE_ID)!
  );
}
