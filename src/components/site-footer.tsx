import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { navItems, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#070A0F] text-[#F7F3EA]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.25fr_0.75fr_0.9fr] lg:px-8">
        <div>
          <BrandLogo variant="footer" />
          <p className="text-on-dark-muted mt-5 max-w-md text-sm leading-7">
            A curated review desk for useful digital products—manual review profiles,
            verification badges, and public records visitors can open before
            they reach your site.
          </p>
          <p className="text-on-dark-muted mt-4 max-w-md text-xs uppercase tracking-[0.15em]">
            Selective publication ·{" "}
            <Link
              href="/guidelines"
              className="text-[#E6D3A3] underline underline-offset-2 hover:text-[#FFFDF7]"
            >
              Guidelines
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E6D3A3]">
            Explore
          </h2>
          <div className="text-on-dark mt-4 flex flex-col gap-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="transition hover:text-[#FFFDF7]"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E6D3A3]">
            Trust
          </h2>
          <div className="text-on-dark mt-4 flex flex-col gap-3 text-sm">
            <p className="text-on-dark-muted text-xs leading-6">
              Every submission is manually reviewed. Scope and limits for each
              listing are on the profile; see Guidelines for desk-wide rules.
            </p>
            <Link className="transition hover:text-[#FFFDF7]" href="/terms">
              Terms
            </Link>
            <Link className="transition hover:text-[#FFFDF7]" href="/privacy">
              Privacy
            </Link>
            <Link
              className="transition hover:text-[#FFFDF7]"
              href={siteConfig.submitHref}
            >
              Request review
            </Link>
          </div>
        </div>
      </div>
      <div className="text-on-dark-muted border-t border-white/10 px-5 py-5 text-center text-xs">
        Copyright {new Date().getFullYear()} {siteConfig.name}. Badge links to
        the published review record.
      </div>
    </footer>
  );
}
