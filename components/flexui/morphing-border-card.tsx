"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingBorderCardProps {
  children: React.ReactNode;
  className?: string;
  /** Gradient colors as array of CSS rgb strings */
  colors?: string[];
  /** Border width in px */
  borderWidth?: number;
  /** Animation speed in seconds for full rotation */
  speed?: number;
  /** Glow intensity on hover 0-1 */
  glowIntensity?: number;
}

export function MorphingBorderCard({
  children,
  className,
  colors = ["139,92,246", "59,130,246", "16,185,129", "245,158,11"],
  borderWidth = 1.5,
  speed = 4,
  glowIntensity = 0.6,
}: MorphingBorderCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const isHovered = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const springHover = useSpring(isHovered, { stiffness: 200, damping: 20 });

  // Dynamic glow intensity based on hover + cursor position
  const glowOpacity = useTransform(springHover, [0, 1], [0.1, glowIntensity]);

  // Cursor-reactive inner spotlight
  const innerSpotlight = useTransform(
    [smoothX, smoothY] as MotionValue[],
    ([x, y]: number[]) => {
      const px = x * 100;
      const py = y * 100;
      return `radial-gradient(300px circle at ${px}% ${py}%, rgba(${colors[0]},0.08), transparent 50%)`;
    }
  );

  // Build the conic gradient string from colors
  const conicGradient = (() => {
    const stops = colors.map((c, i) => {
      const angle = (360 / colors.length) * i;
      return `rgba(${c},0.8) ${angle}deg`;
    });
    // Close the loop
    stops.push(`rgba(${colors[0]},0.8) 360deg`);
    return `conic-gradient(from var(--border-angle, 0deg), ${stops.join(", ")})`;
  })();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    isHovered.set(1);
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    isHovered.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [isHovered, mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("group relative rounded-2xl", className)}
    >
      {/* Animated rotating border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: borderWidth,
          background: conicGradient,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `border-rotate ${speed}s linear infinite`,
        }}
      />

      {/* Outer glow — pulsates with border */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-[1] rounded-2xl blur-md"
        style={{
          opacity: glowOpacity,
          background: conicGradient,
          animation: `border-rotate ${speed}s linear infinite`,
        }}
      />

      {/* Card body */}
      <div className="relative z-[2] rounded-2xl bg-zinc-950/90 backdrop-blur-xl">
        {/* Inner spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: innerSpotlight }}
        />

        {/* Top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/[0.15] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Content */}
        <div className="relative z-[5]">{children}</div>
      </div>
    </motion.div>
  );
}
