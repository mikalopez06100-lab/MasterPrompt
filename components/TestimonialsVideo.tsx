type OfferType = "pack" | "high";

export type TestimonialVideoItem = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
  quote: string;
  offer: string;
  offerType: OfferType;
  featured?: boolean;
  videoUrl?: string;
  posterUrl?: string;
};

export const testimonials: TestimonialVideoItem[] = [
  {
    id: "julien",
    name: "Julien M.",
    role: "Fondateur · The Nice Picnic · Côte d'Azur",
    avatar: "JM",
    avatarColor: "#2563EB",
    quote:
      "Michaël a structuré ce que j'avais en tête et l'a rendu actionnable. Landing page, automatisations, prompts — tout est opérationnel. J'aurais mis des mois à faire ça seul.",
    offer: "Pack IA Activité",
    offerType: "pack",
    videoUrl: process.env.NEXT_PUBLIC_VIDEO_JULIEN,
  },
  {
    id: "dominic",
    name: "Dominic G.",
    role: "Fondateur · Cinémark Azur · Placement Produit PACA",
    avatar: "DG",
    avatarColor: "#7C3AED",
    quote:
      "Michaël a structuré la stratégie, développé le site et mis en place les outils IA qui font tourner l'agence au quotidien. Un vrai partenaire opérationnel — pas juste un prestataire.",
    offer: "Accompagnement IA Transformation",
    offerType: "high",
    featured: true,
    videoUrl: process.env.NEXT_PUBLIC_VIDEO_DOMINIQUE,
  },
  {
    id: "mathieu",
    name: "Mathieu S.",
    role: "Coach sportif · Entraîneur de snowboard",
    avatar: "MS",
    avatarColor: "#0EA5A4",
    quote:
      "Avant, je perdais du temps sur mes relances et mes programmes. Avec des prompts adaptés à mon activité, je produis vite du contenu clair pour mes clients et je garde le focus sur le terrain.",
    offer: "Pack IA Activité",
    offerType: "pack",
    videoUrl: process.env.NEXT_PUBLIC_VIDEO_MATHIEU,
  },
];

type Props = {
  items?: TestimonialVideoItem[];
};

export function TestimonialsVideo({ items = testimonials }: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((testimonial) => (
        <article
          key={testimonial.id}
          className={`overflow-hidden rounded-2xl border ${
            testimonial.featured
              ? "border-amber-500 bg-navy text-white"
              : "border-border bg-white"
          }`}
        >
          <div className="relative aspect-video bg-[#0A1826]">
            {testimonial.videoUrl ? (
              <video
                src={testimonial.videoUrl}
                poster={testimonial.posterUrl}
                controls
                data-video-id={testimonial.id}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0A1826] to-[#0D2440]"
                data-video-id={testimonial.id}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-lg text-navy">
                  ▶
                </div>
                <span className="text-xs font-bold tracking-wide text-slate-300">
                  Témoignage · {testimonial.name.split(" ")[0]}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3 p-5">
            <p className="text-sm tracking-wide text-amber-500">★★★★★</p>
            <blockquote
              className={`border-l-2 border-amber-500 pl-3 text-sm italic leading-relaxed ${
                testimonial.featured ? "text-slate-300" : "text-slate-700"
              }`}
            >
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: testimonial.avatarColor }}
              >
                {testimonial.avatar}
              </div>
              <div>
                <p className={`text-sm font-semibold ${testimonial.featured ? "text-white" : "text-navy"}`}>
                  {testimonial.name}
                </p>
                <p className={`text-xs ${testimonial.featured ? "text-slate-400" : "text-muted"}`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                testimonial.offerType === "high"
                  ? "bg-amber-500/20 text-amber-500"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {testimonial.offer}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
