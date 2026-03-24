"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Types ─────────────────────────────────────────────────────────────── */

export interface PreloaderImage {
  src: string;
  alt?: string;
}

export interface PreloaderProps {
  images: PreloaderImage[];
  onComplete?: () => void;
  sweepDuration?: number;
  scaleDuration?: number;
  accentColor?: string;
  showProgress?: boolean;
  className?: string;
}

/* ── Easings ───────────────────────────────────────────────────────────── */

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const EXPO_IN_OUT = [0.87, 0, 0.13, 1] as const;

/* ── Core Animation Engine ─────────────────────────────────────────────── */

type Phase = "enter" | "visible" | "converge" | "hero" | "exit";

function PreloaderOverlay({
  images,
  onComplete,
  sweepDuration = 2.4,
  scaleDuration = 1.8,
  accentColor = "#A78BFA",
  showProgress = true,
  className,
}: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>("enter");
  const mid = Math.floor(images.length / 2);

  // Sequence: enter → visible → converge → hero → exit → onComplete
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delay = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    (async () => {
      // Phase 1: Strip sweeps in from right
      setPhase("enter");
      await delay(100); // let mount paint

      // Phase 2: Strip is now visible & centered
      setPhase("visible");
      await delay(sweepDuration * 1000 + 400);

      // Phase 3: Non-hero images shrink, blur, fade
      setPhase("converge");
      await delay(scaleDuration * 500 + 200);

      // Phase 4: Hero image scales to fullscreen
      setPhase("hero");
      await delay(scaleDuration * 1000 + 400);

      // Phase 5: Fade out everything
      setPhase("exit");
      await delay(800);

      onComplete?.();
    })();

    return () => timers.forEach(clearTimeout);
  }, [sweepDuration, scaleDuration, onComplete]);

  const isConverging = phase === "converge" || phase === "hero" || phase === "exit";
  const isHero = phase === "hero" || phase === "exit";
  const isExit = phase === "exit";

  const progress =
    phase === "enter" ? 0 :
    phase === "visible" ? 0.45 :
    phase === "converge" ? 0.75 : 1;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExit ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={cn(
        "fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden",
        className
      )}
      style={{ backgroundColor: "#09090b" }}
    >
      {/* ── Background ambient glow ── */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHero ? 0 : 0.7,
          background: `radial-gradient(ellipse 60% 45% at 50% 50%, ${accentColor}12, transparent 70%)`,
        }}
      />

      {/* ── Strip container with edge mask ── */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "100%",
          ...(isHero
            ? {}
            : {
                maskImage:
                  "linear-gradient(to right, transparent 2%, black 15%, black 85%, transparent 98%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 2%, black 15%, black 85%, transparent 98%)",
              }),
        }}
      >
        {/* ── The image strip ── */}
        <motion.div
          className="flex items-center justify-center"
          style={{ gap: "1rem" }}
          initial={{ x: "110vw" }}
          animate={{
            x:
              phase === "enter"
                ? "110vw"
                : phase === "visible"
                ? "0vw"
                : "0vw",
          }}
          transition={{
            duration: sweepDuration,
            ease: EXPO_OUT,
          }}
        >
          {images.map((img, i) => {
            const isMiddle = i === mid;

            return (
              <motion.div
                key={i}
                className="relative shrink-0"
                initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                animate={{
                  opacity: isConverging && !isMiddle ? 0 : 1,
                  scale: isConverging && !isMiddle ? 0.4 : 1,
                  filter:
                    isConverging && !isMiddle ? "blur(16px)" : "blur(0px)",
                }}
                transition={{
                  duration: scaleDuration * 0.5,
                  ease: EXPO_IN_OUT,
                  delay: isConverging && !isMiddle
                    ? Math.abs(i - mid) * 0.04
                    : 0,
                }}
                style={{
                  zIndex: isMiddle ? 50 : 1,
                  visibility: isHero && !isMiddle ? "hidden" : "visible",
                }}
              >
                {/* ── Image card ── */}
                <motion.div
                  className="relative overflow-hidden"
                  initial={{
                    width: "clamp(9rem, 15vw, 13rem)",
                    height: "clamp(12rem, 20vw, 17rem)",
                    borderRadius: "0.5rem",
                  }}
                  animate={{
                    width:
                      isHero && isMiddle
                        ? "100vw"
                        : "clamp(9rem, 15vw, 13rem)",
                    height:
                      isHero && isMiddle
                        ? "100dvh"
                        : "clamp(12rem, 20vw, 17rem)",
                    borderRadius:
                      isHero && isMiddle ? "0rem" : "0.5rem",
                  }}
                  transition={{
                    duration: isHero && isMiddle ? scaleDuration : 0.01,
                    ease: EXPO_IN_OUT,
                  }}
                  style={{
                    boxShadow: isMiddle
                      ? `0 0 60px ${accentColor}20, 0 20px 60px rgba(0,0,0,0.6)`
                      : "0 10px 50px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt ?? ""}
                    loading="eager"
                    draggable={false}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                  />

                  {/* Sheen on non-hero cards */}
                  {!isMiddle && (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(0,0,0,0.12) 100%)",
                      }}
                    />
                  )}

                  {/* Vignette on hero during expand */}
                  {isMiddle && isHero && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      style={{
                        background:
                          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Progress bar ── */}
      {showProgress && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 overflow-hidden rounded-full"
          style={{
            width: "12rem",
            height: "2px",
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
          animate={{ opacity: isConverging ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full origin-left rounded-full"
            style={{
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
            }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.8, ease: EXPO_OUT }}
          />
        </motion.div>
      )}

      {/* ── "Loading" label ── */}
      <AnimatePresence>
        {(phase === "enter" || phase === "visible") && (
          <motion.span
            key="lbl"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.2, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#52525b" }}
          >
            Loading
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Portal wrapper ────────────────────────────────────────────────────── */

export function Preloader(props: PreloaderProps) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create a dedicated container to portal into
    const container = document.createElement("div");
    container.setAttribute("data-flexui-preloader", "");
    document.body.appendChild(container);
    setEl(container);

    return () => {
      document.body.removeChild(container);
    };
  }, []);

  if (!el) return null;

  return createPortal(<PreloaderOverlay {...props} />, el);
}

/* ── Trigger Button ────────────────────────────────────────────────────── */

export interface PreloaderTriggerProps {
  onClick?: () => void;
  label?: string;
  accentColor?: string;
  className?: string;
}

export function PreloaderTrigger({
  onClick,
  label = "Launch Preloader",
  accentColor = "var(--flexui-accent, #A78BFA)",
  className,
}: PreloaderTriggerProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.15em]",
        className
      )}
      style={{
        background: "var(--flexui-surface, #18181b)",
        border: "1px solid var(--flexui-border, rgba(255,255,255,0.08))",
        color: "var(--flexui-heading, #fafafa)",
      }}
      whileHover={{
        scale: 1.04,
        boxShadow: `0 0 30px rgba(167,139,250,0.12), 0 8px 24px rgba(0,0,0,0.3)`,
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${accentColor}12, transparent 70%)`,
        }}
      />
      <span
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}50, transparent)`,
        }}
      />
      <span className="relative flex items-center gap-2.5">
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="currentColor"
          className="opacity-50"
        >
          <path d="M0 0L10 6L0 12V0Z" />
        </svg>
        {label}
      </span>
    </motion.button>
  );
}
