import { seoGuides } from "../src/lib/seo-pages";
import { countGuideWords } from "../src/lib/seo-word-count";

function allParagraphs(guide: (typeof seoGuides)[number]) {
  const paras: string[] = [];
  for (const section of guide.content.sections) {
    paras.push(...section.paragraphs);
    if (section.list) paras.push(...section.list);
  }
  for (const item of guide.content.faq) {
    paras.push(item.q, item.a);
  }
  for (const benefit of guide.content.valueBenefits) {
    paras.push(benefit.title, benefit.outcome, benefit.detail);
  }
  return paras.map((p) => p.trim()).filter((p) => p.length >= 40);
}

const counts = new Map<string, number>();
for (const guide of seoGuides) {
  for (const paragraph of allParagraphs(guide)) {
    counts.set(paragraph, (counts.get(paragraph) ?? 0) + 1);
  }
}

const duplicated = [...counts.entries()]
  .filter(([, count]) => count > 1)
  .sort((a, b) => b[1] - a[1]);

console.log(`Guides: ${seoGuides.length}`);
console.log(`Duplicate paragraphs (exact, 40+ chars): ${duplicated.length}`);
for (const [text, count] of duplicated.slice(0, 15)) {
  console.log(`\n[${count}x] ${text.slice(0, 110)}...`);
}

let maxShared = 0;
let worstPair = "";
for (let i = 0; i < seoGuides.length; i++) {
  for (let j = i + 1; j < seoGuides.length; j++) {
    const a = new Set(allParagraphs(seoGuides[i]));
    const shared = allParagraphs(seoGuides[j]).filter((p) => a.has(p)).length;
    if (shared > maxShared) {
      maxShared = shared;
      worstPair = `${seoGuides[i].slug} vs ${seoGuides[j].slug}`;
    }
  }
}
console.log(`\nWorst pair — shared paragraphs: ${maxShared} (${worstPair})`);
for (const guide of seoGuides) {
  console.log(`${guide.slug}: ${countGuideWords(guide.content)} words`);
}

if (duplicated.length > 3) {
  process.exit(1);
}
