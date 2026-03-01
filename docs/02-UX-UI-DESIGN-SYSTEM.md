# Master Prompt — UX/UI & Design System

## 1. Objectifs UX

- Interface **ultra simple** et intuitive.
- Expérience **fluide** et moderne.
- **Aucune intimidation technique** : vocabulaire accessible.
- **Feedback immédiat** : scores, barres de progression, messages courts.
- **Onboarding rapide** : < 2 min pour être opérationnel.

---

## 2. Style visuel & ambiance

- **Style :** Moderne SaaS, minimaliste, clair, épuré, professionnel et pédagogique.
- **Ambiance :** Intelligent, accessible, dynamique, rassurant.

---

## 3. Design System

### Palette de couleurs

| Usage | Nom | Hex | Usage UI |
|-------|-----|-----|----------|
| **Primaire** | Bleu confiance | `#2563EB` | Boutons principaux, liens, états actifs |
| **Primaire hover** | Bleu foncé | `#1D4ED8` | Hover CTA |
| **Secondaire** | Gris neutre | `#64748B` | Texte secondaire, bordures |
| **Accent** | Vert succès | `#10B981` | Scores positifs, validation, succès |
| **Accent warning** | Ambre | `#F59E0B` | Scores moyens, attention |
| **Accent erreur** | Rouge doux | `#EF4444` | Erreurs, échec |
| **Fond** | Blanc / gris très clair | `#FFFFFF` / `#F8FAFC` | Backgrounds |
| **Surface** | Gris clair | `#F1F5F9` | Cards, zones secondaires |
| **Texte** | Noir doux | `#0F172A` | Texte principal |
| **Texte secondaire** | Gris | `#64748B` | Labels, hints |

Variables CSS suggérées (Tailwind) :

```css
--color-primary: 37 99 235;      /* rgb */
--color-primary-hover: 29 78 216;
--color-accent-success: 16 185 129;
--color-accent-warning: 245 158 11;
--color-accent-error: 239 68 68;
--color-surface: 241 245 249;
--color-text: 15 23 42;
--color-text-muted: 100 116 139;
```

### Typographie

- **Titres :** Manrope ou Poppins (moderne, lisible).
- **Corps :** Inter (excellent pour UI et lecture longue).
- **Fallback :** `system-ui, sans-serif`.

| Élément | Police | Poids | Taille (mobile / desktop) |
|---------|--------|--------|----------------------------|
| H1 | Manrope | 700 | 1.75rem / 2.25rem |
| H2 | Manrope | 600 | 1.5rem / 1.875rem |
| H3 | Manrope | 600 | 1.25rem / 1.5rem |
| Body | Inter | 400 | 0.9375rem / 1rem |
| Small / labels | Inter | 400 | 0.8125rem |
| Boutons | Inter | 500 | 0.9375rem |

### Composants UI (base)

- **Boutons**
  - Primaire : fond bleu, texte blanc, radius 8px, padding confortable.
  - Secondaire : contour gris, fond transparent.
  - Ghost : pas de bordure, hover léger.
- **Cards**
  - Fond blanc ou surface, ombre légère (`shadow-sm`), radius 12px, padding 16–24px.
- **Badges**
  - Petit texte, fond pastel (vert/bleu/ambre), radius 6px.
- **Inputs**
  - Bordure gris clair, focus ring bleu, radius 8px.
- **Score indicators**
  - Barre de progression (clarté / structure / contraintes) avec couleurs : vert > ambre > rouge selon score.
- **Progress bars**
  - Barre unique (parcours ou module) avec pourcentage et optionnellement étapes.

---

## 4. Wireframes textuels (écrans principaux)

### 1) Landing page

```
[Logo] Master Prompt — Apprenez à parler à l’IA    [Connexion] [Essai gratuit]

        Apprenez à maîtriser les prompts IA
        En quelques heures, créez des prompts clairs et efficaces.

        [Commencer gratuitement]  [Voir le programme]

[Section : Pour qui ?]  Freelances · Salariés · Étudiants · Entrepreneurs
[Section : Comment ça marche ?]  Apprendre → Pratiquer → Améliorer → Maîtriser
[Section : Avis / social proof]  (optionnel MVP)
[Section : Tarifs]  Un plan simple, prix mensuel
[Footer]  CGU · Confidentialité · Contact
```

