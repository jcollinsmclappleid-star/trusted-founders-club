import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ReviewedSignalPillProps = {
  label: string;
  className?: string;
  dark?: boolean;
};

export function ReviewedSignalPill({
  label,
  className,
  dark,
}: ReviewedSignalPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        dark
          ? "border-white/10 bg-white/5 text-[#A8ADB7]"
          : "border-[#E7E0D2] bg-white text-[#374151]",
        className,
      )}
    >
      <CheckCircle2
        aria-hidden="true"
        className={cn("shrink-0", dark ? "text-[#D4A943]" : "text-[#9A7324]")}
        size={12}
      />
      {label}
    </span>
  );
}
