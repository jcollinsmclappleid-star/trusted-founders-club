import type { Metadata } from "next";
import { exampleDivorceCalculatorProfile } from "@/lib/editorial-real-listings";
import { reviewPackages } from "@/lib/packages";

export { editorialListings } from "@/lib/editorial-real-listings";

export const siteConfig = {
  name: "Review Signal",
  tagline: "Review · Quote · Backlink",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reviewsignal.com",
  description:
    "Get an independent review profile, a publishable quote for your site, and a backlink from a public record prospects can verify before they buy.",
  submitHref: "/submit",
  supportEmail: "support@sitesignalstudio.co.uk",
  companyName: "Ianson Systems Ltd",
  companyRegistration: "Registered in England and Wales",
};

export const primaryCta = "Apply for Review";
export const secondaryCta = "View Example Profile";

/** Outbound link rel for paying third-party applicants (paid placement). */
export const paidListingWebsiteRel = "sponsored nofollow noopener";

/** Outbound link rel for Review Signal–owned portfolio sites (editorial listings). */
export const ownedListingWebsiteRel = "noopener noreferrer";

export const trustDisclaimers = {
  payment:
    "Payment covers the review process and profile creation. It does not guarantee a positive review, approval, endorsement or specific commercial outcome.",
  badge:
    "Review Signal badges link to a public profile. They are not legal, financial, medical or regulatory certification.",
  conversion:
    "Review profiles can support trust and reduce uncertainty, but they do not guarantee sales, enquiries or conversion improvements.",
  short:
    "Paid review process. No guaranteed positive outcome. Profiles are published with clear review context.",
} as const;

/** Published verification badge artwork (light = cream UI, dark = navy panels). */
export const badgeAssets = {
  light: "/badges/review-signal-light.jpg",
  dark: "/badges/review-signal-dark.jpg",
  showcase: "/badges/review-signal-badge-showcase.png",
} as const;

export const navItems = [
  { href: "/apps", label: "Directory" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/example-review", label: "Example profile" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guidelines", label: "Guidelines" },
];

