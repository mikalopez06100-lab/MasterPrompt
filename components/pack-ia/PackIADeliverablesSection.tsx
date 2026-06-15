import { DeliverableCard } from "@/components/DeliverableCard";
import {
  PACK_IA_ADAPTIVE_DELIVERABLES,
  PACK_IA_CORE_DELIVERABLES,
  PACK_IA_OFFER_SUMMARY,
  PACK_IA_PROFILE_RULES,
} from "@/lib/pack-ia-offer";

type Props = {
  headingClass?: string;
  showProfileRules?: boolean;
};

export function PackIADeliverablesSection({
  headingClass = "font-heading",
  showProfileRules = true,
}: Props) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className={`${headingClass} mb-2 text-3xl font-bold`}>Ce que comprend le Pack IA</h2>
        <p className="max-w-3xl text-sm text-slate-600">{PACK_IA_OFFER_SUMMARY}</p>
      </div>

      <div>
        <h3 className={`${headingClass} mb-4 text-xl font-bold`}>Socle — livré à chaque client</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {PACK_IA_CORE_DELIVERABLES.map(({ icon, title, description, tag }) => (
            <DeliverableCard key={title} icon={icon} title={title} description={description} tag={tag} />
          ))}
        </div>
      </div>

      <div>
        <h3 className={`${headingClass} mb-2 text-xl font-bold`}>Adapté à votre profil</h3>
        <p className="mb-4 max-w-3xl text-sm text-slate-600">
          Ces livrables ne sont pas empilés par défaut : on choisit la bonne combinaison au brief
          (site existant ou non, lead magnet pertinent ou non).
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PACK_IA_ADAPTIVE_DELIVERABLES.map(({ icon, title, description, tag }) => (
            <DeliverableCard key={title} icon={icon} title={title} description={description} tag={tag} />
          ))}
        </div>
      </div>

      {showProfileRules ? (
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <h3 className={`${headingClass} text-lg font-bold text-navy`}>
            Comment on adapte au brief de cadrage
          </h3>
          <div className="mt-4 space-y-4">
            {PACK_IA_PROFILE_RULES.map((rule) => (
              <div key={rule.question} className="rounded-xl border border-blue-100 bg-white p-4">
                <p className="text-sm font-semibold text-navy">{rule.question}</p>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                  {rule.options.map((opt) => (
                    <li key={opt.label}>
                      <span className="font-medium text-navy">{opt.label} — </span>
                      {opt.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
