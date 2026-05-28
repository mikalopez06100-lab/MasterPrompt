import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgBrandSlide = {
  eyebrow: string;
  headline: string;
  subline?: string;
};

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
};

let fontsPromise: Promise<OgFont[]> | null = null;

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0 (compatible; OG/1.0)" } },
  ).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match?.[1]) {
    throw new Error(`Impossible de charger la police ${family} (${weight})`);
  }
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

async function getOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadGoogleFont("Inter", 400),
      loadGoogleFont("Inter", 700),
    ]).then(([regular, bold]) => [
      { name: "Inter", data: regular, weight: 400, style: "normal" },
      { name: "Inter", data: bold, weight: 700, style: "normal" },
    ]);
  }
  return fontsPromise;
}

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
        fontFamily: "Inter",
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
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
          }}
        >
          MP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: 44,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
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
            Maitrisez l&apos;IA, creez l&apos;exception
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
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
  const fonts = await getOgFonts();
  return new ImageResponse(renderOgBrandSlide(slide), {
    ...OG_SIZE,
    fonts,
  });
}

/** URL absolue de l'image OG dynamique pour une proposition. */
export function proposalOgImageUrl(siteUrl: string, slug: string): string {
  const base = siteUrl.replace(/\/$/, "");
  return `${base}/api/og/proposition?slug=${encodeURIComponent(slug)}`;
}
