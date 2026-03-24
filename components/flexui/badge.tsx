"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "purple" | "gradient";
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

/* ── Constants ────────────────────────────────────────────────────────────── */

const variantStyles: Record<string, { base: string; dot: string; glowColor: string }> = {
  default: {
    base: "bg-white/[0.06] text-white/80 border-white/[0.08]",
    dot: "bg-white/60",
    glowColor: "rgba(255,255,255,0.06)",
  },
  success: {
    base: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
    glowColor: "rgba(52,211,153,0.15)",
  },
  warning: {
    base: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
    glowColor: "rgba(251,191,36,0.15)",
  },
  error: {
    base: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
    glowColor: "rgba(248,113,113,0.15)",
  },
  info: {
    base: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
    glowColor: "rgba(96,165,250,0.15)",
  },
  purple: {
    base: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    dot: "bg-violet-400",
    glowColor: "rgba(167,139,250,0.15)",
  },
  gradient: {
    base: "bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-violet-500/10 text-white/90 border-white/[0.08]",
    dot: "bg-gradient-to-r from-violet-400 to-cyan-400",
    glowColor: "rgba(139,92,246,0.12)",
  },
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px] gap-1",
  md: "px-2.5 py-0.5 text-xs gap-1.5",
  lg: "px-3 py-1 text-sm gap-1.5",
};

/* ── Component ────────────────────────────────────────────────────────────── */

export function Badge({
  children,
  variant = "default",
  size = "md",
  pulse,
  glow,
  icon,
  className,
}: BadgeProps) {
  const v = variantStyles[variant] || variantStyles.default;

  return (
    <motion.span
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        v.base,
        sizeStyles[size],
        className
      )}
      style={glow ? { boxShadow: `0 0 12px -2px ${v.glowColor}` } : undefined}
    >
      {/* Pulse dot */}
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              v.dot
            )}
          />
          <span className={cn("relative inline-flex h-2 w-2 rounded-full", v.dot)} />
        </span>
      )}

      {/* Icon */}
      {icon && <span className="shrink-0">{icon}</span>}

      {children}
    </motion.span>
  );
}
