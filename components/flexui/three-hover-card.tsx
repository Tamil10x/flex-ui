"use client";

import React, { useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LazyScene = lazy(() =>
  import("./three-hover-card-scene").then((mod) => ({
    default: mod.ThreeHoverCardScene,
  }))
);

interface ThreeHoverCardProps {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function ThreeHoverCard({
  title = "Interactive 3D",
  description = "Hover to reveal a live WebGL experience powered by React Three Fiber.",
  className,
  children,
}: ThreeHoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [borderPos, setBorderPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    });
    setBorderPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className={cn("group relative", className)}>
      {/* Outer glow border */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(500px circle at ${borderPos.x}px ${borderPos.y}px, rgba(79,143,255,0.2), rgba(56,189,248,0.1), transparent 50%)`
            : undefined,
        }}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative h-[400px] w-full overflow-hidden rounded-2xl",
          "bg-zinc-950/90 backdrop-blur-xl",
          "border border-white/[0.08]",
          "transition-all duration-700",
          "hover:border-white/[0.15]",
          "hover:shadow-[0_8px_60px_-12px_rgba(79,143,255,0.2)]"
        )}
      >
        {/* Animated inner gradient */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          animate={{
            background: isHovered
              ? "radial-gradient(ellipse at 50% 0%, rgba(79,143,255,0.06) 0%, transparent 60%)"
              : "radial-gradient(ellipse at 50% 0%, rgba(79,143,255,0.02) 0%, transparent 60%)",
          }}
          transition={{ duration: 0.8 }}
        />

        {/* 3D canvas — lazy loaded on hover */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.15 }}
          transition={{ duration: 0.8 }}
        >
          {isHovered && (
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-400" />
                    <div className="absolute inset-0 h-8 w-8 animate-ping rounded-full border border-blue-400/10" />
                  </div>
                </div>
              }
            >
              <LazyScene mouse={mousePos} />
            </Suspense>
          )}
        </motion.div>

        {/* Gradient scrim */}
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <motion.div
            animate={{
              opacity: isHovered ? 0.7 : 1,
              y: isHovered ? 6 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1 w-6 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">
                WebGL
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-1.5 text-sm text-zinc-400">{description}</p>
          </motion.div>
          {children}
        </div>

        {/* Top-right sparkle indicator */}
        <motion.div
          className="absolute right-4 top-4 z-10"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-zinc-900/60 px-2.5 py-1 backdrop-blur-sm">
            <div
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors duration-500",
                isHovered ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-zinc-600"
              )}
            />
            <span className="text-[10px] font-medium text-zinc-500">
              {isHovered ? "Active" : "Hover"}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
