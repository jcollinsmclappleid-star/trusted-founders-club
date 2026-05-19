import { howToBuildTrustOnYourWebsiteContent } from "@/content/seo/guides/how-to-build-trust-on-your-website";
import { howToConvinceVisitorsBeforeTheyBuyContent } from "@/content/seo/guides/how-to-convince-visitors-before-they-buy";
import { howToGetBacklinksForYourStartupContent } from "@/content/seo/guides/how-to-get-backlinks-for-your-startup";
import { howToGetMoreTrafficToYourAppContent } from "@/content/seo/guides/how-to-get-more-traffic-to-your-app";
import { howToGetNewUsersForYourAppContent } from "@/content/seo/guides/how-to-get-new-users-for-your-app";
import { howToGetPayingCustomersForYourSaasContent } from "@/content/seo/guides/how-to-get-paying-customers-for-your-saas";
import { howToGetReviewsForYourProductContent } from "@/content/seo/guides/how-to-get-reviews-for-your-product";
import { howToImproveLandingPageConversionsContent } from "@/content/seo/guides/how-to-improve-landing-page-conversions";
import { howToStandOutAsANewAppContent } from "@/content/seo/guides/how-to-stand-out-as-a-new-app";
import { socialProofWithoutFakeReviewsContent } from "@/content/seo/guides/social-proof-without-fake-reviews";
import {
  countGuideWords,
  MIN_SEO_GUIDE_WORDS,
} from "@/lib/seo-word-count";
import type { SeoGuide } from "@/lib/seo-types";

const UPDATED = "2026-05-18";

