"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  children: React.ReactNode;
  className?: string;
  /** Beam color */
  color?: string;
  /** Speed in seconds for one revolution */
  speed?: number;
  /** Beam size/length in px */
  beamSize?: number;
  /** Border radius */
  borderRadius?: string;
}

export function BorderBeam({
  children,
  className,
  color = "#389CFD",
  speed = 4,
  beamSize = 80,
  borderRadius = "12px",
}: BorderBeamProps) {
  const borderWidth = 1.5;

  return (
    <div
      className={cn("relative", className)}
      style={{ borderRadius }}
    >
      {/* Rotating conic-gradient border */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius, padding: borderWidth }}
      >
        <div
          className="absolute inset-[-50%] animate-[border-rotate_linear_infinite]"
          style={{
            animationDuration: `${speed}s`,
            background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${color} 78%, transparent 86%, transparent 100%)`,
          }}
        />

        {/* Inner mask to reveal only the border */}
        <div
          className="absolute inset-0 bg-zinc-950"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
            margin: borderWidth,
          }}
        />
      </div>

      {/* Glow layer — same rotating gradient but blurred */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-50"
        style={{ borderRadius, padding: borderWidth }}
      >
        <div
          className="absolute inset-[-50%] animate-[border-rotate_linear_infinite] blur-md"
          style={{
            animationDuration: `${speed}s`,
            background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${color} 78%, transparent 86%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-0 bg-zinc-950"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
            margin: borderWidth,
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          borderRadius,
          padding: borderWidth,
        }}
      >
        <div
          className="bg-zinc-950"
          style={{
            borderRadius: `calc(${borderRadius} - ${borderWidth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
