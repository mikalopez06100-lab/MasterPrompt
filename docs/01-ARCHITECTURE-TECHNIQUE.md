# Master Prompt — Architecture technique

## 1. Structure Front / Back

- **Monorepo Next.js** : front et API dans le même projet (App Router).
- **API** : routes sous `app/api/`, handlers type Server Actions ou Route Handlers.
- **Backend métier** : services dans `lib/` ou `server/`, appelés par les routes et les Server Actions.
- **DB** : PostgreSQL via Prisma ; migrations versionnées.

```
┌─────────────────────────────────────────────────────────────┐
│  Vercel (Edge / Serverless)                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Next.js App  │  │ API Routes   │  │ Server Actions   │   │
│  │ (React/TS)   │  │ /api/*       │  │ (mutations)       │   │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘   │
│         │                 │                    │             │
│         └─────────────────┼────────────────────┘             │
│                           ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Services (lib/, server/) — Auth, Courses, Prompts…   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
         ┌──────────────────┼──────────────────┐
         ▼                  ▼                  ▼
   PostgreSQL           Stripe             Resend / R2
   (Prisma)             (payments)         (emails / files)
```

---

## 2. Organisation des dossiers

```
MasterPrompt/
├── app/
│   ├── (auth)/                    # Groupe de routes auth
│   │   ├── login/
│   │   ├── signup/
│   │   └── magic/
│   ├── (dashboard)/               # App utilisateur (protégé)
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── editor/
│   │   ├── exercises/
│   │   ├── library/
│   │   ├── progress/
│   │   └── billing/
│   ├── (marketing)/
│   │   └── page.tsx               # Landing
│   ├── admin/                     # Espace Admin (protégé role=Admin)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── users/
│   │   ├── courses/
│   │   ├── resources/
│   │   ├── exercises/
│   │   └── prompts/
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── courses/
│   │   ├── prompts/
│   │   ├── exercises/
│   │   ├── progress/
│   │   ├── billing/
│   │   └── webhooks/
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                        # shadcn
│   ├── layout/
│   ├── course/
│   ├── editor/
│   ├── library/
│   └── admin/
├── lib/
│   ├── db.ts                      # Prisma client
│   ├── auth.ts
│   ├── stripe.ts
│   ├── email.ts
│   ├── storage.ts
│   ├── prompt-scoring.ts          # Logique scoring (clarté, structure…)
│   └── validations/
├── server/                        # Services métier (optionnel)
│   ├── course-service.ts
│   ├── prompt-service.ts
│   └── progress-service.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── styles/
├── types/
├── hooks/
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 3. Modèle de données (tables & relations)

### Schéma Prisma (résumé)

```prisma
// prisma/schema.prisma

generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

enum Role { USER ADMIN }

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  role          Role      @default(USER)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  subscriptions Subscription[]
  progress      Progress[]
  quizAttempts  QuizAttempt[]
  prompts       Prompt[]
  promptScores  PromptScore[]
}

model Account { /* OAuth / magic link */ }
model Session { /* sessions */ }
model VerificationToken { /* magic link */ }

