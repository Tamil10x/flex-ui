"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Parallax multiplier — controls how far content shifts relative to scroll. Default 0.5 */
  speed?: number;
  /** Which way content moves relative to scroll direction */
  direction?: "up" | "down";
}

export function ParallaxScroll({
  children,
  className,
  speed = 0.5,
  direction = "up",
}: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const magnitude = direction === "up" ? -1 : 1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [magnitude * speed * 100, magnitude * speed * -100]
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
