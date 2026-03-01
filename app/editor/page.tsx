"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ScoreResult {
  clarity: number;
  structure: number;
  constraints: number;
  feedback: string;
  suggestions: { text: string; type: string }[];
}

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
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

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
    </div>
  );
}
