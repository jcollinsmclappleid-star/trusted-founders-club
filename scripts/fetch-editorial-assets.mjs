import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const outputDir = path.join(projectRoot, "public", "editorial-assets");

const reviewedSites = [
  {
    slug: "divorce-calculator-uk",
    url: "https://divorcecalculatoruk.co.uk",
    logoFile: "divorce-calculator-uk-logo.png",
    screenshotFile: "divorce-calculator-uk-screenshot.png",
  },
  {
    slug: "bucks-11-plus-tests",
    url: "https://bucks11plustest.co.uk",
    logoFile: "bucks-11-plus-tests-logo.jpg",
    screenshotFile: "bucks-11-plus-tests-screenshot.png",
  },
  {
    slug: "11plus-test-hub",
    url: "https://11plustesthub.co.uk",
    logoFile: "11plus-test-hub-logo.png",
    screenshotFile: "11plus-test-hub-screenshot.jpg",
    screenshotUrl:
      "https://s.wordpress.com/mshots/v1/https%3A%2F%2F11plustesthub.co.uk?w=1400",
  },
  {
    slug: "ehcp-clarity",
    url: "https://ehcpclarity.co.uk",
    logoFile: "ehcp-clarity-logo.png",
    screenshotFile: "ehcp-clarity-screenshot.png",
    screenshotUrl:
      "https://api.microlink.io/?url=https%3A%2F%2Fehcpclarity.co.uk&screenshot=true&meta=false&embed=screenshot.url",
  },
];

const headers = {
  "user-agent":
    "ReviewSignalAssetFetcher/1.0 (+https://reviewsignal.com)",
};

function logoUrlFor(url) {
  return `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(
    url,
  )}&sz=128`;
}

function screenshotUrlFor(site) {
  return (
    site.screenshotUrl ??
    `https://image.thum.io/get/width/1200/crop/800/noanimate/${site.url}`
  );
}

async function downloadImage(url, outputPath) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Expected image content, got ${contentType || "unknown"}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);
  return { contentType, bytes: buffer.length };
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  for (const site of reviewedSites) {
    const logoPath = path.join(outputDir, site.logoFile);
    const screenshotPath = path.join(outputDir, site.screenshotFile);

    const logo = await downloadImage(logoUrlFor(site.url), logoPath);
    console.log(
      `Saved ${path.relative(projectRoot, logoPath)} (${logo.contentType}, ${logo.bytes} bytes)`,
    );

    const screenshot = await downloadImage(
      screenshotUrlFor(site),
      screenshotPath,
    );
    console.log(
      `Saved ${path.relative(projectRoot, screenshotPath)} (${screenshot.contentType}, ${screenshot.bytes} bytes)`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
