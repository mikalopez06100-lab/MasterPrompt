"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Fond sombre (navbar) : atténue un fond noir du fichier source */
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
  return "/logo-masterprompt-v2.png";
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
          onDark && "mix-blend-lighten [filter:contrast(1.05)_brightness(1.02)]"
        )}
        priority
        onError={() => {
          if (src !== "/logo.jpg") setSrc("/logo.jpg");
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
