"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Fichier versionné uniquement (évite une URL CDN erronée sur Vercel). */
const LOGO_SRC = "/logo.png";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  /**
   * Fond sombre (navbar) : léger relief pour le PNG transparent sur bleu nuit.
   */
  onDark?: boolean;
};

/** `sm` : navbar mobile — laisser ~9.5rem pour CTA + marges (évite le bouton coupé). */
const boxClass = {
  sm: "h-[4.25rem] w-[min(calc(100vw-10.5rem),320px)] sm:h-20 sm:w-[min(calc(100vw-10rem),400px)] md:h-[5.25rem] md:w-[min(92vw,480px)]",
  md: "h-20 w-[min(92vw,380px)] sm:h-[5.25rem] sm:w-[min(92vw,460px)] md:h-24 md:w-[min(92vw,520px)]",
  lg: "h-24 w-[min(94vw,440px)] sm:h-[5.75rem] sm:w-[min(94vw,540px)] md:h-28 md:w-[min(94vw,600px)]",
} as const;

export function Logo({ href = "/", className = "", size = "md", onDark = false }: LogoProps) {
  const img = (
    <span
      className={cn(
        "relative isolate block overflow-visible",
        boxClass[size],
        className
      )}
    >
      <Image
        src={LOGO_SRC}
        alt="Master Prompt"
        fill
        sizes="(max-width: 768px) 92vw, 480px"
        className={cn(
          "object-contain object-left",
          onDark && "[filter:drop-shadow(0_1px_3px_rgba(0,0,0,0.55))]"
        )}
        priority
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block shrink-0 leading-none">
        {img}
      </Link>
    );
  }
  return img;
}
