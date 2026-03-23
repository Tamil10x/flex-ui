"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  magneticStrength?: number;
  spotlightSize?: number;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  magneticStrength = 0.35,
  spotlightSize = 200,
  className,
  onClick,
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const spotlightBg = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.15), transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    x.set(deltaX * magneticStrength);
    y.set(deltaY * magneticStrength);

    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold",
        "bg-white text-black transition-shadow duration-300",
        "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {/* Spotlight glow overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: spotlightBg,
        }}
      />

      {/* Glowing border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          boxShadow: isHovered
            ? "inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.1)"
            : "inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 0 1px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.15)"
            : "inset 0 0 0 1px rgba(255,255,255,0.1)",
        }}
        transition={{ duration: 0.3 }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
