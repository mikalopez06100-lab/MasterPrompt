import { notFound } from "next/navigation";
import { getProposalBySlug } from "@/lib/proposals";
import { ogImageResponse } from "@/lib/og-image";

export const alt = "Proposition confidentielle Master Prompt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: { slug: string } };

export default async function Image({ params }: Props) {
  const proposal = getProposalBySlug(params.slug);
  if (!proposal) notFound();

  const subline =
    proposal.ogShareSubline?.trim() ||
    proposal.subtitle.replace(/\s+/g, " ").slice(0, 120) +
      (proposal.subtitle.length > 120 ? "..." : "");

  return ogImageResponse({
    eyebrow: "Espace proposition confidentiel",
    headline: proposal.clientName,
    subline,
  });
}
