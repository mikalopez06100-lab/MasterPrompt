/**
 * Upload vidéo hero (bienvenue) vers Supabase Storage (bucket "assets", path "videos/bienvenue.mp4").
 * À lancer depuis la racine du projet : node scripts/upload-hero-video-to-supabase.mjs
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
    console.error(".env.local not found. Configure NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
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

const videoPath = join(root, "public", "videos", "bienvenue.mp4");
if (!existsSync(videoPath)) {
  console.error("public/videos/bienvenue.mp4 introuvable. Ajoutez le fichier vidéo d'abord.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const bucketName = "assets";
const storagePath = "videos/bienvenue.mp4";

async function main() {
  const videoBuffer = readFileSync(videoPath);

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
    .upload(storagePath, videoBuffer, { contentType: "video/mp4", upsert: true });

  if (uploadErr) {
    console.error("Upload échoué:", uploadErr.message);
    process.exit(1);
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(storagePath);
  console.log("Vidéo hero uploadée avec succès.");
  console.log("URL publique:", urlData.publicUrl);
  console.log("\nÀ ajouter dans .env.local :");
  console.log("NEXT_PUBLIC_HERO_VIDEO_URL=" + urlData.publicUrl);
}

main();
