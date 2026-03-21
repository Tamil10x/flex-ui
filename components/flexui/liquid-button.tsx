"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface LiquidButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  onClick?: () => void;
  disabled?: boolean;
}

let liquidRippleId = 0;

export function LiquidButton({
  children,
  className,
  color = "#8B5CF6",
  onClick,
  disabled = false,
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    []
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++liquidRippleId;
      setRipples((prev) => [...prev, { id, x, y }]);
      onClick?.();
    },
    [disabled, onClick]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <motion.button
      ref={buttonRef}
      disabled={disabled}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={disabled ? undefined : { filter: "hue-rotate(15deg)" }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "relative overflow-hidden px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900/80 text-white border border-white/[0.08] backdrop-blur-sm",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:shadow-none",
        className
      )}
    >
      {/* Hover glow that follows cursor */}
      {hovered && !disabled && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, ${color}, transparent 70%)`,
          }}
        />
      )}

      {/* Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
              backgroundColor: color,
            }}
            initial={{ scale: 0, opacity: 0.4, width: 20, height: 20 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 1.2,
            }}
            onAnimationComplete={() => removeRipple(ripple.id)}
          />
        ))}
      </AnimatePresence>

      {/* Second wave ripples for organic feel */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={`${ripple.id}-secondary`}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              x: "-50%",
              y: "-50%",
              border: `1px solid ${color}`,
            }}
            initial={{ scale: 0, opacity: 0.3, width: 30, height: 30 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.1,
              duration: 1.4,
            }}
          />
        ))}
      </AnimatePresence>

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
