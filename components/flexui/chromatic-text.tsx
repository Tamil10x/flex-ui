"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ChromaticTextProps {
  children: string;
  className?: string;
  /** Split distance in px */
  offset?: number;
  /** Trigger on hover or always active */
  trigger?: "hover" | "always";
  /** RGB channel colors */
  colors?: [string, string, string];
}

export function ChromaticText({
  children,
  className,
  offset = 3,
  trigger = "hover",
  colors = ["#ff0000", "#00ff00", "#0000ff"],
}: ChromaticTextProps) {
  const [hovered, setHovered] = useState(false);
  const isActive = trigger === "always" || hovered;

  return (
    <span
      className={cn("relative inline-block cursor-default select-none", className)}
      onMouseEnter={trigger === "hover" ? () => setHovered(true) : undefined}
      onMouseLeave={trigger === "hover" ? () => setHovered(false) : undefined}
    >
      {/* Base (visible) text — white */}
      <span className="relative z-10 text-white">{children}</span>

      {/* Red channel — shifts left */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          color: colors[0],
          mixBlendMode: "screen",
        }}
        animate={{
          x: isActive ? -offset : 0,
          opacity: isActive ? 0.8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: isActive ? 0 : 0.05,
        }}
      >
        {children}
      </motion.span>

      {/* Green channel — stays centered */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          color: colors[1],
          mixBlendMode: "screen",
        }}
        animate={{
          x: 0,
          opacity: isActive ? 0.8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: isActive ? 0.03 : 0.03,
        }}
      >
        {children}
      </motion.span>

      {/* Blue channel — shifts right */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          color: colors[2],
          mixBlendMode: "screen",
        }}
        animate={{
          x: isActive ? offset : 0,
          opacity: isActive ? 0.8 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: isActive ? 0.06 : 0,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
