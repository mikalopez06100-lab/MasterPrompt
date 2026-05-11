import type { Metadata } from "next";
import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Reveal } from "@/components/landing/Reveal";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });
const headingClass = `${syne.className} tracking-normal [font-stretch:100%] [font-kerning:normal]`;

export const metadata: Metadata = {
  title: "Abonnements — MasterPrompt | Infrastructure IA & SEO pour entrepreneurs",
  description:
    "Hébergement, maintenance, SEO et tokens IA inclus. Abonnements à partir de 49€/mois pour les clients Pack IA.",
  alternates: { canonical: "https://www.masterprompt.fr/abonnements" },
};

const automationPlans = [
  {
    name: "Starter",
    price: "59€ / mois",
    minPeriod: "Période minimum : 3 mois",
    subtitle: "Vos automatisations hébergées et surveillées.",
    cta: "Abonnement Starter",
    features: [
      "Infrastructure hébergée (serveur + stack n8n)",
      "Jusqu'à 3 workflows actifs",
      "Claude API inclus — jusqu'à 500 requêtes/mois",
      "Monitoring basique + alerte email panne",
      "Export de vos workflows sur demande",
    ],
    note: "Coût infrastructure réel estimé : 15-25€/mois",
  },
  {
    name: "Opérations",
    price: "129€ / mois",
    minPeriod: "Période minimum : 3 mois",
    subtitle: "Opérations IA actives et évolutives.",
    cta: "Abonnement Opérations",
    featured: true,
    features: [
      "Infrastructure hébergée (serveur + stack n8n)",
      "Jusqu'à 10 workflows actifs",
      "Claude API inclus — jusqu'à 2 000 requêtes/mois",
      "Monitoring avancé + rapport mensuel d'activité",
      "1 modification ou ajout de workflow par mois",
      "Export de vos workflows sur demande",
    ],
    note: "Coût infrastructure réel estimé : 30-50€/mois",
  },
  {
    name: "Scale",
    price: "249€ / mois",
    minPeriod: "Période minimum : 3 mois",
    subtitle: "Pour les activités à fort volume.",
    cta: "Abonnement Scale",
    features: [
      "Workflows illimités",
      "Claude API inclus — jusqu'à 5 000 requêtes/mois",
      "Monitoring avancé + rapport mensuel d'activité",
      "1 nouveau scénario développé par trimestre",
      "Mise à jour skills Claude si activité évolue",
      "Session visio trimestrielle 30 min",
      "Export de vos workflows sur demande",
    ],
    note: "Coût infrastructure réel estimé : 60-90€/mois",
  },
];

const websitePlans = [
  {
    name: "Présence",
    price: "49€ / mois",
    minPeriod: "Période minimum : 3 mois",
    subtitle: "Votre site hébergé, sauvegardé, surveillé.",
    cta: "Abonnement Présence",
    features: [
      "Hébergement + domaine + SSL + sauvegardes automatiques",
      "Monitoring uptime 24/7",
      "1 modification de contenu par mois (texte, image, tarif)",
      "Rapport mensuel : uptime, actions réalisées",
    ],
    note: "Coût infrastructure réel estimé : 8-12€/mois",
  },
  {
    name: "Visibilité",
    price: "129€ / mois",
    minPeriod: "Période minimum : 3 mois",
    subtitle: "Votre site visible sur Google et sur les IA.",
    cta: "Abonnement Visibilité",
    featured: true,
    features: [
      "Tout le plan Présence",
      "2 articles de blog par mois (rédigés avec IA, validés)",
      "Optimisation SEO on-page continue",
      "Optimisation GEO (citabilité ChatGPT, Claude, Perplexity)",
      "Fiche Google Business mise à jour",
      "Rapport mensuel : positions, trafic, actions",
    ],
    note: "Coût infrastructure réel estimé : 15-25€/mois",
  },
  {
    name: "Autorité",
    price: "249€ / mois",
    minPeriod: "Période minimum : 3 mois",
    subtitle: "Devenez la référence de votre secteur en local.",
    cta: "Abonnement Autorité",
    features: [
      "Tout le plan Visibilité",
      "4 articles de blog par mois",
      "Stratégie GEO avancée (maillage sémantique IA)",
      "Netlinking basique (annuaires, citations locales)",
      "Revue trimestrielle stratégie contenu (30 min visio)",
      "Rapport mensuel complet",
    ],
    note: "Coût infrastructure réel estimé : 30-50€/mois",
  },
];

