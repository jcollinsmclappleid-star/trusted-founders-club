import type { SeoGuideContent } from "@/lib/seo-types";

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function countGuideWords(content: SeoGuideContent): number {
  let total = 0;

  for (const section of content.sections) {
    for (const paragraph of section.paragraphs) {
      total += countWords(paragraph);
    }
    if (section.list) {
      for (const item of section.list) {
        total += countWords(item);
      }
    }
    if (section.table) {
      for (const header of section.table.headers) {
        total += countWords(header);
      }
      for (const row of section.table.rows) {
        for (const cell of row) {
          total += countWords(cell);
        }
      }
    }
  }

  for (const item of content.faq) {
    total += countWords(item.q);
    total += countWords(item.a);
  }

  for (const benefit of content.valueBenefits) {
    total += countWords(benefit.title);
    total += countWords(benefit.outcome);
    total += countWords(benefit.detail);
  }

  return total;
}

export const MIN_SEO_GUIDE_WORDS = 1600;
