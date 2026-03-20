"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "200px",
  borderRadius = "12px",
  disabled = false,
  onClick,
}: ShimmerButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden px-8 py-4 text-sm font-semibold",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:shadow-none",
        className
      )}
      style={{ borderRadius }}
    >
      {/* Shimmer sweep */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${shimmerColor}10 45%, ${shimmerColor}20 50%, ${shimmerColor}10 55%, transparent 60%)`,
            backgroundSize: shimmerSize,
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
