import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export async function getSupabaseUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getPrismaUserFromSupabase() {
  const supabaseUser = await getSupabaseUser();
  if (!supabaseUser) return null;

  const dbUser = await ensurePrismaUser(supabaseUser);
  return dbUser;
}

/** Crée ou met à jour le User Prisma à partir de Supabase Auth */
export async function ensurePrismaUser(supabaseUser: SupabaseUser) {
  const email = supabaseUser.email?.toLowerCase().trim();
  if (!email) return null;

  const existing = await prisma.user.findFirst({
    where: {
      OR: [
        { supabaseId: supabaseUser.id },
        { email },
      ],
    },
  });

  if (existing) {
    if (existing.supabaseId !== supabaseUser.id) {
      await prisma.user.update({
        where: { id: existing.id },
        data: { supabaseId: supabaseUser.id, name: supabaseUser.user_metadata?.name ?? existing.name },
      });
    }
    return prisma.user.findUnique({ where: { id: existing.id } });
  }

  return prisma.user.create({
    data: {
      supabaseId: supabaseUser.id,
      email,
      name: supabaseUser.user_metadata?.name ?? email.split("@")[0],
      role: "STUDENT",
    },
  });
}
