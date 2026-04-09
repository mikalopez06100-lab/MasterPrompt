import { NextResponse } from "next/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { getPrismaUserFromSupabase, getSupabaseUser } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import { getSupabaseProjectUrl } from "@/lib/supabase/env";

export async function PATCH(request: Request) {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { name: name.length > 0 ? name : null },
    select: { id: true, name: true, email: true },
  });

  return NextResponse.json({ user: updated });
}

export async function DELETE() {
  const user = await getPrismaUserFromSupabase();
  if (!user) {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }

  const supabaseUser = await getSupabaseUser();

  await prisma.$transaction([
    prisma.userProgress.deleteMany({ where: { userId: user.id } }),
    prisma.prompt.deleteMany({ where: { userId: user.id } }),
    prisma.subscription.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  if (supabaseUser?.id) {
    const url = getSupabaseProjectUrl();
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && serviceKey) {
      const admin = createAdminClient(url, serviceKey);
      await admin.auth.admin.deleteUser(supabaseUser.id);
    }
  }

  return NextResponse.json({ success: true });
}
