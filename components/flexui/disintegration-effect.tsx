"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DisintegrationEffectProps {
  children: React.ReactNode;
  className?: string;
  /** Number of particles when disintegrating */
  particleCount?: number;
  /** Duration of the effect in ms */
  duration?: number;
  /** Particle colors */
  colors?: string[];
  /** Trigger the disintegration */
  trigger?: boolean;
  /** Callback when disintegration completes */
  onComplete?: () => void;
}

const DEFAULT_COLORS = ["#8B5CF6", "#389CFD", "#EC4899", "#22D3EE", "#F59E0B"];

// Simple seeded random for deterministic particle positions
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
}

export function DisintegrationEffect({
  children,
  className,
  particleCount = 50,
  duration = 1500,
  colors = DEFAULT_COLORS,
  trigger = false,
  onComplete,
}: DisintegrationEffectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [isDisintegrated, setIsDisintegrated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const generateParticles = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return [];

    const rect = el.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const rand = seededRandom(42);

    const newParticles: ParticleData[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = rand() * Math.PI * 2;
      const spread = 50 + rand() * 100;
      newParticles.push({
        id: i,
        x: rand() * w,
        y: rand() * h,
        size: 3 + rand() * 3,
        color: colors[Math.floor(rand() * colors.length)],
        dx: Math.cos(angle) * spread,
        dy: Math.sin(angle) * spread,
        rot: rand() * 360,
        delay: rand() * (duration * 0.3),
      });
    }
    return newParticles;
  }, [particleCount, duration, colors]);

  useEffect(() => {
    if (trigger) {
      const newParticles = generateParticles();
      setParticles(newParticles);
      setIsDisintegrated(true);

      timerRef.current = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, duration + 100);
    } else {
      // Reassemble: clear particles and show children again
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setParticles([]);
      setIsDisintegrated(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [trigger, generateParticles, duration, onComplete]);

  const particleDurationSec = (duration * 0.7) / 1000;

  return (
    <div ref={wrapperRef} className={cn("relative inline-block", className)}>
      {/* Children with fade transition */}
      <motion.div
        animate={{
          opacity: trigger ? 0 : 1,
        }}
        transition={{
          duration: trigger ? duration / 2000 : 0.4,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>

      {/* Particles layer */}
      {particles.length > 0 && (
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {particles.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-sm"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                // @ts-expect-error CSS custom properties
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--rot": `${p.rot}deg`,
                animation: `disintegrate-particle ${particleDurationSec}s ease-out ${p.delay}ms forwards`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
