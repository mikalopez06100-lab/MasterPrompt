/**
 * Teste la connexion au pooler Supabase avec l’URL générée (postgres.xxx, port 6543).
 * À lancer après avoir mis à jour .env.local : node scripts/test-pooler-connection.mjs
 *
 * Si ça réussit → les identifiants sont bons, le souci vient de Vercel (vérifier la valeur exacte de DATABASE_URL).
 * Si ça échoue → réinitialiser le mot de passe Supabase et mettre à jour .env.local.
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
  console.error("Impossible d'extraire mot de passe ou project ref.");
  process.exit(1);
}

const encodedPassword = encodeURIComponent(password);
const poolerHost = "aws-1-eu-central-1.pooler.supabase.com";
const poolerUrl = `postgresql://postgres.${projectRef}:${encodedPassword}@${poolerHost}:6543/postgres?pgbouncer=true`;

process.env.DATABASE_URL = poolerUrl;

async function main() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("OK — Connexion pooler réussie. Les identifiants sont valides.");
    console.log("Sur Vercel, DATABASE_URL doit être EXACTEMENT :");
    console.log(poolerUrl);
    console.log("\nSi l'erreur persiste sur Vercel : supprime la variable DATABASE_URL, recrée-la en collant la ligne ci-dessus, puis Redeploy.");
  } catch (e) {
    console.error("Échec connexion pooler:", e.message);
    console.error("\n→ Vérifie que le mot de passe Supabase a bien été réinitialisé (sans !).");
    console.error("→ Supabase → Project Settings → Database → Reset database password.");
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
