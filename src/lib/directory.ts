import type { DirectoryApp } from "@/lib/submissions";

export type DirectoryIndustry = {
  id: string;
  label: string;
  description: string;
};

export const directoryIndustries: DirectoryIndustry[] = [
  {
    id: "all",
    label: "All profiles",
    description: "Every published Review Signal profile on the directory.",
  },
  {
    id: "legal-finance",
    label: "Legal & finance",
    description:
      "Calculators, modelling tools and finance-adjacent products with clear scope language.",
  },
  {
    id: "education",
    label: "Education & assessment",
    description:
      "Learning, diagnostics, parent-facing readiness and SEND support tools.",
  },
  {
    id: "saas",
    label: "SaaS",
    description: "Software products with subscription or product-led positioning.",
  },
  {
    id: "ai-tools",
    label: "AI tools",
    description: "AI-assisted apps and automation products with public websites.",
  },
  {
    id: "productivity",
    label: "Productivity",
    description: "Workflow, planning and operator tools for teams and individuals.",
  },
  {
    id: "marketing",
    label: "Marketing & growth",
    description: "Campaign, analytics and go-to-market tools.",
  },
  {
    id: "developer",
    label: "Developer tools",
    description: "Builder-focused utilities, APIs and technical products.",
  },
  {
    id: "other",
    label: "Other",
    description: "Additional reviewed digital products and service sites.",
  },
];

const categoryToIndustry: Record<string, string> = {
  Calculator: "legal-finance",
  Finance: "legal-finance",
  Education: "education",
  "SaaS": "saas",
  "AI Tool": "ai-tools",
  Productivity: "productivity",
  Marketing: "marketing",
  "Developer Tool": "developer",
  "Local Business": "other",
  Directory: "other",
  Other: "other",
  "SEND Support": "education",
};

const groupLabelToIndustry: Record<string, string> = {
  "Legal & calculators": "legal-finance",
  "Education & assessment": "education",
};

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

export function resolveIndustryId(app: DirectoryApp): string {
  if (app.directoryGroup && groupLabelToIndustry[app.directoryGroup]) {
    return groupLabelToIndustry[app.directoryGroup];
  }
  return categoryToIndustry[app.category] ?? "other";
}

export function industryLabelForApp(app: DirectoryApp): string {
  const id = resolveIndustryId(app);
  return directoryIndustries.find((i) => i.id === id)?.label ?? "Other";
}

export function mergeDirectoryApps(
  liveApps: DirectoryApp[],
  curatedApps: DirectoryApp[],
): DirectoryApp[] {
  const merged = new Map<string, DirectoryApp>();

  for (const app of curatedApps) {
    merged.set(normalizeName(app.name), app);
  }
  for (const app of liveApps) {
    const existing = merged.get(normalizeName(app.name));
    merged.set(normalizeName(app.name), {
      ...existing,
      ...app,
      directoryGroup: app.directoryGroup ?? existing?.directoryGroup,
      logoSrc: app.logoSrc ?? existing?.logoSrc,
      screenshotSrc: app.screenshotSrc ?? existing?.screenshotSrc,
      reviewDeskNote: app.reviewDeskNote ?? existing?.reviewDeskNote,
      checkedFor: app.checkedFor ?? existing?.checkedFor,
      complianceNote: app.complianceNote ?? existing?.complianceNote,
      featuredSummary: app.featuredSummary ?? existing?.featuredSummary,
    });
  }

  return Array.from(merged.values()).sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
}

export type DirectorySection = {
  industry: DirectoryIndustry;
  apps: DirectoryApp[];
};

export function buildDirectorySections(apps: DirectoryApp[]): DirectorySection[] {
  const buckets = new Map<string, DirectoryApp[]>();

  for (const app of apps) {
    const industryId = resolveIndustryId(app);
    const list = buckets.get(industryId) ?? [];
    list.push(app);
    buckets.set(industryId, list);
  }

  return directoryIndustries
    .filter((industry) => industry.id !== "all")
    .map((industry) => ({
      industry,
      apps: buckets.get(industry.id) ?? [],
    }))
    .filter((section) => section.apps.length > 0);
}
