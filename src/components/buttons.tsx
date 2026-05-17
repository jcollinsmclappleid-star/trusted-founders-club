import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
  fullMobile?: boolean;
};

export function PrimaryButton({
  href,
  children,
  className,
  dark,
  fullMobile,
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const classes = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#B8944E] focus:ring-offset-2",
    dark
      ? "bg-[#B8944E] text-[#070A0F] hover:bg-[#E6D3A3] focus:ring-offset-[#0B1220]"
      : "border border-[#111827] bg-[#0B1220] text-[#FFFDF7] hover:border-[#B8944E] hover:bg-[#111827] focus:ring-offset-[#F7F3EA]",
    fullMobile && "w-full sm:w-auto",
    className,
  );

  if (isExternal) {
    return (
      <a className={classes} href={href}>
        {children}
        <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
      <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className,
  dark,
  fullMobile,
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");

  const classes = cn(
    "inline-flex h-12 items-center justify-center rounded-[8px] border px-5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#B8944E] focus:ring-offset-2",
    dark
      ? "border-[#F7F3EA]/40 text-[#FFFDF7] hover:border-[#E6D3A3] hover:bg-white/5 focus:ring-offset-[#0B1220]"
      : "border-[#B8944E]/45 bg-[#FFFDF7] text-[#0B1220] hover:border-[#0B1220]/40 hover:bg-[#F7F3EA] focus:ring-offset-[#F7F3EA]",
    fullMobile && "w-full sm:w-auto",
    className,
  );

  if (isExternal) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {children}
    </Link>
  );
}
