"use client";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** Number of beams */
  beamCount?: number;
  /** Beam color */
  color?: string;
  /** Animation speed in seconds */
  speed?: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function BeamsBackground({
  children,
  className,
  beamCount = 6,
  color = "rgba(255,255,255,0.5)",
  speed = 8,
}: BeamsBackgroundProps) {
  const beams = useMemo(() => {
    return Array.from({ length: beamCount }, (_, i) => {
      const r = (idx: number) => seededRandom(i * 100 + idx);
      const angle = 30 + r(1) * 120; // 30-150 deg
      const width = 40 + r(2) * 160; // 40-200px
      const top = r(3) * 100; // 0-100%
      const left = r(4) * 100; // 0-100%
      const delay = r(5) * speed; // staggered
      const opacity = 0.03 + r(6) * 0.05; // 0.03-0.08

      return { angle, width, top, left, delay, opacity, id: i };
    });
  }, [beamCount, speed]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Beam layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {beams.map((beam) => (
          <div
            key={beam.id}
            className="absolute animate-beam-sweep"
            style={{
              top: `${beam.top}%`,
              left: `${beam.left}%`,
              width: `${beam.width}px`,
              height: "120%",
              background: `linear-gradient(transparent, ${color}, transparent)`,
              transform: `rotate(${beam.angle}deg)`,
              opacity: beam.opacity,
              animationDuration: `${speed}s`,
              animationDelay: `${beam.delay}s`,
            }}
          />
        ))}
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
