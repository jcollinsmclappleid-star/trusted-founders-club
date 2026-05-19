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
    name: "Starter Review Profile",
    price: 9900,
    displayPrice: "\u00a399",
    description:
      "Manual review and public profile for early-stage apps, tools and simple websites.",
  },
  founder_review: {
    key: "founder_review",
    name: "Enhanced Review Profile",
    price: 19900,
    displayPrice: "\u00a3199",
    description:
      "Deeper review profile with strengths, limitations, badge pack and expanded summary.",
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
