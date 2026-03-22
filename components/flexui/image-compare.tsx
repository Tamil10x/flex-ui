"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageCompareProps {
  before: string;
  after: string;
  className?: string;
}

export function ImageCompare({ before, after, className }: ImageCompareProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    update(e.clientX);
  }, [update]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current) update(e.clientX);
  }, [update]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={cn(
        "relative select-none overflow-hidden rounded-xl border border-white/[0.08]",
        className
      )}
      style={{ cursor: "ew-resize" }}
    >
      {/* After (full) */}
      <img src={after} alt="After" className="block w-full" draggable={false} />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img src={before} alt="Before" className="block w-full" draggable={false} />
      </div>
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-zinc-900 p-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 6h6M3 6l2-2M3 6l2 2M9 6L7 4M9 6l-2 2" stroke="white" strokeWidth="1.2" />
          </svg>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
        Before
      </span>
      <span className="absolute top-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
        After
      </span>
    </div>
  );
}
