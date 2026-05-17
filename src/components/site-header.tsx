import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { navItems, siteConfig } from "@/lib/site";
import { PrimaryButton } from "@/components/buttons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A0F]/95 text-[#FFFDF7] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          aria-label={`${siteConfig.name} home`}
        >
          <BrandLogo variant="header" />
        </Link>

        <nav
          className="text-on-dark hidden items-center gap-7 text-sm md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="transition hover:text-[#FFFDF7]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <PrimaryButton dark href={siteConfig.submitHref}>
            Request review
          </PrimaryButton>
        </div>
      </div>
      <nav
        className="text-on-dark border-t border-white/10 px-5 py-2 text-xs md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto whitespace-nowrap sm:px-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="transition hover:text-[#FFFDF7]"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={siteConfig.submitHref}
            className="font-semibold text-[#E6D3A3] transition hover:text-[#FFFDF7]"
          >
            Request review
          </Link>
        </div>
      </nav>
    </header>
  );
}
