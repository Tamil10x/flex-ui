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

interface AuroraCardProps {
  children: React.ReactNode;
  className?: string;
  /** Primary aurora color as CSS rgb values e.g. "139,92,246" */
  primaryColor?: string;
  /** Secondary aurora color as CSS rgb values e.g. "59,130,246" */
  secondaryColor?: string;
  /** Tertiary aurora color as CSS rgb values e.g. "16,185,129" */
  tertiaryColor?: string;
  /** Aurora intensity 0-1 */
  intensity?: number;
  /** Aurora spread radius in px */
  spread?: number;
}

export function AuroraCard({
  children,
  className,
  primaryColor = "139,92,246",
  secondaryColor = "59,130,246",
  tertiaryColor = "16,185,129",
  intensity = 0.7,
  spread = 400,
}: AuroraCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Slower secondary aurora with different spring
  const slowSpringX = useSpring(mouseX, { stiffness: 50, damping: 40, mass: 1.2 });
  const slowSpringY = useSpring(mouseY, { stiffness: 50, damping: 40, mass: 1.2 });

  const spotlightOpacity = useMotionValue(0);
  const springOpacity = useSpring(spotlightOpacity, { stiffness: 120, damping: 20 });

  // Primary aurora — follows cursor closely
  const primaryBg = useTransform(
    [springX, springY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${spread}px circle at ${x}px ${y}px, rgba(${primaryColor},${0.2 * intensity}), transparent 60%)`
  );

  // Secondary aurora — lags behind, offset
  const secondaryBg = useTransform(
    [slowSpringX, slowSpringY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${spread * 1.3}px circle at ${x + 60}px ${y - 40}px, rgba(${secondaryColor},${0.15 * intensity}), transparent 55%)`
  );

  // Tertiary aurora — largest, most delayed
  const tertiaryBg = useTransform(
    [slowSpringX, slowSpringY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${spread * 1.6}px circle at ${x - 80}px ${y + 50}px, rgba(${tertiaryColor},${0.12 * intensity}), transparent 50%)`
  );

  // Edge glow — concentrated near cursor
  const edgeGlow = useTransform(
    [springX, springY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${spread * 0.6}px circle at ${x}px ${y}px, rgba(${primaryColor},${0.08 * intensity}), transparent 70%)`
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
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-shadow duration-700 hover:border-white/[0.15] hover:shadow-[0_25px_70px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      {/* Primary aurora layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ opacity: springOpacity, background: primaryBg }}
      />

      {/* Secondary aurora layer — offset and delayed */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
        style={{ opacity: springOpacity, background: secondaryBg }}
      />

      {/* Tertiary aurora layer — widest spread */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-screen"
        style={{ opacity: springOpacity, background: tertiaryBg }}
      />

      {/* Edge glow for border illumination */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[4] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: edgeGlow }}
      />

      {/* Ambient shimmer — CSS only, always running */}
      <div className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-700 group-hover:opacity-30">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, rgba(${primaryColor},0.05) 0%, transparent 40%, rgba(${secondaryColor},0.05) 60%, transparent 80%, rgba(${tertiaryColor},0.05) 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
