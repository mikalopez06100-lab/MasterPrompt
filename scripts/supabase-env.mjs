/**
 * Aligné sur lib/supabase/env.ts — projet de référence : vgdspxhuqdfilrkhipvx
 * Appeler après loadEnvLocal() si vous chargez .env.local manuellement.
 */
export function resolveSupabaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.DATABASE_SUPABASE_URL?.trim() ||
    ""
  );
}