model Subscription {
  id             String   @id @default(cuid())
  userId         String   @unique
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  stripeCustomerId String?
  stripeSubscriptionId String?
  status         String   // active, canceled, past_due...
  planId         String?
  currentPeriodEnd DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model Course {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String?
  order       Int      @default(0)
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  modules     Module[]
}

model Module {
  id          String   @id @default(cuid())
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  title       String
  description String?
  order       Int      @default(0)
  createdAt   DateTime @updatedAt

  lessons     Lesson[]
}

model Lesson {
  id          String   @id @default(cuid())
  moduleId    String
  module      Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title       String
  description String?
  order       Int      @default(0)
  videoUrl    String?  // URL ou ID Vimeo/Mux
  duration    Int?     // secondes
  createdAt   DateTime @updatedAt

  resources   Resource[]
  quiz        Quiz?
}

model Resource {
  id        String   @id @default(cuid())
  lessonId  String?
  lesson    Lesson?  @relation(fields: [lessonId], references: [id], onDelete: SetNull)
  title     String
  type      String   // pdf, link, file
  url       String   // stockage S3/R2 ou lien
  order     Int      @default(0)
  createdAt DateTime @updatedAt
}

model Quiz {
  id        String   @id @default(cuid())
  lessonId  String   @unique
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  title     String
  questions Json     // [{ question, options[], correctIndex }]
  createdAt DateTime @updatedAt

  attempts  QuizAttempt[]
}

model QuizAttempt {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  quizId    String
  quiz      Quiz     @relation(fields: [quizId], references: [id], onDelete: Cascade)
  answers   Json     // [{ questionId, selectedIndex }]
  score     Int      // pourcentage
  completedAt DateTime @default(now())
}

model Exercise {
  id          String   @id @default(cuid())
  title       String
  brief       String   @db.Text
  expectedPrompt String? @db.Text  // modèle / correction
  category    String?
  order       Int      @default(0)
  published   Boolean  @default(false)
  createdAt   DateTime @updatedAt
}

model Prompt {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String?
  content     String   @db.Text
  exerciseId  String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  versions    PromptVersion[]
  scores      PromptScore[]
  tags        PromptTag[]
}

model PromptVersion {
  id        String   @id @default(cuid())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
  content   String   @db.Text
  createdAt DateTime @default(now())
}

model PromptScore {
  id        String   @id @default(cuid())
  promptId  String
  prompt    Prompt   @relation(fields: [promptId], references: [id], onDelete: Cascade)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  clarity   Int      // 0-100
  structure Int
  constraints Int
  feedback  String?  @db.Text
  suggestions Json?  // [{ text, type }]
  createdAt DateTime @default(now())
}

model Tag {
  id    String @id @default(cuid())
  name  String @unique
  slug  String @unique
  prompts PromptTag[]
}

model PromptTag {
  promptId String
  prompt   Prompt @relation(fields: [promptId], references: [id], onDelete: Cascade)
  tagId    String
  tag      Tag    @relation(fields: [tagId], references: [id], onDelete: Cascade)
  @@id([promptId, tagId])
}

model Progress {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lessonId   String?
  completed  Boolean  @default(false)
  completedAt DateTime?
  createdAt  DateTime @updatedAt
}
```

*(Adapter selon besoin : table `PromptTag` en many-to-many, ou tags en JSON sur `Prompt` pour MVP.)*

---

## 4. API Endpoints (principaux)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| **Auth** | | |
| POST | `/api/auth/magic` | Envoi magic link |
| GET  | `/api/auth/callback` | Callback OAuth / magic |
| POST | `/api/auth/logout` | Déconnexion |
| **Users** | | |
| GET  | `/api/users/me` | Profil courant |
| PATCH| `/api/users/me` | Mise à jour profil |
| **Courses** | | |
| GET  | `/api/courses` | Liste cours (public ou selon abo) |
| GET  | `/api/courses/[slug]` | Détail cours + modules/lessons |
| GET  | `/api/lessons/[id]` | Détail leçon + ressources |
| **Progress** | | |
| GET  | `/api/progress` | Progression utilisateur |
| POST | `/api/progress` | Marquer leçon complétée |
| **Quizzes** | | |
| GET  | `/api/quizzes/[id]` | Quiz d’une leçon |
| POST | `/api/quizzes/[id]/attempt` | Soumettre tentative |
| **Prompts** | | |
| POST | `/api/prompts/analyze` | Analyser un prompt (scoring + suggestions) |
| GET  | `/api/prompts` | Liste prompts utilisateur (bibliothèque) |
| POST | `/api/prompts` | Créer prompt (sauvegarde) |
| GET  | `/api/prompts/[id]` | Détail + versions |
| PATCH| `/api/prompts/[id]` | Modifier |
| DELETE| `/api/prompts/[id]` | Supprimer |
| **Exercises** | | |
| GET  | `/api/exercices` | Liste exercices |
| GET  | `/api/exercices/[id]` | Détail brief + correction (après soumission) |
| **Billing** | | |
| POST | `/api/billing/checkout` | Créer session Stripe Checkout |
| POST | `/api/billing/portal` | Customer portal Stripe |
| POST | `/api/webhooks/stripe` | Webhook Stripe (abonnement, paiement) |

---

## 5. MVP / V1 / V2

### MVP (livrable prioritaire)

- Landing + signup/login (magic link ou Google).
- 1 parcours formation : 1 cours, 2–3 modules, leçons avec vidéo + PDF.
- Éditeur de prompt : champ, bouton « Analyser », score (clarté/structure/contraintes), feedback texte, sauvegarde.
- Bibliothèque : liste des prompts sauvegardés, filtre par tag basique.
- Progression : marquer une leçon comme complétée, affichage dans le dashboard.
- Billing : un plan Stripe (mensuel), page billing simple.
- Admin : dashboard contenu, CRUD cours/modules/leçons, upload PDF, gestion prompts modèles.

### V1 (post-MVP)

- Quiz par leçon + enregistrement des tentatives.
- Exercices avec brief + correction/modèle attendu.
- Historique des versions par prompt.
- Tags/catégories complets + recherche en bibliothèque.
- Emails transactionnels (Resend) : bienvenue, rappels, reçu.
- Gestion utilisateurs côté Admin (liste, désactivation).

### V2

- Badges / gamification.
- Certificat de fin de parcours.
- Plusieurs plans (mensuel / annuel, pro / team).
- Intégration LLM réelle pour suggestions d’amélioration (OpenAI/Anthropic).
- Export PDF de la bibliothèque de prompts.

---

## 6. RBAC & Sécurité

- **Rôles :** `USER`, `ADMIN`. Champ `User.role`.
- **Protection routes :**
  - Routes `/dashboard/*`, `/courses/*`, `/editor/*`, etc. : utilisateur authentifié.
  - Routes `/admin/*` : `role === ADMIN` (middleware ou layout).
- **RGPD :** minimisation des données, politique de confidentialité, export/suppression compte (endpoints dédiés).
- **Uploads :** validation type/taille, stockage hors public (signed URLs pour lecture).
- **Rate limiting :** sur `/api/prompts/analyze` et `/api/auth/magic` (ex. Upstash Redis ou Vercel KV).
