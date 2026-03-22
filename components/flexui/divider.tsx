"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  label?: string;
  orientation?: "horizontal" | "vertical";
  gradient?: boolean;
}

export function Divider({ className, label, orientation = "horizontal", gradient }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "inline-block w-px self-stretch",
          gradient ? "bg-gradient-to-b from-transparent via-white/20 to-transparent" : "bg-white/[0.06]",
          className
        )}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className={cn("h-px flex-1", gradient ? "bg-gradient-to-r from-transparent to-white/20" : "bg-white/[0.06]")} />
        <span className="shrink-0 text-xs text-white/40">{label}</span>
        <div className={cn("h-px flex-1", gradient ? "bg-gradient-to-r from-white/20 to-transparent" : "bg-white/[0.06]")} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "h-px w-full",
        gradient ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" : "bg-white/[0.06]",
        className
      )}
    />
  );
}
