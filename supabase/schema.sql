-- Contact-form messages for the portfolio.
-- Run once in Supabase → SQL Editor.

create table if not exists public.messages (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 2 and 100),
  email       text not null check (char_length(email) between 5 and 200),
  subject     text not null check (char_length(subject) between 3 and 150),
  message     text not null check (char_length(message) between 20 and 5000),
  ip_hash     text,
  user_agent  text,
  is_read     boolean not null default false
);

create index if not exists messages_ip_recent on public.messages (ip_hash, created_at desc);

-- Lock the table down: with RLS on and no policies, the public (anon) key can
-- neither read nor write. Only the server-side secret key used by /api/contact can.
alter table public.messages enable row level security;
revoke all on public.messages from anon, authenticated;
