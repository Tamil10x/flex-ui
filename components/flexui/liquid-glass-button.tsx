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

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Glass tint color as CSS rgb values e.g. "139,92,246" */
  tintColor?: string;
  /** Refraction intensity 0-1 */
  refractionIntensity?: number;
  /** Button size variant */
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
}

export function LiquidGlassButton({
  children,
  className,
  tintColor = "139,92,246",
  refractionIntensity = 0.8,
  size = "md",
  onClick,
  disabled,
}: LiquidGlassButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 200, damping: 25, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const spotlightOpacity = useMotionValue(0);
  const springOpacity = useSpring(spotlightOpacity, { stiffness: 150, damping: 20 });

  // Liquid distortion — shifts background position based on cursor
  const bgPosX = useTransform(smoothX, [0, 1], [-20, 20]);
  const bgPosY = useTransform(smoothY, [0, 1], [-20, 20]);

  // Refraction highlight — bright spot follows cursor
  const refractionBg = useMotionTemplate`radial-gradient(120px circle at ${useTransform(smoothX, [0, 1], [0, 100])}% ${useTransform(smoothY, [0, 1], [0, 100])}%, rgba(255,255,255,${0.25 * refractionIntensity}), transparent 60%)`;

  // Glass caustic — colored light refraction
  const causticBg = useTransform(
    [smoothX, smoothY] as MotionValue[],
    ([x, y]: number[]) => {
      const px = x * 100;
      const py = y * 100;
      return `radial-gradient(80px circle at ${px}% ${py}%, rgba(${tintColor},${0.3 * refractionIntensity}), transparent 50%)`;
    }
  );

  // Surface distortion — subtle warp effect
  const skewX = useTransform(smoothX, [0, 1], [-1.5, 1.5]);
  const skewY = useTransform(smoothY, [0, 1], [-0.8, 0.8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    spotlightOpacity.set(1);
  }, [spotlightOpacity]);

  const handleMouseLeave = useCallback(() => {
    spotlightOpacity.set(0);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [spotlightOpacity, mouseX, mouseY]);

  const sizeClasses = {
    sm: "px-5 py-2.5 text-xs",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-4.5 text-base",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      whileTap={{ scale: 0.97 }}
      style={{
        skewX,
        skewY,
        backgroundPositionX: bgPosX,
        backgroundPositionY: bgPosY,
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl font-semibold",
        "border border-white/[0.15] bg-white/[0.06] backdrop-blur-2xl",
        "text-white transition-all duration-300",
        "hover:border-white/[0.25] hover:bg-white/[0.1]",
        "hover:shadow-[0_8px_40px_-8px_rgba(139,92,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
        "disabled:pointer-events-none disabled:opacity-50",
        sizeClasses[size],
        className
      )}
    >
      {/* Refraction highlight — white light spot */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] rounded-xl"
        style={{ opacity: springOpacity, background: refractionBg }}
      />

      {/* Caustic color — tinted refraction */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] rounded-xl mix-blend-overlay"
        style={{ opacity: springOpacity, background: causticBg }}
      />

      {/* Inner glass edge — top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-px bg-gradient-to-r from-transparent via-white/[0.3] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Bottom edge shadow for glass depth */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
