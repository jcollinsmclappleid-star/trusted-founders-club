import type { MetadataRoute } from "next";
import { indexingAllowed } from "@/lib/indexing";
import { siteConfig } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (!(await indexingAllowed())) {
    return {
      rules: { userAgent: "*", allow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
