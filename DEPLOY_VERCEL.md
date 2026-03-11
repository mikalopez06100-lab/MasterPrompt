# Déploiement sur Vercel + nom de domaine

## 1. Préparer le dépôt Git

Si ce n’est pas déjà fait :

```powershell
cd C:\Users\ppmpc\MasterPrompt
git init
git add .
git commit -m "Initial commit - Master Prompt"
```

Crée un dépôt sur **GitHub** (ou GitLab / Bitbucket), puis :

```powershell
git remote add origin https://github.com/TON-USERNAME/master-prompt.git
git branch -M main
git push -u origin main
```

---

## 2. Créer le projet sur Vercel

1. Va sur **https://vercel.com** et connecte-toi (avec GitHub si possible).
2. **Add New…** → **Project**.
3. **Import** le dépôt `master-prompt` (ou le nom de ton repo).
4. Vercel détecte Next.js : ne change rien au **Framework Preset**.
5. **Environment Variables** : ajoute **toutes** les variables ci-dessous (pour **Production**, **Preview** et **Development** si tu veux les mêmes partout).

### Variables à renseigner sur Vercel

Copie **toutes** les variables ci-dessous dans **Settings → Environment Variables** (Production + Preview si besoin). Tu peux reprendre les valeurs de ton `.env.local` en adaptant celles qui dépendent de l’environnement (URL du site, secrets).

| Nom | Exemple de valeur / description | Secret ? | Obligatoire |
|-----|----------------------------------|----------|-------------|
| `DATABASE_URL` | **Sur Vercel : URL pooler (port 6543) avec `?pgbouncer=true` à la fin.** Voir ci‑dessous. | Oui | Oui |
| `DIRECT_URL` | **Connexion directe (port 5432)** pour le schéma Prisma. Sur Vercel : même mot de passe que `DATABASE_URL`, host `db.xxx.supabase.co`, port `5432`. Ex. `postgresql://postgres:MDP@db.vgdspxhuqdfilrkhipvx.supabase.co:5432/postgres` | Oui | Oui |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://vgdspxhuqdfilrkhipvx.supabase.co` (ton projet Supabase) | Non | Oui |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé « anon » / public Supabase | Non | Oui |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé « service_role » Supabase (Settings → API) | Oui | Oui |
| `NEXTAUTH_URL` | En prod : `https://masterprompt.fr` (ou ton URL Vercel) — sans slash final | Non | Si NextAuth utilisé |
| `NEXTAUTH_SECRET` | Secret fort (ex. `openssl rand -base64 32`) | Oui | Si NextAuth utilisé |
| `NEXT_PUBLIC_APP_URL` | URL du site : `https://masterprompt.fr` ou `https://ton-projet.vercel.app` | Non | Recommandé (auth, liens) |
| `NEXT_PUBLIC_LOGO_URL` | URL du logo (ex. `https://…supabase.co/storage/v1/object/public/assets/logo.png`) | Non | Optionnel |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | URL de la vidéo hero (ex. `…/assets/videos/bienvenue.mp4`) | Non | Optionnel |
| `RESEND_API_KEY` | Clé API Resend (envoi email + PDF) | Oui | Oui (pour le formulaire PDF) |
| `FROM_EMAIL` | `Master Prompt <info@masterprompt.fr>` | Non | Oui (pour le formulaire PDF) |
| `LEAD_MAGNET_PDF_URL` | URL publique du PDF (ex. `https://…supabase.co/…/pdfs/master-prompt-10-prompts-essentiels.pdf`) | Non | Oui (pour le formulaire PDF) |

**Optionnel — Firebase** (uniquement si tu utilises l’API `/api/media/intro-video`) :

| Nom | Description | Secret ? |
|-----|--------------|----------|
| `FIREBASE_PROJECT_ID` | ID du projet Firebase | Non |
| `FIREBASE_CLIENT_EMAIL` | Email du compte de service Firebase | Non |
| `FIREBASE_PRIVATE_KEY` | Clé privée du compte de service (guillemets, `\n` pour les retours à la ligne) | Oui |
| `FIREBASE_STORAGE_BUCKET` | Nom du bucket Storage (ex. `ton-projet.appspot.com`) | Non |
| `FIREBASE_INTRO_VIDEO_PATH` | Chemin du fichier (ex. `videos/master-prompt-intro.mp4`) | Non |

Tu peux copier/coller depuis ton `.env.local`, puis **modifier** `NEXTAUTH_URL` et `NEXT_PUBLIC_APP_URL` pour mettre l’URL de production (ex. `https://masterprompt.fr`) une fois le domaine en place (voir étape 4).

