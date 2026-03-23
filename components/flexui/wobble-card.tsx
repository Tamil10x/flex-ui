"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface WobbleCardProps {
  children: React.ReactNode;
  className?: string;
}

export function WobbleCard({ children, className }: WobbleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(y * -20);
      rotateY.set(x * 20);
    },
    [rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
