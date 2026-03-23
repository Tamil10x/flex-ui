"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function GlowButton({
  children,
  className,
  glowColor = "rgba(56,189,248,0.5)",
  onClick,
  disabled = false,
}: GlowButtonProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      whileHover={disabled || reducedMotion ? undefined : { scale: 1.04 }}
      whileTap={disabled || reducedMotion ? undefined : { scale: 0.97 }}
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:-translate-y-0.5",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        className
      )}
      style={{
        boxShadow: disabled
          ? undefined
          : `0 0 20px ${glowColor}, 0 0 60px ${glowColor.replace(/[\d.]+\)$/, "0.15)")}`,
        animation: disabled || reducedMotion ? undefined : "glow-pulse 2s ease-in-out infinite",
        // @ts-expect-error CSS custom property
        "--glow-color": glowColor,
        "--glow-color-intense": glowColor.replace(/[\d.]+\)$/, "0.8)"),
        "--glow-color-soft": glowColor.replace(/[\d.]+\)$/, "0.15)"),
      }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
