import { pageAlternates } from "@/lib/seo";

// page.tsx is a client component and can't export metadata itself.
export const metadata = {
  title: "CV erstellen — Sprungjob",
  alternates: pageAlternates("/cv"),
};

export default function CvLayout({ children }: LayoutProps<"/cv">) {
  return children;
}
