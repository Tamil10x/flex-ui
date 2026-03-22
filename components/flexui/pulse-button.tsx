"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PulseButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  pulseCount?: number;
  onClick?: () => void;
}

export function PulseButton({
  children,
  className,
  color = "rgba(56,189,248,0.5)",
  pulseCount = 3,
  onClick,
}: PulseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold rounded-xl",
        "bg-zinc-900 text-white border border-white/[0.08]",
        "hover:scale-105 active:scale-95 transition-transform duration-200",
        className
      )}
    >
      {Array.from({ length: pulseCount }).map((_, i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-xl animate-[pulse-ring_2s_ease-out_infinite]"
          style={{
            border: `2px solid ${color}`,
            animationDelay: `${i * 0.5}s`,
            opacity: 0,
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
      <style jsx>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </button>
  );
}
