import { ProfilePreviewCard } from "@/components/profile-preview-card";
import { cn } from "@/lib/utils";

type CredibilityProfileMockupProps = {
  variant?: "full" | "compact";
  className?: string;
};

export function CredibilityProfileMockup({
  variant = "full",
  className,
}: CredibilityProfileMockupProps) {
  return (
    <ProfilePreviewCard
      variant={variant === "compact" ? "section" : "hero"}
      className={cn(className)}
      showLink={false}
    />
  );
}
