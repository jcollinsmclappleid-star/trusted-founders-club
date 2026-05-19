# Review Signal

Sprint 3A-3F builds the premium marketing site, application form with profile asset uploads, Supabase submission storage, Stripe Checkout handoff, admin review workflow, dynamic approved profiles, transactional email workflow and launch-hardening checks for Review Signal.

Included:

- Homepage
- Static/sample fallback Apps directory
- Dynamic approved `/apps` directory and `/apps/[slug]` profiles
- Pricing page
- Application form with Stripe Checkout handoff
- Supabase `app_submissions` migration
- Supabase listing asset storage migration
- Stripe success/cancel pages
- Stripe webhook route
- Protected admin review workflow
- Logo/screenshot uploads through the public application form and Supabase Storage
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
2. Run `supabase/migrations/002_listing_assets.sql` against Supabase.
3. Run `supabase/migrations/003_transactional_emails.sql` against Supabase.
4. Run `supabase/migrations/004_launch_storage_hardening.sql` against Supabase.
5. Run `supabase/migrations/005_remove_customer_auth_surface.sql` against Supabase.
6. Add the environment variables above to `.env.local` or your hosting provider.
7. Confirm the private `listing-assets` storage bucket exists.
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
- Confirm `/submit`, `/admin`, `/submit/success` and `/submit/cancel` are noindex.
- Confirm `/login`, `/signup` and `/account` do not exist in the production build.
- Confirm public profile pages remain noindex unless `is_indexable = true`.
- Confirm the sitemap contains only public canonical routes and approved indexable app profiles.
- Confirm customer website links use `rel="sponsored nofollow noopener"` and `target="_blank"`.
- Confirm Resend, Stripe, Supabase and admin environment variables are set in production.
