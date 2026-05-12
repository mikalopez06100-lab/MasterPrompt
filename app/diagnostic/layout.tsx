import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Link from "next/link";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-diag-display",
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-diag-body",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Diagnostic IA-readiness | Master Prompt",
  description:
    "7 questions, 3 minutes : découvrez votre score IA-readiness et vos 3 actions prioritaires pour votre activité.",
  alternates: { canonical: "https://www.masterprompt.fr/diagnostic" },
  openGraph: {
    title: "Diagnostic IA-readiness | Master Prompt",
    description: "Quiz gratuit — score personnalisé et recommandations pour votre activité.",
    url: "https://www.masterprompt.fr/diagnostic",
    type: "website",
    images: ["/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnostic IA-readiness | Master Prompt",
    description: "Quiz gratuit — score personnalisé et recommandations pour votre activité.",
    images: ["/logo.png"],
  },
};

export default function DiagnosticLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes diagSlideIn {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
          }
          .diag-step-panel {
            animation: diagSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes diagPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          .diag-option-selected {
            animation: diagPulse 0.35s ease;
          }
        `,
        }}
      />
      <div
        className={`${fraunces.variable} ${dmSans.variable} min-h-[100dvh] bg-[#F8F7F4] text-[#0D1B2A] antialiased`}
        style={{ fontFamily: "var(--font-diag-body), system-ui, sans-serif" }}
      >
        <header className="absolute left-0 right-0 top-0 z-20 flex justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="text-sm font-medium text-[#64748B] underline-offset-4 hover:text-[#0D1B2A] hover:underline"
          >
            ← masterprompt.fr
          </Link>
        </header>
        {children}
      </div>
    </>
  );
}
