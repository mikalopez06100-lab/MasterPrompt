import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { getProposalBySlug } from "@/lib/proposals";
import type { DeliverableCard } from "@/lib/proposals";
import { proposalOgImageUrl } from "@/lib/og-image";

const syne = Syne({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") || "https://www.masterprompt.fr";

type PageProps = {
  params: { slug: string };
  searchParams: { token?: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const proposal = getProposalBySlug(params.slug);
  if (!proposal) {
    return {
      title: "Proposition | Master Prompt",
      robots: { index: false, follow: false },
    };
  }

  const title = `${proposal.clientName} — Proposition confidentielle`;
  const description =
    proposal.ogShareSubline?.trim() ||
    proposal.subtitle.replace(/\s+/g, " ").slice(0, 160);
  const ogImage = proposalOgImageUrl(siteUrl, proposal.slug);
  const ogImageAlt = `${proposal.clientName} — proposition Master Prompt`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Master Prompt",
      url: `${siteUrl}/propositions/${proposal.slug}`,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
  };
}

export default function ProposalPrivatePage({ params, searchParams }: PageProps) {
  const proposal = getProposalBySlug(params.slug);
  if (!proposal) return notFound();

  const expectedToken = process.env.PROPOSAL_ACCESS_TOKEN?.trim();
  const providedToken = searchParams.token?.trim();
  const isAuthorized = Boolean(expectedToken) && providedToken === expectedToken;
  const analysisPdfUrl = proposal.analysisPdfUrl;
  const analysisHtmlUrl = proposal.analysisHtmlUrl;
  const analysisUrl = analysisPdfUrl ?? analysisHtmlUrl;
  const analysisIsPdf = Boolean(analysisPdfUrl);
  const mockupUrl = proposal.mockupUrl;
  const legacyDeliverables = ([
    analysisUrl
      ? {
          title: analysisIsPdf ? "Analyse PDF" : "Audit stratégique",
          description: analysisIsPdf
            ? "Document d'analyse hébergé sur votre site."
            : "Document d'audit hébergé sur votre site (HTML).",
          url: analysisUrl,
          ctaLabel: analysisIsPdf ? "Ouvrir le PDF" : "Ouvrir l'audit",
          ctaVariant: "navy" as const,
        }
      : null,
    mockupUrl
      ? {
          title: "Maquette web",
          description: "Prototype hébergé avec URL privée dédiée.",
          url: mockupUrl,
          ctaLabel: "Ouvrir la maquette",
          ctaVariant: "amber" as const,
        }
      : null,
  ] as Array<DeliverableCard | null>).filter((item): item is DeliverableCard => Boolean(item));

  const groupedDeliverables = proposal.deliverableGroups?.length
    ? proposal.deliverableGroups
    : proposal.deliverables?.length || legacyDeliverables.length
      ? [
          {
            title: "Livrables",
            deliverables: proposal.deliverables?.length ? proposal.deliverables : legacyDeliverables,
          },
        ]
      : [];
  const hasDeliverables = groupedDeliverables.length > 0;

  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>

      <section className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-sm text-muted">
          <Link href="/">Accueil</Link> <span>›</span> <span>Espace proposition</span>
        </div>
      </section>

      {!isAuthorized ? (
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8">
            <h1 className={`${syne.className} text-3xl font-bold`}>Espace privé</h1>
            <p className="mt-3 text-slate-700">
              Cette proposition est protégée. Ajoutez le token d&apos;accès dans l&apos;URL :
            </p>
            <p className="mt-3 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
              /propositions/{proposal.slug}?token=votre_token
            </p>
            <p className="mt-3 text-sm text-muted">
              Si vous êtes le client, demandez le lien complet à votre contact Master Prompt.
            </p>
          </div>
        </section>
      ) : (
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-6xl space-y-6">
            <header className="rounded-2xl border border-border bg-white p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-blue-600">Proposition dédiée</p>
              <h1 className={`${syne.className} mt-2 text-3xl font-bold sm:text-4xl`}>{proposal.title}</h1>
              <p className="mt-3 text-slate-700">{proposal.subtitle}</p>
              <p className="mt-2 text-sm text-muted">Client : {proposal.clientName}</p>
            </header>

            {hasDeliverables ? (
              <div className="space-y-6">
                {groupedDeliverables.map((group, index) => {
                  const deliverablesGridClass =
                    group.deliverables.length > 1 ? "grid gap-6 lg:grid-cols-2" : "grid gap-6";
                  return (
                    <section key={`${group.title}-${index}`} className="rounded-2xl border border-border bg-white p-6">
                      <header className="mb-6 border-b border-border pb-4">
                        <h2 className={`${syne.className} text-2xl font-bold`}>{group.title}</h2>
                        {group.description ? (
                          <p className="mt-2 text-sm text-muted">{group.description}</p>
                        ) : null}
                      </header>
                      <div className={deliverablesGridClass}>
                        {group.deliverables.map((item) => (
                          <article key={item.url} className="rounded-2xl border border-border bg-white p-6">
                            <h3 className={`${syne.className} text-xl font-bold`}>{item.title}</h3>
                            <p className="mt-2 text-sm text-muted">{item.description}</p>
                            <Link
                              href={item.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className={`mt-4 inline-block rounded-md px-4 py-2 text-sm font-semibold ${
                                item.ctaVariant === "amber"
                                  ? "bg-amber-500 text-navy"
                                  : "bg-navy text-white"
                              }`}
                            >
                              {item.ctaLabel}
                            </Link>
                            <iframe
                              src={item.url}
                              className="mt-4 h-[420px] w-full rounded-lg border border-border"
                              title={item.title}
                            />
                          </article>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : null}

            {proposal.notes?.length ? (
              <article className="rounded-2xl border border-border bg-white p-6">
                <h3 className={`${syne.className} text-xl font-bold`}>Notes de présentation</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {proposal.notes.map((note) => (
                    <li key={note}>• {note}</li>
                  ))}
                </ul>
              </article>
            ) : null}
          </div>
        </section>
      )}
    </main>
  );
}
