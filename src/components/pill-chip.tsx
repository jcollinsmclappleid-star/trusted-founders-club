import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PillChipProps = {
  children: ReactNode;
  variant?: "default" | "gold" | "dark" | "outline";
  className?: string;
};

export function PillChip({
  children,
  variant = "default",
  className,
}: PillChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
        variant === "default" &&
          "border border-[#E7E0D2] bg-[#FFFDF7] text-[#374151]",
        variant === "gold" &&
          "border border-[#B8944E]/35 bg-[#B8944E]/12 text-[#8A6B2E]",
        variant === "dark" &&
          "border border-[#B8944E]/30 bg-[#B8944E]/15 text-[#E6D3A3]",
        variant === "outline" &&
          "border border-[#B8944E]/45 bg-transparent text-[#8A6B2E]",
        className,
      )}
    >
      {children}
    </span>
  );
}
