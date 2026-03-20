"use client";

import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ParticleFieldProps {
  children?: React.ReactNode;
  className?: string;
  /** Number of particles */
  count?: number;
  /** Particle color */
  color?: string;
  /** Max particle size in px */
  maxSize?: number;
  /** Animation speed multiplier */
  speed?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export function ParticleField({
  children,
  className,
  count = 40,
  color = "rgba(255, 255, 255, 0.6)",
  maxSize = 4,
  speed = 1,
}: ParticleFieldProps) {
  const particles = useMemo<Particle[]>(() => {
    // Seeded PRNG for deterministic SSR/client match
    const seed = (n: number) => {
      const x = Math.sin(n * 9301 + 49297) * 49297;
      return x - Math.floor(x);
    };
    const seeded: Particle[] = [];
    for (let i = 0; i < count; i++) {
      seeded.push({
        id: i,
        x: seed(i * 6 + 1) * 100,
        y: seed(i * 6 + 2) * 100,
        size: seed(i * 6 + 3) * (maxSize - 1) + 1,
        duration: (seed(i * 6 + 4) * 6 + 4) / speed,
        delay: seed(i * 6 + 5) * -10,
        opacity: seed(i * 6 + 6) * 0.5 + 0.2,
      });
    }
    return seeded;
  }, [count, maxSize, speed]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-zinc-950",
        className
      )}
    >
      {/* Particle layer */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-particle-drift"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: color,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content renders on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
