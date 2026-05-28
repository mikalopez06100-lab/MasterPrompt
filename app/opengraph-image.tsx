import { ogImageResponse } from "@/lib/og-image";

export const runtime = "edge";
export const alt = "Master Prompt — Maîtrisez l'IA pour votre business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return ogImageResponse({
    eyebrow: "Formation & accompagnement IA",
    headline: "Maîtrisez l'IA pour votre business",
    subline: "Prompt Engineering · Méthode PACO · Entrepreneurs & indépendants",
  });
}
