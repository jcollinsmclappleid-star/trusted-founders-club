import type { MetadataRoute } from "next";
import { isProductionHost, siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionHost()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
