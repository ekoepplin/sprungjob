import { CVProfile } from "@/lib/cv";
import * as alta from "./alta";
import * as baender from "./baender";
import * as elegant from "./elegant";
import * as kasten from "./kasten";
import * as kompakt from "./kompakt";
import * as klassisch from "./klassisch";
import * as modern from "./modern";
import * as seitenleiste from "./seitenleiste";
import * as spalten from "./spalten";
import * as zeitleiste from "./zeitleiste";

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
    description: "Zwei Spalten, dunkelrote Titel mit Goldlinie, Foto rechts oben.",
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
    description: "Hellgraue Seitenleiste mit Foto, Kontakt und Skill-Balken, blaue Akzente.",
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
    description: "Dicht gesetzt, Abschnittstitel links, ohne Foto — passt meist auf eine Seite.",
    render: kompakt.render,
  },
  {
    id: "elegant",
    label: "Elegant",
    description: "Zentrierter Name in Kapitälchen, Abschnitte mit Symbolen, Serifenschrift.",
    render: elegant.render,
  },
  {
    id: "spalten",
    label: "Spalten",
    description: "Großer, heller Name, schmale linke Spalte für Ausbildung und Skills, ohne Foto.",
    render: spalten.render,
  },
  {
    id: "baender",
    label: "Bänder",
    description: "Farbige Querbänder, orange Akzente, senkrechte Abschnittstitel.",
    render: baender.render,
  },
  {
    id: "zeitleiste",
    label: "Zeitleiste",
    description: "Daten links an einer Linie, Symbole, Foto rechts oben.",
    render: zeitleiste.render,
  },
  {
    id: "kasten",
    label: "Kasten",
    description: "Abschnittstitel in grauen Kästen, klassische Serifenschrift, ohne Foto.",
    render: kasten.render,
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
