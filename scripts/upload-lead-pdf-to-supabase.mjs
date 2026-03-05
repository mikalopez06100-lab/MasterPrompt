/**
 * Upload du PDF lead magnet vers Supabase Storage (bucket "assets", path "pdfs/master-prompt-10-prompts-essentiels.pdf").
 * À lancer depuis la racine du projet : node scripts/upload-lead-pdf-to-supabase.mjs
 * Utilise .env.local pour NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) {
    console.error(".env.local introuvable. Configure NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^\"'\n]*)["']?\s*$/);
    if (m) process.env[m[1]] = m[2].trim();
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Manquent NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY dans .env.local");
  process.exit(1);
}

const pdfPath = join(root, "public", "pdfs", "master-prompt-10-prompts-essentiels.pdf");
if (!existsSync(pdfPath)) {
  console.error("public/pdfs/master-prompt-10-prompts-essentiels.pdf introuvable. Copie d'abord le PDF dans ce chemin.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const bucketName = "assets";
const storagePath = "pdfs/master-prompt-10-prompts-essentiels.pdf";

async function main() {
  const pdfBuffer = readFileSync(pdfPath);

  const { data: buckets } = await supabase.storage.listBuckets();
  const hasBucket = buckets?.some((b) => b.name === bucketName);
  if (!hasBucket) {
    const { error: createErr } = await supabase.storage.createBucket(bucketName, { public: true });
    if (createErr) {
      console.error("Création du bucket impossible:", createErr.message);
      process.exit(1);
    }
    console.log("Bucket '%s' créé (public).", bucketName);
  }

  const { error: uploadErr } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, pdfBuffer, { contentType: "application/pdf", upsert: true });

  if (uploadErr) {
    console.error("Upload échoué:", uploadErr.message);
    process.exit(1);
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
  console.log("PDF lead magnet uploadé avec succès.");
  console.log("URL publique:", urlData.publicUrl);
  console.log("\nÀ ajouter dans .env.local :");
  console.log("LEAD_MAGNET_PDF_URL=" + urlData.publicUrl);
}

main();

