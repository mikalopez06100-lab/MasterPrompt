"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  /** Caption affichée sous la vidéo. Mettre `null` pour la masquer. */
  caption?: string | null;
  /** Adapte la couleur de la caption au fond ("light" pour fond sombre). */
  variant?: "dark" | "light";
  /** Portrait 9:16 (défaut) ou paysage 16:9 */
  aspect?: "portrait" | "landscape";
};

/**
 * Player vidéo responsive, pensé mobile-first.
 * Lecture manuelle via bouton play — le son est activé dès le lancement.
 */
export function PresentationVideo({
  src,
  poster,
  className = "",
  caption = "2 min — Présentation Master Prompt par Michaël Lopez",
  variant = "dark",
  aspect = "portrait",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [started, setStarted] = useState(false);

  function handleStart() {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.muted = false;
    el.play().catch(() => null);
    setStarted(true);
  }

  const isLandscape = aspect === "landscape";
  const wrapperMax = isLandscape ? "max-w-3xl" : "max-w-[360px] sm:max-w-[420px]";
  const aspectClass = isLandscape ? "aspect-video" : "aspect-[9/16]";
  const objectClass = isLandscape ? "object-contain" : "object-cover";

  return (
    <div className={`relative mx-auto w-full ${wrapperMax} ${className}`}>
      <div
        className={`relative ${aspectClass} overflow-hidden rounded-2xl border border-border bg-black shadow-[0_20px_60px_rgba(15,23,42,0.18)]`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={started}
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full ${objectClass}`}
          crossOrigin="anonymous"
          onPlay={() => setStarted(true)}
        >
          Votre navigateur ne supporte pas la lecture vidéo HTML5.
        </video>

        {!started && (
          <button
            type="button"
            onClick={handleStart}
            aria-label="Lancer la vidéo"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/30 transition hover:bg-black/40"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-xl text-navy shadow-lg">
              ▶
            </span>
            <span className="text-xs font-semibold text-white">Lire la vidéo</span>
          </button>
        )}
      </div>
      {caption && (
        <p className={`mt-3 text-center text-xs ${variant === "light" ? "text-slate-300" : "text-muted"}`}>
          {caption}
        </p>
      )}
    </div>
  );
}
