"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** Aurora band colors */
  colors?: string[];
  /** Animation speed in seconds */
  speed?: number;
  /** Blur amount for the aurora bands */
  blur?: number;
  /** Show the effect */
  showAurora?: boolean;
}

export function AuroraBackground({
  children,
  className,
  colors = [
    "rgba(139, 92, 246, 0.3)",
    "rgba(6, 182, 212, 0.3)",
    "rgba(16, 185, 129, 0.3)",
    "rgba(236, 72, 153, 0.3)",
  ],
  speed = 8,
  blur = 100,
  showAurora = true,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-950",
        className
      )}
    >
      {showAurora && (
        <div className="pointer-events-none absolute inset-0">
          {/* Band 1 — top-left drift */}
          <div
            className="absolute -left-1/4 -top-1/4 h-[60%] w-[80%] animate-aurora-shift rounded-full mix-blend-screen"
            style={{
              background: `radial-gradient(ellipse at center, ${colors[0] ?? "rgba(139,92,246,0.3)"}, transparent 70%)`,
              filter: `blur(${blur}px)`,
              animationDuration: `${speed}s`,
            }}
          />
          {/* Band 2 — top-right drift (reversed) */}
          <div
            className="absolute -right-1/4 -top-1/3 h-[50%] w-[70%] animate-aurora-shift rounded-full mix-blend-screen"
            style={{
              background: `radial-gradient(ellipse at center, ${colors[1] ?? "rgba(6,182,212,0.3)"}, transparent 70%)`,
              filter: `blur(${blur}px)`,
              animationDuration: `${speed * 1.4}s`,
              animationDirection: "reverse",
            }}
          />
          {/* Band 3 — center drift */}
          <div
            className="absolute left-1/4 top-1/4 h-[50%] w-[60%] animate-aurora-shift rounded-full mix-blend-screen"
            style={{
              background: `radial-gradient(ellipse at center, ${colors[2] ?? "rgba(16,185,129,0.3)"}, transparent 70%)`,
              filter: `blur(${blur * 1.2}px)`,
              animationDuration: `${speed * 1.8}s`,
              animationDelay: `${speed * -0.5}s`,
            }}
          />
          {/* Band 4 — bottom sweep */}
          <div
            className="absolute -bottom-1/4 left-1/3 h-[50%] w-[70%] animate-aurora-shift rounded-full mix-blend-screen"
            style={{
              background: `radial-gradient(ellipse at center, ${colors[3] ?? "rgba(236,72,153,0.3)"}, transparent 70%)`,
              filter: `blur(${blur}px)`,
              animationDuration: `${speed * 1.2}s`,
              animationDirection: "reverse",
              animationDelay: `${speed * -0.3}s`,
            }}
          />
        </div>
      )}

      {/* Content renders on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
