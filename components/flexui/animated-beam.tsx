"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  className?: string;
  /** SVG path data string */
  pathData: string;
  /** Beam color */
  color?: string;
  /** Beam width */
  width?: number;
  /** Speed in seconds for one traversal */
  speed?: number;
  /** Track color (the path line) */
  trackColor?: string;
  /** Delay before starting */
  delay?: number;
}

export function AnimatedBeam({
  className,
  pathData,
  color = "#389CFD",
  width = 2,
  speed = 3,
  trackColor = "rgba(255,255,255,0.06)",
  delay = 0,
}: AnimatedBeamProps) {
  const uid = useId();
  const filterId = `beam-glow-${uid}`;
  const gradientId = `beam-grad-${uid}`;

  // Dash length controls how long the bright segment is
  const dashLength = 60;
  // Total dash-array: bright segment + transparent gap
  // The gap needs to be very large so only one bright segment is visible at a time
  const dashGap = 2000;

  return (
    <svg
      className={cn("pointer-events-none", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Glow filter */}
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient along path for extra fade */}
        <linearGradient id={gradientId}>
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="30%" stopColor={color} stopOpacity="1" />
          <stop offset="70%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Track: dim line showing the route */}
      <path
        d={pathData}
        stroke={trackColor}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
      />

      {/* Beam: bright segment traveling along the path */}
      <path
        d={pathData}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        fill="none"
        filter={`url(#${filterId})`}
        strokeDasharray={`${dashLength} ${dashGap}`}
        className="animate-beam-travel"
        style={{
          animationDuration: `${speed}s`,
          animationDelay: `${delay}s`,
        }}
      />
    </svg>
  );
}
