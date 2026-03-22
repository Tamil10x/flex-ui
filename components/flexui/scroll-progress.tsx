"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
  position?: "top" | "bottom";
}

export function ScrollProgress({
  className,
  color = "linear-gradient(to right, #3b82f6, #06b6d4)",
  height = 3,
  position = "top",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      className={cn("fixed left-0 right-0 z-50 origin-left", className)}
      style={{
        scaleX,
        [position === "top" ? "top" : "bottom"]: 0,
        height,
        background: color,
      }}
    />
  );
}
