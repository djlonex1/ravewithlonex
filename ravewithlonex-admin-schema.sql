-- =========================================================
-- RAVEWITHLONEX ADMIN DATABASE
-- =========================================================

-- -------------------------
-- EVENTS
-- -------------------------

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),

  slug text unique not null,

  title text not null,

  starts_at timestamptz not null,

  display_date text not null default '',

  location text not null default '',

  venue text not null default '',

  time_label text not null default '',

  status text not null default 'upcoming'
    check (
      status in (
        'upcoming',
        'past',
        'sold-out',
        'cancelled'
      )
    ),

  description text not null default '',

  cover_url text,

  flyer_url text,

  ticket_url text,

  instagram_url text,

  published boolean not null default true,

  sort_order integer not null default 0,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- -------------------------
-- EVENT LINEUP
-- -------------------------

create table if not exists public.event_lineup (
  id uuid primary key default gen_random_uuid(),

  event_id uuid not null
    references public.events(id)
    on delete cascade,

  name text not null,

  role text not null,

  image_url text,

  instagram_url text,

  sort_order integer not null default 0,

  created_at timestamptz not null default now()
);


-- -------------------------
-- EVENT MEDIA / GALLERY
-- -------------------------

create table if not exists public.event_media (
  id uuid primary key default gen_random_uuid(),

  event_id uuid not null
    references public.events(id)
    on delete cascade,

  media_type text not null default 'image'
    check (
      media_type in (
        'image',
        'video'
      )
    ),

  media_url text not null,

  alt_text text,

  sort_order integer not null default 0,

  created_at timestamptz not null default now()
);


-- -------------------------
-- ANNOUNCEMENTS
-- -------------------------

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),

  active boolean not null default false,

  type text not null default 'general'
    check (
      type in (
        'tickets',
        'venue',
        'warning',
        'sold-out',
        'general'
      )
    ),

  message text not null,

  cta text,

  href text,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);


-- =========================================================
-- UPDATED_AT FUNCTION
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


drop trigger if exists events_set_updated_at
on public.events;

create trigger events_set_updated_at
before update on public.events
for each row
execute function public.set_updated_at();


drop trigger if exists announcements_set_updated_at
on public.announcements;

create trigger announcements_set_updated_at
before update on public.announcements
for each row
execute function public.set_updated_at();


-- =========================================================
-- SECURITY
-- We will access these tables through secure server code.
-- Browser users do NOT get direct write access.
-- =========================================================

alter table public.events
enable row level security;

alter table public.event_lineup
enable row level security;

alter table public.event_media
enable row level security;

alter table public.announcements
enable row level security;


revoke all
on public.events
from anon, authenticated;

revoke all
on public.event_lineup
from anon, authenticated;

revoke all
on public.event_media
from anon, authenticated;

revoke all
on public.announcements
from anon, authenticated;


-- =========================================================
-- SEED CURRENT EVENTS
-- =========================================================

insert into public.events (
  slug,
  title,
  starts_at,
  display_date,
  location,
  venue,
  time_label,
  status,
  description,
  cover_url,
  flyer_url,
  ticket_url,
  published,
  sort_order
)
values (
  'the-last-dance',
  'THE LAST DANCE',
  '2026-10-09T21:00:00+01:00',
  '09 OCT 2026',
  'EDE, OSUN STATE',
  'FLORIDA KING''S, EDE',
  '9PM — TILL DAWN',
  'upcoming',
  'One night. One crowd. One final dance. Ravewithlonex takes over Ede for an unforgettable night of music, energy and culture.',
  '/events/the-last-dance/cover.jpg',
  '/events/the-last-dance/cover.jpg',
  '',
  true,
  1
)
on conflict (slug)
do update set
  title = excluded.title,
  starts_at = excluded.starts_at,
  display_date = excluded.display_date,
  location = excluded.location,
  venue = excluded.venue,
  time_label = excluded.time_label,
  status = excluded.status,
  description = excluded.description,
  cover_url = excluded.cover_url,
  flyer_url = excluded.flyer_url,
  sort_order = excluded.sort_order;


insert into public.events (
  slug,
  title,
  starts_at,
  display_date,
  location,
  venue,
  time_label,
  status,
  description,
  cover_url,
  published,
  sort_order
)
values (
  'lost-in-the-night',
  'LOST IN THE NIGHT',
  '2026-08-15T21:00:00+01:00',
  '15 AUG 2026',
  'LAGOS',
  'LAGOS',
  '9PM — LATE',
  'past',
  'A night of music, energy and unforgettable Ravewithlonex moments.',
  '/images/lost-in-the-night.jpg',
  true,
  2
)
on conflict (slug)
do update set
  title = excluded.title,
  starts_at = excluded.starts_at,
  display_date = excluded.display_date,
  location = excluded.location,
  venue = excluded.venue,
  time_label = excluded.time_label,
  status = excluded.status,
  description = excluded.description,
  cover_url = excluded.cover_url,
  sort_order = excluded.sort_order;


insert into public.events (
  slug,
  title,
  starts_at,
  display_date,
  location,
  venue,
  time_label,
  status,
  description,
  cover_url,
  published,
  sort_order
)
values (
  'midnight-rave',
  'MIDNIGHT RAVE',
  '2026-03-12T21:00:00+01:00',
  '12 MAR 2026',
  'SURULERE, LAGOS',
  'SURULERE, LAGOS',
  '9PM — LATE',
  'past',
  'A late-night Ravewithlonex experience in Surulere, Lagos.',
  '/images/midnight-rave.jpg',
  true,
  3
)
on conflict (slug)
do update set
  title = excluded.title,
  starts_at = excluded.starts_at,
  display_date = excluded.display_date,
  location = excluded.location,
  venue = excluded.venue,
  time_label = excluded.time_label,
  status = excluded.status,
  description = excluded.description,
  cover_url = excluded.cover_url,
  sort_order = excluded.sort_order;


-- =========================================================
-- THE LAST DANCE LINEUP
-- Avoid duplicate seeded lineup members.
-- =========================================================

delete from public.event_lineup
where event_id = (
  select id
  from public.events
  where slug = 'the-last-dance'
);


insert into public.event_lineup (
  event_id,
  name,
  role,
  sort_order
)
select
  id,
  'DJ LONEX',
  'HOST / DJ',
  1
from public.events
where slug = 'the-last-dance';


insert into public.event_lineup (
  event_id,
  name,
  role,
  sort_order
)
select
  id,
  'ONLY1SKILLZ',
  'HYPEMAN',
  2
from public.events
where slug = 'the-last-dance';


-- =========================================================
-- CURRENT ANNOUNCEMENT
-- =========================================================

insert into public.announcements (
  active,
  type,
  message,
  cta,
  href
)
select
  true,
  'tickets',
  'THE LAST DANCE — TICKETS ARE NOW LIVE.',
  'GET TICKETS',
  '/events/the-last-dance'
where not exists (
  select 1
  from public.announcements
);


-- =========================================================
-- DONE
-- =========================================================

select
  'Ravewithlonex admin database ready' as result;
