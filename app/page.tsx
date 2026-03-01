import Link from "next/link";
import { LandingNav } from "@/components/landing/LandingNav";
import { Logo } from "@/components/layout/Logo";
import { FAQSection } from "@/components/landing/FAQSection";
import { EmailSignupBlock } from "@/components/landing/EmailSignupBlock";

const MODULES = [
  { num: "01", title: "Comprendre l'IA et le Prompt Engineering", desc: "Les bases concrètes pour comprendre comment fonctionne l'IA — et pourquoi vos prompts actuels ne marchent pas." },
  { num: "02", title: "Fondamentaux du prompt efficace", desc: "La méthode PACO et la structure d'un prompt qui obtient des résultats dès la première tentative." },
  { num: "03", title: "Cas d'usage pour votre business", desc: "Marketing, prospection, devis, contenus réseaux sociaux — des templates directement réutilisables dans votre quotidien." },
  { num: "04", title: "Ateliers pratiques et simulations", desc: "Pratiquez sur des cas réels avec un éditeur de prompts intégré et un retour immédiat sur vos résultats." },
  { num: "05", title: "Limites, éthique et protection des données", desc: "Ce que vous ne devez jamais confier à une IA. RGPD, confidentialité, hallucinations — protégez votre business." },
  { num: "06", title: "Autonomie et veille continue", desc: "Restez à jour sans y passer des heures et intégrez l'IA durablement dans votre quotidien professionnel." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />

      {/* HERO */}
      <section className="relative pt-[130px] pb-20 px-4 md:px-12 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center min-h-screen">
        <div className="absolute top-20 -right-12 w-[650px] h-[650px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.06)_0%,rgba(201,185,154,0.07)_45%,transparent_70%)] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-primary-light text-primary py-1.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wide mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-blink" />
            Lancement bientôt — Places limitées
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[4.2rem] font-black leading-[1.06] tracking-tight text-navy mb-6 animate-fade-up">
            L&apos;IA ne vous
            <br />
            déçoit pas.
            <br />
            <em className="italic font-bold text-primary">Vos prompts, si.</em>
          </h1>
          <p className="text-[1.08rem] text-muted max-w-[460px] leading-relaxed mb-10 animate-fade-up">
            Master Prompt est la méthode pratique qui transforme l&apos;IA en véritable assistant pour votre business — en 6 modules clairs, sans jargon technique.
          </p>
          <div className="flex gap-8 animate-fade-up">
            <div>
              <div className="font-heading text-[1.9rem] font-black text-navy leading-none">6</div>
              <div className="text-xs text-muted mt-1">Modules progressifs</div>
            </div>
            <div className="w-px bg-border self-stretch" />
            <div>
              <div className="font-heading text-[1.9rem] font-black text-navy leading-none">4h</div>
              <div className="text-xs text-muted mt-1">De formation pratique</div>
            </div>
            <div className="w-px bg-border self-stretch" />
            <div>
              <div className="font-heading text-[1.9rem] font-black text-navy leading-none">19€</div>
              <div className="text-xs text-muted mt-1">Prix de lancement</div>
            </div>
          </div>
        </div>

        <div id="waitlist" className="relative z-10">
          <div className="bg-white border border-border rounded-card-lg p-10 shadow-card animate-fade-up">
            <div className="bg-gradient-to-br from-navy to-navy-2 rounded-[10px] p-5 md:p-6 mb-6 flex items-center gap-5">
              <div className="w-11 h-14 bg-primary rounded flex items-center justify-center flex-shrink-0 shadow-lg text-2xl">📄</div>
              <div>
                <div className="text-[0.7rem] uppercase tracking-wider text-blue-300 font-semibold mb-0.5">Guide gratuit</div>
                <div className="font-heading text-base font-bold text-white leading-snug">
                  10 Prompts Essentiels
                  <br />
                  pour les Entrepreneurs
                </div>
                <div className="text-xs text-white/45 mt-1">PDF · 12 pages · Immédiat</div>
              </div>
            </div>
            <div className="inline-block bg-emerald-100 text-emerald-800 py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wide mb-6">
              🎁 100% Gratuit — sans CB
            </div>
            <h2 className="font-heading text-[1.45rem] font-bold leading-tight text-navy mb-1">
              Recevez votre guide
              <br />
              immédiatement
            </h2>
            <p className="text-sm text-muted mb-8">
              10 prompts prêts à copier-coller, adaptés à votre business. Utilisables dès aujourd&apos;hui.
            </p>
            <ul className="space-y-2.5 mb-6">
              {["Prompt email de prospection", "Prompt post LinkedIn / Instagram", "Prompt relance client sans réponse", "Prompt description de service", "+ 6 autres prompts métier"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-[18px] h-[18px] rounded-full bg-emerald-600 flex items-center justify-center text-white text-[0.6rem] font-black flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <EmailSignupBlock
              inputId="hero-email"
              buttonText="Recevoir les 10 prompts gratuitement →"
              buttonGreen
              successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
              afterNote={
                <>
                  <div className="mt-4 p-4 bg-primary-light rounded-button flex items-start gap-2.5">
                    <span className="text-lg flex-shrink-0">🚀</span>
                    <p className="text-sm text-navy-2 leading-relaxed">
                      En recevant ce guide, vous rejoignez aussi la liste d&apos;attente et bénéficiez du{" "}
                      <strong className="text-navy">prix early bird à 19,90€</strong> (au lieu de 49€) lors du lancement.
                    </p>
                  </div>
                  <p className="text-center text-xs text-muted mt-4">🔒 Sans spam · Désabonnement en 1 clic</p>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="bg-white border-y border-border py-6 px-4 md:px-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        <span className="text-xs uppercase tracking-widest text-muted-light font-medium">Pourquoi nous faire confiance</span>
        <div className="flex flex-wrap items-center gap-8 md:gap-10">
          <span className="text-sm text-muted flex items-center gap-2">🔐 Paiement sécurisé Stripe</span>
          <span className="text-sm text-muted flex items-center gap-2">🛡️ Remboursement 14 jours</span>
          <span className="text-sm text-muted flex items-center gap-2">🇫🇷 Formation 100% en français</span>
          <span className="text-sm text-muted flex items-center gap-2">⚡ Accès immédiat après paiement</span>
        </div>
      </div>

      {/* LEAD MAGNET SECTION */}
      <section className="bg-white border-y border-border py-16 md:py-20">
        <div className="max-w-[1100px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-navy to-navy-2 rounded-card-lg p-8 md:p-12 relative overflow-hidden shadow-xl">
              <div className="absolute -top-10 -right-10 w-52 h-52 bg-primary/10 rounded-full" />
              <p className="text-[0.7rem] uppercase tracking-widest text-blue-300 font-semibold mb-6">Guide Gratuit — Master Prompt</p>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-white leading-tight mb-4">
                10 Prompts Essentiels
                <br />
                pour les Entrepreneurs
              </h2>
              <p className="text-sm text-white/45 mb-8">PDF · 12 pages · Utilisables immédiatement</p>
              <ul className="space-y-2">
                {["Prompt email de prospection", "Prompt post LinkedIn / Instagram", "Prompt relance client sans réponse", "Prompt description de service", "+ 6 autres prompts métier inclus"].map((t, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-white/70">
                    <span className="w-[18px] h-[18px] rounded-full bg-emerald-600 flex items-center justify-center text-white text-[0.6rem] font-black flex-shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 flex-wrap mt-8">
                {["Commercial", "Marketing", "Productivité", "Stratégie"].map((tag) => (
                  <span key={tag} className="bg-primary/20 text-blue-200 py-1 px-3 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="absolute -top-3 right-6 bg-emerald-600 text-white py-2 px-5 rounded-full text-sm font-bold shadow-lg">
              GRATUIT
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">Votre premier pas</p>
            <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-4">
              Commencez à gagner
              <br />
              du temps <em className="italic text-primary">dès aujourd&apos;hui</em>
            </h2>
            <p className="text-base text-muted leading-relaxed mb-8">
              Recevez immédiatement les 10 prompts les plus utiles pour les entrepreneurs.
              Prêts à copier-coller dans ChatGPT, Claude ou Gemini.
              <strong className="text-navy"> Zéro CB. Zéro engagement.</strong>
            </p>
            <div className="bg-ivory-2 border border-border rounded-card p-7">
              <p className="text-sm font-semibold text-navy mb-4">Où envoyer votre guide ?</p>
              <EmailSignupBlock
                inputId="lead-email"
                buttonText="Recevoir les 10 prompts gratuitement →"
                buttonGreen
                successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail dans quelques secondes."
                afterNote={
                  <div className="mt-4 p-4 bg-primary-light rounded-lg flex items-start gap-2">
                    <span className="flex-shrink-0">🚀</span>
                    <p className="text-[0.78rem] text-navy-2 leading-relaxed">
                      Vous rejoignez aussi la liste d&apos;attente et bénéficiez du{" "}
                      <strong>prix early bird à 19,90€</strong> lors du lancement (au lieu de 49€).
                    </p>
                  </div>
                }
              />
              <p className="text-xs text-muted text-center mt-3">🔒 Sans spam · Désabonnement en 1 clic</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-navy py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-4 md:px-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-sand mb-5">Le problème</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-white leading-tight mb-5">
            Vous l&apos;utilisez déjà.
            <br />
            Mais pas comme <em className="italic text-sand">vous le devriez.</em>
          </h2>
          <p className="text-[1.05rem] text-white/45 max-w-[540px] leading-relaxed mb-12">
            La plupart des entrepreneurs utilisent l&apos;IA à 10% de son potentiel. Non pas par manque de motivation — mais par manque de méthode.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-card overflow-hidden">
            {[
              { emoji: "😤", title: "Résultats génériques", text: "Vous demandez, l'IA répond... mais c'est toujours trop vague, trop long, ou complètement à côté de votre besoin réel." },
              { emoji: "⏱️", title: "Perte de temps", text: "Vous reformulez 5 fois la même demande. Au final, c'est plus rapide de le faire soi-même — et ça n'a aucun sens." },
              { emoji: "😰", title: "Vous vous sentez dépassé", text: "Vos concurrents produisent du contenu et des emails à une vitesse folle grâce à l'IA. Pas vous. Pas encore." },
              { emoji: "🌀", title: "Trop d'infos, aucune méthode", text: "YouTube, podcasts, posts LinkedIn... vous avez tout regardé mais rien ne s'applique concrètement à votre activité." },
            ].map((card, i) => (
              <div key={i} className="bg-navy p-6 md:p-8 hover:bg-navy-2 transition-colors">
                <span className="text-3xl block mb-5">{card.emoji}</span>
                <h3 className="text-base font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="programme" className="max-w-[1100px] mx-auto py-20 md:py-28 px-4 md:px-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">Le programme</p>
        <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-5">
          6 modules pour passer
          <br />
          de l&apos;hésitation à la <em className="italic text-primary">maîtrise</em>
        </h2>
        <p className="text-[1.05rem] text-muted max-w-[540px] leading-relaxed mb-16">
          Une progression pensée pour les entrepreneurs et indépendants. Pas de théorie inutile — uniquement ce qui s&apos;applique à votre business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MODULES.map((m, i) => (
            <div
              key={m.num}
              className="bg-white border border-border rounded-card p-8 transition-all hover:border-primary/25 hover:shadow-card-hover hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-[0.72rem] font-bold text-primary uppercase tracking-widest mb-3">Module {m.num}</p>
              <h3 className="text-[0.97rem] font-semibold text-navy mb-2 leading-snug">{m.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="tarif" className="bg-ivory-2 border-y border-border py-20 md:py-28">
        <div className="max-w-[1100px] mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">Tarif</p>
            <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-5">
              Un investissement qui se
              <br />
              rentabilise en <em className="italic text-primary">une semaine</em>
            </h2>
            <p className="text-[1.05rem] text-muted max-w-[540px] leading-relaxed mb-10">
              Si vous gagnez seulement 1h par semaine grâce à Master Prompt, la formation est rentabilisée en quelques jours.
            </p>
            <div className="space-y-5">
              {[
                { icon: "📹", title: "Vidéos pédagogiques", desc: "6 modules structurés, visionnables à votre rythme, à vie." },
                { icon: "⚡", title: "Éditeur de prompts intégré", desc: "Testez, affinez et sauvegardez vos prompts directement dans la plateforme." },
                { icon: "🔄", title: "Mises à jour continues", desc: "L'IA évolue vite. La formation aussi — inclus dans l'abonnement optionnel à 4,90€/mois." },
              ].map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-button bg-primary-light flex items-center justify-center flex-shrink-0 text-lg">
                    {b.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[0.95rem] text-navy">{b.title}</p>
                    <p className="text-sm text-muted">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-border rounded-card-xl p-8 md:p-12 shadow-[0_8px_40px_rgba(13,27,42,0.1)] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-52 h-52 bg-[radial-gradient(circle,rgba(37,99,235,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 py-2 px-4 rounded-full text-xs font-semibold mb-8">
              🚀 Prix de lancement
            </div>
            <p className="text-sm text-muted-light line-through mb-1">Valeur normale : 49€</p>
            <div className="font-heading text-5xl md:text-[4.5rem] font-black text-navy leading-none tracking-tight mb-2">
              <sup className="text-[1.8rem] align-super">€</sup>19<span className="text-3xl">,90</span>
            </div>
            <p className="text-sm text-muted mb-10 pb-10 border-b border-border">
              Accès complet à vie · puis <strong className="text-navy">4,90€/mois</strong> (optionnel) mises à jour & outils SaaS
            </p>
            <ul className="space-y-4 mb-10">
              {["6 modules vidéo complets", "Éditeur de prompts interactif", "Bibliothèque de templates métier", "PDF & ressources téléchargeables", "Quiz & exercices pratiques", "Badges de progression"].map((f, i) => (
                <li key={i} className="flex items-center gap-4 text-[0.92rem]">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[0.62rem] font-black flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <EmailSignupBlock
              inputId="pricing-email"
              buttonText="Réserver ma place au prix early bird →"
              successMessage="✓ Parfait ! Vous serez parmi les premiers informés."
            />
            <p className="text-center text-sm text-muted mt-4">🛡️ Satisfait ou remboursé — 14 jours sans condition</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-[760px] mx-auto py-20 md:py-28 px-4 text-center">
        <div className="font-heading text-6xl text-primary leading-none mb-8 opacity-25">"</div>
        <p className="font-heading text-lg md:text-xl font-light italic leading-relaxed text-navy mb-10">
          &quot;Avant, je passais 30 minutes à essayer de faire écrire un post LinkedIn à ChatGPT. Avec la méthode apprise ici, j&apos;obtiens quelque chose d&apos;utilisable en 3 minutes. J&apos;ai récupéré facilement 2h par semaine.&quot;
        </p>
        <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center font-heading font-bold text-primary mx-auto mb-3">
          MC
        </div>
        <p className="font-semibold text-[0.95rem] text-navy">Marie-Claire D.</p>
        <p className="text-sm text-muted mt-1">Consultante RH indépendante — 12 ans d&apos;expérience</p>
      </section>

      <FAQSection />

      {/* FOOTER CTA */}
      <section className="bg-navy py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_60%)] pointer-events-none" />
        <p className="text-xs font-semibold uppercase tracking-widest text-white/35 mb-5 relative z-10">C&apos;est gratuit, c&apos;est maintenant</p>
        <h2 className="font-heading text-2xl md:text-3xl font-black text-white max-w-[560px] mx-auto mb-4 relative z-10">
          Repartez avec vos
          <br />
          <em className="italic text-sand">10 prompts essentiels</em>
        </h2>
        <p className="text-white/45 max-w-[480px] mx-auto mb-2 relative z-10">
          Un guide PDF de 12 pages, utilisable immédiatement dans ChatGPT, Claude ou Gemini.
        </p>
        <p className="text-white/30 text-sm mb-10 relative z-10">+ accès prioritaire à l&apos;offre de lancement à 19,90€</p>
        <div className="flex justify-center relative z-10">
          <EmailSignupBlock
            inputId="footer-email"
            buttonText="Recevoir le guide →"
            buttonGreen
            inline
            successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#070E16] py-8 px-4 md:px-12 flex flex-wrap items-center justify-between gap-4">
        <Logo href="/" size="sm" className="opacity-70 [&_img]:brightness-0 [&_img]:invert" />
        <div className="flex gap-8">
          <Link href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Mentions légales</Link>
          <Link href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Confidentialité</Link>
          <Link href="#" className="text-xs text-white/20 hover:text-white/40 transition-colors">Contact</Link>
        </div>
        <div className="text-xs text-white/20">© 2025 Master Prompt</div>
      </footer>
    </div>
  );
}
