/**
 * Upload logo to Supabase Storage (bucket "assets", path "logo.png").
 * Run from project root with: node scripts/upload-logo-to-supabase.mjs
 * Loads .env.local for NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
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
    console.error(".env.local not found. Create it with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
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

const logoPath = join(root, "public", "logo.png");
if (!existsSync(logoPath)) {
  console.error("public/logo.png not found. Add the logo file first.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const bucketName = "assets";

async function main() {
  const logoBuffer = readFileSync(logoPath);

  const { data: buckets } = await supabase.storage.listBuckets();
  const hasBucket = buckets?.some((b) => b.name === bucketName);
  if (!hasBucket) {
    const { error: createErr } = await supabase.storage.createBucket(bucketName, { public: true });
    if (createErr) {
      console.error("Failed to create bucket:", createErr.message);
      process.exit(1);
    }
    console.log("Bucket '%s' created (public).", bucketName);
  }

  const { error: uploadErr } = await supabase.storage
    .from(bucketName)
    .upload("logo.png", logoBuffer, { contentType: "image/png", upsert: true });

  if (uploadErr) {
    console.error("Upload failed:", uploadErr.message);
    process.exit(1);
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl("logo.png");
  console.log("Logo uploaded successfully.");
  console.log("Public URL:", urlData.publicUrl);
  console.log("\nAdd to .env.local:");
  console.log("NEXT_PUBLIC_LOGO_URL=" + urlData.publicUrl);
}

main();
