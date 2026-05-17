# Review Signal

Sprint 3A-3F builds the premium marketing site, submit form, Supabase submission storage, Stripe Checkout handoff, admin review workflow, dynamic approved profiles, a basic customer account portal, transactional email workflow and launch-hardening checks for Review Signal.

Included:

- Homepage
- Static/sample fallback Apps directory
- Dynamic approved `/apps` directory and `/apps/[slug]` profiles
- Pricing page
- Submit app form with Stripe Checkout handoff
- Supabase `app_submissions` migration
- Supabase customer ownership and listing asset migration
- Stripe success/cancel pages
- Stripe webhook route
- Protected admin review workflow
- Customer login/signup
- Customer account dashboard
- Customer-owned submissions
- Logo/screenshot uploads through Supabase Storage
- Approved profile and badge embed access
- Transactional email utility for payment, admin review, approval, change request, rejection and refund updates
- Email audit metadata and optional `email_events` log
- Guidelines, terms and privacy pages
- Metadata, `robots.txt`, and `sitemap.xml`

Not included:

- Full refund automation
- Multi-admin roles
- Customer analytics dashboards
- Voting, comments, community features, public user reviews, newsletters, social feeds or marketplace features
- Sanitized SVG uploads

Environment variables:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
RESEND_API_KEY=
FROM_EMAIL=
ADMIN_NOTIFICATION_EMAIL=
```

Manual setup:

1. Run `supabase/migrations/001_create_app_submissions.sql` against Supabase.
2. Run `supabase/migrations/002_customer_accounts_and_assets.sql` against Supabase.
3. Run `supabase/migrations/003_transactional_emails.sql` against Supabase.
4. Run `supabase/migrations/004_launch_storage_hardening.sql` against Supabase.
5. Add the environment variables above to `.env.local`.
6. Configure Supabase Auth email/password signups.
7. Configure the private `listing-assets` storage bucket and RLS policies from the migrations.
8. Configure Stripe webhook forwarding to `/api/stripe/webhook`.
9. Configure Resend with a verified sender for `FROM_EMAIL`.
10. For local Stripe webhook testing, use Stripe CLI forwarding:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Run locally:

```bash
npm run dev
```

Launch checks:

- Confirm `/`, `/pricing`, `/apps`, `/example-review`, `/guidelines`, `/terms` and `/privacy` have useful metadata and canonical URLs.
- Confirm `/submit`, `/login`, `/signup`, `/account`, `/admin`, `/submit/success` and `/submit/cancel` are noindex.
- Confirm public profile pages remain noindex unless `is_indexable = true`.
- Confirm the sitemap contains only public canonical routes and approved indexable app profiles.
- Confirm customer website links use `rel="sponsored nofollow noopener"` and `target="_blank"`.
- Confirm Resend, Stripe, Supabase and admin environment variables are set in production.
