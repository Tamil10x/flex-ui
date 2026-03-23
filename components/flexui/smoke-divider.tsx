"use client";

import React, { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SmokeDividerProps {
  className?: string;
  /** Smoke color */
  color?: string;
  /** Number of smoke wisps */
  count?: number;
  /** Height of the smoke area in px */
  height?: number;
  /** Speed multiplier */
  speed?: number;
}

// Simple seeded random for hydration-safe deterministic values
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface WispData {
  id: number;
  width: number;
  height: number;
  top: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
  oscillateAmount: number;
}

export function SmokeDivider({
  className,
  color = "rgba(139,92,246,0.15)",
  count = 8,
  height = 60,
  speed = 1,
}: SmokeDividerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wisps = useMemo<WispData[]>(() => {
    const rand = seededRandom(42);
    return Array.from({ length: count }, (_, i) => {
      const w = 60 + rand() * 120;
      const h = 20 + rand() * 30;
      const top = rand() * (height - h);
      const blur = 20 + rand() * 20;
      const opacity = 0.3 + rand() * 0.5;
      const baseDuration = 8 + rand() * 12;
      const duration = baseDuration / speed;
      const delay = -(rand() * duration);
      const oscillateAmount = 4 + rand() * 10;

      return {
        id: i,
        width: w,
        height: h,
        top,
        blur,
        opacity,
        duration,
        delay,
        oscillateAmount,
      };
    });
  }, [count, height, speed]);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height }}
    >
      {mounted &&
        wisps.map((wisp) => (
          <div
            key={wisp.id}
            className="absolute rounded-[50%]"
            style={{
              width: wisp.width,
              height: wisp.height,
              top: wisp.top,
              filter: `blur(${wisp.blur}px)`,
              opacity: wisp.opacity,
              backgroundColor: color,
              animation: `smoke-drift ${wisp.duration}s linear ${wisp.delay}s infinite, smoke-float ${wisp.duration * 0.5}s ease-in-out ${wisp.delay}s infinite`,
              willChange: "transform",
            }}
          />
        ))}
    </div>
  );
}
