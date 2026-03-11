# Guide pas à pas : redéployer pour que l’email HTML fonctionne

Ce guide te permet de mettre en ligne les dernières modifications (template email chargé depuis un fichier) **sans te perdre**.

---

## Tu utilises GitHub (ou GitLab) avec Vercel ?

- **OUI** → suis la **Méthode 1** (la plus simple).
- **NON** ou tu ne sais pas → suis la **Méthode 2** (Vercel en ligne).

---

# Méthode 1 : Déployer avec Git (recommandé)

Vercel redéploie tout seul dès que tu **pousses** ton code sur GitHub.

### Étape 1 — Ouvre PowerShell

- Appuie sur **Windows + R**, tape `powershell`, puis **Entrée**.
- Ou : clic droit sur le menu Démarrer → **Windows PowerShell**.

### Étape 2 — Va dans ton projet

Tape exactement (puis Entrée) :

```powershell
cd C:\Users\ppmpc\MasterPrompt
```

### Étape 3 — Vérifie que Git voit les changements

Tape :

```powershell
git status
```

Tu dois voir des fichiers en rouge (modifiés) ou “Untracked”, par exemple :
- `lib/email-lead-pdf.html`
- `lib/email.ts`

### Étape 4 — Ajoute tous les fichiers modifiés

Tape :

```powershell
git add lib/email-lead-pdf.html lib/email.ts
```

(Si tu préfères tout ajouter : `git add .`)

### Étape 5 — Crée un commit

Tape :

```powershell
git commit -m "fix: email HTML charge depuis fichier"
```

Si on te demande "Who are you?", dis-le-moi et on configurera ton nom/email Git. Sinon, passe à l’étape 6.

### Étape 6 — Envoie sur GitHub (push)

Tape :

```powershell
git push
```

- Si tu as un mot de passe demandé : utilise un **Personal Access Token** GitHub (pas ton mot de passe compte). On peut le faire ensemble si besoin.
- Si `git push` réussit : **c’est fini**. Vercel va déployer automatiquement en 1 à 2 minutes.

### Étape 7 — Vérifier le déploiement

1. Va sur **https://vercel.com** et connecte-toi.
2. Clique sur ton projet **Master Prompt** (ou le nom du projet).
3. Tu dois voir un **nouveau déploiement** “Building” puis “Ready”.
4. Quand c’est **Ready**, ton site en production est à jour. Tu peux retester le formulaire email.

---

# Méthode 2 : Déployer depuis le site Vercel (sans Git)

Si tu n’utilises pas Git ou que le push ne marche pas, tu peux déclencher un **redeploy** à la main.

### Étape 1 — Sauvegarder tes fichiers

Assure-toi que dans **Cursor** (ou ton éditeur) tu as bien **sauvegardé** :
- `lib/email-lead-pdf.html`
- `lib/email.ts`

(Ctrl + S sur chaque fichier.)

### Étape 2 — Ouvre Vercel

1. Va sur **https://vercel.com**.
2. Connecte-toi à ton compte.
3. Clique sur ton projet (celui de Master Prompt).

### Étape 3 — Onglet Deployments

1. En haut, clique sur **Deployments**.
2. Tu vois la liste des déploiements. Le plus récent est en haut.

### Étape 4 — Problème : le dernier déploiement n’a pas ton nouveau code

Si tu n’as **pas** poussé ton code sur GitHub, Vercel n’a pas tes derniers fichiers. Dans ce cas tu as deux options :

**Option A — Tu as le projet relié à un dossier sur ton PC (rare)**  
- Certains projets Vercel sont “liés” à un dossier. Si c’est le cas, il peut y avoir un bouton pour “Upload” ou “Redeploy from local”.  
- Sinon, **Option B** est plus sûre.

**Option B — Remettre ton code sur GitHub puis laisser Vercel redéployer**  
- Suis la **Méthode 1** (Étapes 1 à 6) pour pousser `lib/email-lead-pdf.html` et `lib/email.ts` sur GitHub.  
- Dès que `git push` est fait, Vercel redéploie tout seul.

### Étape 5 — Forcer un redeploy (si le code est déjà sur GitHub)

Si tu as déjà fait `git push` mais que tu veux “redéployer sans changer le code” :

1. Sur la page du projet Vercel, va dans **Deployments**.
2. Clique sur les **trois petits points** (⋮) à droite du dernier déploiement.
3. Clique sur **Redeploy**.
4. Valide. Attends 1 à 2 minutes. Quand le statut est **Ready**, c’est fait.

---

# Après le déploiement : tester l’email

1. Ouvre ton site en production (ex. **https://masterprompt.fr** ou **https://ton-projet.vercel.app**).
2. Va sur la page avec le **formulaire** (inscription pour le PDF).
3. Entre une **adresse email** à laquelle tu peux recevoir (la tienne).
4. Soumets le formulaire.
5. Vérifie ta boîte mail (et les spams) : tu dois recevoir un **email avec le beau template** (bandeau bleu, titre “Vos 10 prompts sont là”, CTA 49€, etc.) et le **PDF en pièce jointe**.

Si l’email n’arrive pas ou est vide, dis-moi exactement ce que tu vois (message d’erreur sur la page ? email reçu mais vide ?) et on corrige.

---

# Résumé en 3 lignes

1. **Avec Git** : `cd C:\Users\ppmpc\MasterPrompt` → `git add .` → `git commit -m "fix email"` → `git push` → Vercel déploie seul.
2. **Sans Git** : mets ton code sur GitHub (Méthode 1), puis Vercel redéploiera au prochain push.
3. **Tester** : remplis le formulaire sur le site en prod et vérifie ta boîte mail.

Si tu bloques à une étape précise, dis-moi **le numéro de l’étape** et **le message exact** que tu vois (ou une capture), et on fait l’étape ensemble.

---

# Variables d’environnement (rappel)

**À ne pas faire :** taper `NOM_VARIABLE="valeur"` dans PowerShell comme une commande — ça ne définit pas la variable pour l’app.

**À faire :** ouvrir le fichier **`.env.local`** (ou `.env`) à la racine du projet dans Cursor, et ajouter une ligne par variable, par exemple :

```env
NEXT_PUBLIC_SOCIAL_AVATARS="https://exemple.com/photo1.jpg,https://exemple.com/photo2.jpg"
```

Sauvegarde le fichier. Au prochain démarrage du site (`npm run dev`), la variable sera prise en compte.

---

# Si `npx prisma db push` affiche « Authentication failed »

Prisma lit le fichier **`.env`** (pas `.env.local`) pour se connecter à la base.

1. Va sur **https://supabase.com/dashboard** → ton projet → **Project Settings** (icône engrenage) → **Database**.
2. Dans **Connection string**, choisis **URI** et **Session** (port 5432).
3. Copie l’URL affichée (elle contient le mot de passe).
4. Ouvre le fichier **`.env`** à la racine de `MasterPrompt` et remplace les lignes `DIRECT_URL` et `DATABASE_URL` par cette URL (chaque variable doit avoir la même valeur pour le `db push`).  
   Si le mot de passe contient `!`, `@` ou `#`, encode-les dans l’URL : `!` → `%21`, `@` → `%40`, `#` → `%23`.
5. Sauvegarde, puis relance : `npx prisma db push`.
