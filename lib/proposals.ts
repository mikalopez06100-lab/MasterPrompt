export type DeliverableCard = {
  title: string;
  description: string;
  url: string;
  ctaLabel: string;
  ctaVariant?: "navy" | "amber";
};

export type ProposalConfig = {
  slug: string;
  clientName: string;
  title: string;
  subtitle: string;
  deliverables?: DeliverableCard[];
  deliverableGroups?: Array<{
    title: string;
    description?: string;
    deliverables: DeliverableCard[];
  }>;
  /** Absent si le livrable ne comprend pas encore d'analyse PDF. */
  analysisPdfUrl?: string;
  /** Audit ou analyse livree en HTML statique (apercu iframe). */
  analysisHtmlUrl?: string;
  /** Absent si le dossier ne contient que l'audit (pas encore de maquette). */
  mockupUrl?: string;
  notes?: string[];
};

export const proposals: ProposalConfig[] = [
  {
    slug: "sopolendance",
    clientName: "So Pole & Dance",
    title: "Audit + 2 versions de landing page (espace prive)",
    subtitle:
      "3 livrables HTML heberges sur votre domaine : audit du site actuel et deux versions de landing page.",
    deliverables: [
      {
        title: "Audit du site actuel",
        description: "Document d'audit strategique (HTML autonome).",
        url: "/proposals/sopolendance/audit-sopolendance.html",
        ctaLabel: "Ouvrir l'audit",
        ctaVariant: "navy",
      },
      {
        title: "Landing page - Version 1",
        description: "Premiere proposition de landing page (HTML statique).",
        url: "/proposals/sopolendance/landing-sopolendance.html",
        ctaLabel: "Ouvrir la V1",
        ctaVariant: "amber",
      },
      {
        title: "Landing page - Version 2",
        description: "Seconde proposition de landing page (HTML statique).",
        url: "/proposals/sopolendance/landing-sopolendance-v2.html",
        ctaLabel: "Ouvrir la V2",
        ctaVariant: "navy",
      },
    ],
    notes: [
      "Cet espace prive centralise l'audit et les deux variantes de landing page pour validation client.",
      "Chaque livrable peut etre consulte directement dans la page puis ouvert en plein ecran.",
    ],
  },
  {
    slug: "heliotoit",
    clientName: "Heliotoit",
    title: "Pack IA complet (espace privé)",
    subtitle:
      "4 livrables HTML hébergés sur votre domaine : audit business model, stratégie marketing, automatisations IA et landing page.",
    deliverables: [
      {
        title: "Audit business model",
        description: "Document d'audit business model (HTML autonome).",
        url: "/proposals/heliotoit/audit-business-model.html",
        ctaLabel: "Ouvrir l'audit",
        ctaVariant: "navy",
      },
      {
        title: "Stratégie marketing",
        description: "Plan marketing détaillé (HTML autonome).",
        url: "/proposals/heliotoit/strategie-marketing.html",
        ctaLabel: "Ouvrir la stratégie",
        ctaVariant: "amber",
      },
      {
        title: "Automatisations IA",
        description: "Scénarios et architecture d'automatisation (HTML autonome).",
        url: "/proposals/heliotoit/automatisation-ia.html",
        ctaLabel: "Ouvrir l'automatisation",
        ctaVariant: "navy",
      },
      {
        title: "Landing page",
        description: "Maquette de landing page (HTML statique).",
        url: "/proposals/heliotoit/landing-page.html",
        ctaLabel: "Ouvrir la landing",
        ctaVariant: "amber",
      },
    ],
    notes: [
      "Cet espace privé centralise les 4 livrables du Pack IA pour validation client.",
      "Chaque document peut être ouvert en plein écran via le bouton d'ouverture.",
    ],
  },
  {
    slug: "leslie-nice",
    clientName: "Leslie (Nice)",
    title: "Audit + stratégie + automatisation + landing (espace privé)",
    subtitle:
      "4 livrables HTML hébergés sur votre domaine : audit business model, stratégie marketing, automatisations IA et landing page.",
    deliverables: [
      {
        title: "Audit business model",
        description: "Document d'audit business model (HTML autonome).",
        url: "/proposals/leslie-nice/audit-business-model.html",
        ctaLabel: "Ouvrir l'audit",
        ctaVariant: "navy",
      },
      {
        title: "Stratégie marketing",
        description: "Plan marketing détaillé (HTML autonome).",
        url: "/proposals/leslie-nice/strategie-marketing.html",
        ctaLabel: "Ouvrir la stratégie",
        ctaVariant: "amber",
      },
      {
        title: "Automatisations IA",
        description: "Scénarios et architecture d'automatisation (HTML autonome).",
        url: "/proposals/leslie-nice/automatisation-ia.html",
        ctaLabel: "Ouvrir l'automatisation",
        ctaVariant: "navy",
      },
      {
        title: "Landing page",
        description: "Maquette de landing page (HTML statique).",
        url: "/proposals/leslie-nice/landing-page.html",
        ctaLabel: "Ouvrir la landing",
        ctaVariant: "amber",
      },
    ],
    notes: [
      "Cet espace privé centralise les 4 livrables transmis pour validation client.",
      "Chaque document peut être ouvert en plein écran via le bouton d'ouverture.",
    ],
  },
  {
    slug: "dgimmo",
    clientName: "DGIMMO",
    title: "Audit stratégique (espace privé)",
    subtitle:
      "Document d’audit web hébergé sur votre domaine (HTML éditorial autonome).",
    analysisHtmlUrl: "/proposals/dgimmo/audit.html",
    notes: [
      "Ouvrir l’audit en plein écran pour une lecture confortable (polices chargées via Google Fonts).",
      "Ce lien est réservé aux personnes autorisées.",
    ],
  },
  {
    slug: "mms-mc",
    clientName: "MMS Monaco Mobilier Service",
    title: "Audit stratégique (espace privé)",
    subtitle:
      "Document d’audit web hébergé sur votre domaine (HTML éditorial autonome).",
    analysisHtmlUrl: "/proposals/mms-mc/audit.html",
    notes: [
      "Ouvrir l’audit en plein écran pour une lecture confortable (polices chargées via Google Fonts).",
      "Ce lien est réservé aux personnes autorisées.",
    ],
  },
  {
    slug: "kimiw",
    clientName: "KIMIW",
    title: "Audit + maquette web (espace privé)",
    subtitle:
      "Audit stratégique (HTML) et maquette landing artiste (HTML statique) hébergés sur votre domaine.",
    analysisHtmlUrl: "/proposals/kimiw/audit.html",
    mockupUrl: "/proposals/kimiw/mockup/index.html",
    notes: [
      "Ce dossier regroupe l’audit stratégique (document HTML) et la maquette one-page (Google Fonts, images en base64). Ouvrir chaque livrable en plein écran pour une lecture confortable.",
      "Les lecteurs SoundCloud et liens externes suivent le comportement standard du navigateur.",
    ],
  },
  {
    slug: "stopamiante",
    clientName: "Stop Amiante",
    title: "Analyse + maquette web (espace privé)",
    subtitle:
      "Audit stratégique (PDF) et livrables HTML (maquette refonte + dossier commercial) hébergés sur votre domaine.",
    analysisPdfUrl: "/proposals/stopamiante/analysis.pdf",
    mockupUrl: "/proposals/stopamiante/mockup/index.html",
    notes: [
      "Ce dossier regroupe les livrables transmis : audit PDF + maquette HTML + proposition commerciale.",
      "Depuis la maquette, vous pouvez aussi ouvrir directement le dossier commercial (lien dans la page hub).",
    ],
  },
  {
    slug: "mat-siboni",
    clientName: "Mathieu Siboni",
    title: "Accompagnement premium (espace prive)",
    subtitle:
      "Presentation des livrables de deux projets : accompagnement principal et Spring Rookie Camp.",
    deliverableGroups: [
      {
        title: "Projet 1 — Accompagnement premium",
        description: "Livrables strategiques et operationnels de l'accompagnement principal.",
        deliverables: [
          {
            title: "Strategie de positioning",
            description: "Document de strategie et positionnement (HTML autonome).",
            url: "/proposals/mat-siboni/strategie-positioning-mathieu-siboni.html",
            ctaLabel: "Ouvrir la strategie",
            ctaVariant: "navy",
          },
          {
            title: "Plan automatisations",
            description: "Plan d'automatisations P1 (HTML autonome).",
            url: "/proposals/mat-siboni/plan-automatisations-p1-fede.html",
            ctaLabel: "Ouvrir le plan",
            ctaVariant: "amber",
          },
          {
            title: "Skills Claude",
            description: "Bibliotheque de skills et organisation operationnelle (HTML autonome).",
            url: "/proposals/mat-siboni/skills-claude-mathieu-siboni.html",
            ctaLabel: "Ouvrir les skills",
            ctaVariant: "navy",
          },
          {
            title: "Landing page",
            description: "Livrable de landing page (HTML statique).",
            url: "/proposals/mat-siboni/landing-page.html",
            ctaLabel: "Ouvrir la landing",
            ctaVariant: "amber",
          },
        ],
      },
      {
        title: "Projet 2 — Spring Rookie Camp",
        description: "Nouveaux livrables dedies au second projet du meme client.",
        deliverables: [
          {
            title: "Landing Spring Rookie Camp 2026",
            description: "Landing page evenementielle (HTML autonome).",
            url: "/proposals/mat-siboni/landing-spring-rookie-camp-2026.html",
            ctaLabel: "Ouvrir la landing 2026",
            ctaVariant: "amber",
          },
          {
            title: "Strategie marketing Spring Rookie Camp 2027",
            description: "Strategie marketing complete (HTML autonome).",
            url: "/proposals/mat-siboni/strategie-marketing-spring-rookie-camp-2027.html",
            ctaLabel: "Ouvrir la strategie 2027",
            ctaVariant: "navy",
          },
        ],
      },
    ],
    notes: [
      "Cet espace prive centralise les livrables de deux projets distincts pour le meme client.",
      "Chaque projet est presente dans une section separee pour simplifier la lecture et la validation.",
    ],
  },
  {
    slug: "client-demo",
    clientName: "Client Démo",
    title: "Proposition commerciale IA",
    subtitle:
      "Analyse stratégique et maquette web hébergée sur espace privé Master Prompt.",
    analysisPdfUrl: "/proposals/client-demo/analysis.pdf",
    mockupUrl: "/proposals/client-demo/mockup/index.html",
    notes: [
      "Cette URL est privée et partagée uniquement avec le client.",
      "Le lien PDF est consultable directement dans le navigateur.",
      "La maquette est hébergée dans un dossier statique dédié.",
    ],
  },
];

export function getProposalBySlug(slug: string): ProposalConfig | undefined {
  return proposals.find((p) => p.slug === slug);
}
