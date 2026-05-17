"use client";

import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HoverLift({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("hover-lift", className)}>{children}</Tag>;
}
