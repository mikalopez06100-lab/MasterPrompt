"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: "0" | "1" | "2" | "3";
};

export function Reveal({ children, className = "", delay = "0" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayClass = {
    "0": "",
    "1": "transition-delay-[0.1s]",
    "2": "transition-delay-[0.2s]",
    "3": "transition-delay-[0.3s]",
  }[delay];

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
