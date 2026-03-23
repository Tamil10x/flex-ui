"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function GlowText({ children, className, color = "rgb(56,189,248)" }: GlowTextProps) {
  return (
    <span
      className={cn("inline-block font-bold text-white animate-[glow-text_2s_ease-in-out_infinite_alternate]", className)}
      style={{
        // @ts-expect-error CSS custom property
        "--glow-color": color,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes glow-text {
          0% { text-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color); }
          100% { text-shadow: 0 0 20px var(--glow-color), 0 0 40px var(--glow-color), 0 0 60px var(--glow-color); }
        }
      `}</style>
    </span>
  );
}