**Important — `DATABASE_URL` sur Vercel (éviter « Can't reach database server »)**  
La connexion directe (port **5432**) échoue souvent depuis Vercel. Utilise le **pooler** (port **6543**).

**Option A — Modification rapide (souvent suffisante)**  
Tu as déjà une `DATABASE_URL` du type :  
`postgresql://postgres:XXX@db.vgdspxhuqdfilrkhipvx.supabase.co:5432/postgres`  
→ Sur Vercel, modifie cette variable et **remplace uniquement** `:5432` par **`:6543`** (le reste reste identique).  
Exemple : `...@db.vgdspxhuqdfilrkhipvx.supabase.co:6543/postgres`  
Puis **Save** et **Redeploy**.

**Option B — Récupérer l’URL depuis le dashboard Supabase**  
1. Va sur **https://supabase.com/dashboard** et ouvre ton projet.
2. En haut à droite de la page du projet, clique sur le bouton **« Connect »** (et non pas dans Project Settings).
3. Dans la fenêtre qui s’ouvre, choisis **« Transaction »** (ou le mode qui affiche le port **6543**).
4. Copie l’**URI** affichée (elle contient `:6543`).
5. **Ajoute `?pgbouncer=true` à la fin** (ex. `.../postgres?pgbouncer=true`), puis colle dans Vercel → **Settings** → **Environment Variables** → `DATABASE_URL`.
6. Pour **`DIRECT_URL`** : dans Connect, choisis **« Session »** (port **5432**), copie l’URI et colle-la dans Vercel comme variable `DIRECT_URL`. **Save** et **Redeploy**.

Tu peux garder l’URL en 5432 dans ton `.env.local` pour le dev local.

**Si tu as « Can't reach database server » ou erreur Prisma avec le pooler :**  
1. **`?pgbouncer=true` obligatoire** : l’URL `DATABASE_URL` sur Vercel **doit se terminer par** `?pgbouncer=true`. Sans ça, Prisma ne peut pas utiliser le pooler (port 6543).  
2. **Projet en pause ?** Sur **https://supabase.com/dashboard**, ouvre ton projet. Si tu vois « Project is paused » ou « Restore project », clique pour **réactiver** le projet.  
3. **URL exacte du pooler** : Connect → mode **Transaction** → copie l’URI (ex. `aws-1-eu-central-1.pooler.supabase.com:6543`). Colle dans `DATABASE_URL` **+ `?pgbouncer=true`** à la fin.  
4. **Caractères spéciaux dans le mot de passe** : encode-les : `!` → `%21`, `@` → `%40`, `#` → `%23`.  
5. **Table Lead manquante** : exécute en local `npx prisma db push` (fichier `.env` avec `DIRECT_URL` et `DATABASE_URL` en connexion directe 5432, voir paragraphe ci‑dessous).

**Table Lead (formulaire PDF) — si l’API renvoie une erreur base de données :**  
La table **Lead** doit exister. En local : `npx prisma db push`. Ton **`.env`** doit contenir **`DIRECT_URL`** et **`DATABASE_URL`** avec la **connexion directe** (port **5432**, host `db.xxx.supabase.co`) et le **bon mot de passe**. Si le mot de passe contient `!` ou `@`, encode-le dans l’URL (`!` → `%21`). Après un `db push` réussi, redéploie sur Vercel si besoin.

**Checklist Vercel — noms des variables à créer :**  
`DATABASE_URL` · `DIRECT_URL` · `NEXT_PUBLIC_SUPABASE_URL` · `NEXT_PUBLIC_SUPABASE_ANON_KEY` · `SUPABASE_SERVICE_ROLE_KEY` · `NEXTAUTH_URL` · `NEXTAUTH_SECRET` · `NEXT_PUBLIC_APP_URL` · `NEXT_PUBLIC_LOGO_URL` · `NEXT_PUBLIC_HERO_VIDEO_URL` · `RESEND_API_KEY` · `FROM_EMAIL` · `LEAD_MAGNET_PDF_URL`

**Médias (Supabase Storage, bucket `assets`) :**
- **Logo :** placer le fichier dans `public/logo.png`, puis `node scripts/upload-logo-to-supabase.mjs`. Définir `NEXT_PUBLIC_LOGO_URL` sur Vercel (ou laisser vide pour le logo local).
- **Vidéo hero :** placer la vidéo dans `public/videos/bienvenue.mp4`, puis `node scripts/upload-hero-video-to-supabase.mjs`. Définir `NEXT_PUBLIC_HERO_VIDEO_URL` sur Vercel (ou laisser vide pour la vidéo locale).
- **PDF lead magnet :** le PDF est déjà uploadé sur Supabase ; l’URL est dans `LEAD_MAGNET_PDF_URL` (voir `.env.local`). Pour mettre à jour le PDF plus tard : placer le fichier dans `public/pdfs/master-prompt-10-prompts-essentiels.pdf`, puis `node scripts/upload-lead-pdf-to-supabase.mjs`. Pour la config email (Resend, domaine, Vercel), voir **GUIDE-DEBUTANT-EMAIL-PDF.md**.

6. Clique sur **Deploy**. Attends la fin du build.

### 2.1. Rendre le déploiement public (désactiver la connexion Vercel)

Par défaut, Vercel peut protéger certains déploiements (Vercel Authentication / Password Protection) et demander une connexion Vercel.

1. Dans ton projet Vercel : onglet **Settings**.
2. Dans le menu de gauche, ouvre **Deployment Protection** (ou **Security** → **Deployment Protection**).
3. Pour l’environnement **Production** :
   - Désactive **Vercel Authentication**.
   - Désactive **Password Protection** si elle est activée.
4. Sauvegarde.  

Ton site (URL `*.vercel.app` + domaine personnalisé) devient alors accessible **sans connexion Vercel**.  
Tu peux laisser la protection activée pour les déploiements **Preview** si tu veux que seuls toi / ton équipe y aient accès.

---

## 3. Vérifier le déploiement

- Vercel te donne une URL du type **https://master-prompt-xxx.vercel.app**.
- Ouvre-la : la landing doit s’afficher.
- Va sur **/login** et vérifie que la page fonctionne (le Magic Link enverra un lien vers cette URL tant que `NEXT_PUBLIC_APP_URL` n’est pas encore ton domaine).

---

## 4. Ajouter ton nom de domaine (et éviter l’erreur SSL « Hostname mismatch »)

1. Dans le projet Vercel : **Settings** → **Domains**.
2. Clique sur **Add** et saisis **masterprompt.fr**, puis **Add** pour **www.masterprompt.fr** aussi. Les deux doivent être listés.
3. Vercel affiche les **enregistrements DNS** à créer chez ton registrar (IONOS, OVH, Gandi, Cloudflare, etc.) :
   - Pour la racine **masterprompt.fr** : un **A** avec Nom `@` et Valeur = l’IP indiquée par Vercel (ex. **216.198.79.1** — voir la section Domains pour la valeur à jour).
   - Pour **www** : en général un **CNAME** vers `cname.vercel-dns.com`.

4. Chez ton **registrar / DNS** :
   - Crée ou corrige les enregistrements **exactement** comme indiqué par Vercel.
   - Attends la propagation (quelques minutes à 48 h).

5. Sur Vercel, clique sur **Refresh** à côté de chaque domaine. Quand le statut est **Valid**, le certificat SSL (Let’s Encrypt) est généré pour ce nom. **Sans ça, tu peux avoir « SSL certificate verify failed: Hostname mismatch ».**

6. (Recommandé) **Redirection HTTPS** : dans **Settings** → **Domains**, assure-toi que **Redirect** est activé pour forcer `https://`.

**En cas d’erreur SSL persistante**, voir **GUIDE-SSL-ET-INDEXATION.md** (section Priorité 1).

---

## 5. Après la mise en place du domaine

1. **Vercel** → **Settings** → **Environment Variables**  
   - Modifie `NEXT_PUBLIC_APP_URL` pour mettre **https://ton-domaine.com** (sans slash final).  
   - **Save** puis **Redeploy** le projet (Deployments → ⋮ → Redeploy).

2. **Supabase** → **Authentication** → **URL Configuration**  
   - **Site URL** : `https://ton-domaine.com`  
   - **Redirect URLs** : ajoute `https://ton-domaine.com/auth/callback`  
   - Enregistre.

Après ça, connexion (Magic Link / Google) et redirections fonctionneront avec ton nom de domaine.

---

## 6. SSL, indexation Google et sitemap

- **Certificat SSL invalide (Hostname mismatch)** : vérifier que **masterprompt.fr** et **www.masterprompt.fr** sont dans **Settings** → **Domains** avec statut **Valid**. Voir **GUIDE-SSL-ET-INDEXATION.md**.
- **Indexation Google** : après correction du SSL, configurer **Google Search Console**, soumettre **https://masterprompt.fr/sitemap.xml**, et demander l’indexation de la page d’accueil. Détail dans **GUIDE-SSL-ET-INDEXATION.md**.

Le projet expose déjà **/sitemap.xml** et **/robots.txt** (générés par `app/sitemap.ts` et `app/robots.ts`). Définir **NEXT_PUBLIC_APP_URL** = **https://masterprompt.fr** sur Vercel.

## 7. Récap

| Étape | Où | Action |
|-------|-----|--------|
| 1 | Git | Pousser le code sur GitHub |
| 2 | Vercel | Import du repo + variables d’env + Deploy |
| 3 | Vercel | Tester l’URL *.vercel.app |
| 4 | Vercel + DNS | Ajouter **masterprompt.fr** et **www** → statut **Valid** (évite erreur SSL) |
| 5 | Vercel + Supabase | Mettre `NEXT_PUBLIC_APP_URL` + Site URL / Redirect URLs |
| 6 | GSC + sitemap | Voir GUIDE-SSL-ET-INDEXATION.md |

Si tu me donnes ton nom de domaine (ex. masterprompt.fr ou app.masterprompt.fr), je peux adapter les exemples dans ce fichier ou dans la config (vercel.json, .env.example) pour qu’ils correspondent exactement.
