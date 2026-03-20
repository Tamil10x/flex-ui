"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  children?: React.ReactNode;
  className?: string;
  /** Dot spacing in px */
  spacing?: number;
  /** Dot size in px */
  dotSize?: number;
  /** Dot color */
  color?: string;
  /** Radial fade mask */
  fade?: boolean;
}

export function DotPattern({
  children,
  className,
  spacing = 24,
  dotSize = 1.2,
  color = "rgb(255 255 255 / 0.3)",
  fade = false,
}: DotPatternProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Dot matrix */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${color} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
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
