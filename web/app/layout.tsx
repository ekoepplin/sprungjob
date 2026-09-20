import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Sprungjob — Jobs & CVs für Quereinsteiger",
  description:
    "Sprungjob ist die Jobbörse für Quereinsteiger: Stellen durchsuchen, Job auswählen, CV erstellen.",
  alternates: {
    canonical: "https://sprungjob.de",
    languages: {
      de: "https://sprungjob.de",
      "x-default": "https://sprungjob.de",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
