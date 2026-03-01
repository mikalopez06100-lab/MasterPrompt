import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.user.findFirst();
    return NextResponse.json({ ok: true, message: "Base de données OK" });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[test-db]", err);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
