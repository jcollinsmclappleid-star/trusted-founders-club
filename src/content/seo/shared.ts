import type { SeoSection } from "@/lib/seo-types";

export const comparisonTable = {
  headers: ["What you gain", "DIY testimonials", "Review widgets", "Review Signal"],
  rows: [
    [
      "Visitor can verify the source",
      "Hard to prove",
      "Varies by platform",
      "Public review ID and profile URL",
    ],
    [
      "Editorial line for your website",
      "Self-written copy",
      "Often generic snippets",
      "Publishable quote from the review",
    ],
    [
      "Link from review to your product",
      "Usually none",
      "Sometimes",
      "Profile backlink to your site",
    ],
    [
      "Directory visibility",
      "None",
      "Platform only",
      "Listed in the Review Signal directory",
    ],
    [
      "UK founder pricing",
      "Free but weak proof",
      "Can be expensive",
      "From £99 Starter profile",
    ],
  ],
};

export function sellSection(
  id: string,
  heading: string,
  paragraphs: string[],
  list: string[],
): SeoSection {
  return {
    id,
    heading,
    paragraphs,
    list,
  };
}

export function placementSection(
  id: string,
  heading: string,
  paragraphs: string[],
  list: string[],
): SeoSection {
  return {
    id,
    heading,
    paragraphs,
    list,
  };
}
