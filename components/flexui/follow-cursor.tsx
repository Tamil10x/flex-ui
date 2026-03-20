"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface FollowCursorProps {
  className?: string;
  /** Cursor dot color as CSS rgba string */
  color?: string;
  /** Dot diameter in px */
  size?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
}

export function FollowCursor({
  className,
  color = "rgba(139,92,246,0.5)",
  size = 24,
  stiffness = 300,
  damping = 25,
}: FollowCursorProps) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const opacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness, damping });
  const springY = useSpring(y, { stiffness, damping });
  const springOpacity = useSpring(opacity, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - size / 2);
      y.set(e.clientY - size / 2);
      opacity.set(1);
    };

    const handleMouseLeave = () => {
      opacity.set(0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, opacity, size]);

  return (
    <motion.div
      className={cn("pointer-events-none fixed z-50 rounded-full", className)}
      style={{
        left: springX,
        top: springY,
        width: size,
        height: size,
        opacity: springOpacity,
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${size / 2}px ${color}`,
      }}
    />
  );
}