const faqItems = [
  {
    question: "Peut-on souscrire un abonnement sans avoir fait le Pack IA ?",
    answer:
      "Non. L'abonnement couvre l'infrastructure des livrables créés lors du Pack IA. Il n'est pas possible de souscrire sans avoir un site ou des automatisations actifs chez nous.",
  },
  {
    question: "Que se passe-t-il si je résilie ?",
    answer:
      "Vous récupérez vos livrables : export JSON de vos workflows n8n, fichier HTML de votre site, vos prompts et skills Claude. L'infrastructure hébergée est coupée 30 jours après la résiliation. Aucun remboursement de la période en cours.",
  },
  {
    question: "Qui est propriétaire des workflows et du site ?",
    answer:
      "Vous. Les livrables vous appartiennent. Nous hébergeons et maintenons l'infrastructure — si vous résiliez, vous repartez avec tout.",
  },
  {
    question: "Les tokens Claude API sont vraiment inclus ?",
    answer:
      "Oui, dans la limite du quota de votre plan. En cas de dépassement, vous êtes informé avant toute facturation additionnelle.",
  },
  {
    question: "Peut-on changer de plan en cours d'abonnement ?",
    answer:
      "Oui, upgrade possible à tout moment. Downgrade possible à la fin de la période minimum.",
  },
  {
    question: "Quelle est la durée minimum ?",
    answer:
      "3 mois, non remboursables. Standard pour ce type de service — le setup initial est amorti sur cette période.",
  },
];

