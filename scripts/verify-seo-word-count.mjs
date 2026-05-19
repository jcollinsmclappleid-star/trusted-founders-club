import { pathToFileURL } from "node:url";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

async function main() {
  const mod = await import(
    pathToFileURL(path.join(root, "src/lib/seo-pages.ts")).href
  );
  const { seoGuides } = mod;
  const { countGuideWords, MIN_SEO_GUIDE_WORDS } = await import(
    pathToFileURL(path.join(root, "src/lib/seo-word-count.ts")).href
  );

  let failed = false;

  for (const guide of seoGuides) {
    const words = countGuideWords(guide.content);
    const ok = words >= MIN_SEO_GUIDE_WORDS;
    console.log(`${ok ? "OK" : "FAIL"} ${guide.slug}: ${words} words`);
    if (!ok) failed = true;
  }

  if (failed) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
