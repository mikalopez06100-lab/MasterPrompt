import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

// Logo avec icône + nom + slogan (format horizontal)
const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || "/logo.png";

const sizes = {
  sm: { width: 140, height: 48 },
  md: { width: 180, height: 62 },
  lg: { width: 220, height: 76 },
};

export function Logo({ href = "/", className = "", size = "md" }: LogoProps) {
  const { width, height } = sizes[size];
  const img = (
    <Image
      src={logoUrl}
      alt="Master Prompt — Apprenez à parler à l'IA"
      width={width}
      height={height}
      className={`object-contain object-left ${className}`}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className={`inline-block ${className}`}>
        {img}
      </Link>
    );
  }
  return img;
}
