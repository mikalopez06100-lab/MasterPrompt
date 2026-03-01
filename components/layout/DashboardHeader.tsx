"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type User = { email: string | null; name?: string | null };

export function DashboardHeader({ user }: { user: User }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="flex h-14 items-center justify-end border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-sm">
      <span className="mr-4 text-sm font-medium text-slate-600">{user?.email}</span>
      <button
        onClick={handleSignOut}
        className="rounded-button border-2 border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
      >
        Déconnexion
      </button>
    </header>
  );
}
