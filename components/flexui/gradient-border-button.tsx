"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientBorderButtonProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  borderWidth?: number;
  speed?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export function GradientBorderButton({
  children,
  className,
  colors = ["#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#6366f1"],
  borderWidth = 1.5,
  speed = 3,
  onClick,
  disabled = false,
}: GradientBorderButtonProps) {
  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative px-8 py-4 text-sm font-semibold rounded-xl",
        "text-white",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      style={{ padding: 0 }}
    >
      {/* Outer wrapper with rotating gradient border */}
      <span
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{
          padding: borderWidth,
        }}
      >
        <span
          className="absolute inset-[-50%] animate-[border-rotate_linear_infinite]"
          style={{
            background: gradient,
            animationDuration: `${speed}s`,
          }}
        />
      </span>
      {/* Inner solid background */}
      <span
        className="relative z-10 block rounded-xl bg-zinc-950 px-8 py-4"
        style={{
          margin: borderWidth,
        }}
      >
        {children}
      </span>
    </motion.button>
  );
}
