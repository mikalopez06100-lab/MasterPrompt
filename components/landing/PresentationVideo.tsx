"use client";

import { useEffect, useRef, useState } from "react";

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
 * Autoplay muted au scroll-in, bouton pour activer le son, contrôles natifs.
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
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.play().catch(() => {
                // Autoplay peut être bloqué — pas grave, l'utilisateur cliquera
              });
            } else {
              el.pause();
            }
          }
        },
        { threshold: 0.4 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }
  }, []);

  const handleUnmute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    el.play().catch(() => null);
    setHasInteracted(true);
  };

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
          controls
          playsInline
          muted
          loop={false}
          preload="metadata"
          className={`absolute inset-0 h-full w-full ${objectClass}`}
          crossOrigin="anonymous"
        >
          Votre navigateur ne supporte pas la lecture vidéo HTML5.
        </video>

        {!hasInteracted && (
          <button
            type="button"
            onClick={handleUnmute}
            aria-label="Activer le son"
            className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur transition hover:bg-black/85"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
            Activer le son
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
