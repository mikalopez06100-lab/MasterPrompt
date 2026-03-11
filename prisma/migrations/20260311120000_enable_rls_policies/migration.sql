-- Enable RLS on all public tables used by the application

ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."UserProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Quiz" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."QuizQuestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Lesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Prompt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Lead" ENABLE ROW LEVEL SECURITY;

-- Optionally force RLS (recommended in Supabase to prevent bypass)
ALTER TABLE public."User" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."Module" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."UserProgress" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."Quiz" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."QuizQuestion" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."Lesson" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."Prompt" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."Subscription" FORCE ROW LEVEL SECURITY;
ALTER TABLE public."Lead" FORCE ROW LEVEL SECURITY;

-- RLS policies

--------------------------------------------------------------------
-- User: chaque utilisateur ne voit / modifie que son propre profil
--------------------------------------------------------------------

CREATE POLICY "Users can select own profile"
ON public."User"
FOR SELECT
USING ("supabaseId" = auth.uid());

CREATE POLICY "Users can update own profile"
ON public."User"
FOR UPDATE
USING ("supabaseId" = auth.uid())
WITH CHECK ("supabaseId" = auth.uid());

--------------------------------------------------------------------
-- Module, Lesson, Quiz, QuizQuestion
-- Lecture pour tous les utilisateurs authentifiés uniquement
-- (pas d'INSERT/UPDATE/DELETE côté client)
--------------------------------------------------------------------

CREATE POLICY "Authenticated can view modules"
ON public."Module"
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can view lessons"
ON public."Lesson"
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can view quizzes"
ON public."Quiz"
FOR SELECT
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can view quiz questions"
ON public."QuizQuestion"
FOR SELECT
USING (auth.role() = 'authenticated');

--------------------------------------------------------------------
-- UserProgress: progression visible / modifiable uniquement par l'utilisateur
--------------------------------------------------------------------

CREATE POLICY "Users can select own progress"
ON public."UserProgress"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "UserProgress"."userId"
      AND u."supabaseId" = auth.uid()
  )
);

CREATE POLICY "Users can update own progress"
ON public."UserProgress"
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "UserProgress"."userId"
      AND u."supabaseId" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "UserProgress"."userId"
      AND u."supabaseId" = auth.uid()
  )
);

--------------------------------------------------------------------
-- Prompt: prompts personnels + prompts partagés (userId IS NULL)
--------------------------------------------------------------------

CREATE POLICY "Users can read own and shared prompts"
ON public."Prompt"
FOR SELECT
USING (
  "userId" IS NULL
  OR
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "Prompt"."userId"
      AND u."supabaseId" = auth.uid()
  )
);

CREATE POLICY "Users manage own prompts"
ON public."Prompt"
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "Prompt"."userId"
      AND u."supabaseId" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "Prompt"."userId"
      AND u."supabaseId" = auth.uid()
  )
);

--------------------------------------------------------------------
-- Subscription: chaque utilisateur voit uniquement son abonnement
-- (création / mise à jour gérées côté backend via clé service)
--------------------------------------------------------------------

CREATE POLICY "Users can view own subscription"
ON public."Subscription"
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public."User" u
    WHERE u.id = "Subscription"."userId"
      AND u."supabaseId" = auth.uid()
  )
);

--------------------------------------------------------------------
-- Lead: n'importe qui (anon) peut créer un lead
-- Lecture réservée au service role (pas de policy SELECT)
--------------------------------------------------------------------

CREATE POLICY "Anyone can insert leads"
ON public."Lead"
FOR INSERT
WITH CHECK (true);

