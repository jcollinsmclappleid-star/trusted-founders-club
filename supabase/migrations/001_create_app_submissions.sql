create extension if not exists pgcrypto;

create table if not exists public.app_submissions (
  id uuid primary key default gen_random_uuid(),
  app_name text not null,
  slug text unique,
  founder_name text not null,
  founder_email text not null,
  founder_website text,
  founder_social_url text,
  app_url text not null,
  category text not null,
  short_description text not null,
  target_customer text not null,
  problem_solved text not null,
  app_functionality text not null,
  founder_note text,
  review_attention_notes text,
  is_live boolean,
  login_required boolean,
  demo_login_details text,
  logo_url text,
  screenshot_url text,
  package text not null,
  package_price integer not null,
  payment_status text not null default 'pending',
  review_status text not null default 'draft',
  public_review_quote text,
  private_notes text,
  badge_type text,
  is_public boolean not null default false,
  is_indexable boolean not null default false,
  stripe_checkout_session_id text,
  stripe_payment_intent_id text,
  terms_accepted_at timestamptz,
  public_listing_consent_at timestamptz,
  review_id text,
  indexing_approved_at timestamptz,
  indexing_approved_by text,
  change_request_message text,
  rejection_reason text,
  refund_status text,
  external_link_rel text default 'sponsored nofollow noopener',
  logo_alt text,
  screenshot_alt text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  reviewed_at timestamptz,
  published_at timestamptz,
  constraint app_submissions_payment_status_check check (
    payment_status in ('pending', 'checkout_created', 'paid', 'failed', 'refunded')
  ),
  constraint app_submissions_review_status_check check (
    review_status in (
      'draft',
      'paid_pending_review',
      'needs_changes',
      'approved_public',
      'approved_noindex',
      'approved_indexable',
      'rejected_refunded',
      'review_added'
    )
  )
);

create index if not exists app_submissions_founder_email_idx
  on public.app_submissions (founder_email);

create index if not exists app_submissions_stripe_checkout_session_id_idx
  on public.app_submissions (stripe_checkout_session_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists app_submissions_set_updated_at on public.app_submissions;

create trigger app_submissions_set_updated_at
before update on public.app_submissions
for each row execute function public.set_updated_at();

alter table public.app_submissions enable row level security;
