/**
 * Template HTML de l’email de livraison du PDF (lead magnet).
 * Le placeholder {{LIEN_DESABONNEMENT}} est remplacé au moment de l’envoi.
 */
export const LEAD_PDF_EMAIL_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Vos 10 prompts sont là</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background-color: #F0EDE8; font-family: Arial, sans-serif; }
</style>
</head>
<body style="background-color:#F0EDE8; margin:0; padding:0;">

<!-- Préheader caché -->
<div style="display:none;max-height:0;overflow:hidden;color:#F0EDE8;font-size:1px;">
  Votre guide est en pièce jointe — mais lisez ça avant de l'ouvrir ↓
</div>

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0EDE8;">
<tr><td align="center" style="padding:32px 16px 48px;">

  <!-- Conteneur principal -->
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

    <!-- ── HEADER ──────────────────────────────────────────────────── -->
    <tr>
      <td style="background-color:#0D1B2A; border-radius:12px 12px 0 0; padding:28px 40px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <span style="font-family:'DM Mono',monospace;font-size:11px;font-weight:500;
                color:#F59E0B;letter-spacing:2px;text-transform:uppercase;">
                MASTER PROMPT
              </span>
              <div style="width:32px;height:2px;background-color:#F59E0B;margin-top:6px;"></div>
            </td>
            <td align="right">
              <span style="font-family:'DM Mono',monospace;font-size:10px;
                color:#475569;letter-spacing:1px;">
                masterprompt.fr
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- ── HERO ────────────────────────────────────────────────────── -->
    <tr>
      <td style="background-color:#0D1B2A; padding:0 40px 36px;">

        <!-- Pill tag -->
        <div style="display:inline-block;background-color:#1E3A5F;
          border:1px solid #2563EB;border-radius:20px;
          padding:5px 14px;margin-bottom:20px;">
          <span style="font-family:'DM Mono',monospace;font-size:11px;
            color:#93C5FD;letter-spacing:1px;">
            GUIDE GRATUIT · LIVRAISON IMMÉDIATE
          </span>
        </div>

        <!-- Headline -->
        <h1 style="font-family:'DM Sans',Arial,sans-serif;font-size:34px;
          font-weight:700;line-height:1.2;color:#FFFFFF;margin-bottom:12px;">
          Vos 10 prompts<br>
          <span style="color:#F59E0B;">sont dans ce mail.</span>
        </h1>

        <!-- Sous-titre -->
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:16px;
          line-height:1.6;color:#94A3B8;margin-bottom:0;">
          Mais avant de l'ouvrir — lisez les deux prochaines minutes.<br>
          Elles valent plus que le guide lui-même.
        </p>

      </td>
    </tr>

    <!-- Ligne déco séparatrice -->
    <tr>
      <td style="background:linear-gradient(90deg,#0D1B2A 0%,#2563EB 40%,#F59E0B 70%,#0D1B2A 100%);
        height:3px;"></td>
    </tr>

    <!-- ── CORPS PRINCIPAL ─────────────────────────────────────────── -->
    <tr>
      <td style="background-color:#FFFFFF;padding:40px 40px 32px;">

        <!-- Salutation -->
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:16px;
          line-height:1.7;color:#374151;margin-bottom:24px;">
          Bonjour,
        </p>

        <!-- Corps — paragraphe 1 -->
        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:16px;
          line-height:1.7;color:#374151;margin-bottom:20px;">
          La plupart des gens vont télécharger ce PDF, le parcourir rapidement,
          et ne jamais vraiment l'utiliser.
        </p>

        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:16px;
          line-height:1.7;color:#374151;margin-bottom:20px;">
          Pas parce qu'ils manquent de motivation. Parce qu'ils vont copier-coller
          les prompts tels quels — sans remplacer les crochets, sans adapter
          à leur activité — et obtenir des résultats décevants. Puis conclure
          que <em>"l'IA, c'est pas pour eux".</em>
        </p>

        <!-- Encadré d'instruction -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
          <tr>
            <td style="background-color:#EFF6FF;border-left:4px solid #2563EB;
              border-radius:0 8px 8px 0;padding:20px 24px;">
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                font-weight:700;color:#1E40AF;margin-bottom:8px;">
                Ce guide fonctionne si vous faites une chose :
              </p>
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                line-height:1.6;color:#374151;margin:0;">
                Prenez le Prompt correspondant à votre métier, remplacez chaque
                <strong style="font-family:'DM Mono',monospace;background:#DBEAFE;
                padding:1px 5px;border-radius:3px;font-size:13px;">[élément entre crochets]</strong>
                par vos vraies informations, et testez-le maintenant dans ChatGPT ou Claude.
                <strong>Pas demain. Maintenant. Cinq minutes.</strong>
              </p>
            </td>
          </tr>
        </table>

        <!-- Notice pièce jointe -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
          <tr>
            <td style="background-color:#0D1B2A;border-radius:10px;padding:22px 28px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:36px;vertical-align:middle;font-size:24px;">📎</td>
                  <td style="vertical-align:middle;padding-left:12px;">
                    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                      font-weight:700;color:#FFFFFF;margin-bottom:3px;">
                      10 Prompts Essentiels par Métier
                    </p>
                    <p style="font-family:'DM Mono',monospace;font-size:11px;
                      color:#64748B;margin:0;">
                      Pièce jointe · PDF · Guide gratuit Master Prompt
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Séparateur -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
          <tr>
            <td style="border-top:1px solid #E5E7EB;"></td>
          </tr>
        </table>

        <!-- ── BLOC ANNONCE FORMATION ──────────────────────────────── -->

        <!-- Tag annonce -->
        <div style="display:inline-block;background-color:#FEF3C7;
          border:1px solid #F59E0B;border-radius:20px;
          padding:4px 14px;margin-bottom:20px;">
          <span style="font-family:'DM Mono',monospace;font-size:11px;
            color:#92400E;letter-spacing:1px;font-weight:500;">
            🚀 ANNONCE — LANCEMENT IMMINENT
          </span>
        </div>

        <h2 style="font-family:'DM Sans',Arial,sans-serif;font-size:26px;
          font-weight:700;line-height:1.25;color:#0D1B2A;margin-bottom:16px;">
          Ce guide, c'est la méthode PACO<br>en version condensée.
        </h2>

        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:16px;
          line-height:1.7;color:#374151;margin-bottom:20px;">
          La formation complète arrive très prochainement. 7 modules vidéo.
          Des templates par métier. Les enchaînements IA pour automatiser
          votre travail. Et la méthode complète, de A à Z — construite
          pour les entrepreneurs, pas pour les développeurs.
        </p>

        <!-- Bénéfices -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
          <tr>
            <td style="padding:4px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <span style="font-size:16px;">✓</span>
                  </td>
                  <td>
                    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                      line-height:1.6;color:#374151;">
                      <strong>7 modules progressifs</strong> — des bases à l'automatisation
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <span style="font-size:16px;">✓</span>
                  </td>
                  <td>
                    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                      line-height:1.6;color:#374151;">
                      <strong>50+ prompts</strong> par métier, utilisables immédiatement
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <span style="font-size:16px;">✓</span>
                  </td>
                  <td>
                    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                      line-height:1.6;color:#374151;">
                      <strong>Résultats dès la première semaine</strong> — formation 100% pratique
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:4px 0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:28px;vertical-align:top;padding-top:2px;">
                    <span style="font-size:16px;">✓</span>
                  </td>
                  <td>
                    <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                      line-height:1.6;color:#374151;">
                      <strong>Accès à vie</strong> — mises à jour incluses
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- ── BLOC PRIX EARLY ──────────────────────────────────────── -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:linear-gradient(135deg,#0D1B2A 0%,#1E3A5F 100%);
              border-radius:12px;padding:32px 32px 28px;
              border:1px solid #2563EB;">

              <!-- Tag urgence -->
              <div style="display:inline-block;background-color:#F59E0B;
                border-radius:4px;padding:3px 10px;margin-bottom:16px;">
                <span style="font-family:'DM Mono',monospace;font-size:10px;
                  color:#0D1B2A;font-weight:700;letter-spacing:1.2px;">
                  OFFRE EARLY — PLACES LIMITÉES
                </span>
              </div>

              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
                line-height:1.6;color:#94A3B8;margin-bottom:20px;">
                Vous faites partie des premiers inscrits.<br>
                À ce titre, vous accédez à la formation au <strong style="color:#FFFFFF;">prix de lancement</strong> — 
                réservé à ceux qui s'engagent avant l'ouverture officielle.
              </p>

              <!-- Prix -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="vertical-align:bottom;padding-right:16px;">
                    <span style="font-family:'DM Sans',Arial,sans-serif;font-size:18px;
                      color:#64748B;text-decoration:line-through;">
                      97€
                    </span>
                  </td>
                  <td style="vertical-align:bottom;">
                    <span style="font-family:'DM Sans',Arial,sans-serif;font-size:52px;
                      font-weight:700;line-height:1;color:#F59E0B;">
                      49€
                    </span>
                  </td>
                  <td style="vertical-align:bottom;padding-left:12px;padding-bottom:8px;">
                    <span style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;
                      color:#94A3B8;line-height:1.4;">
                      prix de<br>lancement
                    </span>
                  </td>
                </tr>
              </table>

              <!-- CTA principal -->
              <a href="https://masterprompt.fr"
                style="display:block;background-color:#F59E0B;
                color:#0D1B2A;font-family:'DM Sans',Arial,sans-serif;
                font-size:16px;font-weight:700;text-decoration:none;
                text-align:center;padding:16px 32px;border-radius:8px;
                letter-spacing:0.2px;margin-bottom:14px;">
                Réserver ma place au prix de lancement →
              </a>

              <!-- Garantie -->
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:12px;
                color:#64748B;text-align:center;margin:0;">
                🔒 Paiement sécurisé Stripe &nbsp;·&nbsp;
                Remboursé si déçu dans les 14 jours &nbsp;·&nbsp;
                Accès à vie
              </p>

            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- ── SIGNATURE ───────────────────────────────────────────────── -->
    <tr>
      <td style="background-color:#F8F7F4;border-top:1px solid #E5E7EB;
        padding:28px 40px 24px;">

        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
          line-height:1.7;color:#374151;margin-bottom:20px;">
          Si le résultat d'un prompt ne vous convainc pas — répondez directement
          à cet email. Je regarderai votre prompt et vous dirai ce qui coince.
        </p>

        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
          line-height:1.7;color:#374151;margin-bottom:4px;">
          À très vite,
        </p>

        <p style="font-family:'DM Sans',Arial,sans-serif;font-size:15px;
          font-weight:700;color:#0D1B2A;margin-bottom:2px;">
          Michaël Lopez
        </p>

        <p style="font-family:'DM Mono',monospace;font-size:11px;
          color:#F59E0B;letter-spacing:0.8px;margin-bottom:16px;">
          Fondateur · Master Prompt
        </p>

        <!-- Citation signature -->
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="border-left:3px solid #F59E0B;padding-left:12px;">
              <p style="font-family:'DM Sans',Arial,sans-serif;font-size:13px;
                font-style:italic;color:#6B7280;margin:0;">
                "Le problème, ce n'est pas l'IA.<br>
                C'est la façon dont on lui parle."
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- ── FOOTER ──────────────────────────────────────────────────── -->
    <tr>
      <td style="background-color:#0D1B2A;border-radius:0 0 12px 12px;
        padding:20px 40px;">
        <p style="font-family:'DM Mono',monospace;font-size:10px;
          color:#334155;text-align:center;line-height:1.8;margin:0;">
          Vous recevez cet email parce que vous avez téléchargé le guide sur masterprompt.fr<br>
          <a href="{{LIEN_DESABONNEMENT}}"
            style="color:#475569;text-decoration:underline;">
            Se désabonner
          </a>
          &nbsp;·&nbsp;
          <a href="https://masterprompt.fr"
            style="color:#475569;text-decoration:none;">
            masterprompt.fr
          </a>
        </p>
      </td>
    </tr>

  </table>
</td></tr>
</table>

</body>
</html>`;
