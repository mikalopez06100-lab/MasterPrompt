import { NextResponse } from "next/server";
import { getPrismaUserFromSupabase } from "@/lib/auth-server";
import { prisma } from "@/lib/db";

export async function GET() {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const progress = await prisma.userProgress.findMany({
    where: { userId: user.id },
  });
  return NextResponse.json(progress);
}

export async function POST(request: Request) {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const moduleId = typeof body.moduleId === "string" ? body.moduleId : null;
  const completed = Boolean(body.completed);

  if (!moduleId) {
    return NextResponse.json(
      { error: "moduleId requis" },
      { status: 400 }
    );
  }

  let progress = await prisma.userProgress.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId } },
  });
  if (progress) {
    progress = await prisma.userProgress.update({
      where: { id: progress.id },
      data: { completed, completedAt: completed ? new Date() : null },
    });
  } else {
    progress = await prisma.userProgress.create({
      data: { userId: user.id, moduleId, completed, completedAt: completed ? new Date() : null },
    });
  }

  return NextResponse.json(progress);
}
