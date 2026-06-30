import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppContact";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function FormationMerciPage() {
  const pageUrl = "https://www.masterprompt.fr/formation";
  const shareText = encodeURIComponent("Je me forme à l'IA avec Master Prompt — 49€, méthode PACO.");
  const url = encodeURIComponent(pageUrl);

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8">
          <h1 className={`${syne.className} text-3xl font-bold`}>Merci pour votre commande</h1>
          <p className="mt-3 text-slate-700">
            Votre accès à la Formation Master Prompt est activé. Connectez-vous avec la même adresse
            email que sur Stripe pour accéder à vos modules.
          </p>
          <p className="mt-2 text-sm text-muted">
            Un email de confirmation vous a été envoyé. Besoin d&apos;aide ? Écrivez-moi sur WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/login?callbackUrl=/espace-formation"
              className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-semibold text-navy"
            >
              Accéder à mon espace formation →
            </Link>
            <WhatsAppButton context="formation" label="Une question ? WhatsApp" variant="outline" />
          </div>

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