export const footerExploreLinks = [
  { href: "/apps", label: "Profile directory" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/example-review", label: "Example profile" },
  { href: "/pricing", label: "Pricing" },
  { href: "/guidelines", label: "Guidelines" },
  { href: siteConfig.submitHref, label: primaryCta },
];

export const footerGuideLinks = [
  { href: "/guides", label: "All guides" },
  {
    href: "/how-to-get-more-traffic-to-your-app",
    label: "Get more app traffic",
  },
  {
    href: "/how-to-get-new-users-for-your-app",
    label: "Get new users",
  },
  {
    href: "/how-to-get-paying-customers-for-your-saas",
    label: "Get paying customers",
  },
  {
    href: "/how-to-get-reviews-for-your-product",
    label: "Get product reviews",
  },
  {
    href: "/how-to-build-trust-on-your-website",
    label: "Build website trust",
  },
];

/** Three commercial outcomes sold on the homepage. */
export const homeOutcomes = [
  {
    id: "review",
    title: "Independent review",
    outcome: "A public profile that records what we checked—not a star rating you bought.",
    detail: "Manual review summary, reviewed signals and review ID prospects can open before they trust you.",
    accent: "#3B82F6",
  },
  {
    id: "quote",
    title: "Visitor-ready quote",
    outcome: "A short editorial line you can place on landing pages, decks and emails.",
    detail: "Real review wording from Review Signal—clear context, not fake testimonial filler.",
    accent: "#D4A943",
  },
  {
    id: "backlink",
    title: "Profile backlink",
    outcome: "An outbound link from your published profile to your website when accepted.",
    detail: "Prospects read the review, then click through to your product from the same record.",
    accent: "#22C55E",
  },
] as const;

export const homeProcessFlow = [
  {
    label: "Apply",
    description: "Tell us about your product and choose Starter or Enhanced.",
  },
  {
    label: "We review",
    description: "Manual check of your live site, offer and trust signals.",
  },
  {
    label: "You publish",
    description: "Profile, quote, badge and backlink go live together.",
  },
] as const;

export const heroProfileExample = {
  productName: "Example AI Planner",
  category: "Productivity / AI Tool",
  status: "Profile Published",
  reviewId: "RS-18427",
  profileUrl: "reviewsignal.com/profile/example-ai-planner",
  publishableQuote:
    "A clear, focused planner for people who want structure without heavyweight project software.",
  websiteLabel: "yourproduct.com",
  summary:
    "A focused productivity tool for planning tasks with AI-assisted scheduling. The public profile records what was reviewed and links to the live product.",
  reviewedSignals: [
    "Product purpose",
    "Website clarity",
    "Pricing visibility",
    "Trust signals",
    "User value",
    "Support/contact route",
  ],
};

export const audienceCards = [
  {
    title: "New app builders",
    copy: "Give early users a clear third-party review profile to check before signing up.",
  },
  {
    title: "SaaS and AI tools",
    copy: "Show what your product does, who it is for and what was reviewed.",
  },
  {
    title: "Service businesses",
    copy: "Add a public credibility record that supports enquiries and website conversion.",
  },
  {
    title: "Agencies and consultants",
    copy: "Offer review profiles as an add-on to website, SEO and conversion work.",
  },
];

export const profileDeliverables = [
  "Public review profile",
  "Editorial review summary",
  "Key product details",
  "Reviewed signals",
  "Strengths and limitations",
  "Category and use-case tags",
  "Review Signal badge",
  "Verification link / profile URL",
  "Review ID",
  "Optional screenshots or product evidence",
];

export const reviewProcessSteps = [
  {
    step: "01",
    title: "Apply",
    copy: "Submit your product, website or service for review.",
  },
  {
    step: "02",
    title: "We review",
    copy: "We manually assess the product, public website and key trust signals.",
  },
  {
    step: "03",
    title: "Profile is drafted",
    copy: "Your review profile is created with a clear summary and reviewed signals.",
  },
  {
    step: "04",
    title: "Profile is published",
    copy: "You receive a public profile URL and badge that links back to your review record.",
  },
];

export const integrityDoItems = [
  "Manual review process",
  "Public profile with clear review context",
  "Suitability checks before publication",
  "Editorial summary of what was reviewed",
  "Honest strengths and limitations where applicable",
];

export const integrityDontItems = [
  "Sell guaranteed positive reviews",
  "Create fake customer ratings",
  "Guarantee approval or endorsement",
  "Verify claims that cannot be checked",
  "Provide legal, financial or medical endorsement",
  "Guarantee conversions, traffic or rankings",
];

export const conversionBenefits = [
  "A third-party page to click",
  "A clear record of what was reviewed",
  "Product context before they enquire",
  "Credibility signals from an independent review",
  "An external proof asset for your site",
  "Reassurance before enquiring or buying",
];

export const faqItems = [
  {
    question: "What am I paying for?",
    answer:
      "You pay for the manual review process and creation of a public review profile. Payment does not guarantee a positive review, approval or any specific commercial outcome.",
  },
  {
    question: "What do I receive after I apply?",
    answer:
      "If your product is suitable and accepted, you receive a public review profile URL, reviewed signals, an editorial summary and—on Enhanced—a badge pack, strengths/limitations and expanded profile content.",
  },
  {
    question: "Is a positive review guaranteed?",
    answer:
      "No. Review Signal does not sell guaranteed positive reviews. We publish profiles with clear review context based on what we assessed.",
  },
  {
    question: "How long does the review take?",
    answer:
      "Approved submissions are usually reviewed and published within 24 hours after payment.",
  },
  {
    question: "Can I use the badge on my website?",
    answer:
      "Yes. Enhanced includes badge files that must link to your public Review Signal profile so visitors can see what was reviewed.",
  },
  {
    question: "Can service businesses apply?",
    answer:
      "Yes. Review Signal accepts useful digital products, SaaS tools, apps, websites and service businesses with a clear public presence.",
  },
  {
    question: "What happens if my submission is declined?",
    answer:
      "We may request changes or decline publication. Refund handling follows the terms shown at checkout.",
  },
];

export const pricingPlans = [
  {
    name: reviewPackages.launch_listing.name,
    key: reviewPackages.launch_listing.key,
    price: reviewPackages.launch_listing.displayPrice,
    description:
      "For early-stage apps, tools and simple websites that need a clear public review profile.",
    cta: primaryCta,
    tierHint: "Starter",
    featured: false,
    includes: [
      "Manual review & public profile",
      "Website backlink from profile",
      "Reviewed signal checklist",
      "Standard badge linking to profile",
      "Profile URL to share",
    ],
  },
  {
    name: reviewPackages.founder_review.name,
    key: reviewPackages.founder_review.key,
    price: reviewPackages.founder_review.displayPrice,
    badge: "Most complete",
    recommendedLabel: "Recommended",
    tierHint: "Enhanced",
    description:
      "For SaaS tools, digital products and service businesses needing a stronger public profile.",
    cta: primaryCta,
    featured: true,
    includes: [
      "Everything in Starter",
      "Publishable visitor quote for your site",
      "Deeper review summary & limitations",
      "Screenshots / product evidence",
      "Multiple badge styles",
      "Profile improvement notes",
    ],
  },
];

export const comparisonRows = [
  ["Public review profile", true, true],
  ["Manual review process", true, true],
  ["Editorial review summary", true, true],
  ["Reviewed signal checklist", true, true],
  ["Profile URL", true, true],
  ["Standard badge", true, true],
  ["Strengths and limitations", false, true],
  ["Screenshots / product evidence", false, true],
  ["Multiple badge styles", false, true],
  ["Profile improvement notes", false, true],
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

/** Example profile backing `/example-review` (Divorce Calculator UK). */
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
