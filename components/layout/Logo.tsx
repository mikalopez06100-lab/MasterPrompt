"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Toujours le fichier versionné : une URL CDN erronée dans `NEXT_PUBLIC_LOGO_URL` ne doit pas casser le bandeau. */
const LOGO_SRC = "/logo.png";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const boxClass = {
  sm: "h-12 w-[min(88vw,280px)] sm:h-[52px] sm:w-[min(88vw,320px)]",
  md: "h-[52px] w-[min(90vw,320px)] sm:h-14 sm:w-[min(90vw,380px)]",
  lg: "h-14 w-[min(92vw,360px)] sm:h-16 sm:w-[min(92vw,440px)]",
} as const;

export function Logo({ href = "/", className = "", size = "md" }: LogoProps) {
  const img = (
    <span className={cn("relative block overflow-visible", boxClass[size], className)}>
      <Image
        src={LOGO_SRC}
        alt="Master Prompt"
        fill
        sizes="(max-width: 640px) 90vw, 400px"
        className="object-contain object-left"
        priority
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
