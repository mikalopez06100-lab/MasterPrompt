import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

// Logo horizontal MasterPrompt (JPEG) — même fichier que /logo.jpg et favicon
const logoUrl = "/logo.jpg";

const sizes = {
  sm: { width: 200, height: 48 },
  md: { width: 240, height: 56 },
  lg: { width: 280, height: 64 },
};

export function Logo({ href = "/", className = "", size = "md" }: LogoProps) {
  const { width, height } = sizes[size];
  const img = (
    <Image
      src={logoUrl}
      alt="Master Prompt"
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
