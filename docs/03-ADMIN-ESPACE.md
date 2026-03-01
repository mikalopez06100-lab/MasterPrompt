# Master Prompt — Espace Admin

## 1. Principes

- **Sécurisé :** Accès réservé au rôle `ADMIN` (vérification sur layout + middleware).
- **Simple :** Formulaires clairs, actions explicites, pas de surcharge.
- **Pratique :** Drag & drop où pertinent (ordre des modules/leçons), upload direct.

---

## 2. Admin Dashboard (vue d’ensemble)

**URL :** `/admin`  
**Layout :** Sidebar admin + zone de contenu.

### Contenu de la page d’accueil Admin

```
[Sidebar Admin]
  Tableau de bord
  Formation (Cours · Modules · Leçons)
  Ressources
  Exercices
  Prompts modèles
  (Utilisateurs — V1 optionnel)
  [Retour à l’app]

[Zone principale]
  Vue globale contenus

  [Cards résumé]
  X cours · Y modules · Z leçons
  X ressources (PDF)
  X exercices
  X prompts modèles

  [Dernières modifications] Liste des derniers contenus créés/modifiés (liens directs)
  [Accès rapides] [Ajouter un cours] [Upload une ressource] [Créer un exercice]
```

---

## 3. Gestion Formation

### 3.1 Cours

- **Liste :** Tableau (titre, slug, nb modules, publié, date) + actions [Modifier] [Supprimer].
- **Création / édition :**
  - Titre (requis)
  - Slug (auto depuis titre ou éditable)
  - Description (optionnel)
  - Ordre (nombre)
  - Publié (checkbox)
  - [Enregistrer] [Annuler]

### 3.2 Modules (par cours)

- **Liste :** Dans la fiche du cours, liste des modules avec **drag & drop** pour réordonner.
- **Ligne :** Titre, nb leçons, ordre, [Modifier] [Supprimer].
- **Création / édition :**
  - Titre, description, ordre.
  - [Enregistrer]

### 3.3 Leçons (par module)

- **Liste :** Dans la fiche du module, liste des leçons avec **drag & drop** pour l’ordre.
- **Ligne :** Titre, durée, vidéo (oui/non), quiz (oui/non), [Modifier] [Supprimer].
- **Création / édition :**
  - Titre, description, ordre.
  - **Vidéo :** URL (Vimeo / Mux / lien direct) ou upload (stockage S3/R2) ; champ durée (secondes) optionnel.
  - **Quiz :** Lien « Configurer le quiz » vers la gestion des questions (voir 5).
  - [Enregistrer]

### 3.4 Ressources (PDF, fiches)

- **Gestion depuis :**
  - Une leçon : « Ressources de cette leçon » (liste + ajout).
  - Ou menu **Ressources** global : liste toutes les ressources avec filtre par leçon/cours.
- **Ajout :**
  - **Upload PDF** (drag & drop ou sélecteur) → envoi vers S3/R2, enregistrement en DB (titre, type, url).
  - Ou **Lien** : titre + URL.
  - Association à une leçon (optionnel).
  - Ordre d’affichage.
- **Formulaires clairs :** Un formulaire par ressource (titre, type, fichier ou URL, leçon, ordre).

---

## 4. Gestion Exercices

- **Liste :** Tableau (titre, catégorie, publié, ordre) + [Modifier] [Supprimer].
- **Création / édition :**
  - Titre.
  - **Brief** (texte long) : consigne pour l’utilisateur.
  - **Correction / modèle attendu** (texte long, optionnel) : pour affichage après soumission ou comparaison.
  - Catégorie (libre ou liste prédéfinie).
  - Ordre, publié (checkbox).
  - [Enregistrer]

---

## 5. Gestion Quiz (par leçon)

- **Accès :** Depuis la fiche d’une leçon, « Quiz » → créer ou modifier le quiz de cette leçon.
- **Formulaire :**
  - Titre du quiz.
  - **Questions :** Liste de blocs (ordre possible en drag & drop).
  - Pour chaque question :
    - Énoncé (texte).
    - Réponses (4 lignes par défaut) ; une seule correcte (radio).
    - [Supprimer la question]
  - [Ajouter une question] [Enregistrer]

Stockage en JSON sur le modèle `Quiz` (questions + options + index de la bonne réponse).

---

## 6. Gestion Prompts modèles

- **Objectif :** Prompts types (exemples) pour catégories (marketing, RH, productivité…).
- **Liste :** Tableau (titre ou extrait, catégorie, date) + [Modifier] [Supprimer].
- **Création / édition :**
  - Titre (court).
  - Contenu du prompt (texte long).
  - **Catégories / tags** : multi-select ou chips (ex. Marketing, RH, Productivité, Rédaction).
  - [Enregistrer]

Ces entrées peuvent alimenter des « exemples » côté app (bibliothèque de modèles ou suggestions dans l’éditeur) selon le modèle de données retenu (ex. table `PromptTemplate` ou champs dédiés).

---

## 7. Gestion utilisateurs (V1 optionnel)

- **Liste :** Tableau (email, nom, date d’inscription, rôle, abonnement) + recherche/filtre.
- **Actions :** Changer le rôle (User/Admin), désactiver un compte (flag ou suppression selon politique).
- Pas d’édition du mot de passe (magic link / OAuth).

---

## 8. Exigences Admin UX (récap)

- **Interface simple :** Une tâche principale par écran (liste puis détail/création).
- **Drag & drop :** Ordre des modules, des leçons, des questions de quiz.
- **Formulaires clairs :** Labels explicites, validation côté client + API, messages d’erreur courts.
- **Feedback :** Toasts « Enregistré », « Supprimé », « Erreur ».
- **Navigation :** Fil d’Ariane (Admin > Formation > [Cours] > [Module] > [Leçon]).
- **Sécurité :** Vérification `role === ADMIN` sur le layout `/admin` et sur chaque API d’édition (courses, lessons, resources, exercises, prompts, users).

---

## 9. Endpoints API Admin (à protéger par rôle Admin)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET/POST/PATCH/DELETE | `/api/admin/courses` | CRUD cours |
| GET/POST/PATCH/DELETE | `/api/admin/courses/[id]/modules` | CRUD modules |
| GET/POST/PATCH/DELETE | `/api/admin/modules/[id]/lessons` | CRUD leçons |
| POST | `/api/admin/upload` | Upload fichier (PDF/vidéo) → retourne URL |
| GET/POST/PATCH/DELETE | `/api/admin/resources` | CRUD ressources |
| GET/POST/PATCH/DELETE | `/api/admin/exercises` | CRUD exercices |
| GET/POST/PATCH/DELETE | `/api/admin/quizzes` | CRUD quiz (lié à une leçon) |
| GET/POST/PATCH/DELETE | `/api/admin/prompt-templates` | CRUD prompts modèles |
| GET/PATCH | `/api/admin/users` | Liste / mise à jour utilisateurs (V1) |

Tous ces endpoints doivent vérifier la session et `user.role === 'ADMIN'` avant toute modification.
