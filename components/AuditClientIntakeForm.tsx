"use client";

import { useState } from "react";

const STAGE_OPTIONS = [
  "Idee (pas encore lance)",
  "Pre-revenus (lance mais < 5 ventes)",
  "Lance (CA mensuel regulier)",
  "Scaling (croissance active, equipe en place)",
];

const LAUNCHED_REVENUE_OPTIONS = ["< 2 K€", "2-10 K€", "10-30 K€", "> 30 K€"];

const CONSTRAINT_OPTIONS = [
  "Budget marketing limite",
  "Equipe restreinte / solo",
  "Delai serre",
  "Contrainte reglementaire / certification",
  "Refus categorique d'un format",
];

const CHALLENGE_OPTIONS = [
  "Mon positionnement / persona",
  "Mon pricing",
  "Mon offre / structure des produits",
  "Mon site web / conversion",
  "Mon acquisition / canaux",
  "Mes process / temps perdu",
  "Tout, je veux un diagnostic global",
];

export function AuditClientIntakeForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setState("loading");
    setMessage("");

    const payload = {
      contactNom: String(formData.get("contactNom") ?? "").trim(),
      contactEmail: String(formData.get("contactEmail") ?? "").trim(),
      pitch: String(formData.get("pitch") ?? "").trim(),
      stage: String(formData.get("stage") ?? "").trim(),
      launchedRevenueRange: String(formData.get("launchedRevenueRange") ?? "").trim(),
      idealClient: String(formData.get("idealClient") ?? "").trim(),
      competitors: String(formData.get("competitors") ?? "").trim(),
      objective12m: String(formData.get("objective12m") ?? "").trim(),
      constraints: formData.getAll("constraints").map((item) => String(item)),
      constraintsDetails: String(formData.get("constraintsDetails") ?? "").trim(),
      failedAttempts: String(formData.get("failedAttempts") ?? "").trim(),
      priorities: formData.getAll("priorities").map((item) => String(item)),
    };

    try {
      const res = await fetch("/api/audit-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Impossible d'envoyer le formulaire.");
      }

      setState("success");
      setMessage("Reponses envoyees avec succes. Merci.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <form action={onSubmit} className="space-y-8 rounded-2xl border border-border bg-white p-6 sm:p-8">
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Contact</h3>
        <input name="contactNom" required placeholder="Nom / Prenom" className="card-input" />
        <input name="contactEmail" type="email" required placeholder="Email" className="card-input" />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">1) En une phrase, que vendez-vous, a qui, et comment ?</h3>
        <textarea
          name="pitch"
          required
          rows={3}
          maxLength={280}
          placeholder="1 phrase concise (idealement 25 mots max)"
          className="card-input resize-y"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">2) A quel stade en etes-vous ?</h3>
        <div className="space-y-2 text-sm text-slate-700">
          {STAGE_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input type="radio" name="stage" value={option} required />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-700">Si "Lance", ordre de grandeur du CA mensuel</label>
          <select name="launchedRevenueRange" className="card-input">
            <option value="">Non concerne</option>
            {LAUNCHED_REVENUE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">3) Decrivez votre client ideal en 3 lignes</h3>
        <textarea
          name="idealClient"
          required
          rows={6}
          placeholder="Qui est-il ? Quel probleme vit-il ? Pourquoi il achete maintenant ?"
          className="card-input resize-y"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">4) Citez 3 a 5 concurrents directs (noms ou URLs)</h3>
        <textarea name="competitors" required rows={4} placeholder="Concurrent 1, 2, 3..." className="card-input resize-y" />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">5) Quel est votre objectif chiffre a 12 mois ?</h3>
        <textarea
          name="objective12m"
          required
          rows={3}
          placeholder="Un chiffre + une date (CA cible, nombre de clients, leads/mois, etc.)"
          className="card-input resize-y"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">6) Quelles sont vos 3 contraintes principales ?</h3>
        <div className="space-y-2 text-sm text-slate-700">
          {CONSTRAINT_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input type="checkbox" name="constraints" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <textarea
          name="constraintsDetails"
          rows={3}
          placeholder="Precisions utiles (budget, temps dispo, deadline, format refuse, autre...)"
          className="card-input resize-y"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">7) Qu'avez-vous deja essaye qui n'a pas marche ?</h3>
        <textarea
          name="failedAttempts"
          required
          rows={6}
          placeholder="Detaillez 2-3 tentatives (canal, budget, duree, cause de l'echec)"
          className="card-input resize-y"
        />
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold">8) Sur quoi voulez-vous etre challenged en priorite ?</h3>
        <div className="space-y-2 text-sm text-slate-700">
          {CHALLENGE_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input type="checkbox" name="priorities" value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </section>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full rounded-button bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {state === "loading" ? "Envoi..." : "Valider et envoyer"}
      </button>

      {message ? <p className={`text-sm ${state === "error" ? "text-red-600" : "text-emerald-700"}`}>{message}</p> : null}
    </form>
  );
}