export default function AbonnementsPage() {
  return (
    <main className={`${dmSans.className} bg-[#0B1220] text-white antialiased font-normal`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <Reveal className="mx-auto max-w-6xl">
          <p className={`${headingClass} text-xs uppercase tracking-[0.2em] text-amber-500`}>Infrastructure &amp; continuité</p>
          <h1 className={`${headingClass} mt-3 max-w-3xl text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl`}>
            Votre activité tourne.
            <br />
            Nous maintenons la machine.
          </h1>
          <p className="mt-5 max-w-3xl text-slate-300">
            Automatisations, site web, contenu SEO — les coûts d&apos;infrastructure sont réels chaque mois. Nos abonnements les couvrent et les font travailler pour vous.
          </p>
          <p className="mt-4 text-sm text-slate-400">🔒 Sans engagement après la période minimum · Résiliation en 1 clic · Coûts inclus</p>
        </Reveal>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-amber-500/30 bg-[#121B2D] p-6">
            <h2 className={`${headingClass} text-2xl font-bold`}>Ce que cache un one-shot</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Serveur n8n hébergé : 5-15€/mois</li>
              <li>• Tokens Claude API : 3-20€/mois selon volume</li>
              <li>• Hébergement site + domaine + SSL : 4-10€/mois</li>
              <li>• Sauvegardes &amp; monitoring : 2-5€/mois</li>
              <li>• Mises à jour workflows si API tierce change : non facturé en one-shot</li>
            </ul>
            <p className="mt-5 text-sm text-slate-300">
              Ces coûts existent que vous payiez pour leur gestion ou non. La question est : qui les prend en charge, et qui fait le travail quand ça casse ?
            </p>
          </Reveal>
          <Reveal delay="1" className="rounded-2xl border border-amber-500/30 bg-[#121B2D] p-6">
            <h2 className={`${headingClass} text-2xl font-bold`}>Ce que l&apos;abonnement couvre</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Infrastructure hébergée et maintenue</li>
              <li>• Tokens API inclus dans le quota du plan</li>
              <li>• Monitoring automatique + alerte en cas de panne</li>
              <li>• SEO et GEO continus (pour les plans site)</li>
              <li>• Votre temps libéré — pas d&apos;appels de dépannage</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} text-3xl font-bold`}>Automatisations &amp; IA</h2>
          <p className="mt-2 text-sm text-slate-300">Pour les clients Pack IA dont les workflows tournent chez nous.</p>
        </Reveal>
        <div className="mx-auto mt-6 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
          {automationPlans.map((plan, idx) => (
            <Reveal
              key={plan.name}
              delay={idx === 0 ? "0" : idx === 1 ? "1" : "2"}
              className={`min-w-[84%] snap-start rounded-2xl border p-6 md:min-w-0 ${
                plan.featured ? "border-amber-500 bg-[#121B2D]" : "border-slate-800 bg-[#121B2D]"
              }`}
            >
              {plan.featured && (
                <span className="inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-[#0B1220]">
                  Le plus choisi
                </span>
              )}
              <h3 className={`${headingClass} mt-3 text-2xl font-bold`}>{plan.name}</h3>
              <p className={`${headingClass} mt-2 text-3xl font-bold text-white`}>{plan.price}</p>
              <p className="mt-1 text-xs text-slate-400">{plan.minPeriod}</p>
              <p className="mt-3 text-sm text-slate-300">{plan.subtitle}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`mailto:hello@masterprompt.fr?subject=${encodeURIComponent(plan.cta)}`}
                className={`mt-6 inline-block w-full rounded-md px-4 py-3 text-center text-sm font-semibold transition ${
                  plan.featured ? "bg-emerald-500 text-[#0B1220] hover:opacity-90" : "border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
                }`}
              >
                Souscrire
              </Link>
              <p className="mt-4 text-xs text-slate-500">{plan.note}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-6 max-w-4xl rounded-xl border border-amber-500/30 bg-[#121B2D] p-4 text-sm text-slate-300">
          ⚡ Dépassement de quota API : refacturé au coût réel + 20% de marge opérationnelle. Vous êtes informé avant tout dépassement. Défini dans les CGV.
        </Reveal>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-12">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} text-3xl font-bold`}>Sites web &amp; visibilité</h2>
          <p className="mt-2 text-sm text-slate-300">Pour les clients dont nous hébergeons et faisons évoluer le site.</p>
        </Reveal>
        <div className="mx-auto mt-6 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible">
          {websitePlans.map((plan, idx) => (
            <Reveal
              key={plan.name}
              delay={idx === 0 ? "0" : idx === 1 ? "1" : "2"}
              className={`min-w-[84%] snap-start rounded-2xl border p-6 md:min-w-0 ${
                plan.featured ? "border-amber-500 bg-[#121B2D]" : "border-slate-800 bg-[#121B2D]"
              }`}
            >
              {plan.featured && (
                <span className="inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-[#0B1220]">
                  Le plus choisi
                </span>
              )}
              <h3 className={`${headingClass} mt-3 text-2xl font-bold`}>{plan.name}</h3>
              <p className={`${headingClass} mt-2 text-3xl font-bold text-white`}>{plan.price}</p>
              <p className="mt-1 text-xs text-slate-400">{plan.minPeriod}</p>
              <p className="mt-3 text-sm text-slate-300">{plan.subtitle}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`mailto:hello@masterprompt.fr?subject=${encodeURIComponent(plan.cta)}`}
                className={`mt-6 inline-block w-full rounded-md px-4 py-3 text-center text-sm font-semibold transition ${
                  plan.featured ? "bg-emerald-500 text-[#0B1220] hover:opacity-90" : "border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
                }`}
              >
                Souscrire
              </Link>
              <p className="mt-4 text-xs text-slate-500">{plan.note}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#111C31] px-4 py-12 sm:px-6 sm:py-16">
        <Reveal className="mx-auto max-w-6xl text-center">
          <h2 className={`${headingClass} text-3xl font-bold`}>Pack IA + Abonnement — le combo le plus efficace</h2>
        </Reveal>
        <div className="mx-auto mt-6 grid max-w-6xl gap-4 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-slate-700 bg-[#0B1220] p-6 text-left">
            <h3 className={`${headingClass} text-xl font-bold`}>Ce que vous avez après le Pack IA</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Landing page HTML livrée</li>
              <li>• Automatisations documentées</li>
              <li>• 1 skill Claude configuré</li>
              <li>• 20 prompts métier</li>
            </ul>
          </Reveal>
          <Reveal delay="1" className="rounded-2xl border border-slate-700 bg-[#0B1220] p-6 text-left">
            <h3 className={`${headingClass} text-xl font-bold`}>Ce que l&apos;abonnement ajoute</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Infrastructure en place et hébergée</li>
              <li>• Ça tourne sans vous en occuper</li>
              <li>• SEO et GEO qui travaillent en continu</li>
              <li>• Un interlocuteur qui connaît votre business</li>
            </ul>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-8 max-w-6xl text-center">
          <Link href="/pack-ia" className="inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#0B1220] hover:opacity-90">
            Voir les offres Pack IA →
          </Link>
          <p className="mt-3 text-sm text-slate-400">L&apos;abonnement se souscrit après le Pack IA, pas avant.</p>
        </Reveal>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <Reveal className="mx-auto max-w-6xl">
          <h2 className={`${headingClass} mb-6 text-3xl font-bold`}>Questions fréquentes</h2>
        </Reveal>
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {faqItems.map((item, idx) => (
            <Reveal key={item.question} delay={idx % 3 === 0 ? "0" : idx % 3 === 1 ? "1" : "2"}>
              <details className="rounded-xl border border-slate-800 bg-[#121B2D] p-5">
                <summary className="cursor-pointer text-sm font-semibold text-white">{item.question}</summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 text-center sm:px-6 sm:pb-20">
        <Reveal className="mx-auto max-w-4xl rounded-2xl border border-slate-800 bg-[#121B2D] p-8">
          <h2 className={`${headingClass} text-3xl font-bold leading-tight`}>
            Votre infrastructure.
            <br />
            Notre responsabilité.
          </h2>
          <p className="mt-4 text-slate-300">Commencez par le Pack IA. L&apos;abonnement vient naturellement ensuite.</p>
          <Link href="/pack-ia" className="mt-6 inline-block rounded-md bg-emerald-500 px-6 py-3 text-sm font-semibold text-[#0B1220] hover:opacity-90">
            Découvrir le Pack IA →
          </Link>
          <p className="mt-3 text-sm">
            <Link href="mailto:hello@masterprompt.fr" className="text-slate-300 underline underline-offset-4 hover:text-white">
              Déjà client Pack IA ? Contactez-nous →
            </Link>
          </p>
        </Reveal>
      </section>
    </main>
  );
}
