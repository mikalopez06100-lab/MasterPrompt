"use client";

import { useEffect, useMemo, useState } from "react";

type CountdownBannerProps = {
  endDate: string;
};

function msToParts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  return { d, h, m };
}

export function CountdownBanner({ endDate }: CountdownBannerProps) {
  const target = useMemo(() => new Date(endDate).getTime(), [endDate]);
  const [remaining, setRemaining] = useState(() =>
    Number.isFinite(target) ? Math.max(0, target - Date.now()) : 0
  );

  useEffect(() => {
    if (!Number.isFinite(target)) return;
    const i = setInterval(() => setRemaining(Math.max(0, target - Date.now())), 60000);
    return () => clearInterval(i);
  }, [target]);

  if (!Number.isFinite(target)) return null;
  const p = msToParts(remaining);
  return (
    <div className="sticky top-[60px] z-40 border-y border-amber-200 bg-amber-50/95 px-4 py-2 text-center text-xs text-amber-900 backdrop-blur">
      Précommande se termine le {endDate} · {p.d}j {p.h}h {p.m}m
    </div>
  );
}
