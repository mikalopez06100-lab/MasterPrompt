import Link from "next/link";
import { LandingNav } from "@/components/landing/LandingNav";
import { FAQSection } from "@/components/landing/FAQSection";
import { EmailSignupBlock } from "@/components/landing/EmailSignupBlock";

const MODULES = [
  { tag: "Fondamentaux", title: "Comprendre l'IA et le Prompt Engineering", desc: "Les bases concrètes pour comprendre comment fonctionne l'IA — et pourquoi vos prompts actuels donnent des résultats décevants." },
  { tag: "Méthode", title: "La méthode PACO — Fondamentaux du prompt efficace", desc: "Le seul framework dont vous avez besoin. Structurez chaque demande pour obtenir un résultat utilisable dès la première tentative." },
  { tag: "Cas d'usage", title: "Communication & Marketing", desc: "Emails, posts réseaux sociaux, pages de vente, biographies, newsletters — des templates directement réutilisables dans votre communication." },
  { tag: "Cas d'usage", title: "Gestion & Productivité", desc: "Devis, comptes-rendus, plans d'action, analyse de données, organisation — tout ce qui mange votre temps au quotidien." },
  { tag: "Pratique", title: "Ateliers pratiques et simulations", desc: "Vous pratiquez sur des cas réels avec l'éditeur de prompts intégré. Retour immédiat sur vos résultats. Pas de théorie — de l'application." },
  { tag: "Avancé", title: "Enchaînements IA — vers l'automatisation", desc: "Comment combiner plusieurs prompts pour créer des flux de travail sans outil technique. L'IA commence à travailler pour vous, pas avec vous.", new: true },
  { tag: "Éthique & Autonomie", title: "Limites, protection des données et veille continue", desc: "Ce que vous ne devez jamais confier à une IA. RGPD, confidentialité, hallucinations — protégez votre business. Et restez à jour sans y passer des heures." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />

      {/* HERO */}
      <section className="bg-navy py-16 md:py-20 px-4 md:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/20 text-blue-200 border border-primary/30 py-1.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wide mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-blink" />
          Lancement bientôt — Prix early bird disponible
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-[3.8rem] font-black leading-[1.08] tracking-tight text-white mb-5 max-w-[700px] mx-auto">
          Vous utilisez l&apos;IA.
          <br />
          Mais pas comme
          <br />
          <em className="italic text-sand">vous le devriez.</em>
        </h1>
        <p className="text-[1.05rem] text-white/50 max-w-[520px] mx-auto mb-10 leading-relaxed">
          Master Prompt est la méthode pratique pour maîtriser l&apos;IA dans votre business — sans jargon, sans prise de tête.
        </p>

        {/* Video placeholder */}
        <div className="max-w-[760px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video mb-10">
          <div className="w-full h-full bg-gradient-to-br from-navy to-navy-2 flex flex-col items-center justify-center gap-5 cursor-pointer">
            <div className="w-[72px] h-[72px] rounded-full bg-primary flex items-center justify-center shadow-[0_0_0_12px_rgba(37,99,235,0.15)] hover:scale-105 transition-transform">
              <svg className="w-7 h-7 fill-white ml-1" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
            <p className="text-sm text-white/50">Présentation de la formation — 55 secondes</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-0 border-t border-white/10 pt-10 mt-6">
          {[
            { num: "7", label: "Modules progressifs" },
            { num: "4h", label: "De formation pratique" },
            { num: "19€", label: "Prix de lancement" },
            { num: "14j", label: "Remboursement garanti" },
          ].map((s, i) => (
            <div key={i} className="px-6 md:px-10 py-4 border-r border-white/10 last:border-r-0 text-center">
              <div className="font-heading text-2xl font-black text-white leading-none">{s.num}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <div className="bg-white border-y border-border py-5 px-4 flex flex-wrap items-center justify-center gap-8">
        <span className="text-sm text-muted flex items-center gap-2">🔐 Paiement sécurisé Stripe</span>
        <span className="text-sm text-muted flex items-center gap-2">🛡️ Satisfait ou remboursé 14 jours</span>
        <span className="text-sm text-muted flex items-center gap-2">🇫🇷 Formation 100% en français</span>
        <span className="text-sm text-muted flex items-center gap-2">⚡ Accès immédiat après paiement</span>
      </div>

      {/* HONEST + PDF FORM */}
      <section id="form-main" className="bg-white py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Soyons honnêtes</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-6">
            Est-ce que je peux
            <br />
            être direct avec vous ?
          </h2>
          <div className="bg-white border border-border rounded-2xl p-8 md:p-10 mb-10">
            <p className="text-base leading-relaxed text-navy mb-4">
              Vous utilisez peut-être déjà ChatGPT ou Claude. Et les résultats sont souvent… décevants. Trop génériques. Pas adaptés à votre activité. Vous reformulez cinq fois la même demande pour finalement faire vous-même ce que vous vouliez déléguer à l&apos;IA.
            </p>
            <p className="text-base leading-relaxed text-navy mb-4">
              <strong className="text-navy">Le problème, ce n&apos;est pas l&apos;IA.</strong> C&apos;est la façon dont vous lui parlez.
            </p>
            <p className="text-base leading-relaxed text-navy mb-4">
              L&apos;IA ne lit pas dans les pensées. Elle produit exactement ce qu&apos;on lui demande — ni plus, ni moins. Et la plupart des entrepreneurs ne savent pas comment formuler cette demande correctement.
            </p>
            <p className="text-base leading-relaxed text-navy">
              <strong className="text-navy">Ce n&apos;est pas un problème de compétence. C&apos;est un problème de méthode.</strong> Et une méthode, ça s&apos;apprend. Pas en semaines — en quelques heures.
            </p>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4 mt-12">Commencez maintenant — gratuitement</p>
          <h2 className="font-heading text-xl md:text-2xl font-black leading-tight text-navy mb-4">
            Recevez les 10 prompts essentiels
            <br />
            <em className="italic text-primary">pour votre business</em>
          </h2>
          <p className="text-[1.05rem] text-muted leading-relaxed mb-6">
            10 prompts prêts à copier-coller, adaptés à 5 catégories métier. Utilisables immédiatement dans ChatGPT, Claude ou Gemini.
          </p>
          <div className="bg-gradient-to-br from-navy to-navy-2 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 mb-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-primary/10 rounded-full" />
            <div className="w-14 h-[70px] bg-primary rounded-md flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">📄</div>
            <div className="flex-1 relative z-10">
              <p className="text-[0.7rem] uppercase tracking-wider text-blue-200 font-semibold mb-1">Guide PDF · 12 pages</p>
              <p className="font-heading font-bold text-white leading-snug">10 Prompts Essentiels pour les Entrepreneurs</p>
              <p className="text-xs text-white/40 mt-1">Commercial · Marketing · Productivité · Communication · Stratégie</p>
            </div>
            <span className="bg-emerald-600 text-white py-2 px-4 rounded-full text-xs font-bold whitespace-nowrap relative z-10">GRATUIT</span>
          </div>
          <div className="bg-ivory-2 border border-border rounded-card p-6 md:p-8">
            <label className="block text-sm font-semibold text-navy mb-3">Où envoyer votre guide ?</label>
            <EmailSignupBlock
              inputId="email-1"
              buttonText="Recevoir les 10 prompts gratuitement →"
              buttonGreen
              successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
              afterNote={
                <div className="mt-4 p-4 bg-primary-light rounded-lg flex items-start gap-2">
                  <span className="flex-shrink-0">🚀</span>
                  <p className="text-sm text-navy-2 leading-relaxed">
                    Vous bénéficiez aussi du <strong>prix early bird à 19,90€</strong> lors du lancement (au lieu de 49€).
                  </p>
                </div>
              }
            />
            <p className="text-xs text-muted text-center mt-3">🔒 Sans spam · Désabonnement en 1 clic</p>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="bg-navy py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">Ce que vous vivez probablement</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-white leading-tight mb-8">
            Vous vous reconnaissez
            <br />
            dans l&apos;une de ces <em className="italic text-sand">situations ?</em>
          </h2>
          <div className="space-y-4">
            {[
              "Vous demandez à l'IA, elle répond… mais c'est tellement générique que vous passez plus de temps à corriger qu'à utiliser.",
              "Vous reformulez la même demande 4 ou 5 fois. Au final, vous le faites vous-même — et l'IA n'a servi à rien.",
              "Vos concurrents semblent produire du contenu, des devis, des emails à une vitesse incompréhensible. Pas vous. Pas encore.",
              "Vous avez regardé des dizaines de tutoriels YouTube sur l'IA. Vous avez tout compris… mais rien ne s'applique concrètement à votre activité.",
            ].map((text, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-red-400 font-bold flex-shrink-0">→</span>
                <p className="text-sm text-white/80 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#form-main" className="inline-block w-full max-w-[480px] bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-emerald-700 transition-colors">
              Recevoir les 10 prompts gratuitement →
            </a>
            <p className="text-xs text-white/30 mt-2">PDF gratuit · Utilisable immédiatement</p>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="bg-ivory-2 border-y border-border py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">La différence en pratique</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-10">
            Seul vs avec
            <br />
            <em className="italic text-primary">une méthode</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden">
              <div className="bg-red-100 text-red-900 px-5 py-3 font-bold text-sm">❌ Sans méthode</div>
              <div className="bg-red-50 border border-red-200 border-t-0 rounded-b-xl p-5 space-y-3">
                {["Résultats génériques inutilisables", "5 reformulations pour un seul email", "Frustration qui pousse à abandonner", "L'IA ne comprend pas votre activité", "Vous gagnez… 10 minutes par semaine"].map((t, i) => (
                  <div key={i} className="flex gap-2 text-sm text-red-900">
                    <span>✗</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <div className="bg-emerald-100 text-emerald-900 px-5 py-3 font-bold text-sm">✓ Avec Master Prompt</div>
              <div className="bg-emerald-50 border border-emerald-200 border-t-0 rounded-b-xl p-5 space-y-3">
                {["Résultats utilisables dès la première tentative", "Un prompt → un résultat. Sans reformuler.", "L'IA devient votre vrai assistant quotidien", "Templates adaptés à votre business", "Vous récupérez 1 à 2 heures par semaine"].map((t, i) => (
                  <div key={i} className="flex gap-2 text-sm text-emerald-900">
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
      <section id="programme" className="bg-white py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Le programme</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-4">
            7 modules pour passer
            <br />
            de l&apos;hésitation à la <em className="italic text-primary">maîtrise</em>
          </h2>
          <p className="text-[1.05rem] text-muted leading-relaxed mb-10">
            Une progression pensée pour les entrepreneurs et indépendants. Pas de théorie inutile — uniquement ce qui s&apos;applique à votre business dès aujourd&apos;hui.
          </p>
          <div className="space-y-0 border-t border-border">
            {MODULES.map((m, i) => (
              <div key={i} className="py-8 border-b border-border grid grid-cols-1 md:grid-cols-[48px_1fr] gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center font-heading font-black text-primary text-sm flex-shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <span className="inline-block text-[0.68rem] font-bold uppercase tracking-wider text-primary bg-primary-light px-2 py-0.5 rounded mb-2">{m.tag}</span>
                  {m.new && <span className="inline-block text-[0.65rem] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded ml-2">Nouveau</span>}
                  <h3 className="text-base font-semibold text-navy mb-1 leading-snug">{m.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#form-main" className="inline-block w-full max-w-[480px] bg-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:bg-emerald-700 transition-colors">
              Recevoir les 10 prompts gratuitement →
            </a>
            <p className="text-xs text-muted mt-2">PDF gratuit · + accès early bird à 19,90€</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="bg-navy py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">Ce que vous aurez à la fin</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-white leading-tight mb-10">
            À la fin de la formation,
            <br />
            <em className="italic text-sand">vous repartez avec ça</em>
          </h2>
          <div className="space-y-4">
            {[
              { text: "Une méthode claire et reproductible pour formuler n'importe quelle demande à l'IA et obtenir un résultat utilisable immédiatement.", strong: "Une méthode claire et reproductible" },
              { text: "Une bibliothèque de templates prêts à copier-coller pour vos emails, vos posts, vos devis, vos comptes-rendus.", strong: "Une bibliothèque de templates" },
              { text: "1 à 2 heures gagnées par semaine sur des tâches que l'IA peut faire à votre place — si vous lui parlez correctement.", strong: "1 à 2 heures gagnées par semaine" },
              { text: "Vos premiers enchaînements IA fonctionnels — des flux simples qui travaillent pour vous sans intervention technique.", strong: "Vos premiers enchaînements IA" },
              { text: "La confiance de savoir exactement comment utiliser l'IA dans votre activité, aujourd'hui et demain.", strong: "La confiance" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-xl">
                <span className="text-primary font-bold flex-shrink-0">→</span>
                <p className="text-sm text-white/90 leading-relaxed"><strong className="text-white">{item.strong}</strong> {item.text.replace(item.strong, "").trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="tarif" className="bg-ivory py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Tarif</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight text-navy mb-4">
            Un investissement qui se
            <br />
            rentabilise en <em className="italic text-primary">une semaine</em>
          </h2>
          <p className="text-[1.05rem] text-muted leading-relaxed mb-8">
            Si vous gagnez seulement 1h par semaine grâce à Master Prompt — c&apos;est une estimation conservatrice — la formation est rentabilisée en quelques jours.
          </p>
          <div className="bg-white border-2 border-border rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400" />
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 py-1.5 px-4 rounded-full text-xs font-bold mb-6">
              🚀 Offre de lancement
            </div>
            <p className="text-sm text-muted-light line-through mb-1">Valeur normale : 49€</p>
            <div className="font-heading text-5xl font-black text-navy leading-none mb-2">
              <sup className="text-2xl align-super">€</sup>19<span className="text-3xl">,90</span>
            </div>
            <p className="text-sm text-muted mb-8 pb-8 border-b border-border">
              Accès complet à vie à la formation<br />
              puis <strong className="text-navy">4,90€/mois</strong> (optionnel) — mises à jour & outils SaaS
            </p>
            <ul className="space-y-3 mb-8">
              {["7 modules vidéo complets", "Éditeur de prompts interactif", "Bibliothèque de templates métier", "PDF & ressources téléchargeables", "Quiz & exercices pratiques", "Badges de progression", "Mises à jour continues incluses"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-[0.6rem] font-black flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="bg-ivory-2 border border-border rounded-card p-6">
              <label className="block text-sm font-semibold text-navy mb-3">Rejoindre la liste d&apos;attente — prix early bird garanti</label>
              <EmailSignupBlock
                inputId="email-2"
                buttonText="Réserver ma place à 19,90€ →"
                buttonGreen
                successMessage="✓ Parfait ! Vous serez parmi les premiers informés du lancement."
              />
              <p className="text-xs text-muted text-center mt-3">🛡️ Satisfait ou remboursé 14 jours · Sans condition</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 bg-amber-100 border border-amber-200 rounded-xl mt-8">
            <span className="text-2xl flex-shrink-0">⏳</span>
            <p className="text-sm text-amber-900 leading-relaxed">
              Le prix de 19,90€ est exclusivement réservé aux personnes sur la liste d&apos;attente. <strong>Après le lancement, le prix revient à 49€.</strong> Sans nouvelle promotion avant plusieurs mois.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-ivory-2 border-y border-border py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Ils l&apos;ont testé</p>
          <div className="bg-white border border-border rounded-2xl p-8 md:p-10 relative">
            <span className="absolute top-4 left-6 font-heading text-6xl text-primary-light opacity-40">"</span>
            <p className="font-heading text-lg italic leading-relaxed text-navy mb-6 pt-4">
              &quot;Avant, je passais 30 minutes à essayer de faire écrire un post LinkedIn à ChatGPT. Avec la méthode apprise ici, j&apos;obtiens quelque chose d&apos;utilisable en 3 minutes. J&apos;ai récupéré facilement 2 heures par semaine sur mon activité.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary-light flex items-center justify-center font-heading font-bold text-primary">
                MC
              </div>
              <div>
                <p className="font-semibold text-navy">Marie-Claire D.</p>
                <p className="text-sm text-muted">Consultante RH indépendante — 12 ans d&apos;expérience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      {/* FINAL CTA */}
      <section className="bg-navy py-20 md:py-28">
        <div className="max-w-[740px] mx-auto px-4 md:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/35 mb-4">C&apos;est gratuit. C&apos;est maintenant.</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-white max-w-[560px] mx-auto mb-4">
            Repartez avec vos
            <br />
            <em className="italic text-sand">10 prompts essentiels</em>
          </h2>
          <p className="text-white/50 max-w-[480px] mx-auto mb-8">
            Un PDF de 12 pages, utilisable immédiatement dans ChatGPT, Claude ou Gemini.
            <br />
            <span className="text-white/30 text-sm">+ accès prioritaire à l&apos;offre de lancement à 19,90€</span>
          </p>
          <div className="max-w-[460px] mx-auto text-left">
            <label className="block text-sm font-semibold text-white mb-3">Où envoyer votre guide ?</label>
            <EmailSignupBlock
              inputId="email-3"
              buttonText="Recevoir les 10 prompts gratuitement →"
              buttonGreen
              successMessage="✓ Votre PDF est en route ! Vérifiez votre boîte mail."
            />
            <p className="text-xs text-white/30 text-center mt-3">🔒 Sans spam · Désabonnement en 1 clic</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="bg-white border-t border-border py-5 px-4 flex flex-wrap items-center justify-center gap-6">
        <span className="text-sm text-muted">🔐 Paiement sécurisé Stripe</span>
        <span className="text-sm text-muted">🛡️ Remboursement 14 jours</span>
        <span className="text-sm text-muted">🇫🇷 Formation 100% en français</span>
      </div>
      <footer className="bg-[#070E16] py-8 px-4 md:px-8 flex flex-wrap items-center justify-between gap-4">
        <div className="font-heading font-black text-white/30">MasterPrompt</div>
        <div className="flex gap-6">
          <Link href="#" className="text-xs text-white/20 hover:text-white/40">Mentions légales</Link>
          <Link href="#" className="text-xs text-white/20 hover:text-white/40">Confidentialité</Link>
          <Link href="#" className="text-xs text-white/20 hover:text-white/40">Contact</Link>
        </div>
        <div className="text-xs text-white/20">© 2025 Master Prompt</div>
      </footer>
    </div>
  );
}
