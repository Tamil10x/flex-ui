"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  life: number;
}

interface SplashCursorProps {
  className?: string;
  /** Splash colors */
  colors?: string[];
  /** Splash size */
  size?: number;
  /** Splash trail length */
  trail?: number;
  children?: React.ReactNode;
}

export function SplashCursor({
  className,
  colors = ["#8B5CF6", "#389CFD", "#EC4899"],
  size = 40,
  trail = 20,
  children,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [mounted, resizeCanvas]);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const blobs = blobsRef.current;
      for (let i = blobs.length - 1; i >= 0; i--) {
        const blob = blobs[i];
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.vx *= 0.96;
        blob.vy *= 0.96;
        blob.life -= 0.015;
        blob.opacity = Math.max(0, blob.life);

        if (blob.life <= 0) {
          blobs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = blob.opacity * 0.6;
        ctx.filter = `blur(${blob.radius * 0.8}px)`;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = blob.color;
        ctx.fill();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let vx = 0;
      let vy = 0;
      if (lastPosRef.current) {
        vx = (x - lastPosRef.current.x) * 0.3;
        vy = (y - lastPosRef.current.y) * 0.3;
      }
      lastPosRef.current = { x, y };

      const blobs = blobsRef.current;
      if (blobs.length < trail * 3) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const spread = size * 0.3;
        blobs.push({
          x: x + (Math.random() - 0.5) * spread,
          y: y + (Math.random() - 0.5) * spread,
          vx: vx + (Math.random() - 0.5) * 2,
          vy: vy + (Math.random() - 0.5) * 2,
          radius: size * (0.5 + Math.random() * 0.5),
          color,
          opacity: 1,
          life: 1,
        });
      }
    },
    [colors, size, trail]
  );

  const handleMouseLeave = useCallback(() => {
    lastPosRef.current = null;
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
