"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface StarsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** Number of stars */
  count?: number;
  /** Star color */
  color?: string;
  /** Enable twinkling animation */
  twinkle?: boolean;
  /** Twinkle speed range in seconds [min, max] */
  twinkleSpeed?: [number, number];
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function StarsBackground({
  children,
  className,
  count = 80,
  color = "white",
  twinkle = true,
  twinkleSpeed = [1.5, 4],
}: StarsBackgroundProps) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r = (idx: number) => seededRandom(i * 100 + idx);
      const x = r(1) * 100;
      const y = r(2) * 100;
      const size = 1 + r(3) * 2; // 1-3px
      const opacity = 0.3 + r(4) * 0.7; // 0.3-1
      const duration =
        twinkleSpeed[0] + r(5) * (twinkleSpeed[1] - twinkleSpeed[0]);
      const delay = r(6) * duration;

      return { x, y, size, opacity, duration, delay, id: i };
    });
  }, [count, twinkleSpeed]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Stars layer */}
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={cn("absolute rounded-full", twinkle && "animate-star-twinkle")}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: color,
              opacity: star.opacity,
              ...(twinkle
                ? {
                    animationDuration: `${star.duration}s`,
                    animationDelay: `${star.delay}s`,
                  }
                : {}),
            }}
          />
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
