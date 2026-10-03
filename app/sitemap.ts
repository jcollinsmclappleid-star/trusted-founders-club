import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/lib/indexing";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!(await indexingAllowed())) return [];

  return [
    {
      url: `${siteConfig.url}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
