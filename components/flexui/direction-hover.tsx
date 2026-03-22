"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DirectionHoverProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
}

type Direction = "top" | "bottom" | "left" | "right";

const variants: Record<Direction, { from: { x: number; y: number }; to: { x: number; y: number } }> = {
  top: { from: { x: 0, y: -100 }, to: { x: 0, y: 100 } },
  bottom: { from: { x: 0, y: 100 }, to: { x: 0, y: -100 } },
  left: { from: { x: -100, y: 0 }, to: { x: 100, y: 0 } },
  right: { from: { x: 100, y: 0 }, to: { x: -100, y: 0 } },
};

export function DirectionHover({ children, overlay, className }: DirectionHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dir, setDir] = useState<Direction>("top");
  const [hovered, setHovered] = useState(false);

  function getDirection(e: React.MouseEvent) {
    if (!ref.current) return "top" as Direction;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / width;
    const y = (e.clientY - top - height / 2) / height;
    if (Math.abs(x) > Math.abs(y)) return x > 0 ? "right" : "left";
    return y > 0 ? "bottom" : "top";
  }

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => { setDir(getDirection(e)); setHovered(true); }}
      onMouseLeave={(e) => { setDir(getDirection(e)); setHovered(false); }}
      className={cn("group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950", className)}
    >
      {children}
      <AnimatePresence>
        {hovered && overlay && (
          <motion.div
            initial={{ ...variants[dir].from, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ ...variants[dir].to, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/90 backdrop-blur-sm"
          >
            {overlay}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
