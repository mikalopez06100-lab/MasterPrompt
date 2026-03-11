/**
 * Upload les 5 vignettes (public/avatars/vignette-1.png à 5) vers Supabase Storage.
 * Bucket "assets", dossier "avatars".
 * Usage: node scripts/upload-vignettes-to-supabase.mjs
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
    console.error(".env.local not found.");
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
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const bucketName = "assets";

async function main() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const hasBucket = buckets?.some((b) => b.name === bucketName);
  if (!hasBucket) {
    await supabase.storage.createBucket(bucketName, { public: true });
    console.log("Bucket '%s' created.", bucketName);
  }

  const publicUrls = [];
  for (let i = 1; i <= 5; i++) {
    const name = `vignette-${i}.png`;
    const filePath = join(root, "public", "avatars", name);
    if (!existsSync(filePath)) {
      console.error("Missing:", filePath);
      process.exit(1);
    }
    const buffer = readFileSync(filePath);
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(`avatars/${name}`, buffer, { contentType: "image/png", upsert: true });
    if (error) {
      console.error("Upload failed for", name, error.message);
      process.exit(1);
    }
    const { data } = supabase.storage.from(bucketName).getPublicUrl(`avatars/${name}`);
    publicUrls.push(data.publicUrl);
    console.log("Uploaded", name);
  }

  console.log("\n--- URLs à utiliser pour les vignettes ---");
  console.log(publicUrls.join(","));
  console.log("\nCopie dans .env.local (optionnel):");
  console.log("NEXT_PUBLIC_SOCIAL_AVATARS=" + publicUrls.join(","));
}

main();
