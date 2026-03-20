"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface MeshGradientProps {
  children?: React.ReactNode;
  className?: string;
  /** Array of color values for the gradient blobs */
  colors?: string[];
  /** Animation speed in seconds */
  speed?: number;
  /** Blur strength for the blobs */
  blur?: number;
}

const defaultColors = [
  "rgba(139, 92, 246, 0.3)", // violet
  "rgba(6, 182, 212, 0.3)",  // cyan
  "rgba(236, 72, 153, 0.3)", // pink
  "rgba(16, 185, 129, 0.3)", // emerald
];

export function MeshGradient({
  children,
  className,
  colors = defaultColors,
  speed = 20,
  blur = 100,
}: MeshGradientProps) {
  const blobs = [
    { cx: "10%", cy: "10%", size: "50%", animation: "mesh-blob-1" },
    { cx: "80%", cy: "20%", size: "45%", animation: "mesh-blob-2" },
    { cx: "20%", cy: "80%", size: "55%", animation: "mesh-blob-3" },
    { cx: "75%", cy: "75%", size: "40%", animation: "mesh-blob-4" },
  ];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blob layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {blobs.map((blob, i) => {
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: blob.cx,
                top: blob.cy,
                width: blob.size,
                height: blob.size,
                background: color,
                filter: `blur(${blur}px)`,
                animation: `${blob.animation} ${speed + i * 3}s ease-in-out infinite alternate`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
