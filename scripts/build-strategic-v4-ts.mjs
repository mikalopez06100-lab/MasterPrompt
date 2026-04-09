/**
 * Regenere lib/strategic-v4-prompts.ts depuis le PDF v4.
 * Usage: node scripts/build-strategic-v4-ts.mjs <chemin/vers/masterprompt-bibliotheque-strategique-v4.pdf>
 * Alternative: node scripts/build-strategic-v4-ts.mjs --text <fichier.txt>  (texte deja extrait)
 */
import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const out = path.join(root, "lib/strategic-v4-prompts.ts");

function stripAccents(s) {
  return s
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "Oe")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[\u2013\u2014\u2011]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function categoryForNum(n) {
  if (n <= 10) return "architecte-interieur";
  if (n <= 20) return "plombier-independant";
  if (n <= 30) return "entrepreneur-independant";
  if (n <= 40) return "jardinier-independant";
  if (n <= 50) return "artiste-sculpteur";
  if (n <= 60) return "coiffeur-independant";
  if (n <= 70) return "traiteur-evenementiel";
  if (n <= 80) return "chef-a-domicile";
  if (n <= 90) return "coach-sportif-independant";
  if (n <= 100) return "agence-immobiliere";
  if (n <= 110) return "journaliste-independant";
  if (n <= 120) return "courtier-credit";
  if (n <= 130) return "marchand-de-biens";
  if (n <= 140) return "conciergerie-lcd";
  if (n <= 150) return "maitre-oeuvre-btp";
  throw new Error("Invalid num " + n);
}

function isNoise(line) {
  const t = line.trim();
  if (!t) return true;
  if (/^MASTER PROMPT/.test(t)) return true;
  if (/masterprompt\.fr/i.test(t)) return true;
  if (/^Page\s+\d+$/i.test(t)) return true;
  if (/^Bibliothèque Stratégique/i.test(t)) return true;
  if (/^Version\s+4\.0/i.test(t)) return true;
  if (/^\d+\s+métiers/i.test(t)) return true;
  if (/^n\s+[A-ZÀÉÈÊËÏÎÔÙÛÇ].{8,}/.test(t) && !/^\d{3}\s/.test(t)) return true;
  if (/^"n\s/.test(t)) return true;
  if (/^nn+\s/.test(t)) return true;
  return false;
}

function parseExtractedText(raw) {
  const lines = raw.split(/\r?\n/);
  const promptStart = /^(\d{3})\s{2}(.+)$/;
  const prompts = [];

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(promptStart);
    if (!m) continue;
    const numStr = m[1];
    const n = parseInt(numStr, 10);
    const title = stripAccents(m[2]);
    const contentParts = [];
    i++;
    while (i < lines.length) {
      const line = lines[i];
      if (promptStart.test(line)) {
        i--;
        break;
      }
      if (!isNoise(line)) {
        contentParts.push(line.trim());
      }
      i++;
    }
    const content = stripAccents(contentParts.join(" "));
    if (!content.startsWith("Tu es ")) {
      console.warn("Odd content start for", numStr, content.slice(0, 80));
    }
    prompts.push({
      id: `s4-${numStr}`,
      category: categoryForNum(n),
      title,
      content,
    });
  }

  prompts.sort((a, b) => a.id.localeCompare(b.id));
  return prompts;
}

function writeTs(prompts) {
  if (prompts.length !== 150) {
    console.error("Expected 150 prompts, got", prompts.length);
    process.exit(1);
  }
  const body = prompts
    .map(
      (p) =>
        `  { id: ${JSON.stringify(p.id)}, category: ${JSON.stringify(p.category)}, title: ${JSON.stringify(p.title)}, content: ${JSON.stringify(p.content)} }`
    )
    .join(",\n");
  const file = `export const STRATEGIC_V4_PROMPTS = [\n${body},\n];\n`;
  fs.writeFileSync(out, file, "utf8");
  console.log("Wrote", out, prompts.length, "prompts");
}

async function main() {
  const argv = process.argv.slice(2);
  let raw;

  if (argv[0] === "--text" && argv[1]) {
    const p = path.resolve(argv[1]);
    if (!fs.existsSync(p)) {
      console.error("Fichier introuvable:", p);
      process.exit(1);
    }
    raw = fs.readFileSync(p, "utf8");
  } else if (argv[0]) {
    const pdfPath = path.resolve(argv[0]);
    if (!fs.existsSync(pdfPath)) {
      console.error("PDF introuvable:", pdfPath);
      process.exit(1);
    }
    const pdfParse = require("pdf-parse");
    const buf = fs.readFileSync(pdfPath);
    const data = await pdfParse(buf);
    raw = data.text;
  } else {
    console.error(
      "Usage: node scripts/build-strategic-v4-ts.mjs <fichier.pdf>\n   ou: node scripts/build-strategic-v4-ts.mjs --text <extrait.txt>"
    );
    process.exit(1);
  }

  const prompts = parseExtractedText(raw);
  writeTs(prompts);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
