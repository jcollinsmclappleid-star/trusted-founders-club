import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SeoLandingPage,
  seoGuideMetadata,
} from "@/components/seo-landing-page";
import {
  getSeoGuideBySlug,
  seoGuideSlugs,
} from "@/lib/seo-pages";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoGuideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);
  if (!guide) return {};
  return seoGuideMetadata(guide);
}

export default async function SeoGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getSeoGuideBySlug(slug);
  if (!guide) notFound();
  return <SeoLandingPage guide={guide} />;
}
