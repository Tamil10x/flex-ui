"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function SpotlightBorder({ children, className, color = "56,189,248" }: SpotlightBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const opacity = useMotionValue(0);
  const springOpacity = useSpring(opacity, { stiffness: 200, damping: 25 });

  const borderBg = useTransform(
    [springX, springY] as MotionValue[],
    ([x, y]: number[]) =>
      `radial-gradient(300px circle at ${x}px ${y}px, rgba(${color},0.4), transparent 70%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={cn("relative rounded-2xl p-px", className)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: borderBg, opacity: springOpacity }}
      />
      <div className="relative rounded-2xl bg-zinc-950 p-6">{children}</div>
    </div>
  );
}
