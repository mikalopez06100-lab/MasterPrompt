"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BUILTIN_PROMPTS } from "@/lib/prompt-library";

interface ScoreResult {
  clarity: number;
  structure: number;
  constraints: number;
  feedback: string;
  suggestions: { text: string; type: string }[];
}

interface ClaudeRewriteResult {
  rewrittenPrompt: string;
  rationale: string;
  quickTips: string[];
}

const PERSONA_OPTIONS = [
  { value: "general", label: "General business" },
  { value: "marketing", label: "Marketing" },
  { value: "commercial", label: "Commercial / Vente" },
  { value: "rh", label: "Ressources humaines" },
  { value: "ux", label: "UX / Produit" },
  { value: "it", label: "Tech / IT" },
];

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  const color =
    value >= 80
      ? "bg-accent-success"
      : value >= 50
        ? "bg-accent-warning"
        : "bg-accent-error";
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium">{value}/100</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${color} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function EditorPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [rewriteTarget, setRewriteTarget] = useState(
    "Rendre le prompt plus clair et orienté résultat business"
  );
  const [persona, setPersona] = useState("general");
  const [rewrite, setRewrite] = useState<ClaudeRewriteResult | null>(null);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    if (!templateId) return;
    const template = BUILTIN_PROMPTS.find((p) => p.id === templateId);
    if (!template) return;
    setContent((prev) => (prev.trim().length === 0 ? template.content : prev));
  }, []);

  const analyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/prompts/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, title: content.slice(0, 60) }),
      });
      if (res.ok) router.push("/library");
    } finally {
      setSaving(false);
    }
  };

  const rewriteWithClaude = async () => {
    if (!content.trim()) return;
    setRewriting(true);
    setRewrite(null);
    setRewriteError(null);
    try {
      const res = await fetch("/api/prompts/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, target: rewriteTarget, persona }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRewriteError(data.error || "Impossible de retravailler ce prompt.");
        return;
      }
      setRewrite(data);
    } catch {
      setRewriteError("Une erreur est survenue. Merci de reessayer.");
    } finally {
      setRewriting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
        Éditeur de prompt
      </h1>

      <div className="card">
        <label className="block text-sm font-semibold text-slate-700">
          Votre prompt
        </label>
        <textarea
          placeholder="Collez ou écrivez votre prompt ici…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className="mt-3 w-full resize-y rounded-button border-2 border-slate-200 px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={analyze}
            disabled={loading || !content.trim()}
            className="btn-primary disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? "Analyse…" : "Analyser mon prompt"}
          </button>
          <button
            onClick={rewriteWithClaude}
            disabled={rewriting || !content.trim()}
            className="rounded-button border-2 border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 disabled:opacity-50"
          >
            {rewriting ? "Claude retravaille..." : "Retravailler avec Claude"}
          </button>
          <button
            onClick={save}
            disabled={saving || !content.trim()}
            className="rounded-button border-2 border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Sauvegarder dans ma bibliothèque"}
          </button>
        </div>
      </div>

      {result && (
        <div className="card animate-slide-up">
          <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary-light" />
          <h2 className="font-heading text-lg font-semibold text-slate-900">
            Résultat de l&apos;analyse
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-3">
            <ScoreBar label="Clarté" value={result.clarity} />
            <ScoreBar label="Structure" value={result.structure} />
            <ScoreBar label="Contraintes" value={result.constraints} />
          </div>
          <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            {result.feedback}
          </p>
          {result.suggestions.length > 0 && (
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s.text}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="card space-y-4">
        <h2 className="font-heading text-lg font-semibold text-slate-900">
          Objectif de retravail (Claude)
        </h2>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Persona metier
          </label>
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="w-full rounded-button border-2 border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {PERSONA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <input
          value={rewriteTarget}
          onChange={(e) => setRewriteTarget(e.target.value)}
          className="w-full rounded-button border-2 border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Ex: Version plus persuasive pour une page de vente"
        />
        {rewriteError && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {rewriteError}
          </p>
        )}
      </div>

      {rewrite && (
        <div className="card animate-slide-up space-y-4">
          <div className="mb-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary-light" />
          <h2 className="font-heading text-lg font-semibold text-slate-900">
            Proposition Claude
          </h2>
          <textarea
            value={rewrite.rewrittenPrompt}
            onChange={(e) =>
              setRewrite((prev) =>
                prev ? { ...prev, rewrittenPrompt: e.target.value } : prev
              )
            }
            rows={8}
            className="w-full resize-y rounded-button border-2 border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setContent(rewrite.rewrittenPrompt)}
              className="btn-primary"
            >
              Remplacer mon prompt par cette version
            </button>
          </div>
          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
            {rewrite.rationale}
          </p>
          {rewrite.quickTips.length > 0 && (
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
              {rewrite.quickTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
