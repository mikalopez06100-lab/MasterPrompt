"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AccountSettingsForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [confirmDelete, setConfirmDelete] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveProfile = async (nextName: string) => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nextName }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Impossible de mettre a jour vos informations.");
        return;
      }
      setName(data.user?.name ?? "");
      setMessage("Informations mises a jour.");
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Merci de reessayer.");
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (confirmDelete !== "SUPPRIMER") {
      setError('Tapez "SUPPRIMER" pour confirmer.');
      return;
    }

    setDeleting(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Suppression impossible.");
        return;
      }

      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch {
      setError("Une erreur est survenue pendant la suppression.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="card space-y-4">
        <h2 className="font-heading text-lg font-semibold text-slate-900">
          Informations du profil
        </h2>

        {message && (
          <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {message}
          </p>
        )}
        {error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input
            value={email}
            readOnly
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
          />
          <p className="text-xs text-slate-400">
            L&apos;email est gere par votre connexion Supabase (Magic Link / Google).
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">Nom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveProfile(name)}
            disabled={saving}
            className="btn-primary disabled:opacity-60"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={() => saveProfile("")}
            disabled={saving}
            className="rounded-button border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
          >
            Supprimer le nom
          </button>
        </div>
      </section>

      <section className="card space-y-4 border-red-200/80">
        <h2 className="font-heading text-lg font-semibold text-red-700">
          Zone dangereuse
        </h2>
        <p className="text-sm text-slate-600">
          Supprime vos donnees de progression, vos prompts et votre profil.
        </p>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Tapez SUPPRIMER pour confirmer
          </label>
          <input
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            className="w-full rounded-md border border-red-200 px-3 py-2 text-sm focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-300"
          />
        </div>
        <button
          type="button"
          onClick={deleteAccount}
          disabled={deleting}
          className="rounded-button border border-red-200 bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
        >
          {deleting ? "Suppression..." : "Supprimer mon compte"}
        </button>
      </section>
    </div>
  );
}
