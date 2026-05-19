import { ShieldCheck } from "lucide-react";
import { trustDisclaimers } from "@/lib/site";
import { cn } from "@/lib/utils";

type TrustNoteProps = {
  variant?: "payment" | "badge" | "conversion" | "short";
  className?: string;
  dark?: boolean;
};

export function TrustNote({
  variant = "payment",
  className,
  dark,
}: TrustNoteProps) {
  const text = trustDisclaimers[variant];

  return (
    <p
      className={cn(
        "flex items-start gap-2 text-sm leading-6",
        dark ? "text-[#A8ADB7]" : "text-[#6B7280]",
        className,
      )}
    >
      <ShieldCheck
        aria-hidden="true"
        className={cn(
          "mt-0.5 shrink-0",
          dark ? "text-[#D4A943]" : "text-[#9A7324]",
        )}
        size={16}
      />
      <span>{text}</span>
    </p>
  );
}
