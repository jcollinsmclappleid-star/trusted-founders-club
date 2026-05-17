import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

type DisclaimerPanelProps = {
  children: ReactNode;
};

export function DisclaimerPanel({ children }: DisclaimerPanelProps) {
  return (
    <aside className="flex gap-3 rounded-[8px] border border-[#E7E0D2] bg-[#F7F3EA] p-5 text-sm leading-6 text-[#6B7280]">
      <AlertCircle
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-[#A66A2C]"
        size={18}
        strokeWidth={1.8}
      />
      <p>{children}</p>
    </aside>
  );
}
