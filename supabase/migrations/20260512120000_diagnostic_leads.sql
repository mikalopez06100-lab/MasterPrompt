-- Table des leads diagnostic (page /diagnostic)
-- Exécuter dans Supabase SQL Editor ou via CLI `supabase db push`

create table if not exists public.diagnostic_leads (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  score integer not null,
  profile text not null check (profile in ('starter', 'frustrated', 'advanced')),
  sector text,
  answers jsonb,
  source text default 'diagnostic',
  created_at timestamptz default now()
);

create unique index if not exists diagnostic_leads_email_key on public.diagnostic_leads (email);

alter table public.diagnostic_leads enable row level security;

-- Aucune policy : accès uniquement via service role (API route serveur)

comment on table public.diagnostic_leads is 'Leads quiz /diagnostic — upsert par email';
