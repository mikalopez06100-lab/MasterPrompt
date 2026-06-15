export type PackIADeliverableTier = "core" | "adaptive";

export type PackIADeliverable = {
  icon: string;
  title: string;
  description: string;
  tier: PackIADeliverableTier;
  /** Libellé court affiché sur la carte (ex. « Toujours », « Si site existant »). */
  tag?: string;
};

/** Livrables toujours inclus — quel que soit le profil client. */
export const PACK_IA_CORE_DELIVERABLES: PackIADeliverable[] = [
  {
    icon: "📊",
    title: "Audit business model",
    description:
      "Forces, frictions, modèle économique, unit economics et leviers IA prioritaires sur 90 jours.",
    tier: "core",
    tag: "Toujours",
  },
  {
    icon: "🎯",
    title: "Stratégie marketing",
    description: "Positionnement, personae, canaux, calendrier éditorial et KPIs chiffrés.",
    tier: "core",
    tag: "Toujours",
  },
  {
    icon: "⚙️",
    title: "Automatisations IA",
    description: "Scénarios documentés (n8n, Make ou Zapier), architecture, prompts PACO et coûts.",
    tier: "core",
    tag: "Toujours",
  },
  {
    icon: "📞",
    title: "Brief visio + espace privé",
    description:
      "Cadrage 60 min, puis livraison HTML sur votre domaine — lien confidentiel, aperçu intégré.",
    tier: "core",
    tag: "Toujours",
  },
];

/**
 * Livrables ajustés au profil — arbitrés au brief de cadrage (J1).
 * Un client ne reçoit pas systématiquement les deux branches web ni le lead magnet.
 */
export const PACK_IA_ADAPTIVE_DELIVERABLES: PackIADeliverable[] = [
  {
    icon: "🔍",
    title: "Audit site web",
    description:
      "UX, SEO, conversion et citabilité IA — si vous avez déjà un site à optimiser.",
    tier: "adaptive",
    tag: "Si site existant",
  },
  {
    icon: "🌐",
    title: "Landing HTML",
    description:
      "Maquette prête à déployer — si vous n'avez pas encore de vitrine en ligne.",
    tier: "adaptive",
    tag: "Si pas de site",
  },
  {
    icon: "✍️",
    title: "20 prompts métier",
    description:
      "Bibliothèque PACO calibrée sur votre activité (devis, relances, contenu, admin…) — quand l'usage IA au quotidien est un levier prioritaire.",
    tier: "adaptive",
    tag: "Si pertinent",
  },
  {
    icon: "🧲",
    title: "Lead magnet & tunnel",
    description:
      "Guide/checklist, page capture, séquence email et kit réseaux — uniquement si l'acquisition digitale est pertinente pour votre modèle.",
    tier: "adaptive",
    tag: "Si pertinent",
  },
];

export const PACK_IA_PROFILE_RULES = [
  {
    question: "Avez-vous déjà un site ?",
    options: [
      { label: "Oui", text: "Audit site web (UX, SEO, conversion, citabilité IA)." },
      { label: "Non", text: "Landing HTML prête à héberger — pas d'audit d'un site inexistant." },
    ],
  },
  {
    question: "Un lead magnet a-t-il du sens pour votre activité ?",
    options: [
      {
        label: "Oui",
        text: "Guide/checklist + tunnel de capture + kit réseaux, calibrés sur la stratégie marketing.",
      },
      {
        label: "Non",
        text: "Pas de livrable « pour faire joli » : l'effort est réalloué (automatisations, contenu, autre levier d'activation).",
      },
    ],
  },
  {
    question: "Les prompts métier au quotidien — priorité ?",
    options: [
      {
        label: "Oui",
        text: "20 prompts PACO personnalisés (devis, relances, contenu, admin…) prêts à copier-coller.",
      },
      {
        label: "Non",
        text: "L'effort reste sur la stratégie et les automatisations — pas de bibliothèque prompts dédiée.",
      },
    ],
  },
] as const;

export const PACK_IA_TIMELINE = [
  { day: "J1", label: "Brief de cadrage", detail: "Profil, site, acquisition — on fige le périmètre exact des livrables." },
  { day: "J2", label: "Audit + stratégie", detail: "Business model et plan marketing (socle)." },
  { day: "J3", label: "Automatisations IA", detail: "Scénarios et stack adaptés à votre maturité digitale." },
  { day: "J4", label: "Web & activation", detail: "Audit site ou landing · prompts métier et/ou lead magnet si pertinents pour votre profil." },
  { day: "J5", label: "Livraison", detail: "Espace privé sur votre domaine — uniquement vos livrables." },
] as const;

export const PACK_IA_OFFER_SUMMARY =
  "Socle stratégique identique pour tous ; présence web, prompts métier et lead magnet ajustés à votre profil au brief de cadrage.";

export const PACK_IA_FAQ_DELIVERABLES = {
  question: "Les livrables sont-ils identiques pour tous les clients ?",
  answer:
    "Non. L'audit business model, la stratégie marketing, les automatisations IA et l'espace privé sont systématiques. Ensuite, selon votre profil : audit web ou landing HTML ; 20 prompts métier et/ou lead magnet uniquement s'ils sont pertinents pour votre activité (sinon, l'effort est réalloué). Tout est arbitré lors du brief de cadrage, avant le démarrage.",
};
