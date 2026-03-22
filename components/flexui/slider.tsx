"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  color?: string;
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, className, color = "#fff" }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pct = ((value - min) / (max - min)) * 100;

  const update = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const r = trackRef.current.getBoundingClientRect();
      const raw = ((clientX - r.left) / r.width) * (max - min) + min;
      const stepped = Math.round(raw / step) * step;
      onChange(Math.min(max, Math.max(min, stepped)));
    },
    [min, max, step, onChange]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons > 0) update(e.clientX);
  };

  return (
    <div
      ref={trackRef}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Slider"
      tabIndex={0}
      className={cn("relative h-2 w-full cursor-pointer rounded-full bg-white/[0.06]", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); onChange(Math.min(max, value + step)); }
        else if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); onChange(Math.max(min, value - step)); }
        else if (e.key === "Home") { e.preventDefault(); onChange(min); }
        else if (e.key === "End") { e.preventDefault(); onChange(max); }
      }}
    >
      <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, background: color }} />
      <div
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-950 shadow-md"
        style={{ left: `${pct}%`, background: color }}
      />
    </div>
  );
}
