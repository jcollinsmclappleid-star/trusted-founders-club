export type PackageKey = "launch_listing" | "founder_review";

export type ReviewPackage = {
  key: PackageKey;
  name: string;
  price: number;
  displayPrice: string;
  description: string;
};

export const reviewPackages: Record<PackageKey, ReviewPackage> = {
  launch_listing: {
    key: "launch_listing",
    name: "Launch Listing",
    price: 2900,
    displayPrice: "\u00a329",
    description: "Public directory record after manual suitability review.",
  },
  founder_review: {
    key: "founder_review",
    name: "Founder Review",
    price: 7900,
    displayPrice: "\u00a379",
    description:
      "Full review record with note, quote, badge and verification metadata.",
  },
};

export function getPackageByKey(key: string) {
  if (key in reviewPackages) {
    return reviewPackages[key as PackageKey];
  }

  return null;
}

export function packageKeyFromName(name: string): PackageKey | null {
  const found = Object.values(reviewPackages).find(
    (reviewPackage) => reviewPackage.name === name,
  );

  return found?.key ?? null;
}
