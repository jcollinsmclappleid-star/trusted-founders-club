"use client";

import { useState } from "react";

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      className="h-9 rounded-[6px] border border-[#0B1220]/20 px-3 text-xs font-semibold text-[#0B1220] transition hover:bg-[#0B1220]/5"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
