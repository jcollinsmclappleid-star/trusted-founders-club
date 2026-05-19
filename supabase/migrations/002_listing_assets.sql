alter table public.app_submissions
  add column if not exists logo_storage_path text,
  add column if not exists screenshot_storage_path text,
  add column if not exists additional_screenshot_paths text[],
  add column if not exists asset_upload_status text,
  add column if not exists customer_updated_at timestamptz;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listing-assets',
  'listing-assets',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
