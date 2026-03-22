"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CodeInlineProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeInline({ children, className }: CodeInlineProps) {
  return (
    <code
      className={cn(
        "rounded-md border border-white/[0.06] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[13px] text-white/80",
        className
      )}
    >
      {children}
    </code>
  );
}
