"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Faut-il être à l'aise avec la technologie ?",
    answer:
      "Non. La formation est conçue pour des entrepreneurs sans background technique. Si vous savez utiliser un smartphone et un ordinateur, vous pouvez suivre sans aucun problème.",
  },
  {
    question: "Quelle IA faut-il utiliser ?",
    answer:
      "La formation est compatible avec ChatGPT, Claude et Gemini. Les principes enseignés s'appliquent à toutes les IA génératives. Une version gratuite suffit pour commencer.",
  },
  {
    question: "Combien de temps dure la formation ?",
    answer:
      "Environ 4 à 6 heures au total, à votre rythme. Vous pouvez appliquer les techniques dès le module 2, sans attendre d'avoir tout terminé.",
  },
  {
    question: "À quoi sert l'abonnement à 4,90€/mois ?",
    answer:
      "L'abonnement est 100% optionnel. Il donne accès aux mises à jour continues de la formation, aux nouveaux templates et à l'éditeur de prompts SaaS. La formation de base reste accessible à vie avec les 19,90€ initiaux.",
  },
  {
    question: "Et si ça ne me convient pas ?",
    answer:
      "Remboursement intégral sans question dans les 14 jours suivant l'achat. Aucune condition, aucune démarche compliquée. Un simple email suffit.",
  },
  {
    question: "Le contenu sera-t-il mis à jour quand l'IA évolue ?",
    answer:
      "Oui. L'abonnement à 4,90€/mois donne accès aux mises à jour continues. La méthode de base (PACO) reste valable quelle que soit l'évolution des outils — c'est sa force.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-white border-t border-border py-20 md:py-28">
      <div className="max-w-[1100px] mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5 reveal">Questions fréquentes</p>
          <h2 className="font-heading text-2xl md:text-3xl font-black leading-tight tracking-tight text-navy mb-5 reveal">
            Vous vous demandez peut-être…
          </h2>
        </div>
        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="border-b border-border py-6 first:border-t border-border cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4 select-none">
                <span className="text-[0.93rem] font-semibold">{item.question}</span>
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full border border-border text-muted flex-shrink-0 transition-all duration-250 ${
                    openIndex === i ? "bg-primary border-primary text-white rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </div>
              <div
                className={`text-[0.88rem] text-muted leading-relaxed overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-[300px] pt-4" : "max-h-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
