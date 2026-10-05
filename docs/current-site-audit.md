# Current site audit — dermotcox.com

Audited 2 October 2026 from the live Squarespace site, at a desktop render (1280×900) and a mobile render (390×844). Source of copy is the public homepage. Older sitemap captions and child-page titles are noted where they disagree.

The replacement is one scrolling page. This file is the inventory the preview was built from.

## What the live site is

Squarespace 7.0 index. Canonical URL: `https://www.dermotcox.com`. Site title: “Dermot Cox  Counselling | Buckinghamshire | Online”. Description: “Dermot Cox is a counsellor based in Buckinghamshire and offers sessions from his home and online.”

The homepage is one long page. There is no blog. Search (`/search`) returns 403 and is disallowed in `robots.txt`.

### Desktop

- A solid forest-green header sits over the page. A pixel sample from the rendered header was `rgb(81, 94, 79)` (`#515E4F`). The green wordmark in the logo file is `#4E5D4E`.
- Header contents, left to right: the light logo, then Psychotherapy, About me, Working together, Pricing, Contact. A search field and a mailto icon also sit in the header.
- The first view is the autumn woodland photograph. It does not say who Dermot is, that he works with individuals and couples, or that in-person sessions are in Little Hampden.
- A second control, the right-edge index tracker, lists Welcome, Dermot Cox Counselling, About, Working Together, Pricing, Contact. Those labels and targets are not the same as the header.
- Below the photograph the ground is warm ivory, sampled at `rgb(255, 251, 245)` (`#FFFBF5`). That ivory is also in the logo palette.

### Mobile

- The same green bar, a small logo, and a hamburger on the right.
- The menu is a Squarespace full-screen overlay, not a side drawer. Its items match the header: Psychotherapy, About me, Working together, Pricing, Contact. There is a close control.
- The woodland crop pushes the right-hand figure off the edge of a 390px screen, then leaves a large empty ivory band before the writing starts.

Screenshot notes are saved beside this file:

- [desktop.png](current-site/desktop.png)
- [mobile.png](current-site/mobile.png)

### Section order

| Order | Section id | What a visitor sees |
| --- | --- | --- |
| 1 | `#welcome` | Woodland image and a “Scroll” cue. No proposition. |
| 2 | `#dermot-cox-counselling` | H1 “Psychotherapy in Buckinghamshire and Online”, then the opening paragraphs. |
| 3 | `#about` | About me, portrait, training, university work, Cruse, the Chilterns, former marketing work, couples and sexuality writing, non-duality, qualifications, and the video. |
| 4 | `#working-together` | Face-to-face, outdoors, online, weekly rhythm, diversity, garden-room photograph. |
| 5 | `#pricing` | Fees, over the autumn-sky photograph. |
| 6 | `#contact` | Free 30-minute conversation, phone, Little Hampden, station note, form. A second H1 on the page is empty. |

### Navigation friction

Two menus point at different anchors.

Header and mobile overlay:

- `#psychotherapy` — no element with this id exists
- `#aboutme2` — an empty div at the end of About
- `#workingtogether` — an empty div at the start of Working together
- `#pricing` — the pricing section
- `#contact` — the contact section

Index tracker:

- `#welcome`
- `#dermot-cox-counselling`
- `#about`
- `#working-together`
- `#pricing`
- `#contact`

The place, the two kinds of work, and Dermot’s name in words are all below the opening photograph. The tracker is a stack of small marks. Search leads nowhere useful.

## Copy to treat as the live wording

Use the homepage, not the sitemap captions. The sitemap still describes the university post in the present tense and calls him a psychotherapist in training. The homepage is later.

Opening:

> You may need support because there are no people in your life you feel able to share deeply with. You may feel pain that won’t go away. Attempts to distract yourself may no longer be working. It may be time to look inside and try and see what’s going on….
>
> I’m someone you can talk to who will listen attentively. I’ll learn what matters to you and concerns you – without judging. I provide a space where you can discover how you really feel. We’ll look at what’s causing you difficulty or distress now. We might also explore whether that links to experiences in your earlier life. The problems we have with relationships or self-destructive behaviour often have roots in the past.

About, qualifications, working together, fees and contact are carried into the preview in his wording, split across the new sections. Fees on the page: individual £75 for 50 minutes; ‘couples’ therapy £120 for 60 minutes; in person or online. Phone `07831 572050`. Email `dermot@dermotcox.com`. Free 30-minute discussion by phone or video. Place sentence: “I live in the village of Little Hampden, close to Great Missenden in Buckinghamshire, HP16 9PS.” Station sentence: about 5 minutes by taxi from Great Missenden station, Chiltern line, about 50 minutes from Marylebone.

Unresolved facts are listed in [CONTENT_DECISIONS.md](../CONTENT_DECISIONS.md), not repeated here as new claims.

## Imagery, logo and video

Squarespace `format=2500w` did not return anything larger than these files. They are copied into `public/media/` for the preview. They are not hotlinked. Originals would still be better, especially the portrait.

| File | Role on the live site | Pixel size | Preview placement |
| --- | --- | --- | --- |
| `dermot-cox-couselling.jpg` | `#welcome` background | 1500×1000, 3:2 | Opening photograph. Keep both seated figures in frame. Focal point published as 0.5, 0.5. |
| `Dermot-Cox-Counselling.jpg` | About portrait | 500×750, 2:3 | About, shown small so the 500px file is not enlarged. Face stays centred. |
| `dermot-cox-couselling-room.jpg` | Working together | 1250×833, 3:2 | Visit in person. Exterior of the garden room only. |
| `autumn-sky.jpg` | Pricing background | 1500×1000, 3:2 | One quiet band above the fees. Not repeated. |
| Screenshot PNG `1628851590168-…` | Video poster | 875×490, about 16:9 | Poster for the film. Face kept central. |
| `Dermot-Cox-Counselling-Logo.png` | Header logo and Open Graph image | 1038×270 | Header on the green bar. White wordmark, script colour `#E59500`. Background is transparent. |
| `Dermot+Cox+Counselling+Green+Logo.png` | Only on `/logo` | 1131×279 | Ivory surfaces, including the drawer and footer. Wordmark `#4E5D4E`, script `#C68A23`. |
| Favicon | Browser icon | 100×100 PNG, despite an `.ico` name | `app/icon.png` until a proper icon is supplied. |

