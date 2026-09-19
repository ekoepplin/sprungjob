import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import { renderCvHtml } from "@/lib/cv-template";
import { CVProfile } from "@/lib/cv";

// Dev-only shortcut: drives the Chrome already installed on this machine
// instead of bundling/downloading a Chromium binary. A real deployment
// needs a hosted browser (e.g. bundled puppeteer, or a service like
// Browserless) — this executablePath won't exist on a server.
const CHROME_PATH =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function POST(req: NextRequest) {
  const profile = (await req.json()) as CVProfile;
  const html = renderCvHtml(profile);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
    });

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${(profile.name || "cv")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")}.pdf"`,
      },
    });
  } finally {
    await browser.close();
  }
}
