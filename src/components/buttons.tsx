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
    "inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-semibold shadow-sm transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A943] focus:ring-offset-2",
    dark
      ? "bg-[#D4A943] text-[#0B0F17] hover:bg-[#E7C76B] focus:ring-offset-[#0B0F17]"
      : "border border-[#111827] bg-[#0B0F17] text-[#F8F4EA] hover:border-[#D4A943] hover:bg-[#101216] focus:ring-offset-[#F5F1E8]",
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
    "inline-flex h-12 items-center justify-center rounded-[8px] border px-5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4A943] focus:ring-offset-2",
    dark
      ? "border-[#F8F4EA]/40 text-[#F8F4EA] hover:border-[#E7C76B] hover:bg-white/5 focus:ring-offset-[#0B0F17]"
      : "border-[#D4A943]/45 bg-white text-[#0B0F17] hover:border-[#101216]/40 hover:bg-[#F5F1E8] focus:ring-offset-[#F5F1E8]",
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