### 2) Signup / Login

```
[Logo] Master Prompt

        Connectez-vous pour continuer

        [Continuer avec Google]
        — ou —
        [Votre email]  [Envoyer le lien magique]

        Pas de mot de passe. On vous envoie un lien pour vous connecter.

        Déjà inscrit ? Le même lien fonctionne.
```

### 3) Dashboard utilisateur

```
[Sidebar]  Logo · Tableau de bord · Formation · Exercices · Bibliothèque · Progression · [Compte]

[Zone principale]
  Bonjour, [Prénom].

  [Card] Votre progression
         Module 1 : Les bases — 2/5 leçons
         [Barre de progression 40%]
         [Reprendre la formation]

  [Card] Derniers prompts
         [Liste 3 derniers avec score et date]
         [Voir la bibliothèque]

  [Card] Continuer où vous en étiez
         [Lien vers dernière leçon ou dernier exercice]
```

### 4) Vue Module de formation

```
[Fil d’Ariane] Formation > [Nom du cours] > [Nom du module]

  [Liste des leçons]
  ☑ Leçon 1 — Titre (complétée)
  ☑ Leçon 2 — Titre (complétée)
  ○ Leçon 3 — Titre (en cours)  [Ouvrir]
  ○ Leçon 4 — Titre
  ○ Leçon 5 — Titre

  [Zone contenu — leçon sélectionnée]
  Titre de la leçon
  [Vidéo] ou [Player embed]
  Description / transcript court
  [Ressources] [Télécharger le PDF]
  [Quiz] [Commencer le quiz] (si présent)
  [Marquer comme terminé]
```

### 5) Éditeur de prompt (feature centrale)

```
[Fil d’Ariane] Exercices > [Nom exercice] (ou « Nouveau prompt »)

  [Brief de l’exercice] (si en mode exercice)
  « Rédigez un prompt pour… »

  [Zone d’édition]
  [Textarea large, placeholder : « Collez ou écrivez votre prompt ici… »]
  [Analyser mon prompt]

  [Résultat analyse — après clic]
  [Card Scores]
    Clarté      [=====>    ] 72/100
    Structure   [======>   ] 80/100
    Contraintes [====>     ] 60/100
  [Feedback court] « Votre prompt est clair. Pensez à préciser le format de sortie. »
  [Suggestions] Liste à puces (2–3 suggestions max)
  [Sauvegarder dans ma bibliothèque] [Ajouter des tags]
```

### 6) Mode Exercices / entraînement

```
  Liste d’exercices (cards)
  [Filtre par catégorie]

  [Card] Exercice 1 — Rédiger un brief marketing
         Difficulté · Temps estimé 5 min
         [Commencer]

  [Card] Exercice 2 — …
  …

  [Clic « Commencer »] → Redirection vers éditeur avec brief + champs titre/tags optionnels.
```

### 7) Bibliothèque de prompts sauvegardés

```
  Ma bibliothèque de prompts

  [Recherche] [Filtre par tag ▼] [Trier par date ▼]

  [Liste / grille de cards]
  [Card] Titre ou extrait du prompt
         Tags · Score moyen · Dernière modif
         [Ouvrir] [Dupliquer] [⋯]
  …
  [État vide] « Aucun prompt sauvegardé. Utilisez l’éditeur et cliquez sur Sauvegarder. »
```

### 8) Suivi progression

```
  Ma progression

  [Résumé]
  X leçons complétées · Y % du parcours · Z prompts sauvegardés

  [Par cours / module]
  Module 1 — [Barre] 100%  [Détail]
  Module 2 — [Barre] 60%   [Détail]
  Module 3 — [Barre] 0%    [Détail]

  [Historique récent] Dernières leçons et quiz complétés
```

### 9) Billing / abonnement

```
  Abonnement

  [Plan actuel] Mensuel — X €/mois
  [Gérer mon abonnement] (lien Stripe Customer Portal)

  [Historique des factures] (liste avec lien téléchargement PDF)
```

