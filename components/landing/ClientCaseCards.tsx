"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CLIENTS = [
  {
    name: "The Nice Picnic",
    href: "https://thenicepicnic.com",
    domain: "thenicepicnic.com",
    tag: "Expérience premium",
    accent: "from-amber-500/30 to-orange-600/15",
    cardRing: "group-hover/card:shadow-amber-500/12",
    logoSrc: "/clients/the-nice-picnic.png",
    logoFrame: "warm" as const,
    linkHover:
      "hover:border-amber-400/55 hover:bg-gradient-to-br hover:from-white hover:to-amber-50/55 hover:shadow-[0_14px_36px_-8px_rgba(217,119,6,0.25)] hover:ring-amber-500/20",
    iconHover: "group-hover/link:bg-amber-500 group-hover/link:text-white",
  },
  {
    name: "Cinémark Azur",
    href: "https://cinemark-azur.com",
    domain: "cinemark-azur.com",
    tag: "Placement produit",
    accent: "from-indigo-500/35 to-violet-600/18",
    cardRing: "group-hover/card:shadow-indigo-500/15",
    logoSrc: "/clients/cinemark.png",
    logoFrame: "dark" as const,
    linkHover:
      "hover:border-indigo-400/55 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50/50 hover:shadow-[0_14px_36px_-8px_rgba(99,102,241,0.28)] hover:ring-indigo-500/20",
    iconHover: "group-hover/link:bg-indigo-600 group-hover/link:text-white",
  },
  {
    name: "Douzième Homme",
    href: "https://douziemehomme-lejeu.com",
    domain: "douziemehomme-lejeu.com",
    tag: "Jeu & communauté",
    accent: "from-emerald-500/30 to-teal-600/15",
    cardRing: "group-hover/card:shadow-emerald-500/12",
    linkHover:
      "hover:border-emerald-400/55 hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/45 hover:shadow-[0_14px_36px_-8px_rgba(16,185,129,0.22)] hover:ring-emerald-500/20",
    iconHover: "group-hover/link:bg-emerald-600 group-hover/link:text-white",
  },
] as const;

function faviconSrc(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

function ClientFavicon({ domain, label }: { domain: string; label: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 text-xl font-bold text-slate-500 shadow-inner"
        aria-hidden
      >
        {label.slice(0, 1)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- favicon externe, pas dans remotePatterns
    <img
      src={faviconSrc(domain)}
      alt=""
      width={64}
      height={64}
      loading="lazy"
      decoding="async"
      className="h-16 w-16 shrink-0 rounded-2xl border border-slate-200/90 bg-white object-contain p-2 shadow-inner transition-all duration-300 ease-out group-hover/link:scale-105 group-hover/link:border-slate-300 group-hover/link:shadow-lg"
      onError={() => setFailed(true)}
    />
  );
}

function ClientBrandMark({
  domain,
  label,
  logoSrc,
  logoFrame,
}: {
  domain: string;
  label: string;
  logoSrc?: string;
  logoFrame?: "dark" | "warm";
}) {
  if (!logoSrc) {
    return <ClientFavicon domain={domain} label={label} />;
  }

  if (logoFrame === "dark") {
    return (
      <div
        className={cn(
          "relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#0a0a0a]",
          "shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/15",
          "transition-all duration-300 ease-out will-change-transform",
          "group-hover/link:scale-[1.06] group-hover/link:shadow-[0_12px_32px_rgba(99,102,241,0.35)] group-hover/link:ring-indigo-400/35"
        )}
      >
        <Image
          src={logoSrc}
          alt=""
          fill
          sizes="64px"
          className="object-contain p-2"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative h-16 w-16 shrink-0 rounded-full p-[3px]",
        "bg-gradient-to-br from-[#c45c3e] via-[#d97757] to-amber-400/90",
        "shadow-[0_6px_20px_rgba(196,92,62,0.35)] ring-2 ring-white/80",
        "transition-all duration-300 ease-out will-change-transform",
        "group-hover/link:scale-[1.06] group-hover/link:shadow-[0_10px_28px_rgba(196,92,62,0.45)] group-hover/link:ring-amber-200"
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#fff8f5] shadow-inner">
        <Image
          src={logoSrc}
          alt=""
          fill
          sizes="64px"
          className="object-contain p-1.5"
        />
      </div>
    </div>
  );
}

export function ClientCaseCards({ headingClass }: { headingClass: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-amber-50/25 px-4 py-14 sm:px-6 sm:py-20">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl motion-reduce:opacity-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-400/12 blur-3xl motion-reduce:opacity-0"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <h2
            className={cn(
              headingClass,
              "relative inline-block text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            )}
          >
            Cas clients
            <span
              className="absolute -bottom-1 left-0 h-1 w-full max-w-[11rem] rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-500 opacity-90"
              aria-hidden
            />
          </h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Projets réels, exécution concrète. Accédez directement aux sites clients.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {CLIENTS.map((item, i) => (
            <article
              key={item.name}
              style={{ animationDelay: `${80 + i * 100}ms` }}
              className={cn(
                "group/card relative overflow-hidden rounded-2xl border border-slate-200/80",
                "bg-gradient-to-b from-white via-white to-slate-50/95 p-1",
                "shadow-[0_10px_40px_-12px_rgba(15,23,42,0.12)]",
                "transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:border-slate-300/90 hover:shadow-[0_24px_56px_-16px_rgba(15,23,42,0.2)]",
                "motion-safe:animate-fade-up motion-safe:opacity-0 motion-safe:[animation-fill-mode:forwards]",
                "motion-reduce:animate-none motion-reduce:opacity-100",
                item.cardRing
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500",
                  item.accent,
                  "group-hover/card:opacity-100"
                )}
                aria-hidden
              />
              <div className="relative rounded-[14px] bg-white/90 p-4 backdrop-blur-sm">
                <span className="inline-flex rounded-full border border-slate-200/90 bg-slate-50/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm">
                  {item.tag}
                </span>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={cn(
                    "group/link relative mt-4 flex gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4",
                    "shadow-sm ring-0 transition-all duration-300 ease-out",
                    "hover:-translate-y-0.5 hover:ring-2 active:scale-[0.99]",
                    item.linkHover
                  )}
                >
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-all duration-700 ease-out group-hover/link:translate-x-full group-hover/link:opacity-100 motion-reduce:hidden"
                    aria-hidden
                  />
                  <ClientBrandMark
                    domain={item.domain}
                    label={item.name}
                    logoSrc={"logoSrc" in item ? item.logoSrc : undefined}
                    logoFrame={"logoFrame" in item ? item.logoFrame : undefined}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        headingClass,
                        "flex items-start justify-between gap-2 text-lg font-semibold leading-snug text-slate-900"
                      )}
                    >
                      <span className="min-w-0">{item.name}</span>
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 shadow-sm transition-all duration-300",
                          item.iconHover,
                          "group-hover/link:shadow-md"
                        )}
                        aria-hidden
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M5 15L15 5M15 5H8M15 5V12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </p>
                    <p className="mt-1.5 truncate text-sm font-medium text-blue-700/90 underline decoration-blue-200 decoration-1 underline-offset-2 transition-colors group-hover/link:text-blue-800 group-hover/link:decoration-blue-400">
                      {item.domain}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors group-hover/link:text-slate-800">
                      Visiter le site →
                    </p>
                  </div>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
