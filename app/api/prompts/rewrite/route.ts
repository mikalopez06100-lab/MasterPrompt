import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";

type RewriteResponse = {
  rewrittenPrompt: string;
  rationale: string;
  quickTips: string[];
};

const PERSONA_PROMPTS: Record<string, string> = {
  general:
    "Adopte un ton polyvalent business, clair et orienté execution.",
  marketing:
    "Agis comme un expert marketing digital (acquisition, conversion, copywriting).",
  commercial:
    "Agis comme un expert commercial (prospection, objection handling, closing).",
  rh:
    "Agis comme un expert RH (recrutement, communication interne, management).",
  ux: "Agis comme un expert UX/Produit (clarte utilisateur, structure, tests).",
  it: "Agis comme un expert Tech/IT (precision technique, contraintes, robustesse).",
};

function extractJsonBlock(text: string): RewriteResponse | null {
  const trimmed = text.trim();
  const direct = tryParseJson(trimmed);
  if (direct) return direct;

  const match = trimmed.match(/\{[\s\S]*\}/);
  if (!match) return null;
  return tryParseJson(match[0]);
}

function tryParseJson(input: string): RewriteResponse | null {
  try {
    const parsed = JSON.parse(input);
    if (
      typeof parsed?.rewrittenPrompt === "string" &&
      typeof parsed?.rationale === "string" &&
      Array.isArray(parsed?.quickTips)
    ) {
      return {
        rewrittenPrompt: parsed.rewrittenPrompt.trim(),
        rationale: parsed.rationale.trim(),
        quickTips: parsed.quickTips
          .filter((v: unknown) => typeof v === "string")
          .map((v: string) => v.trim())
          .filter(Boolean)
          .slice(0, 5),
      };
    }
  } catch {
    return null;
  }
  return null;
}

export async function POST(request: Request) {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const content = typeof body.content === "string" ? body.content : "";
  const target = typeof body.target === "string" ? body.target.trim() : "";
  const personaRaw = typeof body.persona === "string" ? body.persona : "general";
  const persona = personaRaw.trim().toLowerCase();

  if (!content.trim()) {
    return NextResponse.json(
      { error: "Le contenu du prompt est requis." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY manquante sur le serveur." },
      { status: 500 }
    );
  }

  const model =
    process.env.ANTHROPIC_MODEL?.trim() || "claude-3-5-sonnet-20241022";

  try {
    const anthropic = new Anthropic({ apiKey });
    const system = [
      "Tu es un expert en prompt engineering pour entrepreneurs.",
      PERSONA_PROMPTS[persona] ?? PERSONA_PROMPTS.general,
      "Tu améliores le prompt sans changer l'intention métier.",
      "Tu retournes STRICTEMENT du JSON valide avec cette forme:",
      '{ "rewrittenPrompt": string, "rationale": string, "quickTips": string[] }',
      "Pas de markdown. Pas de texte hors JSON.",
    ].join(" ");

    const userMessage = [
      `Objectif prioritaire: ${target || "Rendre le prompt plus clair, actionnable et specifique."}`,
      "",
      "Prompt original:",
      content,
    ].join("\n");

    const completion = await anthropic.messages.create({
      model,
      max_tokens: 1200,
      temperature: 0.3,
      system,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = completion.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n")
      .trim();

    const parsed = extractJsonBlock(text);
    if (!parsed || !parsed.rewrittenPrompt) {
      return NextResponse.json(
        { error: "Reponse Claude invalide. Merci de reessayer." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const message =
      typeof error === "object" && error && "message" in error
        ? String((error as { message?: string }).message)
        : "Erreur lors de l'appel a Claude.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
