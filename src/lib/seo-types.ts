export type SeoSection = {
  id: string;
  heading: string;
  level?: "h2" | "h3";
  paragraphs: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
};

export type SeoFaqItem = {
  q: string;
  a: string;
};

export type SeoValueBenefit = {
  title: string;
  outcome: string;
  detail: string;
  accent: string;
};

export type SeoGuideContent = {
  sections: SeoSection[];
  faq: SeoFaqItem[];
  valueBenefits: SeoValueBenefit[];
};

export type SeoGuideMeta = {
  slug: string;
  desiredOutcome: string;
  searchIntents: string[];
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroCopy: string;
  relatedSlugs: string[];
  updatedAt: string;
};

export type SeoGuide = SeoGuideMeta & {
  content: SeoGuideContent;
};
