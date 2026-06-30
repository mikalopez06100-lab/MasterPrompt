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
  /** Sous-titre court pour l’aperçu WhatsApp / LinkedIn (sinon : subtitle tronqué). */
  ogShareSubline?: string;
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
    slug: "shoptamere",
    clientName: "Shop Ta Mère Socks",
    title: "Pack IA complet (espace privé)",
    subtitle:
      "3 livrables HTML hébergés sur votre domaine : audit stratégique, automatisations IA et stratégie marketing.",
    ogShareSubline: "shoptamere.com — audit, IA & stratégie marketing",
    deliverableGroups: [
      {
        title: "Dossier client",
        description: "Les trois documents sont accessibles sur cette même page ; le bouton ouvre le plein écran.",
        deliverables: [
          {
            title: "Audit stratégique",
            description: "Audit web shoptamere.com (HTML autonome).",
            url: "/proposals/shoptamere/audit-shoptamere.html",
            ctaLabel: "Ouvrir l'audit",
            ctaVariant: "navy",
          },
          {
            title: "Automatisations IA",
            description: "Scénarios et architecture d'automatisation (HTML autonome).",
            url: "/proposals/shoptamere/ia-automation-shoptamere.html",
            ctaLabel: "Ouvrir l'automatisation",
            ctaVariant: "amber",
          },
          {
            title: "Stratégie marketing",
            description: "Plan marketing & communication (HTML autonome).",
            url: "/proposals/shoptamere/strategie-marketing-shoptamere.html",
            ctaLabel: "Ouvrir la stratégie",
            ctaVariant: "navy",
          },
        ],
      },
    ],
    notes: [
      "Un seul lien client : les trois livrables s'affichent ci-dessous.",
      "Ce lien est réservé aux personnes autorisées.",
    ],
  },
  {
    slug: "la-casa-de-anna",
    clientName: "La Casa de Anna",
    title: "Proposition dédiée — La Casa de Anna",
    subtitle:
      "Décoratrice et architecte d'intérieur à Annecy — audit du site et stratégie marketing (aperçu ci-dessous).",
    ogShareSubline: "Décoratrice & architecte d'intérieur · Annecy — dossier confidentiel",
    deliverableGroups: [
      {
        title: "Dossier client",
        description: "Les deux documents sont accessibles sur cette même page ; le bouton ouvre le plein écran.",
        deliverables: [
          {
            title: "Audit du site",
            description: "Audit web complet (version à jour).",
            url: "/proposals/la-casa-de-anna/audit-lacasadeanna.html",
            ctaLabel: "Ouvrir l'audit du site",
            ctaVariant: "navy",
          },
          {
            title: "Stratégie marketing",
            description: "Plan marketing & communication.",
            url: "/proposals/la-casa-de-anna/strategie-marketing-lacasadeanna.html",
            ctaLabel: "Ouvrir la stratégie",
            ctaVariant: "amber",
          },
        ],
      },
    ],
    notes: [
      "Un seul lien client : les deux livrables s'affichent ci-dessous.",
      "Ce lien est réservé aux personnes autorisées.",
    ],
  },
  {
    slug: "interface",
    clientName: "Olivier Colombani — SARL INTERFACE",
    title: "Pack IA complet (espace privé)",
    subtitle:
      "5 livrables HTML hébergés sur votre domaine : diagnostic, stratégie marketing, plan IA, simulateur et landing page.",
    ogShareSubline: "InterFace — diagnostic, stratégie, IA, simulateur & landing (dossier confidentiel)",
    deliverableGroups: [
      {
        title: "Dossier client",
        description:
          "Les cinq documents sont accessibles sur cette page ; chaque bouton ouvre le livrable en plein écran.",
        deliverables: [
          {
            title: "Diagnostic stratégique",
            description: "Audit stratégique et positionnement (HTML autonome).",
            url: "/proposals/interface/diagnostic-strategique-interface.html",
            ctaLabel: "Ouvrir le diagnostic",
            ctaVariant: "navy",
          },
          {
            title: "Stratégie marketing",
            description: "Plan marketing & acquisition (HTML autonome).",
            url: "/proposals/interface/strategie-marketing-interface.html",
            ctaLabel: "Ouvrir la stratégie",
            ctaVariant: "amber",
          },
          {
            title: "Plan IA & automatisations",
            description: "Scénarios et architecture d'automatisation (HTML autonome).",
            url: "/proposals/interface/plan-ia-automatisations-interface.html",
            ctaLabel: "Ouvrir le plan IA",
            ctaVariant: "navy",
          },
          {
            title: "Simulateur",
            description: "Outil interactif de simulation (HTML autonome).",
            url: "/proposals/interface/simulateur-interface.html",
            ctaLabel: "Ouvrir le simulateur",
            ctaVariant: "amber",
          },
          {
            title: "Landing page",
            description: "Maquette de landing page (HTML statique).",
            url: "/proposals/interface/landing-interface.html",
            ctaLabel: "Ouvrir la landing",
            ctaVariant: "navy",
          },
        ],
      },
    ],
    notes: [
      "Un seul lien client : les cinq livrables s'affichent ci-dessous en aperçu intégré.",
      "Ce lien est réservé aux personnes autorisées (Olivier Colombani / SARL INTERFACE).",
    ],
  },
  {
    slug: "glouglou",
    clientName: "Cave GlouGlou",
    title: "Pack IA complet (espace privé)",
    subtitle:
      "3 livrables HTML hébergés sur votre domaine : audit SEO · GEO · UX · Conversion, plan IA & automatisations, et stratégie marketing.",
    ogShareSubline: "Cave GlouGlou — audit, IA & stratégie marketing (dossier confidentiel)",
    deliverableGroups: [
      {
        title: "Dossier client",
        description:
          "Les trois documents sont accessibles sur cette même page ; le bouton ouvre le plein écran.",
        deliverables: [
          {
            title: "Audit SEO · GEO · UX · Conversion",
            description:
              "Audit complet de cave-glouglou.fr : SEO, GEO, UX, conversion et performance.",
            url: "/proposals/glouglou/audit-v2-cave-glouglou.html",
            ctaLabel: "Ouvrir l'audit",
            ctaVariant: "navy",
          },
          {
            title: "Plan IA & automatisations",
            description: "Scénarios et architecture d'automatisation Pack IA (HTML autonome).",
            url: "/proposals/glouglou/automations-glouglou.html",
            ctaLabel: "Ouvrir l'automatisation",
            ctaVariant: "amber",
          },
          {
            title: "Stratégie marketing",
            description: "Plan marketing & communication (HTML autonome).",
            url: "/proposals/glouglou/strategie-marketing-glouglou.html",
            ctaLabel: "Ouvrir la stratégie",
            ctaVariant: "navy",
          },
        ],
      },
    ],
    notes: [
      "Un seul lien client : les trois livrables s'affichent ci-dessous.",
      "Ce lien est réservé aux personnes autorisées.",
    ],
  },
  {
    slug: "elodie-fleury",
    clientName: "Élodie Fleury",
    title: "Pack IA complet (espace privé)",
    subtitle:
      "5 livrables HTML : audit 360, stratégie marketing, automatisations IA, guide acquéreur hispanophone et landing page.",
    ogShareSubline: "immo_elo / YourBnB06 — Côte d'Azur (dossier confidentiel)",
    deliverableGroups: [
      {
        title: "Dossier client",
        description:
          "Les cinq documents sont accessibles sur cette page ; le bouton ouvre le livrable en plein écran.",
        deliverables: [
          {
            title: "Audit 360",
            description:
              "Diagnostic complet immo_elo / YourBnB06 — positionnement, marché et opportunités (HTML autonome).",
            url: "/proposals/elodie-fleury/audit-360-elodie-fleury.html",
            ctaLabel: "Ouvrir l'audit",
            ctaVariant: "navy",
          },
          {
            title: "Stratégie marketing",
            description: "Plan marketing & communication — canaux, messages et calendrier (HTML autonome).",
            url: "/proposals/elodie-fleury/strategie-marketing-elodie-fleury.html",
            ctaLabel: "Ouvrir la stratégie",
            ctaVariant: "amber",
          },
          {
            title: "Automatisations IA",
            description: "Scénarios et architecture d'automatisation Pack IA (HTML autonome).",
            url: "/proposals/elodie-fleury/automations-elodie-fleury.html",
            ctaLabel: "Ouvrir l'automatisation",
            ctaVariant: "navy",
          },
          {
            title: "Guide de l'acquéreur hispanophone",
            description: "Lead magnet Côte d'Azur — parcours acquéreur hispanophone (HTML autonome).",
            url: "/proposals/elodie-fleury/guide-acheteur-hispanophone-elodie-fleury.html",
            ctaLabel: "Ouvrir le guide",
            ctaVariant: "amber",
          },
          {
            title: "Landing page",
            description: "Maquette landing agent immobilier & conciergerie — Côte d'Azur (HTML statique).",
            url: "/proposals/elodie-fleury/landing-elodie-fleury-v3.html",
            ctaLabel: "Ouvrir la landing",
            ctaVariant: "navy",
          },
        ],
      },
    ],
    notes: [
      "Un seul lien client : les cinq livrables s'affichent ci-dessous en aperçu intégré.",
      "Ce lien est réservé aux personnes autorisées.",
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
