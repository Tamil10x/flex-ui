"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonGlowCardProps {
  children: React.ReactNode;
  className?: string;
  /** Neon color */
  color?: string;
  /** Glow intensity */
  intensity?: number;
  /** Pulse animation */
  pulse?: boolean;
}

export function NeonGlowCard({
  children,
  className,
  color = "#389CFD",
  intensity = 1,
  pulse = true,
}: NeonGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePos(null);
  }, []);

  const glowOpacity = isHovered ? 0.8 * intensity : 0.4 * intensity;
  const borderOpacity = isHovered ? 0.6 : 0.25;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-zinc-950/80 backdrop-blur-xl",
        pulse && "neon-pulse",
        className
      )}
      style={
        {
          "--neon-color": color,
          "--glow-opacity": glowOpacity,
          "--border-opacity": borderOpacity,
          boxShadow: [
            `0 0 ${15 * intensity}px ${color}${Math.round(glowOpacity * 40)
              .toString(16)
              .padStart(2, "0")}`,
            `0 0 ${30 * intensity}px ${color}${Math.round(glowOpacity * 25)
              .toString(16)
              .padStart(2, "0")}`,
            `0 0 ${60 * intensity}px ${color}${Math.round(glowOpacity * 15)
              .toString(16)
              .padStart(2, "0")}`,
            `inset 0 0 ${20 * intensity}px ${color}${Math.round(
              glowOpacity * 10
            )
              .toString(16)
              .padStart(2, "0")}`,
          ].join(", "),
          border: `1px solid ${color}${Math.round(borderOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`,
        } as React.CSSProperties
      }
    >
      {/* Cursor-tracking radial glow overlay */}
      {mousePos && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, ${color}20, transparent 65%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
