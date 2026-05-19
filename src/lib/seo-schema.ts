import { absoluteUrl, siteConfig } from "@/lib/site";
import { reviewPackages } from "@/lib/packages";
import type { SeoGuide } from "@/lib/seo-types";

export function buildGuideJsonLd(guide: SeoGuide) {
  const url = absoluteUrl(`/${guide.slug}`);
  const pageName = guide.h1;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageName,
    description: guide.description,
    url,
    dateModified: guide.updatedAt,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: absoluteUrl("/guides"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: pageName,
        item: url,
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.content.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Review Signal Review Profile",
    description: siteConfig.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    offers: [
      {
        "@type": "Offer",
        name: reviewPackages.launch_listing.name,
        price: "99",
        priceCurrency: "GBP",
      },
      {
        "@type": "Offer",
        name: reviewPackages.founder_review.name,
        price: "199",
        priceCurrency: "GBP",
      },
    ],
  };

  return [webPage, breadcrumb, faqPage, service];
}