export const seoGuides: SeoGuide[] = [
  {
    slug: "how-to-get-more-traffic-to-your-app",
    desiredOutcome: "More qualified traffic",
    searchIntents: [
      "how to increase traffic to my app",
      "get more visitors to app website uk",
      "increase app traffic",
    ],
    title: "How to Get More Traffic to Your App | UK Guide | Review Signal",
    description:
      "Practical UK guide to growing app and SaaS traffic with SEO, launches and verifiable proof. Apply for a review profile from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to get more traffic to your app",
    heroCopy:
      "Grow qualified visits with a playbook UK founders use every day—then amplify every channel with a public review profile, publishable quote and profile backlink prospects can verify before they sign up.",
    relatedSlugs: [
      "how-to-get-new-users-for-your-app",
      "how-to-improve-landing-page-conversions",
      "how-to-get-backlinks-for-your-startup",
    ],
    updatedAt: UPDATED,
    content: howToGetMoreTrafficToYourAppContent,
  },
  {
    slug: "how-to-get-new-users-for-your-app",
    desiredOutcome: "More signups and activated users",
    searchIntents: [
      "how to get users for my app",
      "first 100 users saas uk",
      "get new users for app",
    ],
    title: "How to Get New Users for Your App | UK Guide | Review Signal",
    description:
      "UK founder guide to acquiring app and SaaS users with onboarding, community and review profiles that build signup confidence. From £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to get new users for your app",
    heroCopy:
      "Turn attention into registered users with focused acquisition tactics—and give cautious visitors a verifiable review profile, quote and badge before they create an account.",
    relatedSlugs: [
      "how-to-get-more-traffic-to-your-app",
      "how-to-stand-out-as-a-new-app",
      "how-to-build-trust-on-your-website",
    ],
    updatedAt: UPDATED,
    content: howToGetNewUsersForYourAppContent,
  },
  {
    slug: "how-to-get-paying-customers-for-your-saas",
    desiredOutcome: "More paying customers",
    searchIntents: [
      "how to get paying customers saas",
      "convert free users to paid uk",
      "increase saas revenue",
    ],
    title: "How to Get Paying Customers for Your SaaS | UK Guide | Review Signal",
    description:
      "Convert trials and visitors into paying UK customers with pricing clarity, proof on checkout and editorial review profiles. Starter from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to get paying customers for your SaaS",
    heroCopy:
      "Grow revenue by fixing trial-to-paid leaks and placing editorial proof where buyers decide—pricing pages, checkout and sales emails backed by a public review profile.",
    relatedSlugs: [
      "how-to-convince-visitors-before-they-buy",
      "how-to-improve-landing-page-conversions",
      "how-to-get-reviews-for-your-product",
    ],
    updatedAt: UPDATED,
    content: howToGetPayingCustomersForYourSaasContent,
  },
  {
    slug: "how-to-get-reviews-for-your-product",
    desiredOutcome: "Credible product reviews",
    searchIntents: [
      "how to get reviews for my app",
      "get customer reviews startup uk",
      "product reviews without fake ratings",
    ],
    title: "How to Get Reviews for Your Product | UK Guide | Review Signal",
    description:
      "Earn credible product reviews UK buyers trust—customer voices plus editorial review profiles you can publish. Apply from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to get reviews for your product",
    heroCopy:
      "Build a review stack that converts: ethical customer feedback plus an independent Review Signal profile with quote, badge and review ID you can share everywhere.",
    relatedSlugs: [
      "social-proof-without-fake-reviews",
      "how-to-build-trust-on-your-website",
      "how-to-get-paying-customers-for-your-saas",
    ],
    updatedAt: UPDATED,
    content: howToGetReviewsForYourProductContent,
  },
  {
    slug: "how-to-build-trust-on-your-website",
    desiredOutcome: "Higher website trust",
    searchIntents: [
      "how to build trust on website",
      "trust signals for startup uk",
      "website credibility",
    ],
    title: "How to Build Trust on Your Website | UK Guide | Review Signal",
    description:
      "UK guide to website trust signals—policies, proof and verifiable review badges that link to public profiles. Review profiles from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to build trust on your website",
    heroCopy:
      "Make every key page answer “Is this legitimate?” in seconds—with contact clarity, product evidence and a Review Signal profile visitors can verify in one click.",
    relatedSlugs: [
      "social-proof-without-fake-reviews",
      "how-to-improve-landing-page-conversions",
      "how-to-get-reviews-for-your-product",
    ],
    updatedAt: UPDATED,
    content: howToBuildTrustOnYourWebsiteContent,
  },
  {
    slug: "how-to-improve-landing-page-conversions",
    desiredOutcome: "Higher landing page conversion",
    searchIntents: [
      "improve saas conversion rate",
      "increase landing page signups uk",
      "landing page optimisation",
    ],
    title: "How to Improve Landing Page Conversions | UK Guide | Review Signal",
    description:
      "Lift landing page conversion with clarity, speed and editorial proof above the fold. Review Signal profiles from £99 for UK founders.",
    eyebrow: "Guide · Review Signal",
    h1: "How to improve landing page conversions",
    heroCopy:
      "Convert more of the traffic you already have—sharpen your offer, cut friction and add a publishable review quote plus verification badge linked to your public profile.",
    relatedSlugs: [
      "how-to-convince-visitors-before-they-buy",
      "how-to-build-trust-on-your-website",
      "how-to-get-more-traffic-to-your-app",
    ],
    updatedAt: UPDATED,
    content: howToImproveLandingPageConversionsContent,
  },
  {
    slug: "how-to-get-backlinks-for-your-startup",
    desiredOutcome: "Quality backlinks",
    searchIntents: [
      "how to get backlinks new website",
      "startup seo backlinks uk",
      "link building startup",
    ],
    title: "How to Get Backlinks for Your Startup | UK Guide | Review Signal",
    description:
      "Earn UK startup backlinks with citeable assets, outreach and editorial review profiles worth linking to. Public profiles from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to get backlinks for your startup",
    heroCopy:
      "Build links that last—publish resources people cite, pitch relevant partners and add a Review Signal profile URL journalists and founders can reference with confidence.",
    relatedSlugs: [
      "how-to-get-more-traffic-to-your-app",
      "how-to-stand-out-as-a-new-app",
      "how-to-get-reviews-for-your-product",
    ],
    updatedAt: UPDATED,
    content: howToGetBacklinksForYourStartupContent,
  },
  {
    slug: "how-to-convince-visitors-before-they-buy",
    desiredOutcome: "Pre-purchase conviction",
    searchIntents: [
      "convince visitors to buy",
      "reduce buyer hesitation saas",
      "pre purchase trust",
    ],
    title: "How to Convince Visitors Before They Buy | UK Guide | Review Signal",
    description:
      "Remove pre-purchase doubt with FAQ, proof on checkout and verifiable review profiles UK buyers can forward internally. From £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to convince visitors before they buy",
    heroCopy:
      "Win the final decision with objection-busting content and editorial proof on pricing and checkout—plus a review ID champions can send to finance and leadership.",
    relatedSlugs: [
      "how-to-get-paying-customers-for-your-saas",
      "how-to-improve-landing-page-conversions",
      "how-to-build-trust-on-your-website",
    ],
    updatedAt: UPDATED,
    content: howToConvinceVisitorsBeforeTheyBuyContent,
  },
  {
    slug: "how-to-stand-out-as-a-new-app",
    desiredOutcome: "Market differentiation",
    searchIntents: [
      "how to market a new app",
      "stand out saas market uk",
      "new app launch strategy",
    ],
    title: "How to Stand Out as a New App | UK Guide | Review Signal",
    description:
      "Differentiate your new app with sharp positioning, launch proof and a public review profile to share on launch day. UK profiles from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "How to stand out as a new app",
    heroCopy:
      "Cut through noise with a wedge position, launch playbook and verifiable review profile—so every post, newsletter and directory listing links to proof, not promises.",
    relatedSlugs: [
      "how-to-get-new-users-for-your-app",
      "how-to-get-more-traffic-to-your-app",
      "social-proof-without-fake-reviews",
    ],
    updatedAt: UPDATED,
    content: howToStandOutAsANewAppContent,
  },
  {
    slug: "social-proof-without-fake-reviews",
    desiredOutcome: "Ethical social proof",
    searchIntents: [
      "social proof for website",
      "credible testimonials saas uk",
      "avoid fake reviews",
    ],
    title: "Social Proof Without Fake Reviews | UK Guide | Review Signal",
    description:
      "Build ethical social proof UK visitors trust—testimonials, case studies and verifiable Review Signal profiles. Apply from £99.",
    eyebrow: "Guide · Review Signal",
    h1: "Social proof without fake reviews",
    heroCopy:
      "Assemble proof you can defend—real customer stories, accurate metrics and an editorial review profile with review ID, quote and badge prospects can verify before they buy.",
    relatedSlugs: [
      "how-to-get-reviews-for-your-product",
      "how-to-build-trust-on-your-website",
      "how-to-convince-visitors-before-they-buy",
    ],
    updatedAt: UPDATED,
    content: socialProofWithoutFakeReviewsContent,
  },
];

export const seoGuideSlugs = seoGuides.map((guide) => guide.slug);

export function getSeoGuideBySlug(slug: string): SeoGuide | undefined {
  return seoGuides.find((guide) => guide.slug === slug);
}

export function validateSeoGuideWordCounts() {
  for (const guide of seoGuides) {
    const words = countGuideWords(guide.content);
    if (words < MIN_SEO_GUIDE_WORDS) {
      throw new Error(
        `SEO guide "${guide.slug}" has ${words} words; minimum is ${MIN_SEO_GUIDE_WORDS}.`,
      );
    }
  }
}

validateSeoGuideWordCounts();
