"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlobCursorProps {
  className?: string;
  /** Blob color as CSS rgba string */
  color?: string;
  /** Blob diameter in px */
  size?: number;
}

export function BlobCursor({
  className,
  color = "rgba(56,189,248,0.3)",
  size = 120,
}: BlobCursorProps) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const opacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 15 });
  const springY = useSpring(y, { stiffness: 50, damping: 15 });
  const springOpacity = useSpring(opacity, { stiffness: 200, damping: 20 });

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
      className={cn("pointer-events-none fixed z-40 rounded-full", className)}
      style={{
        left: springX,
        top: springY,
        width: size,
        height: size,
        opacity: springOpacity,
        backgroundColor: color,
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
