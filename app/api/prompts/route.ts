import { NextResponse } from "next/server";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const prompts = await prisma.prompt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(prompts);
}

export async function POST(request: Request) {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const title = typeof body.title === "string" ? body.title : "Sans titre";
  const content = typeof body.content === "string" ? body.content : "";
  const category = typeof body.category === "string" ? body.category : null;

  if (!content.trim()) {
    return NextResponse.json(
      { error: "Le contenu du prompt est requis" },
      { status: 400 }
    );
  }

  const prompt = await prisma.prompt.create({
    data: { userId: user.id, title, content, category },
  });
  return NextResponse.json(prompt);
}
