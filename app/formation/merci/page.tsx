import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function FormationMerciPage() {
  const pageUrl = "https://www.masterprompt.fr/formation";
  const shareText = encodeURIComponent("J'ai précommandé la Formation Master Prompt à 49€.");
  const url = encodeURIComponent(pageUrl);

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8">
          <h1 className={`${syne.className} text-3xl font-bold`}>Merci pour votre précommande</h1>
          <p className="mt-3 text-slate-700">
            Votre place est réservée. Rendez-vous le 1er juillet 2026 pour l'accès complet à la Formation Master Prompt.
          </p>
          <p className="mt-2 text-sm text-muted">
            Vous recevrez un email de confirmation dans les prochaines minutes, puis un teaser exclusif des modules chaque semaine jusqu&apos;à l&apos;accès.
          </p>

          <div className="mt-6">
            <p className="text-sm font-semibold text-navy">
              Vous connaissez un entrepreneur qui galère avec l&apos;IA ? Partagez-lui la page :
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`https://wa.me/?text=${shareText}%20${url}`} target="_blank" rel="noreferrer noopener" className="rounded-md border border-border px-4 py-2 text-sm">
                WhatsApp
              </Link>
              <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noreferrer noopener" className="rounded-md border border-border px-4 py-2 text-sm">
                LinkedIn
              </Link>
              <Link href={`mailto:?subject=Formation%20Master%20Prompt&body=${shareText}%20${url}`} className="rounded-md border border-border px-4 py-2 text-sm">
                Email
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
