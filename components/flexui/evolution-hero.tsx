"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EvolutionHeroProps {
  /** Background image URL — use an AI-generated evolution scene */
  imageSrc: string;
  /** Headline text */
  headline?: string;
  /** Subtitle text */
  subtitle?: string;
  /** Stage labels shown at bottom */
  stages?: string[];
  className?: string;
  children?: React.ReactNode;
}

export function EvolutionHero({
  imageSrc,
  headline = "Evolution Unleashed",
  subtitle = "From Primal Roots to AI Mastery. The Future is Here.",
  stages = ["Primal Ape", "Early Human", "Programmer", "Cyber Skull"],
  className,
  children,
}: EvolutionHeroProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative w-full overflow-hidden bg-[#060612]",
        className
      )}
      style={{ minHeight: 500 }}
    >
      {/* ── Background image with parallax ─────────────────────── */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          x: (mousePos.x - 0.5) * -20,
          y: (mousePos.y - 0.5) * -10,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <Image
          src={imageSrc}
          alt="Evolution Scene"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        {/* Slight zoom to hide parallax edges */}
        <div className="absolute inset-[-20px]" />
      </motion.div>

      {/* ── Gradient overlays ──────────────────────────────────── */}
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-[#060612] to-transparent" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-[#060612] via-[#060612]/80 to-transparent" />
      {/* Side fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-gradient-to-r from-[#060612] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-gradient-to-l from-[#060612] to-transparent" />

      {/* ── Floating holographic code snippets ─────────────────── */}
      {mounted && (
        <div className="pointer-events-none absolute inset-0 z-[2]">
          {[
            { text: "const ai = new NeuralNet();", x: "8%", y: "15%", delay: 0 },
            { text: "transform(evolution);", x: "5%", y: "35%", delay: 0.5 },
            { text: "while(evolving) { learn(); }", x: "70%", y: "12%", delay: 1 },
            { text: "const data = new Stream();", x: "75%", y: "30%", delay: 1.5 },
            { text: "export { DigitalMind };", x: "80%", y: "50%", delay: 2 },
          ].map((snippet, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: snippet.x, top: snippet.y }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0, 0.4, 0.3], x: 0 }}
              transition={{
                delay: snippet.delay + 1,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3,
              }}
            >
              <code className="rounded bg-[#0a0a1f]/60 px-2 py-1 font-mono text-[10px] text-cyan-400/60 backdrop-blur-sm border border-cyan-500/10">
                {snippet.text}
              </code>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── Scanning lines effect ──────────────────────────────── */}
      {mounted && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[3] opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(56,189,248,0.15) 2px, transparent 4px)",
          }}
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
      )}

      {/* ── Content overlay ────────────────────────────────────── */}
      <div className="relative z-[5] flex h-full min-h-[500px] flex-col items-center justify-between px-6 py-12">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-violet-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              {headline}
            </span>
          </h1>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">{subtitle}</p>
        </motion.div>

        {/* Children (CTA buttons etc.) */}
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="my-auto"
          >
            {children}
          </motion.div>
        )}

        {/* Stage labels at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex w-full max-w-4xl items-center justify-between"
        >
          {stages.map((stage, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 sm:text-sm">
                {stage}
              </span>
              {i < stages.length - 1 && (
                <span className="hidden text-zinc-700 sm:inline">//</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Glowing energy lines (animated) ────────────────────── */}
      {mounted && (
        <svg className="pointer-events-none absolute inset-0 z-[4] h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="evo-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="rgba(139,92,246,0.3)" />
              <stop offset="70%" stopColor="rgba(56,189,248,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {/* Horizontal energy line */}
          <motion.line
            x1="0" y1="75%" x2="100%" y2="75%"
            stroke="url(#evo-line-grad)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          />
          {/* Second line */}
          <motion.line
            x1="0" y1="78%" x2="100%" y2="78%"
            stroke="url(#evo-line-grad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 2.5 }}
          />
        </svg>
      )}
    </div>
  );
}
