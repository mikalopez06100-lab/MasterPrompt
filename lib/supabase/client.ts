import { createBrowserClient } from "@supabase/ssr";
import { requireSupabasePublicConfig } from "./env";

export function createClient() {
  const { url, anonKey } = requireSupabasePublicConfig();
  return createBrowserClient(url, anonKey);
}
