"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface CursorGlowProps {
  children: React.ReactNode;
  className?: string;
  /** Glow color as CSS rgb values e.g. "139,92,246" */
  glowColor?: string;
  /** Secondary glow color for dual-tone effect */
  secondaryColor?: string;
  /** Glow radius in px */
  glowSize?: number;
  /** Glow opacity 0-1 */
  glowOpacity?: number;
  /** Enable trailing glow effect */
  trail?: boolean;
  /** Enable border glow */
  borderGlow?: boolean;
}

export function CursorGlow({
  children,
  className,
  glowColor = "139,92,246",
  secondaryColor = "59,130,246",
  glowSize = 300,
  glowOpacity = 0.15,
  trail = true,
  borderGlow = true,
}: CursorGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Fast glow — follows cursor tightly
  const fastSpringX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.3 });
  const fastSpringY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.3 });

  // Trail glow — lags behind for ghost effect
  const trailSpringX = useSpring(mouseX, { stiffness: 80, damping: 35, mass: 1.0 });
  const trailSpringY = useSpring(mouseY, { stiffness: 80, damping: 35, mass: 1.0 });

  const visibility = useMotionValue(0);
  const springVisibility = useSpring(visibility, { stiffness: 200, damping: 20 });

  // Primary glow
  const primaryGlow = useTransform(
    [fastSpringX, fastSpringY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${glowSize}px circle at ${x}px ${y}px, rgba(${glowColor},${glowOpacity}), transparent 55%)`
  );

  // Trail glow — larger, dimmer, different color
  const trailGlow = useTransform(
    [trailSpringX, trailSpringY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(${glowSize * 1.5}px circle at ${x}px ${y}px, rgba(${secondaryColor},${glowOpacity * 0.6}), transparent 50%)`
  );

  // Border proximity glow
  const borderGlowBg = useMotionTemplate`radial-gradient(${glowSize * 0.8}px circle at ${fastSpringX}px ${fastSpringY}px, rgba(${glowColor},0.06), transparent 60%)`;

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
    visibility.set(1);
  }, [visibility]);

  const handleMouseLeave = useCallback(() => {
    visibility.set(0);
  }, [visibility]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("group relative overflow-hidden", className)}
    >
      {/* Primary glow layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ opacity: springVisibility, background: primaryGlow }}
      />

      {/* Trail glow layer — delayed ghost */}
      {trail && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-screen"
          style={{ opacity: springVisibility, background: trailGlow }}
        />
      )}

      {/* Border glow */}
      {borderGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit]"
          style={{ opacity: springVisibility, background: borderGlowBg }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
