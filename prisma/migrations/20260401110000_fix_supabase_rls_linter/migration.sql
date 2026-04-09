-- Fix Supabase security linter errors:
-- - policy_exists_rls_disabled
-- - rls_disabled_in_public
--
-- This migration is idempotent: it can be re-run safely.

-- 1) Ensure RLS is enabled on all exposed public tables
ALTER TABLE IF EXISTS public."User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."UserProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Quiz" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."QuizQuestion" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Lesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Prompt" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Subscription" ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public."Lead" ENABLE ROW LEVEL SECURITY;

-- 2) Ensure policies exist (safe if previous migration was not applied)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'User' AND policyname = 'Users can select own profile'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can select own profile" ON public."User" FOR SELECT USING ("supabaseId" = auth.uid())';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'User' AND policyname = 'Users can update own profile'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can update own profile" ON public."User" FOR UPDATE USING ("supabaseId" = auth.uid()) WITH CHECK ("supabaseId" = auth.uid())';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Module' AND policyname = 'Authenticated can view modules'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can view modules" ON public."Module" FOR SELECT USING (auth.role() = ''authenticated'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Lesson' AND policyname = 'Authenticated can view lessons'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can view lessons" ON public."Lesson" FOR SELECT USING (auth.role() = ''authenticated'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Quiz' AND policyname = 'Authenticated can view quizzes'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can view quizzes" ON public."Quiz" FOR SELECT USING (auth.role() = ''authenticated'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'QuizQuestion' AND policyname = 'Authenticated can view quiz questions'
  ) THEN
    EXECUTE 'CREATE POLICY "Authenticated can view quiz questions" ON public."QuizQuestion" FOR SELECT USING (auth.role() = ''authenticated'')';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'UserProgress' AND policyname = 'Users can select own progress'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can select own progress" ON public."UserProgress" FOR SELECT USING (EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "UserProgress"."userId" AND u."supabaseId" = auth.uid()))';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'UserProgress' AND policyname = 'Users can update own progress'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can update own progress" ON public."UserProgress" FOR UPDATE USING (EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "UserProgress"."userId" AND u."supabaseId" = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "UserProgress"."userId" AND u."supabaseId" = auth.uid()))';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Prompt' AND policyname = 'Users can read own and shared prompts'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can read own and shared prompts" ON public."Prompt" FOR SELECT USING ("userId" IS NULL OR EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "Prompt"."userId" AND u."supabaseId" = auth.uid()))';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Prompt' AND policyname = 'Users manage own prompts'
  ) THEN
    EXECUTE 'CREATE POLICY "Users manage own prompts" ON public."Prompt" FOR ALL USING (EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "Prompt"."userId" AND u."supabaseId" = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "Prompt"."userId" AND u."supabaseId" = auth.uid()))';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Subscription' AND policyname = 'Users can view own subscription'
  ) THEN
    EXECUTE 'CREATE POLICY "Users can view own subscription" ON public."Subscription" FOR SELECT USING (EXISTS (SELECT 1 FROM public."User" u WHERE u.id = "Subscription"."userId" AND u."supabaseId" = auth.uid()))';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'Lead' AND policyname = 'Anyone can insert leads'
  ) THEN
    EXECUTE 'CREATE POLICY "Anyone can insert leads" ON public."Lead" FOR INSERT WITH CHECK (true)';
  END IF;
END $$;
