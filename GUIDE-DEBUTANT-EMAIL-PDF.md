# Guide débutant : finaliser l’envoi d’email avec le PDF

Ce que l’assistant a déjà fait pour toi :
- Création du dossier `public/pdfs`
- Copie du PDF depuis ton Bureau vers `public/pdfs/master-prompt-10-prompts-essentiels.pdf`
- Upload du PDF sur Supabase Storage (bucket `assets`)
- Mise à jour de `.env.local` avec l’URL du PDF (`LEAD_MAGNET_PDF_URL`)
- Adresse d’envoi par défaut : `info@masterprompt.fr` (déjà dans le code et dans `FROM_EMAIL`)

---

## Ce que tu dois faire toi-même (étape par étape)

### 1. Obtenir une clé API Resend (pour envoyer les emails)

**Pourquoi :** Sans cette clé, le site ne peut pas envoyer d’email avec le PDF. Resend est le service qui envoie les mails à ta place.

**Comment :**

1. Va sur **https://resend.com** et crée un compte (gratuit).
2. Une fois connecté, va dans **API Keys** (menu ou **https://resend.com/api-keys**).
3. Clique sur **Create API Key**.
4. Donne un nom (ex. « Master Prompt ») et crée la clé.
5. **Copie la clé tout de suite** (elle commence souvent par `re_...`) : elle ne sera plus affichée ensuite.
6. Ouvre ton fichier **`.env.local`** à la racine du projet (dans Cursor ou Bloc-notes).
7. Trouve la ligne :  
   `RESEND_API_KEY=""`
8. Colle ta clé entre les guillemets :  
   `RESEND_API_KEY="re_xxxxxxxxxxxx"`
9. Enregistre le fichier.

Tu peux tester en local : lance le site (`npm run dev`), va sur la landing, saisis ton email dans un formulaire « Obtenir le guide gratuit » : tu devrais recevoir l’email avec le PDF (vérifie les spams si besoin).

---

### 2. Vérifier / ajouter ton domaine d’envoi dans Resend (info@masterprompt.fr)

**Pourquoi :** Par défaut, Resend n’autorise l’envoi qu’à partir de leurs adresses de test. Pour envoyer depuis **info@masterprompt.fr**, il faut « vérifier » ton domaine chez Resend (ajout de petits enregistrements DNS).

**Correspondance des types Resend → IONOS :** Sur Resend, DKIM et SPF sont affichés comme type « SMS » : en DNS ce sont des **TXT**. Sur IONOS, choisis donc **TXT** pour ces deux lignes. Seul l’enregistrement « Activer l’envoi » de type **MX** reste en **MX**.

| Resend (section / type affiché) | IONOS : TYPE | IONOS : NOM D'HÔTE | IONOS : VALEUR |
|---------------------------------|---------------|-------------------|----------------|
| Vérification de domaine — DKIM (« SMS ») | **TXT** | `resend._domainkey` | Contenu Resend (clé longue qui commence par `p=MIGf...`) |
| Activer l'envoi — MX | **MX** | `send` | Contenu Resend (ex. `feedback-smtp.xxx.amazonses.com`), Priorité **10** |
| Activer l'envoi — SPF (« SMS ») | **TXT** | `send` | Contenu Resend (ex. `v=spf1 include:... ~all`) |

**Sur IONOS :** Si tu as déjà une ligne **MX** avec NOM = `send` qui pointe vers `masterprompt.fr`, **modifie-la** (icône crayon) : remplace la VALEUR par celle indiquée par Resend pour l’MX (ex. `feedback-smtp.xxx.amazonses.com`) et Priorité **10**. Ensuite ajoute les 2 enregistrements **TXT** (DKIM et SPF) avec **Ajouter un enregistrement** → Type **TXT**, NOM et VALEUR comme dans le tableau ci-dessus.

**Comment :**

1. Dans Resend, va dans **Domains** (menu ou **https://resend.com/domains**).
2. Clique sur **Add Domain**.
3. Saisis **masterprompt.fr** (sans « www ») et valide.
4. Resend va te montrer **2 ou 3 enregistrements DNS** à créer chez ton hébergeur de domaine (là où tu as acheté masterprompt.fr : OVH, Gandi, IONOS, etc.).
   - Souvent : un enregistrement **MX**, un **TXT** (SPF), un **TXT** (DKIM).
   - Note bien les **valeurs exactes** (copier-coller pour éviter les erreurs).
5. Ouvre le **tableau de bord de ton hébergeur de domaine** (là où tu gères masterprompt.fr).
6. Trouve la section **DNS** / **Enregistrements DNS** / **Gestion du domaine**.
7. **Ajoute** chaque enregistrement indiqué par Resend (type + nom/host + valeur).
8. Sauvegarde et attends **quelques minutes à 24 h** (souvent 5–15 min).
9. Reviens sur Resend, dans **Domains**, et clique sur **Verify** à côté de masterprompt.fr. Quand c’est vert / « Verified », tu peux envoyer depuis **info@masterprompt.fr**.

Si tu n’ajoutes pas le domaine, Resend peut quand même envoyer en mode test, mais depuis une adresse du type `onboarding@resend.dev` ; pour que « Expéditeur : info@masterprompt.fr » s’affiche vraiment, il faut faire cette vérification.

**En un mot :** Sur Resend c’est écrit « SMS », sur IONOS tu choisis **TXT**. Le seul type **MX** reste **MX**.

---

### 3. Ajouter les variables sur Vercel (pour que le site en production envoie aussi les emails)

**Pourquoi :** En local, ton `.env.local` suffit. Sur Vercel (site en ligne), il faut redonner les mêmes infos dans les « Environment Variables » du projet.

**Comment :**

1. Va sur **https://vercel.com**, connecte-toi, ouvre ton projet **Master Prompt**.
2. Va dans **Settings** → **Environment Variables**.
3. Ajoute ou modifie ces variables (comme dans ton `.env.local`) :

   - **RESEND_API_KEY**  
     - Value : colle ta clé Resend (celle que tu as mise dans `.env.local`).  
     - Coche **Secret** (ou équivalent) pour la masquer.
   - **FROM_EMAIL**  
     - Value : `Master Prompt <info@masterprompt.fr>`
   - **LEAD_MAGNET_PDF_URL**  
     - Value :  
       `https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/pdfs/master-prompt-10-prompts-essentiels.pdf`

4. Choisis **Production** (et **Preview** si tu veux que les préviews de déploiement envoient aussi les mails).
5. Clique sur **Save**.
6. **Redéploie** le projet : onglet **Deployments** → menu (⋯) sur le dernier déploiement → **Redeploy**.

Après ça, quand quelqu’un s’inscrit sur ton site en ligne (masterprompt.fr ou xxx.vercel.app), il recevra bien l’email avec le PDF, envoyé depuis **info@masterprompt.fr** (une fois le domaine vérifié chez Resend).

---

## Récap de ce que tu dois faire

| # | Où | Action |
|---|----|--------|
| 1 | Resend + `.env.local` | Créer un compte Resend, créer une API Key, la coller dans `RESEND_API_KEY` dans `.env.local`. |
| 2 | Resend + hébergeur DNS | Ajouter le domaine **masterprompt.fr** dans Resend, puis créer les enregistrements DNS demandés chez ton hébergeur et vérifier le domaine. |
| 3 | Vercel | Dans **Settings → Environment Variables**, ajouter `RESEND_API_KEY`, `FROM_EMAIL`, `LEAD_MAGNET_PDF_URL`, puis redéployer. |

Si tu bloques sur une étape (par exemple « je ne trouve pas où ajouter les DNS »), dis-moi chez quel hébergeur tu as acheté le domaine (OVH, Gandi, IONOS, etc.) et je peux te guider avec les bons noms de menus.

---

## Diagnostic si le formulaire ne fonctionne pas

1. **Vérifier que l’API et les variables sont OK en production**  
   Ouvre dans ton navigateur : **https://masterprompt.fr/api/leads**  
   Tu dois voir un JSON du type :  
   `{"status":"ok","checks":{"resend":true,"pdfUrl":true,"fromEmail":true,"database":true}}`  
   - Si `resend` est `false` → la variable `RESEND_API_KEY` n’est pas définie ou pas prise en compte sur Vercel (vérifier **Settings → Environment Variables**, puis **Redeploy**).  
   - Si `pdfUrl` est `false` → `LEAD_MAGNET_PDF_URL` manque sur Vercel.  
   - Si `database` est `false` → la base (Supabase) est injoignable ou la table `Lead` n’existe pas : exécuter `npx prisma db push` avec la même `DATABASE_URL` que sur Vercel.

2. **Quand tu soumets le formulaire**  
   Si un message d’erreur s’affiche sous le champ (ex. « RESEND_API_KEY non configuré », « Base de données : … »), c’est le message renvoyé par l’API : corrige la cause indiquée.

3. **Vercel → Deployments → dernier déploiement → Function Logs**  
   En soumettant le formulaire, regarde les logs de la fonction `/api/leads` : tu y verras l’erreur exacte (Resend, DB, etc.) en cas d’échec.
