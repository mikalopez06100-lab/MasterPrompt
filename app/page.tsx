import Link from "next/link";
import { LandingNav } from "@/components/landing/LandingNav";
import { FAQSection } from "@/components/landing/FAQSection";
import { EmailSignupBlock } from "@/components/landing/EmailSignupBlock";
import { HeroVideo } from "@/components/landing/HeroVideo";

// Vignettes « +200 entrepreneurs » (gauche) — URLs en dur pour que ça marche en prod (Vercel)
const DEFAULT_AVATAR_URLS = [
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-1.png",
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-2.png",
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-3.png",
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-4.png",
  "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-5.png",
];

// Photo du fondateur (Michaël Lopez) — à côté du nom à droite
const FONDATEUR_AVATAR = "/avatars/photo-profil-1.png";

function SocialProofAvatars() {
  const custom = process.env.NEXT_PUBLIC_SOCIAL_AVATARS;
  const urls =
    typeof custom === "string" && custom.trim().length > 0
      ? custom
          .split(",")
          .map((u) => u.trim())
          .filter(Boolean)
          .slice(0, 5)
      : DEFAULT_AVATAR_URLS;
  if (urls.length === 0) return null;
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        {urls.map((src, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full border-2 border-navy bg-navy overflow-hidden flex-shrink-0 ring-2 ring-navy"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              width={36}
              height={36}
              loading="eager"
            />
          </div>
        ))}
      </div>
      <div className="text-left">
        <span className="text-[0.75rem] text-amber-300 tracking-[0.18em] font-semibold uppercase block">
          ★★★★★
        </span>
        <p className="text-[0.8rem] text-white/55">
          <span className="font-semibold text-white">+200 entrepreneurs</span> sur la liste d&apos;attente.
        </p>
      </div>
    </div>
  );
}

