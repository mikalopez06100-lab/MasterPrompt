"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_LOGO = "/logo.png";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Navbar / fond sombre : adoucit un fond uni sombre dans le fichier image. */
  onDark?: boolean;
};

const boxClass = {
  sm: "h-12 w-[min(88vw,280px)] sm:h-[52px] sm:w-[min(88vw,320px)]",
  md: "h-[52px] w-[min(90vw,320px)] sm:h-14 sm:w-[min(90vw,380px)]",
  lg: "h-14 w-[min(92vw,360px)] sm:h-16 sm:w-[min(92vw,440px)]",
} as const;

function initialLogoSrc(): string {
  const env = process.env.NEXT_PUBLIC_LOGO_URL?.trim();
  if (env && /^https?:\/\//i.test(env)) return env;
  if (env && env.startsWith("/")) return env;
  return DEFAULT_LOGO;
}

export function Logo({ href = "/", className = "", size = "md", onDark = false }: LogoProps) {
  const [src, setSrc] = useState(() => initialLogoSrc());

  const img = (
    <span className={cn("relative block overflow-visible", boxClass[size], className)}>
      <Image
        src={src}
        alt="Master Prompt"
        fill
        sizes="(max-width: 640px) 90vw, 400px"
        className={cn(
          "object-contain object-left",
          onDark && "mix-blend-lighten [filter:brightness(1.03)]"
        )}
        priority
        onError={() => {
          if (src !== DEFAULT_LOGO) setSrc(DEFAULT_LOGO);
        }}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block leading-none">
        {img}
      </Link>
    );
  }
  return img;
}
