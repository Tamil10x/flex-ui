"use client";

import React, { useEffect, useRef, useState, useCallback, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────
interface ReflectiveCardProps {
  blurStrength?: number;
  displacementStrength?: number;
  noiseScale?: number;
  specularConstant?: number;
  grayscale?: number;
  metalness?: number;
  roughness?: number;
  overlayColor?: string;
  color?: string;
  children?: React.ReactNode;
  className?: string;
  enableWebcam?: boolean;
}

function useFilterId() {
  const id = React.useId();
  return `rc-${id.replace(/:/g, "")}`;
}

export function ReflectiveCard({
  blurStrength = 14,
  displacementStrength = 18,
  noiseScale = 1,
  specularConstant = 1.3,
  grayscale = 1,
  metalness = 1,
  roughness = 0.35,
  overlayColor = "rgba(0,0,0,0.15)",
  color = "white",
  children,
  className,
  enableWebcam = false,
}: ReflectiveCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 160, y: 240 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const timeRef = useRef(0);
  const id = useFilterId();

  // ── Webcam ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!enableWebcam) return;
    let stream: MediaStream | null = null;
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch {
        /* graceful fallback */
      }
    };
    start();
    return () => { stream?.getTracks().forEach((t) => t.stop()); };
  }, [enableWebcam]);

  // ── Mount flag + animated aurora timer ──────────────────────────────
  useEffect(() => {
    setMounted(true);
    let raf: number;
    const tick = () => {
      timeRef.current = Date.now() * 0.001;
      const t = timeRef.current;

      // Update aurora bands directly via ref
      if (auroraRef.current) {
        const a1 = 30 + Math.sin(t * 0.4) * 20;
        const a2 = 60 + Math.cos(t * 0.3) * 15;
        const a3 = 80 + Math.sin(t * 0.5 + 1) * 10;
        auroraRef.current.style.background = `
          linear-gradient(${110 + Math.sin(t * 0.2) * 10}deg,
            transparent ${a1 - 10}%,
            rgba(139,92,246,0.3) ${a1}%,
            rgba(56,189,248,0.25) ${a1 + 8}%,
            transparent ${a1 + 15}%
          ),
          linear-gradient(${130 + Math.cos(t * 0.15) * 8}deg,
            transparent ${a2 - 8}%,
            rgba(52,211,153,0.2) ${a2}%,
            rgba(250,204,21,0.15) ${a2 + 6}%,
            transparent ${a2 + 12}%
          ),
          linear-gradient(${100 + Math.sin(t * 0.3) * 12}deg,
            transparent ${a3 - 6}%,
            rgba(236,72,153,0.2) ${a3}%,
            rgba(167,139,250,0.15) ${a3 + 5}%,
            transparent ${a3 + 10}%
          )
        `;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ── 3D tilt ───────────────────────────────────────────────────────
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 100, damping: 16, mass: 0.7 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);
  const rotateX = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setIsHovered(false);
  }, [mx, my]);

  const baseFreq = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));
  const angle = Math.atan2(mousePos.y - 240, mousePos.x - 160) * (180 / Math.PI);
  const time = timeRef.current;

  // Don't render dynamic content on server to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={cn("group/rc relative", className)}>
        <div className="h-[480px] w-[320px] rounded-[21px] bg-zinc-950" style={{ boxShadow: "0 6px 24px -8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)" }} />
      </div>
    );
  }

  return (
    <div className={cn("group/rc relative", className)} style={{ perspective: 1100 }}>
      {/* SVG filter */}
      <svg className="pointer-events-none absolute h-0 w-0 opacity-0" aria-hidden="true">
        <defs>
          <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency={baseFreq} numOctaves={2} result="noise" />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="na" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={displacementStrength} xChannelSelector="R" yChannelSelector="G" result="rip" />
            <feSpecularLighting in="na" surfaceScale={displacementStrength} specularConstant={specularConstant} specularExponent={20} lightingColor="#fff" result="lit">
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="lit" in2="rip" operator="in" result="le" />
            <feBlend in="le" in2="rip" mode="screen" result="final" />
          </filter>
        </defs>
      </svg>

      {/* ── Ambient glow ─────────────────────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute -inset-10 rounded-[32px] blur-[40px]"
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `radial-gradient(500px at ${mousePos.x + 40}px ${mousePos.y + 40}px, rgba(167,139,250,0.12), rgba(56,189,248,0.08), rgba(236,72,153,0.05), transparent 65%)`,
        }}
      />

      {/* ── Holographic conic border ─────────────────────────────── */}
      <motion.div
        className="absolute -inset-[1.5px] rounded-[22px]"
        animate={{ opacity: isHovered ? 1 : 0.15 }}
        transition={{ duration: 0.5 }}
        style={{
          background: `conic-gradient(from ${angle + time * 20}deg at ${mousePos.x}px ${mousePos.y}px, rgba(167,139,250,0.8) 0%, rgba(56,189,248,0.6) 12%, rgba(52,211,153,0.4) 24%, rgba(250,204,21,0.3) 36%, rgba(236,72,153,0.5) 48%, rgba(167,139,250,0.2) 60%, transparent 75%)`,
        }}
      />

      {/* ── Card ─────────────────────────────────────────────────── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-[480px] w-[320px] overflow-hidden rounded-[21px] bg-zinc-950"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{
          boxShadow: isHovered
            ? "0 35px 90px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.1)"
            : "0 6px 24px -8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
        transition={{ duration: 0.5 }}
      >
        {/* Webcam */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{
            transform: "scale(1.25) scaleX(-1)",
            filter: `saturate(${saturation}) contrast(1.15) brightness(1.05) blur(${blurStrength}px) url(#${id})`,
            opacity: streamActive ? 0.85 : 0,
            transition: "filter 0.3s, opacity 0.5s",
          }}
        />

        {/* Fallback */}
        {!streamActive && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-zinc-900 via-zinc-800/80 to-zinc-900" />
        )}

        {/* ── Aurora bands ───────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-40 mix-blend-screen">
          <div ref={auroraRef} className="absolute inset-0" />
        </div>

        {/* Noise grain */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-overlay"
          style={{
            opacity: roughness,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Metallic sheen */}
        <div
          className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay"
          style={{
            opacity: metalness * 0.8,
            background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.25) 100%)",
          }}
        />

        {/* ── Cursor shine ───────────────────────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[4] mix-blend-overlay"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.22), rgba(255,255,255,0.04) 40%, transparent 55%)`,
          }}
        />

        {/* ── Specular sweep ─────────────────────────────────────── */}
        <motion.div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden" animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <motion.div
            className="absolute inset-0"
            animate={{ x: isHovered ? "140%" : "-140%" }}
            transition={{ duration: 1.1, ease: [0.22, 0.68, 0.36, 1] }}
            style={{ background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.04) 38%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.04) 62%, transparent 75%)" }}
          />
        </motion.div>

        {/* ── Glass border (mask-composite) ──────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[8] rounded-[21px]"
          style={{
            padding: "1.5px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{
            background: isHovered
              ? `linear-gradient(${135 + Math.sin(time) * 15}deg, rgba(255,255,255,0.7), rgba(167,139,250,0.3) 30%, rgba(56,189,248,0.2) 50%, rgba(236,72,153,0.3) 70%, rgba(255,255,255,0.6))`
              : "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.08))",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* ── Edge hologram lines ────────────────────────────────── */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 z-[7] w-[1px]"
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(to bottom, transparent 10%, rgba(167,139,250,0.6) ${40 + ((mousePos.y / 480) * 20)}%, rgba(56,189,248,0.4) ${60 + ((mousePos.y / 480) * 20)}%, transparent 90%)` }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 z-[7] w-[1px]"
          animate={{ opacity: isHovered ? 0.7 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: `linear-gradient(to bottom, transparent 10%, rgba(56,189,248,0.6) ${40 + ((mousePos.y / 480) * 20)}%, rgba(236,72,153,0.4) ${60 + ((mousePos.y / 480) * 20)}%, transparent 90%)` }}
        />

        {/* ── Content ────────────────────────────────────────────── */}
        <div className="relative z-[6] flex h-full flex-col justify-between p-7" style={{ color, background: overlayColor }}>
          {children || <DefaultContent isHovered={isHovered} />}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Default content — premium holographic ID ───────────────────────────────
function DefaultContent({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1.5 backdrop-blur-sm"
            animate={{ borderColor: isHovered ? "rgba(167,139,250,0.3)" : "rgba(255,255,255,0.15)" }}
            transition={{ duration: 0.4 }}
          >
            <svg className="h-3 w-3 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[9px] font-bold tracking-[0.15em] text-white/70">VERIFIED</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            animate={{ opacity: isHovered ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[9px] font-semibold text-emerald-400/80">ACTIVE</span>
          </motion.div>
        </div>

        {/* Holographic chip */}
        <motion.div
          className="mb-4 h-10 w-14 rounded-lg overflow-hidden"
          animate={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(250,204,21,0.4), rgba(167,139,250,0.3), rgba(56,189,248,0.4))"
              : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-full w-full" style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.06) 3px, rgba(255,255,255,0.06) 4px)",
          }} />
        </motion.div>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-end mb-4">
        <motion.p
          className="font-mono text-lg tracking-[0.2em] mb-6"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.4 }}
        >
          •••• •••• •••• 4289
        </motion.p>
        <motion.h2
          className="text-2xl font-bold tracking-[0.06em]"
          animate={{
            textShadow: isHovered
              ? "0 0 30px rgba(167,139,250,0.3), 0 2px 4px rgba(0,0,0,0.3)"
              : "0 2px 4px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.5 }}
        >
          ALEXANDER DOE
        </motion.h2>
        <p className="mt-1 text-[11px] tracking-[0.25em] opacity-50 uppercase">
          Senior Developer
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between border-t border-white/10 pt-5">
        <div>
          <p className="text-[8px] tracking-[0.15em] opacity-40 mb-1">VALID THRU</p>
          <p className="text-sm font-medium tracking-wider opacity-80">12/28</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] tracking-[0.15em] opacity-40 mb-1">SECURITY</p>
          <motion.div
            className="flex gap-0.5"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-3 w-1 rounded-full bg-violet-400"
                animate={{
                  scaleY: isHovered ? [1, 1.8, 1] : 1,
                  opacity: isHovered ? 1 : 0.4,
                }}
                transition={{
                  scaleY: { repeat: Infinity, duration: 0.8, delay: i * 0.12 },
                  opacity: { duration: 0.3 },
                }}
              />
            ))}
          </motion.div>
        </div>
        {/* Logo mark */}
        <motion.div
          className="flex h-8 w-8 items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <div className="h-6 w-6 rounded-full border-2 border-white/30" />
            <div className="absolute left-2.5 top-0 h-6 w-6 rounded-full border-2 border-white/20" />
          </div>
        </motion.div>
      </div>
    </>
  );
}
