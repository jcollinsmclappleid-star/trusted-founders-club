import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text, Julius_Sans_One } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { isProductionHost, siteConfig } from "@/lib/site";
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

const indexing = isProductionHost();

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url),
  title: {
    default: "Dermot Cox Counselling | Little Hampden, near Great Missenden",
    template: "%s | Dermot Cox Counselling",
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Dermot Cox Counselling",
    description: siteConfig.description,
    url: siteConfig.url,
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
  robots: indexing
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
};

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
      areaServed: [
        { "@type": "AdministrativeArea", name: "Buckinghamshire" },
        { "@type": "Place", name: "The Chilterns" },
      ],
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
      areaServed: [
        { "@type": "AdministrativeArea", name: "Buckinghamshire" },
        { "@type": "Place", name: "The Chilterns" },
      ],
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
      areaServed: [
        { "@type": "AdministrativeArea", name: "Buckinghamshire" },
        { "@type": "Place", name: "The Chilterns" },
      ],
      offers: {
        "@type": "Offer",
        price: "120",
        priceCurrency: "GBP",
        description: "60 minutes, in person or online",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where do we meet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In the garden consulting room in Little Hampden, in the Chilterns, close to Great Missenden, or outdoors nearby. People come from across Buckinghamshire and from the surrounding area. The room is not in Great Missenden itself. If the journey is too far, we can meet online.",
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
