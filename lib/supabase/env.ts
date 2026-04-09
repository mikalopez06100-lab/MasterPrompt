/**
 * Projet Supabase de référence (prod Master Prompt) : vgdspxhuqdfilrkhipvx
 * Supporte les noms standard et les alias injectés par l’intégration Vercel ↔ Supabase.
 */

const EXPECTED_HOST_PREFIX = "vgdspxhuqdfilrkhipvx";

let warnedUnexpectedHost = false;

function maybeWarnWrongProject(url: string) {
  if (warnedUnexpectedHost || process.env.NODE_ENV === "production") return;
  try {
    const host = new URL(url).hostname;
    if (
      host.endsWith(".supabase.co") &&
      !host.startsWith(`${EXPECTED_HOST_PREFIX}.`)
    ) {
      console.warn(
        `[Supabase] L’URL (${host}) ne correspond pas au projet attendu (${EXPECTED_HOST_PREFIX}). Vérifiez les variables d’environnement.`
      );
      warnedUnexpectedHost = true;
    }
  } catch {
    // ignore URL parse errors
  }
}

function trimUrl(url: string): string {
  return url.trim().replace(/\/$/, "");
}

/** URL du projet (https://xxx.supabase.co), sans slash final. */
export function getSupabaseProjectUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.DATABASE_SUPABASE_URL?.trim() ||
    "";
  const url = raw ? trimUrl(raw) : "";
  if (url) maybeWarnWrongProject(url);
  return url;
}

/** Clé anon JWT (recommandée) ; fallback sur le nom généré par l’intégration Vercel. */
export function getSupabaseAnonKey(): string {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_DATABASE_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function requireSupabasePublicConfig(): { url: string; anonKey: string } {
  const url = getSupabaseProjectUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    throw new Error(
      "Supabase non configuré : définissez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY (ou DATABASE_SUPABASE_URL et NEXT_PUBLIC_DATABASE_SUPABASE_ANON_KEY)."
    );
  }
  return { url, anonKey };
}
