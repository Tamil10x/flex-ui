"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface RetroGridProps {
  children?: React.ReactNode;
  className?: string;
  /** Grid line color */
  color?: string;
  /** Grid cell size */
  cellSize?: number;
  /** Angle of perspective */
  angle?: number;
  /** Animate the grid scrolling toward viewer */
  animate?: boolean;
  /** Speed of scroll animation */
  speed?: number;
}

export function RetroGrid({
  children,
  className,
  color = "rgba(139,92,246,0.15)",
  cellSize = 40,
  angle = 65,
  animate = true,
  speed = 1,
}: RetroGridProps) {
  const duration = 4 / speed;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Grid plane with perspective */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ perspective: "200px" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transformOrigin: "center top",
            transform: `rotateX(${angle}deg)`,
            // Extend the grid well below the container for perspective effect
            top: "60%",
            bottom: "-100%",
            left: "-50%",
            right: "-50%",
            backgroundImage: `repeating-linear-gradient(
              0deg,
              ${color} 0px,
              ${color} 1px,
              transparent 1px,
              transparent ${cellSize}px
            ),
            repeating-linear-gradient(
              90deg,
              ${color} 0px,
              ${color} 1px,
              transparent 1px,
              transparent ${cellSize}px
            )`,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            ...(animate
              ? {
                  animation: `retro-grid-scroll ${duration}s linear infinite`,
                }
              : {}),
          }}
        />
        {/* Top horizon fade mask */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, currentColor 0%, currentColor 55%, transparent 80%, transparent 100%)",
            color: "var(--color-background, #000)",
          }}
        />
      </div>

      {/* Children on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
