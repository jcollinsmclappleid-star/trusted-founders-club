import type { Metadata } from "next";
import { exampleDivorceCalculatorProfile } from "@/lib/editorial-real-listings";
import { reviewPackages } from "@/lib/packages";

export { editorialListings } from "@/lib/editorial-real-listings";

export const siteConfig = {
  name: "Review Signal",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reviewsignal.com",
  description:
    "An editorial review desk for useful digital products—public review profiles, verification badges, and records visitors can open before they reach your site.",
  submitHref: "/submit",
};

/** Published verification badge artwork (light = cream UI, dark = navy panels). */
export const badgeAssets = {
  light: "/badges/review-signal-light.jpg",
  dark: "/badges/review-signal-dark.jpg",
  showcase: "/badges/review-signal-badge-showcase.png",
} as const;

export const navItems = [
  { href: "/apps", label: "Review Desk" },
  { href: "/pricing", label: "Pricing" },
  { href: "/example-review", label: "Example profile" },
  { href: "/guidelines", label: "Guidelines" },
];

export const faqItems = [
  {
    question: "Is this a backlink service?",
    answer:
      "Review Signal is a manual review desk: public review profiles, editorial notes, and verification badges. Approved profiles include a website link as part of the record—we do not sell ranking or SEO outcomes.",
  },
  {
    question: "Do you guarantee SEO results?",
    answer:
      "We publish review records and badges, not search performance. Rankings, indexing, traffic, and sales depend on your product and market; those outcomes are outside the review scope.",
  },
  {
    question: "Will my profile be indexed by Google?",
    answer:
      "Profiles default to noindex unless we approve indexing for a specific listing. A public review profile may still be shared by link; indexing is handled case by case and is not guaranteed.",
  },
  {
    question: "How long does review take?",
    answer:
      "Approved submissions are usually reviewed and published within 24 hours after payment.",
  },
  {
    question: "Can I use the review quote on my site?",
    answer:
      "Yes. Founder Review includes a published quote and badge for use on your site, provided the badge links to your public review record on the desk.",
  },
  {
    question: "What happens if my app is rejected?",
    answer:
      "We may request changes or decline publication. Refund handling follows the terms shown at checkout.",
  },
  {
    question: "What types of apps are not accepted?",
    answer:
      "We focus on clear, useful digital products. We may decline misleading, harmful, illegal, non-functional, or unsuitable submissions; regulated claims may need extra review.",
  },
];

export const pricingPlans = [
  {
    name: "Launch Listing",
    key: reviewPackages.launch_listing.key,
    price: reviewPackages.launch_listing.displayPrice,
    description:
      "For businesses seeking a public directory record with a website link after manual suitability review.",
    cta: "Apply for Launch Listing",
    tierHint: "Focused entry",
    featured: false,
    includes: [
      "Public review desk record",
      "Website link from the profile",
      "Category placement in the directory",
      "Manual suitability review",
      "Publication if the desk accepts the submission",
    ],
  },
  {
    name: "Founder Review",
    key: reviewPackages.founder_review.key,
    price: reviewPackages.founder_review.displayPrice,
    badge: "Full Review Output",
    recommendedLabel: "Recommended",
    tierHint: "Full review output",
    description:
      "For businesses seeking a fuller review record with note, quote, badge and verification metadata.",
    cta: "Apply for Founder Review",
    featured: true,
    includes: [
      "Everything in Launch Listing",
      "Manual editorial review note",
      "Short published review quote",
      "Reviewed by Review Signal badge",
      "Click-to-verify profile",
      "Review ID and reviewed date",
      "Human feedback on clarity and public trust signals",
    ],
  },
];

export const comparisonRows = [
  ["Public review record", true, true],
  ["Website link from profile", true, true],
  ["Category placement", true, true],
  ["Manual suitability review", true, true],
  ["Editorial review note", false, true],
  ["Public review quote", false, true],
  ["Black verification badge", false, true],
  ["Click-to-verify profile", false, true],
  ["Review ID and reviewed date", false, true],
  ["Human clarity and trust feedback", false, true],
] as const;

export const categoryOptions = [
  "AI Tool",
  "SaaS",
  "Productivity",
  "Marketing",
  "Developer Tool",
  "Finance",
  "Education",
  "Local Business",
  "Directory",
  "Calculator",
  "Other",
];

/** Editorial example profile backing `/example-review` (Divorce Calculator UK). */
export const exampleApp = {
  name: exampleDivorceCalculatorProfile.name,
  category: exampleDivorceCalculatorProfile.category,
  shortDescription: exampleDivorceCalculatorProfile.shortDescription,
  website: exampleDivorceCalculatorProfile.website,
  logoSrc: exampleDivorceCalculatorProfile.logoSrc,
  screenshotSrc: exampleDivorceCalculatorProfile.screenshotSrc,
  reviewId: exampleDivorceCalculatorProfile.reviewId,
  reviewedDate: exampleDivorceCalculatorProfile.reviewedDateLabel,
  founderName: exampleDivorceCalculatorProfile.founderName,
  founderNote: exampleDivorceCalculatorProfile.founderNote,
  quote: exampleDivorceCalculatorProfile.quote,
  about: exampleDivorceCalculatorProfile.about,
  reviewSummary: exampleDivorceCalculatorProfile.reviewSummary,
  helpsWithBullets: exampleDivorceCalculatorProfile.helpsWithBullets,
  checkedItems: exampleDivorceCalculatorProfile.checkedItems,
  trustSignals: exampleDivorceCalculatorProfile.trustSignals,
  complianceNote: exampleDivorceCalculatorProfile.complianceNote,
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
