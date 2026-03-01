# Prochaines étapes — Master Prompt

## 1. Lancer l’app en local

Le script `dev` existe bien dans le projet. Il faut l’exécuter **depuis le dossier du projet** :

```powershell
cd C:\Users\ppmpc\MasterPrompt
npm run dev
```

Puis ouvre **http://localhost:3003** dans ton navigateur.

Si tu étais dans `C:\Users\ppmpc` (sans être dans `MasterPrompt`), npm ne trouvait pas le `package.json` du projet, d’où l’erreur « Missing script: dev ».

---

## 2. Logo intégré

- Le fichier **logo.png** (icône + « Master Prompt » + « Apprenez à parler à l’IA ») est dans `public/logo.png`.
- Le composant **Logo** (`components/layout/Logo.tsx`) est utilisé sur :
  - **Landing** : barre de navigation + footer
  - **Login** et **Signup**
  - **Dashboard** (sidebar)
  - **Admin** (sidebar)
- En footer (fond sombre), le logo est affiché en clair via un filtre CSS.

---

## 3. Suite du développement (ordre recommandé)

### A. Supabase + base de données

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Dans **Settings → Database**, récupérer l’**URI PostgreSQL** (connection string).
3. Créer un fichier **`.env.local`** à la racine du projet (s’il n’existe pas) et ajouter :
   ```env
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[MOT_DE_PASSE]@aws-0-[RÉGION].pooler.supabase.com:5432/postgres"
   ```
4. Toujours depuis le dossier `MasterPrompt` :
   ```powershell
   npx prisma db push
   ```
   pour créer les tables dans Supabase.

Ensuite on pourra brancher **Supabase Auth** (Magic Link + Google) et retirer NextAuth si tu veux tout faire avec Supabase.

### B. Auth (connexion)

- Configurer **Supabase Auth** (Magic Link + Google OAuth).
- Protéger les routes `/dashboard`, `/modules`, `/prompts`, `/admin` avec un middleware ou des vérifications côté serveur.
- Vérifier le rôle **ADMIN** côté serveur pour l’espace admin.

### C. Stripe (paiement)

- Créer les produits Stripe (19,90€ one-time + 4,90€/mois si besoin).
- Ajouter les clés dans `.env.local` :  
  `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, etc.
- Implémenter le **Checkout** et les **webhooks** pour activer / désactiver l’accès.

### D. Mux (vidéos)

- Créer un compte Mux, récupérer **Token ID** et **Token Secret**.
- Les ajouter dans `.env.local` et brancher le lecteur vidéo sur les URLs Mux.

### E. Contenu et polish

- **Seed** des 6 modules en base (déjà prévus dans le brief).
- États vides, squelettes de chargement, messages d’erreur.
- Tests manuels sur les parcours principaux.

---

## 4. Résumé

| À faire | Action |
|--------|--------|
| Lancer l’app | `cd C:\Users\ppmpc\MasterPrompt` puis `npm run dev` |
| Base de données | Créer projet Supabase → copier `DATABASE_URL` → `npx prisma db push` |
| Auth | Configurer Supabase Auth (Magic Link + Google) |
| Paiement | Configurer Stripe (clés + webhooks) |
| Vidéos | Configurer Mux et brancher les URLs dans les modules |

Si tu me dis par quoi tu veux commencer (Supabase, auth, ou Stripe), on peut détailler les étapes suivantes une par une.
