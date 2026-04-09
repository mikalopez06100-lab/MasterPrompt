"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export function LibraryMetierSelect({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const raw = (searchParams.get("metier") ?? "").trim().toLowerCase();
  const selected = categories.find((c) => c.toLowerCase() === raw) ?? "";

  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
      <label
        htmlFor="library-metier"
        className="shrink-0 text-sm font-medium text-slate-700"
      >
        Metier
      </label>
      <select
        id="library-metier"
        value={selected}
        disabled={isPending}
        onChange={(e) => {
          const v = e.target.value;
          startTransition(() => {
            if (!v) router.push("/library");
            else
              router.push(
                `/library?metier=${encodeURIComponent(v.toLowerCase())}`
              );
          });
        }}
        className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Tous les metiers</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
