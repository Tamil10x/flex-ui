"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  /** Border color */
  color?: string;
  /** Speed in seconds for one full revolution */
  speed?: number;
  /** Border radius */
  borderRadius?: string;
  /** Border width */
  borderWidth?: number;
  /** Whether the light moves */
  animate?: boolean;
}

export function MovingBorder({
  children,
  className,
  color = "from-violet-500 via-cyan-500 to-violet-500",
  speed = 3,
  borderRadius = "1rem",
  borderWidth = 2,
  animate = true,
}: MovingBorderProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ borderRadius }}
    >
      {/* Rotating gradient border layer */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius, padding: borderWidth }}
      >
        <div
          className={cn(
            "absolute inset-[-50%]",
            animate && "animate-[border-rotate_linear_infinite]"
          )}
          style={{
            animationDuration: `${speed}s`,
            background: `conic-gradient(${getGradientColors(color)})`,
          }}
        />

        {/* Inner mask — solid background to reveal only the border */}
        <div
          className="absolute inset-0 bg-zinc-950"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
            margin: borderWidth,
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          borderRadius,
          padding: borderWidth,
        }}
      >
        <div
          className="bg-zinc-950"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Converts Tailwind-style gradient classes to CSS conic-gradient color stops.
 * Falls back to using the raw string if it doesn't match Tailwind patterns.
 */
function getGradientColors(color: string): string {
  // If the color string contains Tailwind gradient direction classes, extract colors
  const tailwindMap: Record<string, string> = {
    "violet-500": "#8b5cf6",
    "violet-400": "#a78bfa",
    "cyan-500": "#06b6d4",
    "cyan-400": "#22d3ee",
    "blue-500": "#3b82f6",
    "purple-500": "#a855f7",
    "pink-500": "#ec4899",
    "rose-500": "#f43f5e",
    "emerald-500": "#10b981",
    "amber-500": "#f59e0b",
    "red-500": "#ef4444",
    "orange-500": "#f97316",
    "yellow-500": "#eab308",
    "green-500": "#22c55e",
    "teal-500": "#14b8a6",
    "indigo-500": "#6366f1",
    "fuchsia-500": "#d946ef",
    "white": "#ffffff",
  };

  // Check if it already looks like raw CSS (contains # or rgb)
  if (color.includes("#") || color.includes("rgb")) {
    return color;
  }

  // Parse Tailwind gradient class pattern: from-X via-Y to-Z
  const fromMatch = color.match(/from-(\S+)/);
  const viaMatch = color.match(/via-(\S+)/);
  const toMatch = color.match(/to-(\S+)/);

  const colors: string[] = [];
  if (fromMatch && tailwindMap[fromMatch[1]]) colors.push(tailwindMap[fromMatch[1]]);
  if (viaMatch && tailwindMap[viaMatch[1]]) colors.push(tailwindMap[viaMatch[1]]);
  if (toMatch && tailwindMap[toMatch[1]]) colors.push(tailwindMap[toMatch[1]]);

  if (colors.length >= 2) {
    return colors.join(", ");
  }

  // Default fallback
  return "#8b5cf6, #06b6d4, #8b5cf6";
}
