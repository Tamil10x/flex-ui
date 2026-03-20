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
    const seeded: Particle[] = [];
    for (let i = 0; i < count; i++) {
      seeded.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - 1) + 1,
        duration: (Math.random() * 6 + 4) / speed,
        delay: Math.random() * -10,
        opacity: Math.random() * 0.5 + 0.2,
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
