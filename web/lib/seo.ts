import type { Metadata } from "next";

// Each page needs its own canonical: set in the root layout, it would be
// inherited by every route and point them all at the homepage.
export function pageAlternates(path: string): Metadata["alternates"] {
  return {
    canonical: path,
    languages: { de: path, "x-default": path },
  };
}
