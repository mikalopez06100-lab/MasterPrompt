"use client";

import { useState } from "react";

export function AccompagnementApplicationForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setState("loading");
    setMessage("");
    const payload = {
      nom: String(formData.get("nom") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      telephone: String(formData.get("telephone") ?? "").trim(),
      activite: String(formData.get("activite") ?? "").trim(),
      ca: String(formData.get("ca") ?? "").trim(),
      attente: String(formData.get("attente") ?? "").trim(),
    };
    try {
      const res = await fetch("/api/accompagnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Impossible d'envoyer la candidature.");
      }
      setState("success");
      setMessage("Candidature envoyée. Réponse sous 48h.");
      window.location.href = "/accompagnement/merci";
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Erreur.");
    }
  }

  return (
    <form action={onSubmit} className="rounded-2xl border border-border bg-white p-6 space-y-3">
      <input name="nom" required placeholder="Nom" className="card-input" />
      <input name="email" type="email" required placeholder="Email" className="card-input" />
      <input name="telephone" required placeholder="Téléphone" className="card-input" />
      <input name="activite" required placeholder="Activité actuelle" className="card-input" />
      <input name="ca" required placeholder="CA approximatif" className="card-input" />
      <textarea name="attente" required placeholder="Attente principale" rows={4} className="card-input resize-none" />
      <button type="submit" disabled={state === "loading"} className="w-full rounded-button bg-navy px-4 py-3 text-sm font-semibold text-white">
        {state === "loading" ? "Envoi..." : "Candidater"}
      </button>
      {message ? <p className={`text-sm ${state === "error" ? "text-red-600" : "text-emerald-700"}`}>{message}</p> : null}
    </form>
  );
}
