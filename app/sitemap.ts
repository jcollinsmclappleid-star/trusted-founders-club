import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getIndexablePublicProfiles } from "@/lib/submissions";

const routes = [
  "/",
  "/apps",
  "/pricing",
  "/example-review",
  "/guidelines",
  "/terms",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: (route === "/" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const profiles = await getIndexablePublicProfiles();
  const profileRoutes = profiles.map((profile) => ({
    url: absoluteUrl(`/apps/${profile.slug}`),
    lastModified: profile.updated_at ?? profile.published_at ?? new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  return [...staticRoutes, ...profileRoutes];
}
