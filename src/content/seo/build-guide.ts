import { comparisonTable } from "@/content/seo/shared";
import type {
  SeoFaqItem,
  SeoGuideContent,
  SeoSection,
  SeoValueBenefit,
} from "@/lib/seo-types";

export type GuideBodyInput = {
  winningParagraphs: string[];
  trustParagraphs: string[];
  playbookParagraphs: string[];
  convertParagraphs: string[];
  credibleParagraphs: string[];
  sellParagraphs: string[];
  sellBullets: string[];
  placementParagraphs: string[];
  placementBullets: string[];
  comparisonParagraphs: string[];
  fastWinsParagraphs: string[];
  nextStepsParagraphs: string[];
  winsBullets: string[];
  faq: SeoFaqItem[];
  valueBenefits: SeoValueBenefit[];
};

export function buildGuideBody(input: GuideBodyInput): SeoGuideContent {
  const sections: SeoSection[] = [
    {
      id: "winning",
      heading: "What winning looks like",
      paragraphs: input.winningParagraphs,
    },
    {
      id: "trust-opportunity",
      heading: "Why growing apps win on trust—not hype alone",
      paragraphs: input.trustParagraphs,
    },
    {
      id: "playbook",
      heading: "The playbook: proven ways to move the needle",
      paragraphs: input.playbookParagraphs,
    },
    {
      id: "convert",
      heading: "Turn attention into action: proof that converts",
      paragraphs: input.convertParagraphs,
    },
    {
      id: "credible-reviews",
      heading: "Credible reviews and quotes visitors believe",
      paragraphs: input.credibleParagraphs,
    },
    {
      id: "review-signal",
      heading: "Accelerate with a Review Signal profile",
      paragraphs: input.sellParagraphs,
      list: input.sellBullets,
    },
    {
      id: "placement",
      heading: "Where to place your profile, quote, and badge",
      paragraphs: input.placementParagraphs,
      list: input.placementBullets,
    },
    {
      id: "comparison",
      heading: "What you get compared to DIY proof alone",
      paragraphs: input.comparisonParagraphs,
      table: comparisonTable,
    },
    {
      id: "fast-wins",
      heading: "Your fastest wins this month",
      paragraphs: input.fastWinsParagraphs,
      list: input.winsBullets,
    },
    {
      id: "next-steps",
      heading: "Ready to publish your proof?",
      paragraphs: input.nextStepsParagraphs,
    },
  ];

  return {
    sections,
    faq: input.faq,
    valueBenefits: input.valueBenefits,
  };
}
