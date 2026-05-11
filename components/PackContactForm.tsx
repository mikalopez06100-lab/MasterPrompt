"use client";

import { useState } from "react";

export function PackContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    setMessage("");

    const payload = {
      prenom: String(formData.get("prenom") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      activite: String(formData.get("activite") ?? "").trim(),
      objectif: String(formData.get("objectif") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Impossible d'envoyer votre demande.");
      }

      setStatus("success");
      setMessage("Merci, votre demande a bien ete envoyee. Je vous recontacte rapidement.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-3 rounded-2xl border border-border bg-white p-6">
      <input name="prenom" placeholder="Prenom" required className="card-input" />
      <input name="email" type="email" placeholder="Email" required className="card-input" />
      <input name="activite" placeholder="Votre activite" required className="card-input" />
      <textarea
        name="objectif"
        placeholder="Votre objectif principal avec l'IA"
        required
        rows={4}
        className="card-input resize-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-button bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? "Envoi..." : "Envoyer ma demande Pack IA"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "success" ? "text-emerald-700" : "text-red-600"}`}>{message}</p>
      ) : null}
    </form>
  );
}
