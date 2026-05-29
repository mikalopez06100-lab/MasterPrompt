import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — Master Prompt",
  description: "CGV applicables aux achats sur masterprompt.fr.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.masterprompt.fr/cgv" },
};

export default function CGVPage() {
  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>CGV</span>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <article className="mx-auto max-w-3xl space-y-10 rounded-2xl border border-border bg-white p-6 sm:p-10">
          <header>
            <h1 className={`${syne.className} text-3xl font-bold sm:text-4xl`}>
              Conditions Générales de Vente
            </h1>
            <p className="mt-2 text-sm text-muted">
              En vigueur au 1<sup>er</sup> juillet 2026 — applicables à tout achat effectué sur
              masterprompt.fr.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 1 — Vendeur</h2>
            <p className="text-sm text-slate-700">Les présentes CGV sont conclues entre :</p>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Michaël Lopez</strong>, auto-entrepreneur</li>
              <li>SIRET : 452 917 412 00044</li>
              <li>91 Corniche Paul Clermont, 06670 Colomars, France</li>
              <li>Email :{" "}
                <a href="mailto:hello@masterprompt.fr" className="underline underline-offset-4">
                  hello@masterprompt.fr
                </a>
              </li>
              <li>Téléphone : [À COMPLÉTER]</li>
            </ul>
            <p className="text-sm text-slate-700">— ci-après désigné « le Vendeur » —</p>
            <p className="text-sm text-slate-700">
              et toute personne physique ou morale effectuant un achat sur masterprompt.fr — ci-après
              désigné « le Client ».
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 2 — Offres et produits</h2>
            <p className="text-sm text-slate-700">Le Vendeur commercialise les offres suivantes :</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Niveau 1 — Formation Master Prompt :</strong> formation en ligne composée de 7
                modules vidéo, bibliothèque de prompts, exercices et accès à la plateforme de formation.
                Accès à vie. Prix : 97 € TTC (tarif de lancement : 49 € TTC jusqu&apos;au 30/06/2026).
              </li>
              <li>
                <strong>Niveau 2 — Pack IA Activité :</strong> prestation de conseil et de développement
                comprenant un audit stratégique, une landing page HTML, 20 prompts métier personnalisés,
                3 automatisations documentées, une session visio de 60 minutes et un plan d&apos;action 30
                jours. Livraison en 5 jours ouvrés. Prix : 397 € TTC.
              </li>
              <li>
                <strong>Niveau 3 — Accompagnement IA Transformation :</strong> programme d&apos;accompagnement
                individualisé sur 90 jours incluant des sessions hebdomadaires, un accès WhatsApp direct,
                des livrables sur-mesure et des automatisations implémentées. Sur candidature uniquement.
                Tarif communiqué après appel de cadrage.
              </li>
            </ul>
            <p className="text-sm text-slate-700">
              Toutes les offres sont exprimées en euros TTC. TVA non applicable — franchise en base de TVA
              (art. 293 B du CGI).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 3 — Commande et paiement</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Les commandes sont effectuées via la plateforme de paiement sécurisée Stripe. Le Client
              reconnaît avoir pris connaissance des présentes CGV avant tout achat. Le paiement vaut
              acceptation intégrale et irrévocable des présentes CGV.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              Les moyens de paiement acceptés sont ceux proposés par Stripe (carte bancaire Visa,
              Mastercard, American Express). Le paiement est exigible immédiatement à la commande.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              Une facture est émise automatiquement par Stripe et transmise par email dans les 24 heures
              suivant le paiement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 4 — Délais de livraison</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Formation :</strong> accès immédiat à la plateforme après paiement (ou au 1<sup>er</sup>{" "}
                juillet 2026 pour les précommandes effectuées avant cette date).
              </li>
              <li>
                <strong>Pack IA :</strong> livraison des livrables dans un délai de 5 jours ouvrés à compter
                du brief de cadrage initial, lui-même planifié dans les 24 heures suivant la commande.
              </li>
              <li>
                <strong>Accompagnement :</strong> démarrage du programme dans les 7 jours suivant
                l&apos;acceptation de la candidature.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>
              Article 5 — Droit de rétractation et remboursements
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de rétractation
              ne s&apos;applique pas aux contenus numériques fournis sur un support immatériel dont
              l&apos;exécution a commencé avec l&apos;accord préalable exprès du consommateur. Néanmoins,
              le Vendeur applique les politiques commerciales suivantes :
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Formation :</strong> garantie satisfait ou remboursé pendant 14 jours calendaires
                à compter de la date d&apos;accès, sans justification. Au-delà, aucun remboursement ne
                sera accordé.
              </li>
              <li>
                <strong>Formation (précommande) :</strong> si la formation n&apos;est pas livrée à la date
                prévue du 1<sup>er</sup> juillet 2026, remboursement intégral automatique, sans démarche du
                Client.
              </li>
              <li>
                <strong>Pack IA :</strong> prestation sur-mesure. Aucun remboursement une fois la mission
                lancée (démarrage acté lors du brief de cadrage). Un appel de cadrage préalable et gratuit
                est systématiquement proposé avant tout engagement.
              </li>
              <li>
                <strong>Accompagnement :</strong> prestation sur-mesure. Conditions de résiliation
                communiquées lors de l&apos;appel de cadrage et intégrées au contrat individuel signé
                avant démarrage.
              </li>
            </ul>
            <p className="text-sm text-slate-700">
              Pour toute demande de remboursement éligible, contacter :{" "}
              <a href="mailto:hello@masterprompt.fr" className="underline underline-offset-4">
                hello@masterprompt.fr
              </a>{" "}
              avec l&apos;objet « Remboursement + numéro de commande ».
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 6 — Précommande</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              La Formation Master Prompt est commercialisée en précommande jusqu&apos;au 30 juin 2026 inclus
              au tarif de 49 € TTC. En achetant en précommande, le Client :
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
              <li>
                reconnaît que la formation n&apos;est pas encore disponible et sera livrée le 1<sup>er</sup>{" "}
                juillet 2026 ;
              </li>
              <li>bénéficie d&apos;un tarif préférentiel réservé aux précommandants ;</li>
              <li>
                bénéficie d&apos;un remboursement intégral automatique si la livraison n&apos;intervient
                pas à la date prévue.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 7 — Obligations du Client</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le Client s&apos;engage à utiliser les contenus et livrables acquis dans le cadre d&apos;un
              usage personnel ou professionnel licite. Toute revente, reproduction ou diffusion des
              contenus sans autorisation écrite préalable est interdite.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 8 — Responsabilité</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Les formations, prompts et conseils fournis constituent des outils de travail. Les résultats
              obtenus par le Client dépendent de sa mise en œuvre propre. Le Vendeur ne saurait être tenu
              responsable des résultats économiques ou commerciaux du Client. La responsabilité du Vendeur
              est limitée au montant réglé par le Client au titre de la prestation concernée.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>Article 9 — Données personnelles</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Le traitement des données personnelles collectées lors de la commande est décrit dans la{" "}
              <Link href="/politique-confidentialite" className="underline underline-offset-4">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={`${syne.className} text-xl font-bold`}>
              Article 10 — Droit applicable et litiges
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Les présentes CGV sont soumises au droit français. En cas de litige, le Client peut recourir
              à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.
              À défaut d&apos;accord amiable, les tribunaux de Nice seront seuls compétents.
            </p>
            <p className="text-sm text-slate-700">
              Plateforme de règlement en ligne des litiges (UE) :{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4"
              >
                ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <p className="border-t border-border pt-6 text-xs text-muted">
            Version en vigueur au 1<sup>er</sup> juillet 2026
          </p>
        </article>
      </section>

      <SiteFooter />
    </main>
  );
}
