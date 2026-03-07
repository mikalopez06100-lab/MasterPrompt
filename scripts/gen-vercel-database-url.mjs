/**
 * Génère l’URL DATABASE_URL pour Vercel (pooler Supabase, format postgres.xxx, mot de passe encodé).
 * Lit .env.local, extrait le mot de passe et le project ref, affiche l’URI à copier dans Vercel.
 *
 * Usage : node scripts/gen-vercel-database-url.mjs
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvLocal() {
  const path = join(root, ".env.local");
  if (!existsSync(path)) {
    console.error(".env.local introuvable.");
    process.exit(1);
  }
  const content = readFileSync(path, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*["']?([^"'\n]*)["']?\s*$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

function parseDatabaseUrl(url) {
  try {
    const u = new URL(url.replace(/^postgresql:/, "postgres:"));
    const password = u.password || "";
    const hostname = u.hostname || "";
    const projectRef = hostname.split(".")[1] || hostname.replace("db.", "").split(".")[0] || "";
    return { password, projectRef };
  } catch (e) {
    return { password: "", projectRef: "" };
  }
}

const env = loadEnvLocal();
const dbUrl = env.DATABASE_URL;
if (!dbUrl) {
  console.error("DATABASE_URL manquante dans .env.local");
  process.exit(1);
}

const { password, projectRef } = parseDatabaseUrl(dbUrl);
if (!password || !projectRef) {
  console.error("Impossible d’extraire le mot de passe ou le project ref depuis DATABASE_URL.");
  process.exit(1);
}

const encodedPassword = encodeURIComponent(password);
const poolerHost = "aws-1-eu-central-1.pooler.supabase.com";
const port = 6543;
const vercelUrl = `postgresql://postgres.${projectRef}:${encodedPassword}@${poolerHost}:${port}/postgres?pgbouncer=true`;

console.log("Copie cette valeur dans Vercel → Settings → Environment Variables → DATABASE_URL :\n");
console.log(vercelUrl);
console.log("\nPuis Redeploy le projet.");
