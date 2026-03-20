"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
  rotation: number;
}

interface ConfettiButtonProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const CONFETTI_COLORS = [
  "#8b5cf6", // violet
  "#22d3ee", // cyan
  "#ec4899", // pink
  "#eab308", // yellow
  "#10b981", // emerald
];

let particleId = 0;

export function ConfettiButton({
  children,
  className,
  particleCount = 20,
  onClick,
  disabled = false,
}: ConfettiButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const newParticles: Particle[] = Array.from(
        { length: particleCount },
        () => ({
          id: ++particleId,
          x: cx,
          y: cy,
          color:
            CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          size: 3 + Math.random() * 3,
          angle: Math.random() * 360,
          distance: 40 + Math.random() * 60,
          rotation: Math.random() * 360,
        })
      );

      setParticles((prev) => [...prev, ...newParticles]);
      onClick?.();
    },
    [disabled, onClick, particleCount]
  );

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.04 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative overflow-visible px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:shadow-none",
        className
      )}
    >
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <span
            key={p.id}
            className="absolute rounded-sm pointer-events-none animate-[confetti-burst_800ms_ease-out_forwards]"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              // @ts-expect-error CSS custom properties
              "--confetti-tx": `${tx}px`,
              "--confetti-ty": `${ty}px`,
              "--confetti-rot": `${p.rotation}deg`,
            }}
            onAnimationEnd={() => removeParticle(p.id)}
          />
        );
      })}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
