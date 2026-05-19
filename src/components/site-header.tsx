import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { PrimaryButton } from "@/components/buttons";
import { navItems, primaryCta, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="header-glow sticky top-0 z-40 border-b border-[#D4A943]/20 bg-[#0B0F17]/95 text-[#F8F4EA] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 flex-col"
          aria-label={`${siteConfig.name} home`}
        >
          <BrandLogo variant="header" />
          <span className="mt-0.5 hidden text-[10px] tracking-wide text-[#A8ADB7] sm:block">
            {siteConfig.tagline}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 text-sm md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-[#A8ADB7] transition hover:text-[#F8F4EA]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PrimaryButton dark href={siteConfig.submitHref} className="!h-10 !px-4">
            {primaryCta}
          </PrimaryButton>
        </div>
      </div>
      <nav
        className="border-t border-white/10 px-5 py-2 text-xs md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto whitespace-nowrap sm:px-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="text-[#A8ADB7] transition hover:text-[#F8F4EA]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.submitHref}
            className="font-semibold text-[#E7C76B]"
          >
            {primaryCta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
