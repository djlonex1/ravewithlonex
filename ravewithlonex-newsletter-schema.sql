alter table public.join_requests
add column if not exists subscribed boolean not null default true;

alter table public.join_requests
add column if not exists unsubscribe_token uuid default gen_random_uuid();

update public.join_requests
set unsubscribe_token = gen_random_uuid()
where unsubscribe_token is null;

alter table public.join_requests
alter column unsubscribe_token set not null;

create unique index if not exists join_requests_unsubscribe_token_idx
on public.join_requests(unsubscribe_token);


create table if not exists public.broadcasts (
  id uuid primary key default gen_random_uuid(),

  subject text not null,

  message text not null,

  button_text text,

  button_url text,

  status text not null default 'draft'
    check (
      status in (
        'draft',
        'sending',
        'sent',
        'failed'
      )
    ),

  recipient_count integer not null default 0,

  sent_count integer not null default 0,

  failed_count integer not null default 0,

  created_at timestamptz not null default now(),

  sent_at timestamptz
);


alter table public.broadcasts
enable row level security;

revoke all
on public.broadcasts
from anon, authenticated;


select
  'Ravewithlonex newsletter database ready' as result;
