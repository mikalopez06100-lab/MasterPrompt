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

  try {
    const image = await ogImageResponse({
      eyebrow: "Espace proposition confidentiel",
      headline: proposal.clientName,
      subline,
    });
    const bytes = await image.arrayBuffer();
    if (bytes.byteLength === 0) {
      return new Response("OG image empty", { status: 500 });
    }
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "OG generation failed";
    return new Response(message, { status: 500 });
  }
}
