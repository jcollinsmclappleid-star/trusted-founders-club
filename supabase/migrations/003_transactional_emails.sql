alter table public.app_submissions
  add column if not exists last_email_type text,
  add column if not exists last_email_sent_at timestamptz,
  add column if not exists last_email_error text,
  add column if not exists approval_email_sent_at timestamptz,
  add column if not exists needs_changes_email_sent_at timestamptz,
  add column if not exists rejection_email_sent_at timestamptz,
  add column if not exists payment_received_email_sent_at timestamptz,
  add column if not exists admin_notification_sent_at timestamptz,
  add column if not exists refund_email_sent_at timestamptz;

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid references public.app_submissions(id) on delete cascade,
  email_type text not null,
  recipient text not null,
  subject text not null,
  status text not null,
  error text,
  created_at timestamptz default now()
);

create index if not exists email_events_submission_id_idx
  on public.email_events (submission_id);

create index if not exists email_events_created_at_idx
  on public.email_events (created_at desc);

alter table public.email_events enable row level security;
