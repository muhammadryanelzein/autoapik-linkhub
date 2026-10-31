-- Jalankan di Supabase > SQL Editor
create table if not exists chat_sessions (
  id uuid primary key,
  created_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id bigserial primary key,
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_idx on chat_messages(session_id, created_at);

-- RLS aktif tanpa policy: hanya backend (service role) yang bisa baca/tulis.
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
