"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type DiagnosticAnswers,
  computeDiagnostic,
  PROFILE_COPY,
} from "@/lib/diagnostic";

const Q1_OPTIONS = [
  { value: "coach", label: "Coach / Consultant / Thérapeute", icon: "🎯" },
  { value: "artisan", label: "Artisan / Bâtiment / Technicien", icon: "🔧" },
  { value: "freelance", label: "Freelance créatif / Développeur", icon: "🎨" },
  { value: "commerce", label: "Commerce / Boutique / E-commerce", icon: "🛍️" },
  { value: "services_b2b", label: "Services aux entreprises", icon: "💼" },
  { value: "autre", label: "Autre", icon: "➕" },
] as const;

const Q2_OPTIONS = [
  { value: "solo", label: "Seul(e) — solopreneur" },
  { value: "small", label: "Avec 1 à 4 collaborateurs" },
  { value: "medium", label: "Équipe de 5 personnes ou plus" },
] as const;

const Q3_OPTIONS = [
  { value: "never", label: "Je n'ai jamais vraiment essayé" },
  { value: "disappointed", label: "J'ai essayé, mais les résultats sont décevants" },
  { value: "regular", label: "Je l'utilise régulièrement mais pas de méthode" },
  { value: "advanced", label: "Je maîtrise déjà plusieurs outils IA" },
] as const;

const Q4_OPTIONS = [
  { value: "emails", label: "Emails & communication clients" },
  { value: "content", label: "Contenu & réseaux sociaux" },
  { value: "quotes", label: "Devis, factures, admin" },
  { value: "prospection", label: "Prospection & suivi commercial" },
  { value: "reporting", label: "Comptes-rendus & rapports" },
  { value: "other", label: "Autre" },
] as const;

const Q5_OPTIONS = [
  { value: "lt2", label: "Moins de 2h" },
  { value: "2to5", label: "Entre 2h et 5h" },
  { value: "5to10", label: "Entre 5h et 10h" },
  { value: "gt10", label: "Plus de 10h" },
] as const;

const Q6_OPTIONS = [
  { value: "no_time", label: "Pas le temps d'apprendre une nouvelle chose" },
  { value: "bad_results", label: "Les résultats ne correspondent pas à mon activité" },
  { value: "dont_know_where", label: "Je ne sais pas par où commencer" },
  { value: "no_confidence", label: "Je n'ai pas confiance dans les outils IA" },
  { value: "already_ok", label: "Je suis déjà à l'aise, je veux aller plus loin" },
] as const;

const Q7_OPTIONS = [
  { value: "time", label: "Récupérer du temps sur les tâches répétitives" },
  { value: "produce", label: "Produire plus de contenu, plus vite" },
  { value: "prospect", label: "Mieux prospecter et closer des clients" },
  { value: "automate", label: "Automatiser des processus complets" },
  { value: "all", label: "Tout ça à la fois" },
] as const;

