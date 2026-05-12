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
   * Fond sombre (navbar) : agrandit la zone + atténue un fond noir dans le PNG
   * (`mix-blend-lighten` sur le bleu nuit).
   */
  onDark?: boolean;
};

/** Hauteur généreuse : le wordmark est souvent horizontal ; la hauteur pilote la taille réelle. */
const boxClass = {
  sm: "h-[4.25rem] w-[min(92vw,340px)] sm:h-20 sm:w-[min(92vw,420px)] md:h-[5.25rem] md:w-[min(92vw,480px)]",
  md: "h-20 w-[min(92vw,380px)] sm:h-[5.25rem] sm:w-[min(92vw,460px)] md:h-24 md:w-[min(92vw,520px)]",
  lg: "h-24 w-[min(94vw,440px)] sm:h-[5.75rem] sm:w-[min(94vw,540px)] md:h-28 md:w-[min(94vw,600px)]",
} as const;

export function Logo({ href = "/", className = "", size = "md", onDark = false }: LogoProps) {
  const img = (
    <span
      className={cn(
        "relative isolate block overflow-visible",
        boxClass[size],
        onDark && "rounded-md px-1 py-0.5",
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
          onDark && "mix-blend-lighten [filter:brightness(1.08)_contrast(1.04)]"
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
