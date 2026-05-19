drop policy if exists "Customers can read own submissions" on public.app_submissions;
drop policy if exists "Customers can update editable own submissions" on public.app_submissions;

drop policy if exists "Customers can read own listing assets" on storage.objects;
drop policy if exists "Customers can upload own listing assets" on storage.objects;
drop policy if exists "Customers can update own listing assets" on storage.objects;

drop index if exists app_submissions_user_id_idx;

alter table public.app_submissions
  drop column if exists user_id;

revoke update on public.app_submissions from authenticated;
