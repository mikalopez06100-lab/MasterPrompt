import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { AuditClientIntakeForm } from "@/components/AuditClientIntakeForm";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Formulaire Audit Client | Master Prompt",
  description: "Questionnaire de cadrage a remplir apres signature et avant le kick-off.",
  alternates: { canonical: "https://www.masterprompt.fr/formulaire-audit" },
};

export default function FormulaireAuditPage() {
  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-4xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Formulaire audit</span>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <header className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-700">Tronc commun</p>
            <h1 className={`${syne.className} mt-2 text-3xl font-bold sm:text-4xl`}>Questionnaire de cadrage audit</h1>
            <p className="mt-3 text-sm text-slate-700">
              A remplir apres signature et avant le kick-off. Comptez environ 15 minutes.
            </p>
          </header>

          <AuditClientIntakeForm />
        </div>
      </section>
    </main>
  );
}