const MODULES = [
  {
    tag: "Fondamentaux",
    title: "Comprendre l'IA et le Prompt Engineering",
    desc: "Les bases pour comprendre pourquoi vos prompts actuels donnent des résultats décevants.",
  },
  {
    tag: "Méthode",
    title: "La méthode PACO — le seul framework dont vous avez besoin",
    desc: "Structurez chaque demande pour obtenir un résultat utilisable dès la première tentative.",
  },
  {
    tag: "Cas d'usage",
    title: "Communication & Marketing",
    desc: "Emails, posts réseaux sociaux, pages de vente, newsletters — des templates directement réutilisables.",
  },
  {
    tag: "Cas d'usage",
    title: "Gestion & Productivité",
    desc: "Devis, comptes-rendus, plans d'action — tout ce qui mange votre temps chaque semaine.",
  },
  {
    tag: "Pratique",
    title: "Ateliers pratiques et simulations",
    desc: "Vous pratiquez sur des cas réels avec l'éditeur intégré. Application directe, retour immédiat.",
  },
  {
    tag: "Avancé",
    title: "Enchaînements IA — vers l'automatisation",
    desc: "Combinez plusieurs prompts pour créer des flux de travail sans outil technique.",
    new: true,
  },
  {
    tag: "Éthique & Autonomie",
    title: "Limites, RGPD et veille continue",
    desc: "Ce que vous ne devez jamais confier à une IA. Et comment rester à jour sans y passer des heures.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />

      {/* HERO */}
      <section className="bg-navy py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-[1020px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.9fr)] gap-10 md:gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/20 text-blue-200 border border-primary/30 py-1.5 px-4 rounded-full text-[0.7rem] font-semibold uppercase tracking-[0.18em] mb-5">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-blink" />
              Lancement bientôt · Places limitées
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[3.6rem] font-black leading-[1.04] tracking-tight text-white mb-4">
              Vous utilisez l&apos;IA.
              <br />
              Mais pas comme
              <br />
              <em className="italic text-sand">vous le devriez.</em>
            </h1>
            <p className="text-[1.02rem] text-white/55 max-w-[480px] leading-relaxed mb-6">
              La méthode concrète pour maîtriser l&apos;IA dans votre business — 7 modules, zéro jargon, des résultats dès la
              première semaine.
            </p>

            {/* Social proof — vignettes photo de profils (images toujours chargées) */}
            <SocialProofAvatars />
          </div>

          {/* Right hero card */}
          <div id="form-main">
            <div className="bg-gradient-to-br from-[#1a2535] to-[#111827] border border-white/10 rounded-2xl p-6 md:p-7 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400" />

              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
                <div className="w-[52px] h-[52px] rounded-full border-2 border-amber-300/60 shadow-[0_0_0_4px_rgba(245,158,11,0.12)] overflow-hidden flex-shrink-0 bg-navy-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FONDATEUR_AVATAR} alt="" className="w-full h-full object-cover" width={52} height={52} />
                </div>
                <div>
                  <div className="text-[0.9rem] font-semibold text-white">Michaël Lopez</div>
                  <div className="text-[0.75rem] text-white/40">Entrepreneur · 25 ans d&apos;expérience</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/40 text-emerald-200 text-[0.7rem] font-semibold uppercase tracking-[0.16em] rounded-full py-1 px-3 mb-3">
                🎁 100% Gratuit — sans CB
              </div>
              <div className="font-heading text-[1.15rem] font-bold text-white leading-snug mb-1.5">
                Recevez vos 10 prompts essentiels
              </div>
              <div className="text-[0.8rem] text-white/45 mb-4">Utilisables immédiatement dans votre business.</div>

              <ul className="space-y-1.5 mb-4 text-[0.8rem] text-white/70">
                {[
                  "Email de prospection",
                  "Post LinkedIn / Instagram",
                  "Relance client sans réponse",
                  "Description de service",
                  "+ 6 autres templates métier",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[0.6rem] font-black text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <EmailSignupBlock
                inputId="email-hero"
                buttonText="Recevoir les 10 prompts gratuitement →"
                buttonGreen
                successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
              />
              <div className="mt-3 bg-amber-500/5 border border-amber-500/30 rounded-md p-2.5 flex gap-2 items-start">
                <span className="text-sm">🚀</span>
                <p className="text-[0.75rem] text-amber-100/90 leading-relaxed">
                  + accès au <strong className="text-amber-200">prix de lancement à 49€</strong> (au lieu de 97€).
                </p>
              </div>
              <p className="text-[0.7rem] text-white/25 text-center mt-3">
                🔒 Sans spam · Désabonnement en 1 clic
              </p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-10 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-0">
            {[
              { num: "7", label: "Modules" },
              { num: "4h", label: "De formation" },
              { num: "49€", label: "Prix lancement" },
              { num: "14j", label: "Remboursé si déçu" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-6 md:px-10 py-4 text-center border-white/10 ${
                  i < 3 ? "border-r" : "border-r-0"
                }`}
              >
                <div className="font-heading text-2xl font-black text-white leading-none">{s.num}</div>
                <div className="text-[0.72rem] text-white/40 uppercase tracking-[0.12em] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <div className="bg-white border-y border-border py-5 px-4 flex flex-wrap items-center justify-center gap-8">
        <span className="text-sm text-muted flex items-center gap-2">🔐 Paiement sécurisé Stripe</span>
        <span className="text-sm text-muted flex items-center gap-2">🛡️ Remboursé sous 14 jours</span>
        <span className="text-sm text-muted flex items-center gap-2">🇫🇷 Formation 100% en français</span>
        <span className="text-sm text-muted flex items-center gap-2">⚡ Accès immédiat après paiement</span>
      </div>

      {/* VIDEO SECTION */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-[760px] mx-auto px-4 md:px-8 text-center">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[0.7rem] font-semibold uppercase tracking-[0.16em] rounded-full py-1 px-3 mb-4">
            Regardez cette vidéo en premier
          </div>
          <h2 className="font-heading text-2xl md:text-[2.2rem] font-black text-white leading-tight mb-2">
            Apprenez à parler à l&apos;IA.
            <br />
            <span className="text-amber-300">En 55 secondes.</span>
          </h2>
          <p className="text-[0.95rem] text-white/45 max-w-[460px] mx-auto mb-6">
            Une courte vidéo pour comprendre l&apos;approche Master Prompt avant de découvrir le programme.
          </p>
          <HeroVideo />
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-ivory py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-coral-600 mb-4">Le vrai problème</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-6">
            L&apos;IA ne vous déçoit pas.
            <br />
            <span className="italic text-coral-600">Vos prompts, si.</span>
          </h2>
          <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-xl p-4 md:p-5 mb-8">
            <p className="text-[1rem] font-semibold text-gray-800 leading-relaxed">
              Le problème, ce n&apos;est pas l&apos;IA. C&apos;est la façon dont vous lui parlez. L&apos;IA produit exactement ce
              qu&apos;on lui demande — ni plus, ni moins.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                emoji: "😤",
                title: "Résultats génériques",
                text: "Vous demandez, l'IA répond… mais c'est inutilisable. Vous passez plus de temps à corriger qu'à utiliser.",
              },
              {
                emoji: "⏱️",
                title: "Perte de temps",
                text: "5 reformulations pour un email. Au final, vous le faites vous-même — et l'IA n'a servi à rien.",
              },
              {
                emoji: "😰",
                title: "Vous vous sentez dépassé",
                text: "Vos concurrents produisent du contenu à une vitesse incompréhensible. Pas vous. Pas encore.",
              },
            ].map((card, i) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5">
                <div className="text-2xl mb-2">{card.emoji}</div>
                <h3 className="text-[0.95rem] font-semibold text-gray-800 mb-1">{card.title}</h3>
                <p className="text-[0.82rem] text-gray-600 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF + FORM */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">
            Commencez maintenant — c&apos;est gratuit
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-3">
            Recevez les 10 prompts essentiels
            <br />
            <span className="italic text-emerald-600">pour votre business</span>
          </h2>
          <p className="text-[0.97rem] text-muted leading-relaxed mb-6">
            10 prompts prêts à copier-coller, adaptés à 5 catégories métier. Utilisables aujourd&apos;hui dans ChatGPT, Claude
            ou Gemini.
          </p>

          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl p-6 md:p-7 grid gap-4 md:grid-cols-[auto,1fr,auto] items-center mb-6 relative overflow-hidden shadow-[0_24px_70px_rgba(6,78,59,0.6)]">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="w-[58px] h-[72px] rounded-lg bg-white/10 flex items-center justify-center text-2xl shadow-[4px_4px_0_rgba(0,0,0,0.2)] relative z-10">
              📄
            </div>
            <div className="relative z-10">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-emerald-200 font-semibold mb-1">
                Guide PDF gratuit · 12 pages
              </p>
              <p className="font-heading text-[1.1rem] font-bold text-white leading-snug">
                10 Prompts Essentiels pour les Entrepreneurs
              </p>
              <p className="text-[0.75rem] text-emerald-100/70 mt-1">
                Commercial · Marketing · Productivité · Communication · Stratégie
              </p>
            </div>
            <div className="relative z-10 flex md:justify-end">
              <span className="inline-flex items-center bg-white text-emerald-900 text-[0.78rem] font-extrabold px-4 py-2 rounded-full shadow">
                GRATUIT
              </span>
            </div>
          </div>

          <div className="bg-ivory-2 border border-border rounded-card p-6 md:p-7">
            <label className="block text-sm font-semibold text-navy mb-3">Où envoyer votre guide ?</label>
            <EmailSignupBlock
              inputId="email-1"
              buttonText="Recevoir les 10 prompts gratuitement →"
              buttonGreen
              successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
              afterNote={
                <div className="mt-4 p-4 bg-sky-50 border border-sky-200 rounded-lg flex items-start gap-2">
                  <span className="flex-shrink-0">🚀</span>
                  <p className="text-sm text-sky-900 leading-relaxed">
                    + accès au <strong>prix de lancement à 49€</strong> lors du lancement (au lieu de 97€).
                  </p>
                </div>
              }
            />
            <p className="text-xs text-muted text-center mt-3">🔒 Sans spam · Désabonnement en 1 clic</p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-ivory py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">La différence en pratique</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-8">
            Seul vs avec
            <br />
            <span className="italic">une méthode.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl overflow-hidden border border-red-200">
              <div className="bg-red-100 text-red-900 px-5 py-3 font-bold text-sm">❌ Sans méthode</div>
              <div className="bg-red-50 p-5 space-y-2.5 border-t border-red-200/70">
                {[
                  "Résultats inutilisables, trop génériques",
                  "5 reformulations pour un seul email",
                  "Frustration · abandon de l'IA",
                  "L'IA ne connaît pas votre business",
                  "10 minutes gagnées par semaine",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-[0.82rem] text-red-900">
                    <span>✗</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-emerald-200">
              <div className="bg-emerald-100 text-emerald-900 px-5 py-3 font-bold text-sm">✓ Avec Master Prompt</div>
              <div className="bg-emerald-50 p-5 space-y-2.5 border-t border-emerald-200/70">
                {[
                  "Résultats utilisables dès la 1re tentative",
                  "Un prompt → un résultat. Sans reformuler.",
                  "L'IA devient votre vrai assistant",
                  "Templates adaptés à votre activité",
                  "1 à 2 heures récupérées chaque semaine",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-[0.82rem] text-emerald-900">
                    <span>✓</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="programme" className="bg-navy-2 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">Le programme</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-white mb-3">
            7 modules pour passer
            <br />
            de l&apos;hésitation à la <span className="italic text-amber-300">maîtrise</span>
          </h2>
          <p className="text-[0.95rem] text-white/50 leading-relaxed mb-8">
            Pas de théorie inutile. Uniquement ce qui s&apos;applique à votre business dès aujourd&apos;hui.
          </p>
          <div className="space-y-0 border-t border-white/10">
            {MODULES.map((m, i) => (
              <div
                key={m.title}
                className="py-7 border-b border-white/10 grid grid-cols-1 md:grid-cols-[52px,1fr] gap-5 items-start"
              >
                <div
                  className={[
                    "w-[52px] h-[52px] rounded-xl flex items-center justify-center font-heading font-black text-sm flex-shrink-0",
                    i === 0
                      ? "bg-amber-500/10 text-amber-300"
                      : i === 1
                      ? "bg-sky-500/10 text-sky-300"
                      : i === 2
                      ? "bg-emerald-500/10 text-emerald-300"
                      : i === 3
                      ? "bg-violet-500/10 text-violet-300"
                      : i === 4
                      ? "bg-orange-500/10 text-orange-300"
                      : i === 5
                      ? "bg-red-500/10 text-red-300"
                      : "bg-slate-500/10 text-slate-300",
                  ].join(" ")}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-white/40 mb-1">
                    {m.tag}
                  </div>
                  <h3 className="text-[0.98rem] font-semibold text-white mb-1.5 leading-snug">
                    {m.title}{" "}
                    {m.new && (
                      <span className="inline-block align-middle ml-1 px-1.5 py-[1px] rounded bg-emerald-500/15 text-emerald-300 text-[0.63rem] font-bold uppercase tracking-[0.09em]">
                        Nouveau
                      </span>
                    )}
                  </h3>
                  <p className="text-[0.83rem] text-white/55 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#form-main"
              className="inline-block w-full max-w-[420px] bg-amber-400 text-navy font-semibold text-[0.98rem] py-4 px-6 rounded-xl shadow-lg hover:bg-amber-300 transition-colors"
            >
              Recevoir les 10 prompts gratuitement →
            </a>
            <p className="text-xs text-white/40 mt-2">PDF gratuit · + early bird à 49€</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-600 mb-4">À la fin de la formation</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-navy leading-tight mb-8">
            Vous repartez avec
            <br />
            <span className="italic text-violet-600">tout ça.</span>
          </h2>
          <div className="space-y-4">
            {[
              "Une méthode claire et reproductible pour formuler n'importe quelle demande à l'IA — et obtenir un résultat utilisable immédiatement.",
              "Une bibliothèque de 50+ templates métier prêts à copier-coller pour vos emails, posts, devis et comptes-rendus.",
              "1 à 2 heures récupérées chaque semaine sur des tâches répétitives que l'IA peut faire à votre place.",
              "Vos premiers enchaînements IA fonctionnels — des flux simples qui travaillent sans intervention technique.",
              "La confiance de savoir exactement comment utiliser l'IA dans votre activité — aujourd'hui et demain.",
            ].map((text, i) => (
              <div
                key={text}
                className="flex gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition"
              >
                <span className="text-emerald-500 font-bold flex-shrink-0 text-[1.1rem] mt-[1px]">→</span>
                <p className="text-[0.9rem] text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">{text.split("—")[0].trim()}</strong>
                  {text.includes("—") ? ` —${text.split("—")[1]}` : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-ivory py-20 md:py-24 border-y border-border">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">Ils l&apos;ont testé</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-6">
            Ce qu&apos;ils disent
            <br />
            <span className="italic">après la formation.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                quote:
                  "Avant, 30 minutes pour un post LinkedIn. Avec la méthode PACO, 3 minutes. J'ai récupéré 2 heures par semaine sur mon activité.",
                name: "Marie-Claire D.",
                role: "Consultante RH indépendante",
              },
              {
                quote:
                  "J'ai enfin compris pourquoi mes prompts donnaient des résultats médiocres. Le Module 2 seul vaut le prix de la formation.",
                name: "Antoine R.",
                role: "Graphiste freelance · Marseille",
              },
              {
                quote:
                  "En 4 heures de formation, j'ai appris plus que dans 6 mois de tutoriels YouTube. Et ça s'applique directement à mon business.",
                name: "Sophie M.",
                role: "Coach certifiée · Paris",
              },
              {
                quote:
                  "Je pensais ne pas avoir le niveau. Mais le cours est clair, progressif, et j'ai rédigé mon premier email de prospection en 4 minutes.",
                name: "Laurent P.",
                role: "Artisan plombier indépendant",
              },
            ].map((t, i) => (
              <div key={t.name} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className="text-amber-400 text-[0.8rem] tracking-[0.18em] mb-2">★★★★★</div>
                <p className="text-[0.88rem] text-gray-700 italic leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-[0.7rem] font-semibold text-gray-600">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-[0.9rem] font-semibold text-gray-900">{t.name}</div>
                    <div className="text-[0.78rem] text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-4">
            Qui est derrière Master Prompt ?
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-4">
            Un entrepreneur qui parle
            <br />
            <span className="italic">à des entrepreneurs.</span>
          </h2>
          <div className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-8 mt-6 bg-ivory rounded-2xl border border-border p-6 md:p-8 items-start">
            <div className="text-center">
              <div className="w-[110px] h-[110px] rounded-full mx-auto border-[3px] border-amber-400 shadow-[0_0_0_6px_rgba(245,158,11,0.1)] overflow-hidden bg-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FONDATEUR_AVATAR} alt="Michaël Lopez" className="w-full h-full object-cover" width={110} height={110} />
              </div>
              <div className="mt-2">
                <div className="text-[0.95rem] font-semibold text-navy">Michaël Lopez</div>
                <div className="text-[0.78rem] text-muted mt-0.5">Nice · Côte d&apos;Azur</div>
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  <span className="text-[0.7rem] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                    25 ans d&apos;expérience
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-[0.97rem] font-semibold text-navy leading-relaxed mb-3">
                "Je ne suis pas développeur. Je suis entrepreneur depuis 2004 — et c&apos;est exactement pour ça que j&apos;ai
                créé Master Prompt."
              </p>
              <p className="text-[0.9rem] text-muted leading-relaxed mb-2">
                Co-fondateur, directeur commercial, chef de projet, maître d&apos;œuvre, marchand de biens — j&apos;ai créé
                et dirigé plusieurs entreprises dans des secteurs très différents. Pendant des années, j&apos;ai utilisé
                l&apos;IA comme tout le monde : avec frustration.
              </p>
              <p className="text-[0.9rem] text-muted leading-relaxed">
                Quand j&apos;ai compris la méthode pour structurer mes demandes, tout a changé.{" "}
                <strong className="text-navy">
                  J&apos;ai construit cette formation pour les entrepreneurs comme moi
                </strong>{" "}
                — ceux qui ont des choses concrètes à faire et pas de temps à perdre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarif" className="bg-navy-2 py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">Tarif</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-white mb-3">
            Rentabilisé
            <br />
            <span className="italic text-amber-300">en une semaine.</span>
          </h2>
          <p className="text-[0.95rem] text-white/55 leading-relaxed mb-7">
            1h récupérée par semaine = formation remboursée en quelques jours. Et c&apos;est une estimation conservatrice.
          </p>
          <div className="bg-navy border border-white/10 rounded-2xl p-7 md:p-8 relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400" />
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/35 text-amber-200 text-[0.72rem] font-semibold rounded-full py-1 px-3 mb-5">
              🚀 Offre de lancement
            </div>
            <p className="text-[0.88rem] text-white/35 line-through mb-1">Prix normal : 97€</p>
            <div className="font-heading text-[3.5rem] md:text-[4.2rem] font-black text-white leading-none mb-1">
              <sup className="text-2xl align-super">€</sup>49
            </div>
            <p className="text-[0.82rem] text-white/45 border-b border-white/10 pb-4 mb-5">
              Accès complet à vie · puis <strong className="text-white/80">4,90€/mois</strong> optionnel (mises à jour &amp;
              outils SaaS)
            </p>
            <ul className="space-y-2.5 mb-6">
              {[
                "7 modules vidéo progressifs",
                "Éditeur de prompts interactif",
                "Bibliothèque de 50+ templates métier",
                "PDF & ressources téléchargeables",
                "Quiz & exercices pratiques",
                "Badges de progression",
                "Mises à jour à vie",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2 text-[0.9rem] text-white/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-300 text-[0.65rem] font-black">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="bg-navy/60 border border-white/15 rounded-card p-5 mb-4">
              <label className="block text-sm font-semibold text-white mb-3">
                Rejoindre la liste d&apos;attente — prix de lancement garanti
              </label>
              <EmailSignupBlock
                inputId="email-2"
                buttonText="Réserver ma place à 49€ →"
                buttonGreen
                successMessage="✓ Parfait ! Vous serez parmi les premiers informés du lancement."
              />
              <p className="text-[0.72rem] text-white/30 text-center mt-3">
                🛡️ Satisfait ou remboursé 14 jours · Sans condition
              </p>
            </div>
            <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/25 rounded-xl flex gap-3 items-start">
              <span className="text-[1.1rem]">⏳</span>
              <p className="text-[0.86rem] text-white/70 leading-relaxed">
                Le prix de 49€ est réservé aux inscrits sur la liste d&apos;attente.{" "}
                <strong className="text-amber-200">Après le lancement, la formation revient à 97€.</strong> Sans nouvelle
                promotion avant plusieurs mois.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BONUS */}
      <section className="bg-gradient-to-br from-[#1a1200] to-[#0B1220] py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-300 mb-4">Inclus dans la formation</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-white mb-6">
            5 bonus pour aller
            <br />
            <span className="italic text-amber-300">encore plus loin</span>
          </h2>
          <div className="space-y-4">
            {[
              {
                emoji: "📄",
                title: "Bonus #1 — Guide PDF \"10 Prompts Essentiels\"",
                desc: "Les 10 prompts les plus utiles pour les entrepreneurs, prêts à copier-coller. Utilisables avant même de commencer la formation.",
              },
              {
                emoji: "📚",
                title: "Bonus #2 — Bibliothèque de 50+ templates métier",
                desc: "Emails, posts, devis, comptes-rendus — une collection classée par catégorie et mise à jour régulièrement.",
              },
              {
                emoji: "⚡",
                title: "Bonus #3 — Éditeur de prompts interactif",
                desc: "Testez, affinez et sauvegardez vos prompts directement dans la plateforme. Votre bibliothèque personnelle.",
              },
              {
                emoji: "🔄",
                title: "Bonus #4 — Mises à jour à vie",
                desc: "L'IA évolue vite. La formation aussi. Chaque nouveauté pertinente est ajoutée et communiquée.",
              },
              {
                emoji: "🛡️",
                title: "Bonus #5 — Garantie 14 jours",
                desc: "Si ça ne vous convient pas, un email et vous êtes intégralement remboursé. Sans question. Je prends le risque à votre place.",
              },
            ].map((b, i) => (
              <div
                key={b.title}
                className="flex gap-3 p-4 md:p-5 border border-white/10 rounded-2xl bg-white/5 hover:border-amber-300/40 transition"
              >
                <span className="text-[1.6rem] mt-1 flex-shrink-0">{b.emoji}</span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-white mb-1">{b.title}</h3>
                  <p className="text-[0.82rem] text-white/55 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* FINAL CTA */}
      <section className="bg-navy py-20 md:py-24">
        <div className="max-w-[760px] mx-auto px-4 md:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">
            C&apos;est gratuit. C&apos;est maintenant.
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-white max-w-[560px] mx-auto mb-3">
            Repartez avec vos
            <br />
            <span className="italic text-emerald-300">10 prompts essentiels</span>
          </h2>
          <p className="text-white/55 max-w-[460px] mx-auto mb-6 text-[0.96rem]">
            PDF de 12 pages · Utilisable immédiatement dans ChatGPT, Claude ou Gemini.
          </p>
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5">
              <span className="text-sm">🚀</span>
              <span className="text-[0.8rem] text-amber-200">
                Formation disponible au lancement à <strong>49€</strong>{" "}
                <span className="text-white/30 line-through">97€</span>
              </span>
            </div>
          </div>
          <div className="max-w-[430px] mx-auto text-left bg-navy-2 border border-white/10 rounded-2xl p-6">
            <label className="block text-sm font-semibold text-white mb-3">Où envoyer votre guide ?</label>
            <EmailSignupBlock
              inputId="email-3"
              buttonText="Recevoir les 10 prompts gratuitement →"
              buttonGreen
              successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
            />
            <p className="text-[0.7rem] text-white/30 text-center mt-3">🔒 Sans spam · Désabonnement en 1 clic</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="bg-white border-t border-border py-5 px-4 flex flex-wrap items-center justify-center gap-6">
        <span className="text-sm text-muted">🔐 Paiement sécurisé Stripe</span>
        <span className="text-sm text-muted">🛡️ Remboursé 14 jours</span>
        <span className="text-sm text-muted">🇫🇷 Formation 100% en français</span>
      </div>
      <footer className="bg-[#050b14] py-8 px-4 md:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="font-heading font-black text-white/25">
          Master<span className="text-amber-400/60">Prompt</span>
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-white/25 hover:text-white/50">
            Mentions légales
          </Link>
          <Link href="#" className="text-xs text-white/25 hover:text-white/50">
            Confidentialité
          </Link>
          <Link href="#" className="text-xs text-white/25 hover:text-white/50">
            Contact
          </Link>
        </div>
        <div className="text-xs text-white/20">© 2025 Master Prompt</div>
      </footer>
    </div>
  );
}
