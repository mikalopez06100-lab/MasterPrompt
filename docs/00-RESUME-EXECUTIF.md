# Master Prompt — Résumé exécutif

## Vision produit

**Master Prompt** est un SaaS e-learning dédié au **Prompt Engineering**, avec la promesse : *« Apprenez à parler à l’IA. »*

- **Cibles :** Freelances, salariés, étudiants, entrepreneurs, grand public professionnel non technique.
- **Positionnement :** Plateforme simple, pratique et accessible pour apprendre → pratiquer → améliorer → maîtriser les prompts IA.

## Promesse & parcours

| Étape | Objectif |
|-------|----------|
| **Apprendre** | Modules vidéo, fiches, quiz |
| **Pratiquer** | Éditeur de prompts + exercices guidés |
| **Améliorer** | Scoring (clarté, structure, contraintes) + suggestions |
| **Maîtriser** | Bibliothèque personnelle, historique, badges |

## Stack technique (recommandée)

- **Frontend :** Next.js 14+ (App Router), React, TypeScript, Tailwind, shadcn/ui
- **Backend :** Next.js API Routes / Node
- **DB :** PostgreSQL + Prisma
- **Auth :** Magic link ou OAuth Google
- **Paiement :** Stripe
- **Emails :** Resend
- **Stockage :** S3 / Supabase Storage / Cloudflare R2
- **Déploiement :** Vercel (front + API) + base Postgres (Vercel Postgres / Neon / Supabase)

## Livrables de ce dossier

| Document | Contenu |
|----------|---------|
| `00-RESUME-EXECUTIF.md` | Ce résumé |
| `01-ARCHITECTURE-TECHNIQUE.md` | Structure projet, data models, API, MVP/V1/V2 |
| `02-UX-UI-DESIGN-SYSTEM.md` | Design system, wireframes textuels, microcopy |
| `03-ADMIN-ESPACE.md` | Détail espace Admin, écrans, workflows |

## Priorités

- **Simplicité & time-to-market** : MVP livrable en 8–12 semaines.
- **UX ultra intuitive** : onboarding < 2 min, feedback immédiat.
- **Produit moderne et scalable** : architecture modulaire, RBAC (User / Admin), sécurité dès la V1.
