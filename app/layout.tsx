import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "700", "900"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  weight: "variable",
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") || "https://www.masterprompt.fr";

/** Image Open Graph / Twitter : fichier versionné (évite une `NEXT_PUBLIC_LOGO_URL` erronée sur Vercel). */
const ogImage = "/logo.png";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Master Prompt — Maîtrisez l'IA pour votre business",
  description:
    "Formation pratique en 7 modules. Prompt Engineering pour solopreneurs et micro-entrepreneurs.",
  ...(googleVerification && { verification: { google: googleVerification } }),
  openGraph: {
    title: "Master Prompt — Maîtrisez l'IA pour votre business",
    description:
      "Formation pratique en 7 modules. Prompt Engineering pour solopreneurs et micro-entrepreneurs.",
    images: [{ url: ogImage, alt: "MasterPrompt" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Master Prompt — Maîtrisez l'IA pour votre business",
    description:
      "Formation pratique en 7 modules. Prompt Engineering pour solopreneurs et micro-entrepreneurs.",
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <body className="font-sans font-light text-navy antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
