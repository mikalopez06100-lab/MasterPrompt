import { prisma } from "@/lib/db";

export const FORMATION_ACCESS_STATUS = "formation";

/** Active l'accès formation pour un email (achat Stripe ou code d'accès). */
export async function grantFormationAccess(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return;

  const existing = await prisma.user.findUnique({ where: { email: normalized } });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: { subscriptionStatus: FORMATION_ACCESS_STATUS },
    });
    return;
  }

  await prisma.user.create({
    data: {
      email: normalized,
      subscriptionStatus: FORMATION_ACCESS_STATUS,
    },
  });
}

export function hasFormationAccess(subscriptionStatus: string | null | undefined): boolean {
  return subscriptionStatus === FORMATION_ACCESS_STATUS;
}
