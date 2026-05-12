"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PriceFigure } from "@/components/PriceFigure";

type StickyBuyBarProps = {
  href: string;
  label: string;
  priceLabel: string;
};

export function StickyBuyBar({ href, label, priceLabel }: StickyBuyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[120] border-t border-white/10 bg-navy/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div>
          <p className="text-xs text-white/70">{label}</p>
          <PriceFigure className="text-base font-semibold text-amber-300">{priceLabel}</PriceFigure>
        </div>
        <Link href={href} target="_blank" rel="noreferrer noopener" className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-navy">
          Acheter
        </Link>
      </div>
    </div>
  );
}
