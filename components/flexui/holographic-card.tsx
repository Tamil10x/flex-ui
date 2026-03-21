"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  /** Intensity of the holographic effect (0-1) */
  intensity?: number;
}

export function HolographicCard({
  children,
  className,
  intensity = 0.6,
}: HolographicCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({
    "--holo-x": "50%",
    "--holo-y": "50%",
    "--holo-angle": "0deg",
    "--holo-brightness": "1",
  } as React.CSSProperties);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;

      // Angle from center for conic-gradient rotation
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);

      // Brightness boost near cursor
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
      const brightness = 1 + (1 - dist / maxDist) * 0.4 * intensity;

      setStyle({
        "--holo-x": `${px}%`,
        "--holo-y": `${py}%`,
        "--holo-angle": `${angle}deg`,
        "--holo-brightness": `${brightness}`,
      } as React.CSSProperties);
    },
    [intensity]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-shadow duration-500 hover:border-white/[0.15] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]",
        className
      )}
      style={style}
    >
      {/* Holographic rainbow overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? intensity : intensity * 0.15,
          background: `conic-gradient(
            from var(--holo-angle, 0deg) at var(--holo-x, 50%) var(--holo-y, 50%),
            rgba(255,0,0,0.4),
            rgba(255,165,0,0.4),
            rgba(255,255,0,0.4),
            rgba(0,200,0,0.4),
            rgba(0,255,255,0.4),
            rgba(0,100,255,0.4),
            rgba(148,0,211,0.4),
            rgba(255,0,0,0.4)
          )`,
          mixBlendMode: "color-dodge",
          filter: `brightness(var(--holo-brightness, 1))`,
        }}
      />

      {/* Secondary radial highlight at cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.3 * intensity : 0,
          background: `radial-gradient(
            400px circle at var(--holo-x, 50%) var(--holo-y, 50%),
            rgba(255,255,255,0.25),
            transparent 60%
          )`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Noise texture overlay for authenticity */}
      <div
        className="pointer-events-none absolute inset-0 z-10 mix-blend-overlay"
        style={{
          opacity: 0.35,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
