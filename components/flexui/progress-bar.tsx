"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: string;
  animated?: boolean;
  showLabel?: boolean;
}

export function ProgressBar({ value, className, color = "#fff", animated, showLabel }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("relative w-full", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", animated && "animate-pulse")}
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-right text-xs text-white/50">{Math.round(clamped)}%</span>
      )}
    </div>
  );
}
