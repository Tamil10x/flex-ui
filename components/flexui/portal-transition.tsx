"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PortalTransitionProps {
  children: React.ReactNode;
  className?: string;
  /** Portal color */
  color?: string;
  /** Whether the portal is open */
  isOpen?: boolean;
  /** Duration in seconds */
  duration?: number;
}

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: 60 + Math.random() * 80,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 0.4,
    duration: 0.4 + Math.random() * 0.4,
  }));
}

export function PortalTransition({
  children,
  className,
  color = "#8B5CF6",
  isOpen = false,
  duration = 0.8,
}: PortalTransitionProps) {
  const [particles] = useState<Particle[]>(() => generateParticles(24));
  const [showParticles, setShowParticles] = useState(false);
  const prevOpenRef = useRef(isOpen);

  // Trigger particles on transition
  useEffect(() => {
    if (isOpen !== prevOpenRef.current) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), duration * 1000 + 400);
      prevOpenRef.current = isOpen;
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration]);

  const hexToRgb = useCallback((hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }, []);

  const rgb = hexToRgb(color);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        className
      )}
      style={{
        background: `radial-gradient(ellipse at center, rgba(${rgb}, 0.08) 0%, rgba(0,0,0,0.95) 70%)`,
      }}
    >
      {/* Portal content with clip-path */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="portal-content"
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow ring */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="glow-ring"
            className="pointer-events-none absolute inset-0 z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration * 1.5, ease: "easeOut" }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 rounded-full"
              initial={{
                width: 0,
                height: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                width: "300%",
                height: "300%",
                x: "-50%",
                y: "-50%",
              }}
              transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
              style={{
                border: `2px solid rgba(${rgb}, 0.6)`,
                boxShadow: `0 0 30px rgba(${rgb}, 0.4), 0 0 60px rgba(${rgb}, 0.2), inset 0 0 30px rgba(${rgb}, 0.1)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {showParticles && (
          <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
            {particles.map((p) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.cos(rad) * p.distance;
              const y = Math.sin(rad) * p.distance;
              return (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x,
                    y,
                    opacity: 0,
                    scale: 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    ease: "easeOut",
                  }}
                  style={{
                    width: p.size,
                    height: p.size,
                    background: color,
                    boxShadow: `0 0 ${p.size * 2}px rgba(${rgb}, 0.8)`,
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Closed state placeholder */}
      {!isOpen && (
        <div className="flex min-h-[200px] items-center justify-center">
          <motion.div
            className="rounded-full"
            animate={{
              boxShadow: [
                `0 0 20px rgba(${rgb}, 0.3), 0 0 40px rgba(${rgb}, 0.1)`,
                `0 0 30px rgba(${rgb}, 0.5), 0 0 60px rgba(${rgb}, 0.2)`,
                `0 0 20px rgba(${rgb}, 0.3), 0 0 40px rgba(${rgb}, 0.1)`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 12,
              height: 12,
              background: color,
            }}
          />
        </div>
      )}
    </div>
  );
}
