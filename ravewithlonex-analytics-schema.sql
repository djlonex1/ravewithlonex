create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,

  event_id uuid
    references public.events(id)
    on delete cascade,

  action text not null
    check (
      action in (
        'page_view',
        'ticket_click',
        'whatsapp_share',
        'calendar_add'
      )
    ),

  created_at timestamptz not null default now()
);

create index if not exists analytics_events_event_id_idx
on public.analytics_events(event_id);

create index if not exists analytics_events_action_idx
on public.analytics_events(action);

create index if not exists analytics_events_created_at_idx
on public.analytics_events(created_at desc);

alter table public.analytics_events
enable row level security;

revoke all
on public.analytics_events
from anon, authenticated;

select 'Ravewithlonex analytics ready' as result;
