"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

let rippleId = 0;

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.3)",
  onClick,
  disabled = false,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      const id = ++rippleId;
      setRipples((prev) => [...prev, { id, x, y, size }]);
      onClick?.();
    },
    [disabled, onClick]
  );

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden px-8 py-4 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "transition-all duration-300",
        "hover:border-white/[0.15] hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]",
        "active:scale-[0.98]",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/[0.08] disabled:hover:shadow-none",
        className
      )}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-[ripple-expand_600ms_ease-out_forwards] pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: rippleColor,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
