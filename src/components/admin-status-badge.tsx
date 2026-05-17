import { cn } from "@/lib/utils";

type AdminStatusBadgeProps = {
  value: string | boolean | null | undefined;
  tone?: "neutral" | "success" | "warning" | "danger" | "gold";
};

const toneClasses = {
  neutral: "border-[#E7E0D2] bg-[#F7F3EA] text-[#6B7280]",
  success: "border-[#4F7F63]/25 bg-[#4F7F63]/10 text-[#4F7F63]",
  warning: "border-[#A66A2C]/25 bg-[#A66A2C]/10 text-[#A66A2C]",
  danger: "border-red-900/25 bg-red-900/10 text-red-900",
  gold: "border-[#B8944E]/35 bg-[#B8944E]/10 text-[#8A6A2E]",
};

export function AdminStatusBadge({
  value,
  tone = "neutral",
}: AdminStatusBadgeProps) {
  const label =
    typeof value === "boolean" ? (value ? "Yes" : "No") : value ?? "Not set";

  return (
    <span
      className={cn(
        "inline-flex rounded-[4px] border px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
      )}
    >
      {String(label).replaceAll("_", " ")}
    </span>
  );
}

export function statusTone(value: string | null | undefined) {
  if (!value) return "neutral";
  if (value.includes("approved") || value === "paid" || value === "review_added") {
    return "success";
  }
  if (value.includes("pending") || value.includes("changes")) return "warning";
  if (value.includes("rejected") || value.includes("failed") || value.includes("refunded")) {
    return "danger";
  }
  return "neutral";
}
