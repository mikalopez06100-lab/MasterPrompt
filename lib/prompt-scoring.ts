/**
 * Analyse et score un prompt (clarté, structure, contraintes).
 * MVP : logique déterministe simple. V2 : appeler un LLM pour suggestions.
 */
export interface ScoreResult {
  clarity: number;
  structure: number;
  constraints: number;
  feedback: string;
  suggestions: { text: string; type: "clarity" | "structure" | "constraints" }[];
}

export function analyzePrompt(content: string): ScoreResult {
  const text = content.trim();
  const words = text.split(/\s+/).filter(Boolean);
  const lines = text.split(/\n/).filter(Boolean);

  let clarity = 50;
  let structure = 50;
  let constraints = 50;

  if (words.length >= 20) clarity += 15;
  else if (words.length >= 10) clarity += 5;
  if (words.length >= 50) structure += 10;
  if (/\b(contexte|rôle|format|objectif|contrainte)\b/i.test(text)) structure += 15;
  if (/\b(format|json|markdown|liste|paragraphe)\b/i.test(text)) constraints += 15;
  if (/\b(ne pas|éviter|sans|maximum|minimum)\b/i.test(text)) constraints += 10;
  if (text.includes(":")) structure += 5;
  if (lines.length >= 2) structure += 5;

  clarity = Math.min(100, Math.max(0, clarity));
  structure = Math.min(100, Math.max(0, structure));
  constraints = Math.min(100, Math.max(0, constraints));

  const suggestions: ScoreResult["suggestions"] = [];
  if (clarity < 70) suggestions.push({ text: "Précisez le contexte et l'objectif attendu.", type: "clarity" });
  if (structure < 70) suggestions.push({ text: "Structurez avec des sections (rôle, tâche, format).", type: "structure" });
  if (constraints < 70) suggestions.push({ text: "Ajoutez des contraintes (format de sortie, longueur).", type: "constraints" });

  const avg = (clarity + structure + constraints) / 3;
  let feedback: string;
  if (avg >= 80) feedback = "Très bien, votre prompt est clair et structuré.";
  else if (avg >= 50) feedback = "Bon départ. Pensez à préciser le contexte et le format attendu.";
  else feedback = "Vous pouvez améliorer la clarté et les contraintes. Consultez les suggestions ci-dessous.";

  return { clarity, structure, constraints, feedback, suggestions };
}
