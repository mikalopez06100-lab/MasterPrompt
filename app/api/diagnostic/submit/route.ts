import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { DiagnosticAnswers, DiagnosticProfile } from "@/lib/diagnostic";
import { computeDiagnostic } from "@/lib/diagnostic";
import { getSupabaseProjectUrl } from "@/lib/supabase/env";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type Body = {
  email?: string;
  answers?: DiagnosticAnswers;
  score?: number;
  profile?: DiagnosticProfile;
  sector?: string | null;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Body | null;
  const email = String(body?.email ?? "")
    .trim()
    .toLowerCase();
  const answers = body?.answers;

  if (!isValidEmail(email)) {
    return NextResponse.json({ success: false, error: "Email invalide." }, { status: 400 });
  }

  if (!answers || typeof answers !== "object") {
    return NextResponse.json({ success: false, error: "Réponses manquantes." }, { status: 400 });
  }

  const { normalizedScore, profile } = computeDiagnostic(answers as DiagnosticAnswers);
  const sector =
    typeof answers.sector === "string" && answers.sector.length > 0 ? answers.sector : null;

  const supabaseUrl = getSupabaseProjectUrl();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  let supabaseOk = false;
  if (supabaseUrl && serviceKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey);
      const { error } = await supabase.from("diagnostic_leads").upsert(
        {
          email,
          score: normalizedScore,
          profile,
          sector,
          answers: answers as Record<string, unknown>,
          source: "diagnostic",
        },
        { onConflict: "email" }
      );
      supabaseOk = !error;
      if (error) {
        console.error("[diagnostic] Supabase upsert:", error.message);
      }
    } catch (e) {
      console.error("[diagnostic] Supabase:", e);
    }
  }

  const brevoApiKey = process.env.BREVO_API_KEY?.trim();
  const listId = Number(process.env.BREVO_DIAGNOSTIC_LIST_ID ?? "");
  let brevoOk = false;
  if (brevoApiKey && Number.isFinite(listId) && listId > 0) {
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          listIds: [listId],
          attributes: {
            DIAGNOSTIC_SCORE: String(normalizedScore),
            DIAGNOSTIC_PROFIL: profile,
            DIAGNOSTIC_SECTEUR: sector ?? "",
            SOURCE: "diagnostic",
          },
        }),
      });
      brevoOk = res.ok;
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        console.error("[diagnostic] Brevo:", res.status, t.slice(0, 500));
      }
    } catch (e) {
      console.error("[diagnostic] Brevo fetch:", e);
    }
  }

  const success = supabaseOk || brevoOk;
  if (!success) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Enregistrement temporairement indisponible. Votre diagnostic s’affiche quand même sur la page.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true });
}
