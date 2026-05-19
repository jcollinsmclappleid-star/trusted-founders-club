import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import {
  footerExploreLinks,
  footerGuideLinks,
  primaryCta,
  siteConfig,
  trustDisclaimers,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0B0F17] text-[#F8F4EA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo variant="footer" />
          <p className="mt-5 max-w-md text-sm leading-7 text-[#A8ADB7]">
            {siteConfig.description}
          </p>
          <p className="mt-4 max-w-md text-xs leading-6 text-[#6B7280]">
            {trustDisclaimers.payment}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
            Explore
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {footerExploreLinks.map((item) => (
              <Link
                key={item.href}
                className="text-[#A8ADB7] transition hover:text-[#F8F4EA]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
            Guides
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            {footerGuideLinks.map((item) => (
              <Link
                key={item.href}
                className="text-[#A8ADB7] transition hover:text-[#F8F4EA]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A943]">
            Legal & contact
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link className="text-[#A8ADB7] hover:text-[#F8F4EA]" href="/terms">
              Terms
            </Link>
            <Link className="text-[#A8ADB7] hover:text-[#F8F4EA]" href="/privacy">
              Privacy
            </Link>
            <Link
              className="text-[#A8ADB7] hover:text-[#F8F4EA]"
              href={siteConfig.submitHref}
            >
              {primaryCta}
            </Link>
            <a
              className="text-[#A8ADB7] hover:text-[#F8F4EA]"
              href={`mailto:${siteConfig.supportEmail}`}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs leading-6 text-[#6B7280]">
        <p>
          Review Signal provides public review profiles based on a manual review
          process. It does not sell guaranteed positive reviews, legal
          certification, regulatory approval or specific commercial outcomes.
        </p>
        <p className="mt-2">
          Copyright {new Date().getFullYear()} {siteConfig.name}.{" "}
          {siteConfig.companyName}, {siteConfig.companyRegistration}.
        </p>
      </div>
    </footer>
  );
}