function displayFontClass() {
  return "font-[family-name:var(--font-diag-display)]";
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function toggleTask(tasks: string[] | undefined, value: string, max: number): string[] {
  const cur = tasks ?? [];
  if (cur.includes(value)) return cur.filter((x) => x !== value);
  if (cur.length >= max) return cur;
  return [...cur, value];
}

export default function DiagnosticPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({ tasks: [] });
  const [email, setEmail] = useState("");
  const [submitBusy, setSubmitBusy] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gateGauge, setGateGauge] = useState(0);

  const scores = useMemo(() => computeDiagnostic(answers), [answers]);
  const copy = scores.profile ? PROFILE_COPY[scores.profile] : null;

  const progressQuiz = step >= 1 && step <= 7 ? (step / 7) * 100 : step > 7 ? 100 : 0;

  const canGoNext = useCallback(() => {
    switch (step) {
      case 1:
        return Boolean(answers.sector);
      case 2:
        return Boolean(answers.structure);
      case 3:
        return Boolean(answers.aiUsage);
      case 4:
        return (answers.tasks?.length ?? 0) >= 1;
      case 5:
        return Boolean(answers.timeWasted);
      case 6:
        return Boolean(answers.mainBlocker);
      case 7:
        return Boolean(answers.mainGoal);
      default:
        return true;
    }
  }, [step, answers]);

  const pickAndAdvance = (patch: Partial<DiagnosticAnswers>, nextStep: number) => {
    setAnswers((a) => ({ ...a, ...patch }));
    setStep(nextStep);
  };

  const goNext = () => {
    if (step < 7 && !canGoNext()) return;
    if (step === 7) {
      setStep(8);
      return;
    }
    setStep((s) => s + 1);
  };

  useEffect(() => {
    if (step !== 8) {
      setGateGauge(0);
      return;
    }
    const id = requestAnimationFrame(() => setGateGauge(1));
    return () => cancelAnimationFrame(id);
  }, [step]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValidEmail(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    setSubmitBusy(true);
    const body = {
      email: email.trim().toLowerCase(),
      answers,
      score: scores.normalizedScore,
      profile: scores.profile,
      sector: answers.sector ?? null,
    };

    try {
      const res = await fetch("/api/diagnostic/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      const ok = res.ok && data.success;
      if (!ok && data.error) setError(data.error);
      else if (!ok)
        setError("Enregistrement incomplet — votre diagnostic s’affiche ci-dessous.");
      else setError(null);
    } catch {
      setError("Réseau indisponible — votre diagnostic s’affiche ci-dessous.");
    } finally {
      setSubmitBusy(false);
    }

    setIsAnalyzing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsAnalyzing(false);
    setStep(9);
  };

  const heading = `${displayFontClass()} tracking-tight`;

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      {/* Barre progression fine */}
      <div
        className="fixed left-0 right-0 top-0 z-30 h-0.5 bg-[#1A2E42]/30"
        aria-hidden
      >
        <div
          className="h-full bg-[#F59E0B] transition-[width] duration-500 ease-out"
          style={{ width: `${step >= 9 ? 100 : progressQuiz}%` }}
        />
      </div>

      {/* Landing */}
      {step === 0 && (
        <div className="diag-step-panel flex min-h-[100dvh] flex-col justify-center px-4 pb-8 pt-16 sm:px-8">
          <div className="mx-auto w-full max-w-lg">
            <h1 className={`${heading} text-3xl font-bold leading-tight sm:text-4xl`}>
              Où en êtes-vous vraiment avec l&apos;IA ?
            </h1>
            <p className="mt-3 text-base text-[#64748B] sm:text-lg">
              7 questions · 3 minutes · Diagnostic personnalisé gratuit
            </p>
            <p className="mt-6 text-[#0D1B2A]/90">
              Découvrez votre score IA-readiness et les 3 actions prioritaires pour votre activité.
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`${heading} mt-10 w-full rounded-lg bg-[#F59E0B] px-6 py-4 text-center text-base font-semibold text-[#0D1B2A] shadow-md transition hover:brightness-105 active:scale-[0.99] sm:w-auto`}
            >
              Commencer le diagnostic →
            </button>
            <p className="mt-8 text-sm text-[#64748B]">
              +200 entrepreneurs ont déjà fait ce diagnostic
            </p>
          </div>
        </div>
      )}

      {/* Q1 */}
      {step === 1 && (
        <QuestionShell stepKey={1} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>Votre activité principale, c&apos;est…</h2>
          <div className="mt-6 grid max-h-[min(58vh,420px)] grid-cols-1 gap-2 overflow-y-auto sm:max-h-none sm:grid-cols-2 sm:overflow-visible">
            {Q1_OPTIONS.map((opt) => {
              const sel = answers.sector === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => pickAndAdvance({ sector: opt.value }, 2)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left text-sm transition sm:p-4 ${
                    sel
                      ? "diag-option-selected border-[#F59E0B] bg-[#1A2E42] text-[#F8F7F4] shadow-md"
                      : "border-[#E2DDD6] bg-white text-[#0D1B2A] hover:border-[#F59E0B]/50"
                  }`}
                >
                  <span className="text-2xl" aria-hidden>
                    {opt.icon}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </QuestionShell>
      )}

      {/* Q2 */}
      {step === 2 && (
        <QuestionShell stepKey={2} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>Vous travaillez…</h2>
          <div className="mt-8 flex flex-col gap-3">
            {Q2_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                selected={answers.structure === opt.value}
                onClick={() => pickAndAdvance({ structure: opt.value }, 3)}
                label={opt.label}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Q3 */}
      {step === 3 && (
        <QuestionShell stepKey={3} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>Votre rapport avec l&apos;IA aujourd&apos;hui…</h2>
          <div className="mt-8 flex flex-col gap-3">
            {Q3_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                selected={answers.aiUsage === opt.value}
                onClick={() => pickAndAdvance({ aiUsage: opt.value }, 4)}
                label={opt.label}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Q4 */}
      {step === 4 && (
        <QuestionShell stepKey={4} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>
            Quelles tâches vous font perdre le plus de temps chaque semaine ?
          </h2>
          <p className="mt-2 text-sm text-[#64748B]">2 choix maximum</p>
          <div className="mt-6 flex max-h-[min(50vh,380px)] flex-col gap-2 overflow-y-auto sm:max-h-none">
            {Q4_OPTIONS.map((opt) => {
              const tasks = answers.tasks ?? [];
              const sel = tasks.includes(opt.value);
              const atMax = tasks.length >= 2 && !sel;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={atMax}
                  onClick={() =>
                    setAnswers((a) => ({
                      ...a,
                      tasks: toggleTask(a.tasks, opt.value, 2),
                    }))
                  }
                  className={`rounded-xl border p-3 text-left text-sm transition sm:p-4 ${
                    atMax ? "cursor-not-allowed opacity-40" : ""
                  } ${
                    sel
                      ? "diag-option-selected border-[#F59E0B] bg-[#1A2E42] text-[#F8F7F4]"
                      : "border-[#E2DDD6] bg-white hover:border-[#F59E0B]/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </QuestionShell>
      )}

      {/* Q5 */}
      {step === 5 && (
        <QuestionShell stepKey={5} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>
            Sur ces tâches, vous perdez combien d&apos;heures par semaine ?
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {Q5_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                selected={answers.timeWasted === opt.value}
                onClick={() => pickAndAdvance({ timeWasted: opt.value }, 6)}
                label={opt.label}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Q6 */}
      {step === 6 && (
        <QuestionShell stepKey={6} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>
            Ce qui vous freine le plus avec l&apos;IA, c&apos;est…
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {Q6_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                selected={answers.mainBlocker === opt.value}
                onClick={() => pickAndAdvance({ mainBlocker: opt.value }, 7)}
                label={opt.label}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Q7 */}
      {step === 7 && (
        <QuestionShell stepKey={7} headingClass={heading} onNext={goNext} canNext={canGoNext()}>
          <h2 className={`${heading} text-xl font-bold sm:text-2xl`}>Votre priorité numéro 1 avec l&apos;IA…</h2>
          <div className="mt-8 flex flex-col gap-3">
            {Q7_OPTIONS.map((opt) => (
              <OptionRow
                key={opt.value}
                selected={answers.mainGoal === opt.value}
                onClick={() => pickAndAdvance({ mainGoal: opt.value }, 8)}
                label={opt.label}
              />
            ))}
          </div>
        </QuestionShell>
      )}

      {/* Email gate */}
      {step === 8 && (
        <div className="diag-step-panel flex min-h-[100dvh] flex-col justify-center px-4 pb-10 pt-16 sm:px-8">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-[#1A2E42]/25">
              <div
                className="h-full origin-left rounded-full bg-[#F59E0B] transition-[transform] duration-[1.2s] ease-out"
                style={{
                  transform: `scaleX(${(gateGauge * scores.normalizedScore) / 100})`,
                }}
              />
            </div>
            <h2 className={`${heading} text-2xl font-bold`}>Votre diagnostic est prêt.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">
              Entrez votre email pour recevoir votre score IA-readiness, votre profil personnalisé et vos 3
              recommandations prioritaires.
            </p>
            <form onSubmit={handleEmailSubmit} className="mt-8 space-y-4">
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                className="w-full rounded-lg border border-[#E2DDD6] bg-white px-4 py-3 text-[#0D1B2A] outline-none ring-[#F59E0B]/40 transition focus:ring-2"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitBusy}
                className={`${heading} w-full rounded-lg bg-[#F59E0B] py-3.5 text-sm font-semibold text-[#0D1B2A] transition hover:brightness-105 disabled:opacity-60`}
              >
                {submitBusy ? "Envoi…" : "Voir mon diagnostic →"}
              </button>
            </form>
            <p className="mt-4 text-xs text-[#64748B]">
              Vos données ne sont pas revendues. Désabonnement en 1 clic.
            </p>
          </div>
        </div>
      )}

      {/* Analyse */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0D1B2A]/85 text-[#F8F7F4]">
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-[#F59E0B] border-t-transparent"
            aria-hidden
          />
          <p className={`${heading} mt-6 text-lg`}>Analyse en cours…</p>
        </div>
      )}

      {/* Résultats */}
      {step === 9 && copy && (
        <div className="animate-fade-in min-h-[100dvh] overflow-y-auto px-4 pb-16 pt-14 sm:px-8">
          <div className="mx-auto max-w-2xl">
            {error && (
              <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {error}
              </p>
            )}
            <div
              className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: copy.badgeHex }}
            >
              Profil
            </div>
            <h1 className={`${heading} mt-4 text-3xl font-bold sm:text-4xl`}>{copy.title}</h1>
            <p className="mt-2 text-lg text-[#64748B]">{copy.subtitle}</p>
            <p
              className={`${heading} mt-6 text-5xl font-bold tabular-nums sm:text-6xl`}
              style={{ color: copy.badgeHex }}
            >
              {scores.normalizedScore}{" "}
              <span className="text-2xl font-semibold text-[#64748B] sm:text-3xl">/ 100</span>
            </p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-[#1A2E42]/20">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-out"
                style={{
                  width: `${scores.normalizedScore}%`,
                  backgroundColor: copy.badgeHex,
                }}
              />
            </div>
            <p className="mt-8 text-base leading-relaxed text-[#0D1B2A]/90">{copy.message}</p>
            <h3 className={`${heading} mt-12 text-xl font-bold`}>Vos 3 priorités</h3>
            <ol className="mt-4 space-y-4">
              {copy.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-xl border border-[#E2DDD6] bg-white p-4 shadow-sm"
                >
                  <span
                    className={`${heading} shrink-0 text-2xl font-bold text-[#F59E0B]`}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed sm:text-base">{rec}</span>
                </li>
              ))}
            </ol>
            <div className="mt-12 rounded-2xl border border-[#F59E0B]/40 bg-[#0D1B2A] p-6 text-center text-[#F8F7F4]">
              <Link
                href={copy.ctaHref}
                className={`${heading} inline-block rounded-lg bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-[#0D1B2A] transition hover:brightness-110`}
              >
                {copy.ctaLabel}
              </Link>
            </div>
            <p className="mt-8 text-center text-sm text-[#64748B]">
              <button type="button" className="underline" onClick={() => window.location.reload()}>
                Refaire le diagnostic
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionShell({
  children,
  headingClass,
  onNext,
  canNext,
  stepKey,
}: {
  children: React.ReactNode;
  headingClass: string;
  onNext: () => void;
  canNext: boolean;
  stepKey: number;
}) {
  return (
    <div
      key={stepKey}
      className="diag-step-panel flex min-h-[100dvh] max-h-[100dvh] flex-col px-4 pb-6 pt-16 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col">{children}</div>
      <div className="mx-auto mt-auto w-full max-w-xl shrink-0 pt-4">
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={`${headingClass} w-full rounded-lg bg-[#F59E0B] py-3.5 text-sm font-semibold text-[#0D1B2A] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-40`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

function OptionRow({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-3 text-left text-sm transition sm:p-4 ${
        selected
          ? "diag-option-selected border-[#F59E0B] bg-[#1A2E42] text-[#F8F7F4] shadow-md"
          : "border-[#E2DDD6] bg-white text-[#0D1B2A] hover:border-[#F59E0B]/50"
      }`}
    >
      {label}
    </button>
  );
}
