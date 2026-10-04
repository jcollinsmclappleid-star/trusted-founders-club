import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text, Julius_Sans_One } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { areaServed, buckinghamshireAnswer } from "@/lib/areas";
import { indexingAllowed, requestHost } from "@/lib/indexing";
import { previewRobots, siteConfig } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

const julius = Julius_Sans_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-julius",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const host = await requestHost();
  const indexable = await indexingAllowed();
  const metadataBase = indexable
    ? siteConfig.url
    : host
      ? `https://${host}`
      : "http://localhost";

  return {
    metadataBase: new URL(metadataBase),
    title: {
      default: "Dermot Cox Counselling | Little Hampden, near Great Missenden",
      template: "%s | Dermot Cox Counselling",
    },
    description: siteConfig.description,
    alternates: indexable ? { canonical: siteConfig.url } : undefined,
    openGraph: {
      title: "Dermot Cox Counselling",
      description: siteConfig.description,
      url: indexable ? siteConfig.url : undefined,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_GB",
      images: [
        {
          url: "/media/woodland.jpg",
          width: 1500,
          height: 1000,
          alt: "Two people sitting together on a fallen tree in autumn woodland",
        },
      ],
    },
    robots: indexable ? { index: true, follow: true } : previewRobots,
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en-GB",
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#dermot`,
      name: "Dermot Cox",
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: "+447831572050",
      jobTitle: "Psychotherapist and counsellor",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Little Hampden",
        addressRegion: "Buckinghamshire",
        postalCode: "HP16 9PS",
        addressCountry: "GB",
      },
      hasMap: siteConfig.mapHref,
      areaServed,
      memberOf: [
        {
          "@type": "Organization",
          name: "British Association for Counselling and Psychotherapy",
        },
        {
          "@type": "Organization",
          name: "UK Council for Psychotherapy",
        },
      ],
    },
    {
      "@type": "Service",
      name: "Individual therapy",
      serviceType: "Psychotherapy and counselling",
      provider: { "@id": `${siteConfig.url}/#dermot` },
      areaServed,
      offers: {
        "@type": "Offer",
        price: "75",
        priceCurrency: "GBP",
        description: "50 minutes, in person or online",
      },
    },
    {
      "@type": "Service",
      name: "Couples therapy",
      serviceType: "Relationship psychotherapy and counselling",
      provider: { "@id": `${siteConfig.url}/#dermot` },
      areaServed,
      offers: {
        "@type": "Offer",
        price: "120",
        priceCurrency: "GBP",
        description: "60 minutes, in person or online",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#practice`,
      name: siteConfig.name,
      url: siteConfig.url,
      image: `${siteConfig.url}/media/garden-room.jpg`,
      telephone: "+447831572050",
      email: siteConfig.email,
      priceRange: "£75–£120",
      currenciesAccepted: "GBP",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Little Hampden",
        addressRegion: "Buckinghamshire",
        postalCode: "HP16 9PS",
        addressCountry: "GB",
      },
      hasMap: siteConfig.mapHref,
      areaServed,
      founder: { "@id": `${siteConfig.url}/#dermot` },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where do we meet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In the garden consulting room in Little Hampden, in the Chilterns, close to Great Missenden, or outdoors nearby. People can come from across Buckinghamshire and from the surrounding area. If the journey is too far, we can meet online.",
          },
        },
        {
          "@type": "Question",
          name: "Can we meet online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Online sessions are offered alongside meeting in person, for the same fees.",
          },
        },
        {
          "@type": "Question",
          name: "How do we begin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "With a free 30-minute conversation by phone or video, to meet and to talk about working together.",
          },
        },
        {
          "@type": "Question",
          name: "How often do we meet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A regular weekly time usually supports individual therapy best. Couples work can be more flexible.",
          },
        },
        {
          "@type": "Question",
          name: "Do you see people from across Buckinghamshire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: buckinghamshireAnswer,
          },
        },
        {
          "@type": "Question",
          name: "What are the fees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Individual therapy is £75 for 50 minutes. Couples therapy is £120 for 60 minutes. The fee is the same in person or online. A first conversation, 30 minutes by phone or video, is free.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${crimson.variable} ${julius.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <SiteShell>{children}</SiteShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
