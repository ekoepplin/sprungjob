import type { MetadataRoute } from "next";

const pages = ["/", "/jobs", "/cv", "/impressum", "/datenschutz"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path) => ({ url: `https://sprungjob.de${path}` }));
}
