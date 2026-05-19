export type ProfileHighlightZone =
  | "overview"
  | "summary"
  | "editorial"
  | "trust"
  | "website"
  | "badge"
  | "directory"
  | "metadata";

export type IncludedManifestItem = {
  id: string;
  title: string;
  description: string;
  zone: ProfileHighlightZone;
  founderOnly?: boolean;
};

export const includedManifestIntro = {
  eyebrow: "What is included",
  title: "What is included in your public review profile.",
  copy: "A Review Signal profile gives selected packages another trust-focused asset beyond your own site—plus badge files and a live record visitors can verify before they click through.",
};

export const includedManifestTiers = {
  launch: {
    label: "Starter Review Profile",
    items: [
      {
        id: "01",
        title: "Business overview",
        description: "What the product does, who it is for, and how it is positioned.",
        zone: "overview",
      },
      {
        id: "02",
        title: "Service summary",
        description: "Category, audience, and practical use case on the public profile.",
        zone: "summary",
      },
      {
        id: "03",
        title: "What we checked",
        description: "Manual checks on live access, claims, and clarity.",
        zone: "trust",
      },
      {
        id: "04",
        title: "Link to your website",
        description: "Outbound link from the profile when the submission is accepted.",
        zone: "website",
      },
      {
        id: "05",
        title: "Directory placement",
        description: "Listed in the relevant profile directory for discovery.",
        zone: "directory",
      },
    ] satisfies IncludedManifestItem[],
  },
  founder: {
    label: "Enhanced Review Profile",
    items: [
      {
        id: "01",
        title: "Business overview",
        description: "What the product does, who it is for, and how it is positioned.",
        zone: "overview",
      },
      {
        id: "02",
        title: "Service summary",
        description: "Category, audience, and practical use case on the public profile.",
        zone: "summary",
      },
      {
        id: "03",
        title: "Editorial review note",
        description: "A readable note on what stood out during manual review.",
        zone: "editorial",
        founderOnly: true,
      },
      {
        id: "04",
        title: "Trust highlights",
        description: "What we checked and what visitors should know before they buy.",
        zone: "trust",
      },
      {
        id: "05",
        title: "Link to your website",
        description: "Outbound link from the profile when the submission is accepted.",
        zone: "website",
      },
      {
        id: "06",
        title: "Verification badge",
        description: "Badge for your site that opens this same public profile.",
        zone: "badge",
        founderOnly: true,
      },
      {
        id: "07",
        title: "Directory placement",
        description: "Listed in the relevant profile directory for discovery.",
        zone: "directory",
      },
      {
        id: "08",
        title: "Review ID and date",
        description: "Metadata visitors can use to confirm the record is current.",
        zone: "metadata",
        founderOnly: true,
      },
    ] satisfies IncludedManifestItem[],
  },
} as const;

export type IncludedTierKey = keyof typeof includedManifestTiers;
