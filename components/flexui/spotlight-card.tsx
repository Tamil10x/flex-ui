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

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  /** Spotlight color as CSS rgb values e.g. "56,189,248" */
  spotlightColor?: string;
  /** Spotlight radius in px */
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "56,189,248",
  spotlightSize = 350,
}: SpotlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for cursor position — no re-renders on move
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring-based tracking
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30, mass: 0.5 });

  // Opacity for spotlight visibility
  const spotlightOpacity = useMotionValue(0);
  const springOpacity = useSpring(spotlightOpacity, {
    stiffness: 200,
    damping: 25,
  });

  // Derived radial-gradient background (stays in motion-value pipeline, zero re-renders)
  const spotlightBg = useTransform(
    [springX, springY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${spotlightSize}px circle at ${x}px ${y}px, rgba(${spotlightColor},0.15), transparent 65%)`
  );

  const borderGlowBg = useTransform(
    [springX, springY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${spotlightSize * 1.5}px circle at ${x}px ${y}px, rgba(${spotlightColor},0.06), transparent 65%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    spotlightOpacity.set(1);
  }, [spotlightOpacity]);

  const handleMouseLeave = useCallback(() => {
    spotlightOpacity.set(0);
  }, [spotlightOpacity]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-shadow duration-500 hover:border-white/[0.15] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Spotlight gradient overlay — follows cursor via motion style */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          opacity: springOpacity,
          background: spotlightBg,
        }}
      />

      {/* Border glow overlay — brightens near cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: borderGlowBg,
        }}
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
