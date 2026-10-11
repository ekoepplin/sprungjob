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

const title = "Sprungjob — Jobs & CVs für Quereinsteiger";
const description =
  "Sprungjob ist die Jobbörse für Quereinsteiger: Stellen durchsuchen, Job auswählen, CV erstellen.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://sprungjob.de"),
  applicationName: "Sprungjob",
  openGraph: {
    type: "website",
    siteName: "Sprungjob",
    locale: "de_DE",
    title,
    description,
  },
  twitter: { card: "summary", title, description },
};

// Tells search engines the site's name, so a search for "sprungjob" can
// show it as the brand. Not executed, so the CSP's script-src doesn't apply.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Sprungjob",
      url: "https://sprungjob.de/",
      inLanguage: "de",
      description,
    },
    {
      "@type": "Organization",
      name: "Sprungjob",
      url: "https://sprungjob.de/",
      sameAs: ["https://github.com/ekoepplin/sprungjob"],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
