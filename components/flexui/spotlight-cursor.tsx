"use client";

import React, { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCursorProps {
  className?: string;
  /** Spotlight diameter in px */
  size?: number;
  /** Spotlight color as CSS RGB values e.g. "255,255,255" */
  color?: string;
  /** Spotlight peak opacity */
  opacity?: number;
}

export function SpotlightCursor({
  className,
  size = 400,
  color = "255,255,255",
  opacity: peakOpacity = 0.06,
}: SpotlightCursorProps) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const visible = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 30 });
  const springY = useSpring(y, { stiffness: 200, damping: 30 });
  const springOpacity = useSpring(visible, { stiffness: 300, damping: 20 });

  const background = useMotionTemplate`radial-gradient(${size}px circle at ${springX}px ${springY}px, rgba(${color},${peakOpacity}), transparent 65%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      visible.set(1);
    };

    const handleMouseLeave = () => {
      visible.set(0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, visible]);

  return (
    <motion.div
      className={cn("pointer-events-none fixed inset-0 z-30", className)}
      style={{
        background,
        opacity: springOpacity,
      }}
    />
  );
}
