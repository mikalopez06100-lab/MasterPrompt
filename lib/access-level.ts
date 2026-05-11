import { cookies } from "next/headers";

/**
 * Niveau d'accès du visiteur sur l'espace formation.
 * - "none"    : aucun cookie → doit passer par le gate email.
 * - "preview" : a entré son email → voit l'espace mais tout est flouté.
 * - "full"    : a payé / est membre actif → accès complet aux vidéos (à implémenter
 *               quand le système d'achat sera en place — pour l'instant jamais retourné).
 */
export type AccessLevel = "none" | "preview" | "full";

const PREVIEW_COOKIE = "mp_preview_access";
const FULL_ACCESS_COOKIE = "mp_full_access";

export async function getAccessLevel(): Promise<AccessLevel> {
  const cookieStore = await cookies();
  if (cookieStore.get(FULL_ACCESS_COOKIE)?.value === "1") return "full";
  if (cookieStore.get(PREVIEW_COOKIE)?.value === "1") return "preview";
  return "none";
}
