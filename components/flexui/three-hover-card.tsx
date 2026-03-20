"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ThreeHoverCardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

// Utility: combine two MotionValues into a derived background string
function useShineGradient(x: MotionValue<number>, y: MotionValue<number>) {
  return useTransform([x, y], ([px, py]) => {
    const xp = px as number;
    const yp = py as number;
    return `radial-gradient(650px circle at ${xp}% ${yp}%, rgba(255,255,255,0.18), rgba(255,255,255,0.05) 40%, transparent 60%)`;
  });
}

export function ThreeHoverCard({
  imageSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=800&fit=crop&crop=faces",
  imageAlt = "Portrait",
  title = "Interactive 3D",
  description = "Hover to reveal a cinematic glass border with 3D depth effect.",
  className,
  children,
}: ThreeHoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = useState({ w: 320, h: 400 });

  // ── Spring-based 3D tilt ─────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const smoothX = useSpring(mouseX, spring);
  const smoothY = useSpring(mouseY, spring);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  // ── Shine position (0–100%) ──────────────────────────────────────
  const shineX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const shineY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);
  const shineGradient = useShineGradient(shineX, shineY);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setCardSize({ w: rect.width, h: rect.height });
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  // Angle from center to cursor for conic border
  const angle = Math.atan2(
    mousePos.y - cardSize.h / 2,
    mousePos.x - cardSize.w / 2
  ) * (180 / Math.PI);

  return (
    <div
      className={cn("group/card relative", className)}
      style={{ perspective: 1000 }}
    >
      {/* ── 1. Ambient glow (blurred, behind everything) ─────────── */}
      <motion.div
        className="pointer-events-none absolute -inset-8 rounded-[28px] blur-3xl"
        animate={{
          opacity: isHovered ? 0.8 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x + 32}px ${mousePos.y + 32}px, rgba(139,92,246,0.15), rgba(56,189,248,0.08), transparent 60%)`,
        }}
      />

      {/* ── 2. Rotating conic border ─────────────────────────────── */}
      <motion.div
        className="absolute -inset-[1.5px] rounded-[21px]"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          background: `conic-gradient(from ${angle}deg at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.7), rgba(56,189,248,0.5), rgba(236,72,153,0.4), rgba(250,204,21,0.2), rgba(139,92,246,0.05), transparent 50%)`,
        }}
      />

      {/* ── 3. Card body ─────────────────────────────────────────── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-[400px] w-full overflow-hidden rounded-[20px] bg-zinc-950"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 4px 24px -8px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
        transition={{ duration: 0.5 }}
      >
        {/* ── 4. Image with zoom on hover ────────────────────────── */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>

        {/* ── 5. Color overlay on hover (cinematic tone) ─────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          animate={{
            opacity: isHovered ? 1 : 0,
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(56,189,248,0.05) 50%, rgba(236,72,153,0.08) 100%)",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* ── 6. Cursor-following shine spotlight ─────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-overlay"
          style={{ background: shineGradient }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* ── 7. Glass frost — top edge ──────────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-32"
          animate={{
            opacity: isHovered ? 1 : 0.3,
          }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
          }}
        />

        {/* ── 8. Bottom gradient scrim ───────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* ── 9. Specular sweep (diagonal light stripe) ──────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              x: isHovered ? "120%" : "-120%",
            }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.04) 62%, transparent 70%)",
              width: "100%",
              height: "100%",
            }}
          />
        </motion.div>

        {/* ── 10. Inner glass border (inset) ─────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[6] rounded-[20px]"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 0 1.5px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)"
              : "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.02)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* ── 11. Holographic edge shimmer (left + right) ────────── */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 z-[7] w-[1px]"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(to bottom, transparent, rgba(139,92,246,0.5) ${50 + (mousePos.y / cardSize.h) * 30}%, transparent)`,
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 z-[7] w-[1px]"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: `linear-gradient(to bottom, transparent, rgba(56,189,248,0.5) ${50 + (mousePos.y / cardSize.h) * 30}%, transparent)`,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* ── Content ────────────────────────────────────────────── */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6">
          <motion.div
            animate={{
              y: isHovered ? -4 : 0,
              filter: isHovered ? "drop-shadow(0 4px 12px rgba(0,0,0,0.5))" : "none",
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-2.5 flex items-center gap-2">
              <motion.div
                className="h-[2px] rounded-full bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400"
                animate={{ width: isHovered ? 32 : 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <motion.span
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                animate={{ color: isHovered ? "rgba(167,139,250,0.8)" : "rgba(255,255,255,0.4)" }}
                transition={{ duration: 0.4 }}
              >
                3D Card
              </motion.span>
            </div>
            <motion.h3
              className="text-xl font-bold tracking-tight text-white"
              animate={{
                textShadow: isHovered
                  ? "0 2px 20px rgba(139,92,246,0.3), 0 2px 8px rgba(0,0,0,0.5)"
                  : "0 2px 8px rgba(0,0,0,0.5)",
              }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="mt-1.5 max-w-[300px] text-[13px] leading-relaxed"
              animate={{
                color: isHovered ? "rgba(228,228,231,0.8)" : "rgba(200,200,210,0.6)",
              }}
              transition={{ duration: 0.4 }}
            >
              {description}
            </motion.p>
          </motion.div>
          {children}
        </div>

        {/* ── Status pill ────────────────────────────────────────── */}
        <motion.div
          className="absolute right-4 top-4 z-10"
          animate={{ opacity: isHovered ? 1 : 0.25, y: isHovered ? 0 : 4 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-2xl"
            animate={{
              backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.3)",
              borderColor: isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
            }}
            style={{ border: "1px solid" }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="h-2 w-2 rounded-full"
              animate={{
                backgroundColor: isHovered ? "#a78bfa" : "#52525b",
                boxShadow: isHovered
                  ? "0 0 10px 3px rgba(167,139,250,0.6)"
                  : "none",
                scale: isHovered ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 0.5 }}
            />
            <span className="text-[10px] font-semibold text-white/70">
              {isHovered ? "Live" : "Hover"}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
