export type DiagnosticProfile = "starter" | "frustrated" | "advanced";

export type DiagnosticAnswers = {
  sector?: string;
  structure?: string;
  aiUsage?: string;
  tasks?: string[];
  timeWasted?: string;
  mainBlocker?: string;
  mainGoal?: string;
};

/** Score brut max théorique (cf. brief, ~115). */
const RAW_SCORE_CAP = 115;

const STRUCTURE_SCORE: Record<string, number> = {
  solo: 0,
  small: 5,
  medium: 10,
};

const AI_USAGE_SCORE: Record<string, number> = {
  never: 0,
  disappointed: 15,
  regular: 35,
  advanced: 55,
};

const TASK_SCORE: Record<string, number> = {
  emails: 3,
  content: 3,
  quotes: 3,
  prospection: 3,
  reporting: 3,
  other: 0,
};

const TIME_WASTED_SCORE: Record<string, number> = {
  lt2: 0,
  "2to5": 8,
  "5to10": 15,
  gt10: 20,
};

const BLOCKER_SCORE: Record<string, number> = {
  no_time: 5,
  bad_results: 10,
  dont_know_where: 0,
  no_confidence: 0,
  already_ok: 15,
};

const GOAL_SCORE: Record<string, number> = {
  time: 5,
  produce: 5,
  prospect: 5,
  automate: 10,
  all: 5,
};

export function computeRawScore(answers: DiagnosticAnswers): number {
  let raw = 0;
  if (answers.structure && STRUCTURE_SCORE[answers.structure] != null) {
    raw += STRUCTURE_SCORE[answers.structure];
  }
  if (answers.aiUsage && AI_USAGE_SCORE[answers.aiUsage] != null) {
    raw += AI_USAGE_SCORE[answers.aiUsage];
  }
  const tasks = answers.tasks ?? [];
  for (const t of tasks) {
    if (TASK_SCORE[t] != null) raw += TASK_SCORE[t];
  }
  if (answers.timeWasted && TIME_WASTED_SCORE[answers.timeWasted] != null) {
    raw += TIME_WASTED_SCORE[answers.timeWasted];
  }
  if (answers.mainBlocker && BLOCKER_SCORE[answers.mainBlocker] != null) {
    raw += BLOCKER_SCORE[answers.mainBlocker];
  }
  if (answers.mainGoal && GOAL_SCORE[answers.mainGoal] != null) {
    raw += GOAL_SCORE[answers.mainGoal];
  }
  return raw;
}

export function normalizedScoreFromRaw(raw: number): number {
  return Math.min(100, Math.round((raw / RAW_SCORE_CAP) * 100));
}

export function profileFromNormalized(normalized: number): DiagnosticProfile {
  if (normalized <= 34) return "starter";
  if (normalized <= 65) return "frustrated";
  return "advanced";
}

export function computeDiagnostic(answers: DiagnosticAnswers) {
  const rawScore = computeRawScore(answers);
  const normalizedScore = normalizedScoreFromRaw(rawScore);
  const profile = profileFromNormalized(normalizedScore);
  return { rawScore, normalizedScore, profile };
}

export const PROFILE_COPY: Record<
  DiagnosticProfile,
  {
    badgeHex: string;
    title: string;
    subtitle: string;
    message: string;
    recommendations: [string, string, string];
    ctaLabel: string;
    ctaHref: string;
  }
> = {
  starter: {
    badgeHex: "#F59E0B",
    title: "Votre IA-readiness : Démarrage",
    subtitle: "Vous partez de zéro — mais c'est là où le gain est le plus rapide.",
    message:
      "La majorité des solopreneurs qui gagnent du temps avec l'IA aujourd'hui étaient exactement dans votre situation il y a 3 mois. Le problème n'est pas la technologie — c'est l'absence de méthode structurée.",
    recommendations: [
      "Commencer par 1 seul outil (Claude ou ChatGPT) — pas les deux en même temps",
      "Identifier la tâche la plus chronophage de votre semaine et l'attaquer en premier",
      "Apprendre la structure PACO avant tout prompt pour obtenir des résultats utilisables dès le premier essai",
    ],
    ctaLabel: "Commencer avec la méthode PACO — 49€",
    ctaHref: "/formation",
  },
  frustrated: {
    badgeHex: "#3B82F6",
    title: "Votre IA-readiness : En progression",
    subtitle: "Vous utilisez l'IA, mais vous laissez 70% de son potentiel sur la table.",
    message:
      "Vous avez les outils. Ce qui manque, c'est la méthode pour structurer vos demandes. Un prompt mal construit donne un résultat générique — c'est mécanique, pas aléatoire.",
    recommendations: [
      "Arrêter les prompts courts — chaque demande sans contexte business donne un résultat qui ne ressemble pas à votre activité",
      "Construire une bibliothèque de prompts réutilisables par cas d'usage (devis, email client, post LinkedIn)",
      "Apprendre à chaîner des prompts pour automatiser des tâches complètes, pas seulement des fragments",
    ],
    ctaLabel: "Découvrir comment structurer vos prompts",
    ctaHref: "/formation",
  },
  advanced: {
    badgeHex: "#10B981",
    title: "Votre IA-readiness : Avancé",
    subtitle: "Bonne base. Mais sans système, vous optimisez des détails au lieu de transformer votre business.",
    message:
      "Vous maîtrisez les outils — maintenant l'enjeu c'est l'automatisation réelle : des flux complets, pas juste des prompts isolés. La différence entre utiliser l'IA et avoir une IA qui travaille pour vous.",
    recommendations: [
      "Mapper vos 3 processus les plus récurrents (prospection, contenu, admin) et concevoir un workflow automatisé pour chacun",
      "Connecter vos outils IA à vos systèmes existants (CRM, agenda, email) via des automations n8n ou Make",
      "Construire votre \"prompt system\" documenté — le seul actif IA qui ne devient pas obsolète",
    ],
    ctaLabel: "Passer au niveau supérieur — Pack IA Activité",
    ctaHref: "/pack-ia",
  },
};