---

## 5. Microcopy (FR)

### CTA

- **Landing :** « Commencer gratuitement », « Voir le programme », « Essai gratuit ».
- **Auth :** « Envoyer le lien magique », « Continuer avec Google ».
- **Formation :** « Reprendre la formation », « Marquer comme terminé », « Télécharger le PDF ».
- **Éditeur :** « Analyser mon prompt », « Sauvegarder dans ma bibliothèque ».
- **Exercices :** « Commencer l’exercice », « Passer au suivant ».
- **Billing :** « Choisir ce plan », « Gérer mon abonnement ».

### Onboarding (post-signup)

- « Bienvenue ! Choisissez votre premier pas : [Découvrir la formation] [Essayer l’éditeur] ».
- « Complétez votre première leçon pour débloquer votre progression. »
- « Sauvegardez votre premier prompt pour le retrouver dans votre bibliothèque. »

### États vides

- Bibliothèque : « Aucun prompt sauvegardé. Utilisez l’éditeur et cliquez sur Sauvegarder pour les retrouver ici. »
- Progression : « Vous n’avez pas encore commencé. [Lancer la formation]. »
- Recherche : « Aucun résultat pour « … ». Essayez d’autres mots ou tags. »

### Feedback scoring

- Score élevé (≥ 80) : « Très bien, votre prompt est clair et structuré. »
- Score moyen (50–79) : « Bon départ. Pensez à préciser le contexte et le format attendu. »
- Score faible (< 50) : « Vous pouvez améliorer la clarté et les contraintes. Consultez les suggestions ci-dessous. »
- Après analyse : « Analyse terminée. Consultez vos scores et les suggestions. »

---

## 6. Parcours UX (flows principaux)

### Premier contact → Inscription
1. Landing → CTA « Commencer gratuitement » ou « Essai gratuit ».
2. Choix : Email (magic link) ou Google.
3. Clic sur lien → session créée → redirection Dashboard ou onboarding court.

### Onboarding (< 2 min)
1. Message « Bienvenue » + 2 choix : [Découvrir la formation] [Essayer l’éditeur].
2. Si formation : ouverture du premier module / première leçon.
3. Si éditeur : ouverture éditeur avec placeholder + bouton « Analyser » (éventuellement avec un exemple pré-rempli).

### Parcours formation
1. Dashboard → « Reprendre » ou « Formation » → liste des cours.
2. Cours → liste des modules → liste des leçons.
3. Leçon : lecture / vidéo → (optionnel) PDF → (optionnel) Quiz → « Marquer comme terminé ».
4. Progression mise à jour → retour liste ou dashboard.

### Pratique (éditeur + exercices)
1. Dashboard ou menu → « Exercices » → choix d’un exercice (brief).
2. « Commencer » → éditeur avec brief affiché.
3. Saisie du prompt → « Analyser » → scores + feedback + suggestions.
4. « Sauvegarder » → ajout à la bibliothèque (optionnel titre/tags).
5. Bibliothèque : consultation, filtre, duplication, modification.

### Rétention / suite
- Dashboard rappelle « Reprendre la formation » et « Derniers prompts ».
- Progression visible (leçons, quiz, prompts sauvegardés).
- Billing : accès clair à l’abonnement et à la gestion (Stripe Portal).

---

## 7. Recommandations UI

- **Cohérence :** Utiliser systématiquement le design system (couleurs, espacements, radius).
- **Hiérarchie :** Un seul CTA principal par écran ; secondaires en style outline/ghost.
- **Accessibilité :** Contraste suffisant (WCAG AA), focus visible, labels sur les champs.
- **Mobile first :** Navigation repliable (hamburger), cartes empilées, boutons tactiles 44px min.
- **Performance :** Lazy load des vidéos, images en WebP, code splitting par route.
- **Éditeur :** Textarea avec hauteur min (ex. 120px), possibilité d’agrandir (resize vertical).
- **Scores :** Toujours accompagner la barre d’un court texte (feedback + suggestions) pour garder la dimension pédagogique.
