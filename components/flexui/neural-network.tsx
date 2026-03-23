"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface NeuralNetworkProps {
  className?: string;
  /** Number of nodes */
  nodeCount?: number;
  /** Node color */
  color?: string;
  /** Connection color */
  connectionColor?: string;
  /** Firing animation speed */
  speed?: number;
  /** Maximum connection distance */
  connectionDistance?: number;
  children?: React.ReactNode;
}

// Seeded PRNG — deterministic across runs (hydration safe)
function seed(n: number): number {
  let h = (n * 2654435761) | 0;
  h = ((h ^ (h >>> 16)) * 2246822507) | 0;
  h = ((h ^ (h >>> 13)) * 3266489909) | 0;
  h = (h ^ (h >>> 16)) | 0;
  return (h >>> 0) / 4294967296;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulseScale: number;
  pulseDecay: number;
}

interface Signal {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export function NeuralNetwork({
  className,
  nodeCount = 30,
  color = "#8B5CF6",
  connectionColor = "rgba(56,189,248,0.15)",
  speed = 1,
  connectionDistance = 150,
  children,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const nodesRef = useRef<Node[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const initNodes = useCallback(
    (w: number, h: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: seed(i * 7 + 1) * w,
          y: seed(i * 7 + 2) * h,
          vx: (seed(i * 7 + 3) - 0.5) * 0.4 * speed,
          vy: (seed(i * 7 + 4) - 0.5) * 0.4 * speed,
          radius: seed(i * 7 + 5) * 2 + 2,
          pulseScale: 1,
          pulseDecay: 0,
        });
      }
      return nodes;
    },
    [nodeCount, speed]
  );

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };

      // Re-init nodes if first time or size changed significantly
      if (nodesRef.current.length === 0) {
        nodesRef.current = initNodes(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    let lastSignalTime = 0;
    const signalInterval = 800 / speed;

    const animate = (time: number) => {
      const { w, h } = sizeRef.current;
      const nodes = nodesRef.current;
      const signals = signalsRef.current;

      ctx.clearRect(0, 0, w, h);

      // Update node positions (drift)
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        // Decay pulse
        if (node.pulseDecay > 0) {
          node.pulseDecay -= 0.02;
          node.pulseScale = 1 + node.pulseDecay * 0.8;
        } else {
          node.pulseScale = 1;
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const alpha = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = connectionColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Spawn new signals periodically
      if (time - lastSignalTime > signalInterval) {
        lastSignalTime = time;
        // Find a random connected pair
        const attempts = 10;
        for (let a = 0; a < attempts; a++) {
          const i = Math.floor(Math.random() * nodes.length);
          const j = Math.floor(Math.random() * nodes.length);
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            signals.push({
              fromIndex: i,
              toIndex: j,
              progress: 0,
              speed: (0.01 + Math.random() * 0.02) * speed,
            });
            break;
          }
        }
      }

      // Update and draw signals
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          // Pulse the destination node
          nodes[sig.toIndex].pulseDecay = 1;
          signals.splice(s, 1);
          continue;
        }

        const from = nodes[sig.fromIndex];
        const to = nodes[sig.toIndex];
        const sx = from.x + (to.x - from.x) * sig.progress;
        const sy = from.y + (to.y - from.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      for (const node of nodes) {
        const r = node.radius * node.pulseScale;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fill();

        if (node.pulseDecay > 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.globalAlpha = node.pulseDecay * 0.5;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [mounted, nodeCount, color, connectionColor, speed, connectionDistance, initNodes]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {mounted && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-0"
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
