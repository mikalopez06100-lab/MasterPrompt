import { getProposalBySlug } from "@/lib/proposals";
import { ogImageResponse } from "@/lib/og-image";

export const runtime = "edge";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug")?.trim();
  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const proposal = getProposalBySlug(slug);
  if (!proposal) {
    return new Response("Not found", { status: 404 });
  }

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
