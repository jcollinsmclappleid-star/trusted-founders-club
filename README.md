# Dermot Cox Counselling

One-page preview for Dermot Cox, replacing the previous Review Signal application in this repository. The live domain stays on Squarespace until the preview is approved.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when you want to send a test enquiry.

## Enquiry delivery

The form posts to `POST /api/enquiry`. Mail is sent with Resend from the server. No API key is shipped to the browser, and submissions are not stored in a database.

Set these three variables together:

```bash
RESEND_API_KEY=
FROM_EMAIL=
CONTACT_TO=
```

`FROM_EMAIL` must be a sender Resend has already verified. Do not change the mail records for dermotcox.com just to test the preview. If any variable is missing, the form says it cannot send and offers the phone number and email address. It does not report a false success.

To test without sending mail, submit the form and expect the not-configured message. With the variables set, submit a short message and confirm it arrives at `CONTACT_TO`. Server logs record only whether the provider accepted the message, not the message text.

Validation rejects a missing name, a bad email, a malformed phone number, and a message that is too short or too long. A hidden company field is discarded. More than five posts from the same address in ten minutes are refused.

## Indexing

The preview is not indexed. Every host other than `dermotcox.com` and `www.dermotcox.com` sends `noindex, nofollow, noarchive, nosnippet, noimageindex` in the page and in the `X-Robots-Tag` header. `robots.txt` allows the crawl so Google can see that tag, and it does not publish a sitemap. Setting `NEXT_PUBLIC_SITE_URL` does not turn indexing on.

## Notes for the requirements call

See `docs/current-site-audit.md` and `CONTENT_DECISIONS.md`.
