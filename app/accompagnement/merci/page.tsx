import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function AccompagnementMerciPage() {
  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8">
          <h1 className={`${syne.className} text-3xl font-bold`}>Candidature reçue</h1>
          <p className="mt-3 text-slate-700">
            Merci. Nous revenons vers vous sous 48h avec la prochaine étape.
          </p>
          <Link href="/" className="mt-5 inline-block rounded-md bg-navy px-5 py-3 text-sm font-semibold text-white">
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </main>
  );
}
