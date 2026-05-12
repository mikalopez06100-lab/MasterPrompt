"use client";

import Link from "next/link";
import { useState } from "react";

const CLIENTS = [
  {
    name: "The Nice Picnic",
    href: "https://thenicepicnic.com",
    domain: "thenicepicnic.com",
    tag: "Expérience premium",
    accent: "from-amber-500/25 to-orange-500/10",
  },
  {
    name: "Cinémark Azur",
    href: "https://cinemark-azur.com",
    domain: "cinemark-azur.com",
    tag: "Placement produit",
    accent: "from-blue-500/25 to-indigo-500/10",
  },
  {
    name: "Douzième Homme",
    href: "https://douziemehomme-lejeu.com",
    domain: "douziemehomme-lejeu.com",
    tag: "Jeu & communauté",
    accent: "from-emerald-500/20 to-teal-500/10",
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
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-50 text-lg font-bold text-slate-500"
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
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      className="h-14 w-14 shrink-0 rounded-2xl border border-slate-200/80 bg-white object-contain p-1.5 shadow-inner transition-transform duration-300 group-hover/link:scale-105 group-hover/link:border-amber-300/50 group-hover/link:shadow-md"
      onError={() => setFailed(true)}
    />
  );
}

export function ClientCaseCards({ headingClass }: { headingClass: string }) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className={`${headingClass} mb-2 text-3xl font-bold`}>Cas clients</h2>
        <p className="mb-8 max-w-2xl text-sm text-muted sm:text-base">
          Projets réels, exécution concrète. Accédez directement aux sites clients.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {CLIENTS.map((item) => (
            <article
              key={item.name}
              className="group/card relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 p-1 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)]"
            >
              <div
                className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${item.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100`}
                aria-hidden
              />
              <div className="relative rounded-[14px] bg-white/80 p-4 backdrop-blur-[2px]">
                <span className="inline-flex rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                  {item.tag}
                </span>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/link relative mt-4 flex gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-0 ring-blue-500/0 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-blue-300/70 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 hover:shadow-[0_14px_36px_-8px_rgba(37,99,235,0.22)] hover:ring-2 hover:ring-blue-500/15 active:scale-[0.99]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 transition-all duration-700 ease-out group-hover/link:translate-x-full group-hover/link:opacity-100" aria-hidden />
                  <ClientFavicon domain={item.domain} label={item.name} />
                  <div className="min-w-0 flex-1">
                    <p className={`${headingClass} flex items-start justify-between gap-2 text-lg font-semibold leading-snug text-slate-900`}>
                      <span className="min-w-0">{item.name}</span>
                      <span
                        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-blue-600 transition-all duration-300 group-hover/link:bg-blue-600 group-hover/link:text-white group-hover/link:shadow-md"
                        aria-hidden
                      >
                        <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 15L15 5M15 5H8M15 5V12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </p>
                    <p className="mt-1.5 truncate text-sm font-medium text-blue-600/90 underline decoration-blue-200 decoration-1 underline-offset-2 transition-colors group-hover/link:text-blue-700 group-hover/link:decoration-blue-400">
                      {item.domain}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors group-hover/link:text-blue-600/80">
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
