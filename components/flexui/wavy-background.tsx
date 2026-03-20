"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  /** Number of wave lines */
  waveCount?: number;
  /** Wave color */
  color?: string;
  /** Animation speed in seconds */
  speed?: number;
  /** Wave amplitude */
  amplitude?: number;
}

function buildWavePath(
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  phase: number,
  yOffset: number
): string {
  const points: string[] = [];
  const step = 10;
  for (let x = 0; x <= width; x += step) {
    const y =
      yOffset +
      Math.sin((x / width) * Math.PI * 2 * frequency + phase) * amplitude;
    points.push(`${x},${y}`);
  }
  return `M${points[0]} ${points.slice(1).map((p) => `L${p}`).join(" ")}`;
}

export function WavyBackground({
  children,
  className,
  waveCount = 5,
  color = "rgba(255, 255, 255, 0.1)",
  speed = 15,
  amplitude = 30,
}: WavyBackgroundProps) {
  const svgWidth = 2400;
  const svgHeight = 600;

  const waves = Array.from({ length: waveCount }, (_, i) => {
    const waveAmplitude = amplitude * (1 - i * 0.12);
    const frequency = 1.5 + i * 0.3;
    const phase = (i * Math.PI) / 3;
    const yOffset = svgHeight * 0.3 + i * (svgHeight * 0.1);
    const opacity = 0.15 - i * (0.1 / waveCount);

    return {
      d: buildWavePath(svgWidth, svgHeight, waveAmplitude, frequency, phase, yOffset),
      opacity: Math.max(opacity, 0.05),
      animationDuration: speed + i * 2,
    };
  });

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* SVG wave layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          className="h-full w-full"
          style={{ animation: `wave-drift ${speed}s linear infinite` }}
        >
          {waves.map((wave, i) => (
            <path
              key={i}
              d={wave.d}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeOpacity={wave.opacity}
              style={{
                animation: `wave-drift ${wave.animationDuration}s linear infinite`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
