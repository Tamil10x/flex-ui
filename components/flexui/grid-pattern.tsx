"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface GridPatternProps {
  children?: React.ReactNode;
  className?: string;
  /** Grid cell size in px */
  size?: number;
  /** Line color */
  color?: string;
  /** Line opacity (0-1) */
  opacity?: number;
  /** Radial fade mask from center */
  fade?: boolean;
}

export function GridPattern({
  children,
  className,
  size = 40,
  color = "rgb(255 255 255)",
  opacity = 0.06,
  fade = false,
}: GridPatternProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${color} / ${opacity} 1px, transparent 1px), linear-gradient(to right, ${color} / ${opacity} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          ...(fade
            ? {
                maskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 30%, transparent 70%)",
              }
            : {}),
        }}
      />
      {/* Children on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
