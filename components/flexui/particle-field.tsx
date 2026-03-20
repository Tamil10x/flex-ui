"use client";

import React, { useEffect, useMemo, useState } from "react";
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

// Seeded PRNG — deterministic across runs
function seed(n: number): number {
  // Use integer math to avoid floating-point SSR/client mismatch
  let h = (n * 2654435761) | 0;
  h = ((h ^ (h >>> 16)) * 2246822507) | 0;
  h = ((h ^ (h >>> 13)) * 3266489909) | 0;
  h = (h ^ (h >>> 16)) | 0;
  return (h >>> 0) / 4294967296;
}

export function ParticleField({
  children,
  className,
  count = 40,
  color = "rgba(255, 255, 255, 0.6)",
  maxSize = 4,
  speed = 1,
}: ParticleFieldProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    for (let i = 0; i < count; i++) {
      result.push({
        id: i,
        x: seed(i * 6 + 1) * 100,
        y: seed(i * 6 + 2) * 100,
        size: seed(i * 6 + 3) * (maxSize - 1) + 1,
        duration: (seed(i * 6 + 4) * 8 + 6) / speed,
        delay: seed(i * 6 + 5) * -15,
        opacity: seed(i * 6 + 6) * 0.6 + 0.3,
      });
    }
    return result;
  }, [count, maxSize, speed]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Particle layer — only rendered on client to avoid hydration mismatch */}
      {mounted && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-particle-drift"
              style={{
                left: `${Math.round(p.x * 100) / 100}%`,
                top: `${Math.round(p.y * 100) / 100}%`,
                width: `${Math.round(p.size * 10) / 10}px`,
                height: `${Math.round(p.size * 10) / 10}px`,
                backgroundColor: color,
                opacity: Math.round(p.opacity * 100) / 100,
                animationDuration: `${Math.round(p.duration * 10) / 10}s`,
                animationDelay: `${Math.round(p.delay * 10) / 10}s`,
                boxShadow: `0 0 ${Math.round(p.size * 3)}px ${Math.round(p.size)}px ${color}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Content renders on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
