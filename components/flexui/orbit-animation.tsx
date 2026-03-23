"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OrbitAnimationProps {
  className?: string;
  dotCount?: number;
  speed?: number;
  color?: string;
}

export function OrbitAnimation({
  className,
  dotCount = 6,
  speed = 8,
  color = "rgb(56,189,248)",
}: OrbitAnimationProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: 200, height: 200 }}>
      <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
      {Array.from({ length: dotCount }).map((_, i) => {
        const radius = 50 + i * 15;
        const delay = -(speed / dotCount) * i;
        const duration = speed + i * 2;
        return (
          <div
            key={i}
            className="absolute animate-[orbit-spin_linear_infinite]"
            style={{
              width: radius * 2,
              height: radius * 2,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            <div
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
            />
          </div>
        );
      })}
      <style jsx>{`
        @keyframes orbit-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
