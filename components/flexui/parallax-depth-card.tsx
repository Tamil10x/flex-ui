"use client";

import React, { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxLayer {
  children: React.ReactNode;
  /** Depth multiplier — higher = more movement. Default layers: 0.5, 1, 1.5 */
  depth?: number;
  className?: string;
}

interface ParallaxDepthCardProps {
  /** Use ParallaxDepthCard.Layer for each depth plane */
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt angle in degrees */
  maxTilt?: number;
  /** Maximum parallax shift in px */
  maxShift?: number;
  /** Perspective depth in px */
  perspective?: number;
  /** Scale on hover */
  hoverScale?: number;
}

function ParallaxLayer({ children, depth = 1, className }: ParallaxLayer) {
  return (
    <div data-parallax-depth={depth} className={className}>
      {children}
    </div>
  );
}

export function ParallaxDepthCard({
  children,
  className,
  maxTilt = 12,
  maxShift = 20,
  perspective = 1000,
  hoverScale = 1.02,
}: ParallaxDepthCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isInside = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Tilt
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Scale on hover
  const springInside = useSpring(isInside, { stiffness: 200, damping: 25 });
  const scale = useTransform(springInside, [0, 1], [1, hoverScale]);

  // Shine effect
  const shineBg = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) => {
      const px = (x as number + 0.5) * 100;
      const py = (y as number + 0.5) * 100;
      return `radial-gradient(600px circle at ${px}% ${py}%, rgba(255,255,255,0.07), transparent 40%)`;
    }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    isInside.set(1);
  }, [isInside]);

  const handleMouseLeave = useCallback(() => {
    isInside.set(0);
    mouseX.set(0);
    mouseY.set(0);
  }, [isInside, mouseX, mouseY]);

  // Process children and apply parallax transforms
  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    const depth = (child.props as { depth?: number }).depth ?? 1;
    const shiftAmount = maxShift * depth;

    const translateX = useTransform(smoothX, [-0.5, 0.5], [-shiftAmount, shiftAmount]);
    const translateY = useTransform(smoothY, [-0.5, 0.5], [-shiftAmount, shiftAmount]);
    const layerSpringX = useSpring(translateX, { stiffness: 120 - depth * 20, damping: 18 + depth * 5 });
    const layerSpringY = useSpring(translateY, { stiffness: 120 - depth * 20, damping: 18 + depth * 5 });

    return (
      <motion.div
        style={{ x: layerSpringX, y: layerSpringY }}
        className="will-change-transform"
      >
        {child}
      </motion.div>
    );
  });

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl transition-shadow duration-500 hover:border-white/[0.15] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {/* Shine overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[5] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: shineBg }}
      />

      {/* Specular edge highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[6] h-px bg-gradient-to-r from-transparent via-white/[0.2] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content with parallax */}
      <div className="relative z-[1]">{processedChildren}</div>
    </motion.div>
  );
}

ParallaxDepthCard.Layer = ParallaxLayer;
