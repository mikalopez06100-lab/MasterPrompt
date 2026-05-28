import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgBrandSlide = {
  eyebrow: string;
  headline: string;
  subline?: string;
};

/** Carte Open Graph 1200×630 (WhatsApp, LinkedIn, iMessage…). */
export function renderOgBrandSlide({ eyebrow, headline, subline }: OgBrandSlide) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "linear-gradient(145deg, #0B1421 0%, #141d31 45%, #1c2840 100%)",
        padding: "52px 60px",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            width: 92,
            height: 92,
            borderRadius: 20,
            background: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
          }}
        >
          MP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, lineHeight: 1.1 }}>
            <span style={{ color: "#FFFFFF" }}>Master</span>
            <span style={{ color: "#A78BFA" }}>Prompt</span>
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#94A3B8",
            }}
          >
            Maîtrisez l&apos;IA, créez l&apos;exception
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 36,
          borderTop: "1px solid rgba(167, 139, 250, 0.35)",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C4B5FD",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 54,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>
        {subline ? (
          <div
            style={{
              marginTop: 16,
              fontSize: 26,
              fontWeight: 400,
              color: "#CBD5E1",
              lineHeight: 1.35,
              maxWidth: 980,
            }}
          >
            {subline}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export async function ogImageResponse(slide: OgBrandSlide) {
  return new ImageResponse(renderOgBrandSlide(slide), {
    ...OG_SIZE,
  });
}

/** URL absolue de l'image OG dynamique pour une proposition. */
export function proposalOgImageUrl(siteUrl: string, slug: string): string {
  const base = siteUrl.replace(/\/$/, "");
  return `${base}/propositions/${slug}/opengraph-image`;
}
