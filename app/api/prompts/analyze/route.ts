import { NextResponse } from "next/server";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { analyzePrompt } from "@/lib/prompt-scoring";

export async function POST(request: Request) {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const content = typeof body.content === "string" ? body.content : "";

  if (!content.trim()) {
    return NextResponse.json(
      { error: "Le contenu du prompt est requis" },
      { status: 400 }
    );
  }

  const result = analyzePrompt(content);
  return NextResponse.json(result);
}
