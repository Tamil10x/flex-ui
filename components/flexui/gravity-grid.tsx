"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GravityGridProps {
  className?: string;
  /** Grid columns */
  cols?: number;
  /** Grid rows */
  rows?: number;
  /** Dot size in px */
  dotSize?: number;
  /** Dot color */
  color?: string;
  /** Effect radius in px */
  radius?: number;
  /** Effect: "attract" pulls dots toward cursor, "repel" pushes away */
  effect?: "attract" | "repel";
  children?: React.ReactNode;
}

export function GravityGrid({
  className,
  cols = 10,
  rows = 10,
  dotSize = 4,
  color = "rgba(139,92,246,0.4)",
  radius = 100,
  effect = "repel",
  children,
}: GravityGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const totalDots = cols * rows;

  const setDotRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      dotRefs.current[index] = el;
    },
    []
  );

  const updateDots = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const mouse = mouseRef.current;
    const dots = dotRefs.current;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      if (!dot) continue;

      if (!mouse) {
        dot.style.transform = "translate(0px, 0px)";
        continue;
      }

      const rect = dot.getBoundingClientRect();
      const dotCenterX = rect.left + rect.width / 2;
      const dotCenterY = rect.top + rect.height / 2;

      const dx = dotCenterX - mouse.x;
      const dy = dotCenterY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius && dist > 0) {
        const force = (1 - dist / radius) * 20;
        const angle = Math.atan2(dy, dx);
        const direction = effect === "repel" ? 1 : -1;
        const tx = Math.cos(angle) * force * direction;
        const ty = Math.sin(angle) * force * direction;
        dot.style.transform = `translate(${tx}px, ${ty}px)`;
      } else {
        dot.style.transform = "translate(0px, 0px)";
      }
    }
  }, [radius, effect]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateDots);
    },
    [updateDots]
  );

  const onMouseLeave = useCallback(() => {
    mouseRef.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateDots);
  }, [updateDots]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Grid layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 grid place-items-center"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalDots }, (_, i) => (
          <div
            key={i}
            ref={setDotRef(i)}
            className="rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: color,
              transition: "transform 0.15s ease-out",
            }}
          />
        ))}
      </div>

      {/* Children render centered on top */}
      {children && (
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
