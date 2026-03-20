"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  /** Gradient colors as CSS color values */
  colors?: string[];
  /** Animation speed in seconds */
  speed?: number;
  /** Whether to animate the gradient */
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  colors = ["#8b5cf6", "#06b6d4", "#ec4899", "#8b5cf6"],
  speed = 3,
  animate = true,
}: GradientTextProps) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;

  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        animate && "animate-gradient-shift",
        className
      )}
      style={{
        backgroundImage: gradient,
        backgroundSize: animate ? "200% auto" : "100% auto",
        ...(animate ? { animationDuration: `${speed}s` } : {}),
      }}
    >
      {children}
    </span>
  );
}
