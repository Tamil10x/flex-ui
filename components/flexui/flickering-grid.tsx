"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  children?: React.ReactNode;
  className?: string;
  /** Grid cell size in px */
  cellSize?: number;
  /** Cell color */
  color?: string;
  /** Flicker speed (cells per second) */
  speed?: number;
  /** Gap between cells */
  gap?: number;
  /** Max active cells at once (fraction 0-1) */
  density?: number;
}

/** Simple seeded PRNG (mulberry32) for hydration-safe initial state */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function FlickeringGrid({
  children,
  className,
  cellSize = 8,
  color = "rgba(139,92,246,0.3)",
  speed = 3,
  gap = 2,
  density = 0.15,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse the color once
  const parsedColor = useMemo(() => {
    if (typeof document === "undefined") return { r: 139, g: 92, b: 246, a: 0.3 };
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { r: 139, g: 92, b: 246, a: 0.3 };
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  }, [color]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;
    ctx.scale(dpr, dpr);

    const step = cellSize + gap;
    const cols = Math.ceil(w / step);
    const rows = Math.ceil(h / step);
    const totalCells = cols * rows;

    // Cell opacities
    const opacities = new Float32Array(totalCells);
    const targets = new Float32Array(totalCells);

    // Seeded random for initial state
    const rng = mulberry32(42);
    for (let i = 0; i < totalCells; i++) {
      targets[i] = rng() < density ? 1 : 0;
      opacities[i] = targets[i];
    }

    let lastTime = 0;
    let animId: number;

    function frame(time: number) {
      const dt = lastTime ? (time - lastTime) / 1000 : 0.016;
      lastTime = time;

      // Randomly toggle cells
      const cellsToToggle = Math.max(1, Math.round(speed * totalCells * 0.01 * dt * 60));
      for (let k = 0; k < cellsToToggle; k++) {
        const idx = Math.floor(Math.random() * totalCells);
        // Count roughly active cells
        targets[idx] = Math.random() < density ? 1 : 0;
      }

      // Smooth opacity transitions
      const lerpSpeed = 4 * dt;
      for (let i = 0; i < totalCells; i++) {
        opacities[i] += (targets[i] - opacities[i]) * Math.min(lerpSpeed, 1);
      }

      // Draw
      ctx!.clearRect(0, 0, w, h);
      const { r, g, b, a } = parsedColor;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = row * cols + col;
          const opacity = opacities[idx] * a;
          if (opacity < 0.01) continue;
          ctx!.fillStyle = `rgba(${r},${g},${b},${opacity})`;
          ctx!.fillRect(col * step, row * step, cellSize, cellSize);
        }
      }

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(animId);
  }, [cellSize, gap, density, speed, parsedColor]);

  useEffect(() => {
    if (!mounted) return;
    const cleanup = draw();
    const resizeObs = new ResizeObserver(() => {
      if (cleanup) cleanup();
      draw();
    });
    if (containerRef.current) resizeObs.observe(containerRef.current);
    return () => {
      if (cleanup) cleanup();
      resizeObs.disconnect();
    };
  }, [mounted, draw]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {mounted && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      )}
      {/* Children on top */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
