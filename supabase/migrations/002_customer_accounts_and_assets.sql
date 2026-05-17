alter table public.app_submissions
  add column if not exists user_id uuid references auth.users(id),
  add column if not exists logo_storage_path text,
  add column if not exists screenshot_storage_path text,
  add column if not exists additional_screenshot_paths text[],
  add column if not exists asset_upload_status text,
  add column if not exists customer_updated_at timestamptz;

create index if not exists app_submissions_user_id_idx
  on public.app_submissions (user_id);

drop policy if exists "Customers can read own submissions" on public.app_submissions;
create policy "Customers can read own submissions"
on public.app_submissions
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Customers can update editable own submissions" on public.app_submissions;
create policy "Customers can update editable own submissions"
on public.app_submissions
for update
to authenticated
using (
  auth.uid() = user_id
  and review_status in ('draft', 'paid_pending_review', 'needs_changes')
)
with check (
  auth.uid() = user_id
  and review_status in ('draft', 'paid_pending_review', 'needs_changes')
  and payment_status = payment_status
  and is_public = false
  and is_indexable = false
);

revoke update on public.app_submissions from authenticated;

grant update (
  app_name,
  app_url,
  category,
  short_description,
  target_customer,
  problem_solved,
  app_functionality,
  founder_note,
  review_attention_notes,
  logo_url,
  screenshot_url,
  logo_storage_path,
  screenshot_storage_path,
  additional_screenshot_paths,
  asset_upload_status,
  logo_alt,
  screenshot_alt,
  customer_updated_at,
  updated_at
) on public.app_submissions to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-assets',
  'listing-assets',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

drop policy if exists "Customers can read own listing assets" on storage.objects;
create policy "Customers can read own listing assets"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'listing-assets'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Customers can upload own listing assets" on storage.objects;
create policy "Customers can upload own listing assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'listing-assets'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Customers can update own listing assets" on storage.objects;
create policy "Customers can update own listing assets"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'listing-assets'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'listing-assets'
  and (storage.foldername(name))[1] = auth.uid()::text
);
