import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Master Prompt — Maîtrisez l'IA pour votre business",
  description:
    "Formation pratique en 6 modules. Prompt Engineering pour solopreneurs et micro-entrepreneurs.",
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
