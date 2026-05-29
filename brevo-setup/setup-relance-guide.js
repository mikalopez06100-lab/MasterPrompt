/**
 * Crée les 3 templates Brevo pour la séquence relance guide 10 prompts.
 * Prérequis : node build-relance-guide-emails.mjs
 *
 * Usage (depuis brevo-setup/) :
 *   node build-relance-guide-emails.mjs
 *   node setup-relance-guide.js
 *
 * .env : BREVO_API_KEY (brevo-setup/.env ou ../.env.local)
 * Optionnel : BREVO_RELANCE_GUIDE_LIST_ID=8
 */
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env.local") });

const fs = require("fs");
const path = require("path");

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BASE_URL = "https://api.brevo.com/v3";
const LIST_ID = Number(process.env.BREVO_RELANCE_GUIDE_LIST_ID || "8");

const headers = {
  "api-key": BREVO_API_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
};

async function brevo(method, endpoint, body = null) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
}

const TEMPLATES = [
  {
    file: "E1-relance-guide-J0.html",
    name: "[RELANCE-GUIDE] E1 — Relance J0",
    subject: "Vous aviez téléchargé le guide — voici la suite",
    previewText: "Un diagnostic personnalisé, et une fenêtre qui ferme le 30 juin.",
  },
  {
    file: "E2-relance-non-cliqueurs-J3.html",
    name: "[RELANCE-GUIDE] E2 — Non cliqueurs J+3",
    subject: "Vous n'avez pas eu le temps ?",
    previewText: "Le diagnostic IA ne prend littéralement qu'une minute trente.",
  },
  {
    file: "E3-push-formation-J5.html",
    name: "[RELANCE-GUIDE] E3 — Formation J+5",
    subject: "Vous avez identifié les leviers. Reste à les activer.",
    previewText: "Formation Master Prompt — 49 € verrouillé à vie jusqu'au 30 juin.",
  },
];

async function createTemplates() {
  const results = [];
  const emailsDir = path.join(__dirname, "emails", "relance-guide");

  for (const tpl of TEMPLATES) {
    const htmlPath = path.join(emailsDir, tpl.file);
    if (!fs.existsSync(htmlPath)) {
      console.log(`  ⚠️  Manquant : ${tpl.file} — lancez node build-relance-guide-emails.mjs`);
      continue;
    }
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");

    const result = await brevo("POST", "/smtp/templates", {
      templateName: tpl.name,
      subject: tpl.subject,
      htmlContent,
      sender: {
        name: "Michaël Lopez — Master Prompt",
        email: "hello@masterprompt.fr",
      },
      isActive: true,
      previewText: tpl.previewText,
    });
    console.log(`  ✅ Template ID ${result.id} : ${tpl.name}`);
    results.push({ ...tpl, id: result.id });
  }
  return results;
}

function printWorkflow(templateResults) {
  console.log("\n" + "═".repeat(62));
  console.log("WORKFLOW BREVO — Séquence relance guide (3 emails)");
  console.log("═".repeat(62));
  console.log(`\n📁 Liste cible : ID ${LIST_ID} — « Leads — Guide 10 prompts (import) »`);
  console.log("\n📧 Template IDs (à utiliser dans l'automation) :");
  for (const t of templateResults) {
    console.log(`  ${t.file.padEnd(36)} → ${t.id}`);
  }

  console.log(`
─── Créer l'automation (interface Brevo) ───

1. Marketing → Automatisations → Créer une automation
2. Déclencheur : « Le contact est ajouté à une liste »
   → Liste : ID ${LIST_ID} (Leads — Guide 10 prompts)
3. Étapes :

   [Email 1] Template ID E1 — délai 0 jour (immédiat)
        ↓
   [Attendre] 3 jours
        ↓
   [Condition] « N'a pas cliqué » sur le lien de l'email 1
        → OUI → [Email 2] Template ID E2
        → NON → fin de branche (ou passer direct à J+5 si vous préférez)
        ↓
   [Attendre] jusqu'à J+5 depuis le début (ajuster : +2 j après E2 ou +5 j depuis entrée)
        ↓
   [Email 3] Template ID E3 — push formation

Variante simple (sans branche clic) :
   J0 → Email 1 → Attendre 3 j → Email 2 → Attendre 2 j → Email 3

4. Activer l'automation après test sur votre propre email.

─── Test rapide ───
• Ajoutez votre email à la liste ${LIST_ID} ou créez une campagne test avec les 3 templates.
• Vérifiez la photo en bas du mail (signature) et l'absence de « Bonjour , » vide.

Voir aussi : brevo-setup/WORKFLOW-RELANCE-GUIDE.md
`);
}

async function main() {
  if (!BREVO_API_KEY) {
    console.error("❌ BREVO_API_KEY manquante (.env.local ou brevo-setup/.env)");
    process.exit(1);
  }

  console.log("🚀 Setup séquence relance guide → Brevo\n");
  const templateResults = await createTemplates();
  printWorkflow(templateResults);
}

main().catch((e) => {
  console.error("❌", e.message);
  process.exit(1);
});