Source URLs, all under the Squarespace site id `5f996e256eac9f12a80633a6`:

- Woodland: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/1606837304882-V13Z51NNHV96MYXIVRW2/dermot-cox-couselling.jpg`
- Portrait: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/1606836975253-AZN2TT4A5WRQW6HR24VU/Dermot-Cox-Counselling.jpg`
- Garden room: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/1606837180348-GK4YDLPX8GSE2WGV52KM/dermot-cox-couselling-room.jpg`
- Autumn sky: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/1606837399848-2XME8CFPE32YYUM2EDO4/autumn-sky.jpg`
- Poster: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/1628851590168-KUCDMMQEO9AFZD0KQU4T/Screenshot+2021-08-13+at+11.44.39+am.png`
- Light logo: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/e794d9f4-cce9-42eb-a970-a729cd19494a/Dermot-Cox-Counselling-Logo.png`
- Green logo: `https://images.squarespace-cdn.com/content/v1/5f996e256eac9f12a80633a6/1606737254909-NJU10JVZ91RHMD9E3DRQ/Dermot+Cox+Counselling+Green+Logo.png`

Video: Vimeo `586708473`, title “My approach to therapy”, 102 seconds, author Dermot Cox. The page says it was recorded in the home consulting room. Embed used on the live site: `https://player.vimeo.com/video/586708473` with hash `h=32b387829e`. No captions or transcript are published. The Vimeo description mentions a London address; that line is not used. See the decisions file.

Fonts loaded by the Squarespace template: Cormorant Garamond, Crimson Text, Julius Sans One, Oswald. The preview uses the first three. Oswald is a template face and is not part of the logo.

The logo gold (`#E59500` on the light logo, `#C68A23` on the green logo) is about 2.9:1 on ivory, so it is not used for interface text or as the only active-state mark. The preview uses forest `#4E5D4E` for text and state (about 6.8:1 on `#FFFBF5`) and a darkened gold `#A8741A` (about 3.9:1) only as a supporting rule. Body text is `#1A241C`.

## Form and contact methods

Squarespace form “Get in touch form”, id `5f996e256eac9f12a80633db`.

| Field | Type | Required in Squarespace |
| --- | --- | --- |
| Name | name | No |
| Email | email | No |
| Message | textarea | No |
| Phone | text | No |

Submit label: “Submit”. Success text: “Thank you!”. Captcha is off. The storage destination is not in the public HTML, so it is not assumed to be `dermot@dermotcox.com`.

Other public contact methods: `tel:07831 572050` and `mailto:dermot@dermotcox.com`. No privacy policy page was found.

## URLs

Sitemap (`/sitemap.xml`) lists only:

- `https://www.dermotcox.com/home` (lastmod 2026-04-30) — same homepage content; its canonical is the root
- `https://www.dermotcox.com/logo` (lastmod 2020-12-03) — a real page whose only content is the green logo

These child pages return 200 and have their own canonicals. Several titles mention London. They are the index sections published as paths:

| Path | Title signal | Maps to |
| --- | --- | --- |
| `/` | Homepage, canonical root | `/` |
| `/home` | Same homepage, canonical root | `/` |
| `/welcome` | Welcome | `/#top` |
| `/dermot-cox-counselling` | Section page | `/#top` |
| `/about` | About | `/#about` |
| `/working-together` | Working together | `/#approach` |
| `/pricing` | Pricing | `/#fees` |
| `/contact` | Contact | `/#contact` |
| `/logo` | Green logo only | `/#top` |

`/search` is left alone (live status 403, disallowed for robots).

Confirmed 404s, with no redirect added: `/psychotherapy`, `/counselling`, `/workingtogether`, `/get-in-touch`, `/how-we-can-work-together`.

`https://dermot-cox-counselling.squarespace.com/` still resolves. It is Squarespace’s hosting name, not a path to redirect inside this app.

Old fragments to keep working on the new page: `#welcome`, `#dermot-cox-counselling`, `#psychotherapy`, `#counselling` → introduction; `#about`, `#aboutme2` → about; `#working-together`, `#workingtogether` → approach; `#pricing` → fees; `#contact` → contact.

Next.js config redirects cannot carry a hash, so the path redirects are a 301 from `proxy.ts` with the fragment in the `Location` header.

## Launch checklist (not done in this preview)

- Leave Squarespace and the existing email DNS untouched until Dermot approves the preview and the final balance is paid.
- Point only the website DNS at the new host. Do not change MX or other mail records.
- Indexing stays off on every host except `dermotcox.com` and `www.dermotcox.com`. Do not expect `NEXT_PUBLIC_SITE_URL` to lift the preview noindex. After the real domain is serving this site, check the canonical, the sitemap, and indexing.
- Set `RESEND_API_KEY`, `FROM_EMAIL` and `CONTACT_TO` on a sender that does not require changing Dermot’s mail DNS. Confirm a real test message arrives, and that server logs do not contain the message text.
- After launch, check HTTPS, the redirects above, the canonical, the sitemap, and indexing. Connect Search Console when access exists.
- Ask Dermot for higher-resolution photographs, a captioned or transcribed video, and a sharper favicon.
