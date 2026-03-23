"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTransitionProps {
  children: React.ReactNode;
  className?: string;
  /** Whether the glitch is active (used with trigger="manual") */
  active?: boolean;
  /** Glitch intensity (0-1) */
  intensity?: number;
  /** Duration of glitch burst in ms */
  duration?: number;
  /** Trigger mode */
  trigger?: "hover" | "click" | "always" | "manual";
}

/**
 * GlitchTransition — A CRT TV glitch effect that wraps content.
 *
 * Applies RGB split, scanlines, block displacement, and flicker
 * to create a cinematic glitch aesthetic.
 */
export function GlitchTransition({
  children,
  className,
  active: manualActive = false,
  intensity = 0.5,
  duration = 300,
  trigger = "hover",
}: GlitchTransitionProps) {
  const [glitching, setGlitching] = useState(trigger === "always");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clamp intensity
  const clampedIntensity = Math.max(0, Math.min(1, intensity));
  const rgbOffset = Math.round(clampedIntensity * 8) + 1; // 1–9px
  const sliceCount = Math.round(clampedIntensity * 5) + 2; // 2–7 slices

  // Manual mode
  useEffect(() => {
    if (trigger === "manual") {
      setGlitching(manualActive);
    }
  }, [trigger, manualActive]);

  // Always mode — stay glitching
  useEffect(() => {
    if (trigger === "always") {
      setGlitching(true);
    }
  }, [trigger]);

  const handleMouseEnter = useCallback(() => {
    if (trigger === "hover") setGlitching(true);
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === "hover") setGlitching(false);
  }, [trigger]);

  const handleClick = useCallback(() => {
    if (trigger === "click") {
      setGlitching(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setGlitching(false), duration);
    }
  }, [trigger, duration]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Generate random slice positions for block displacement
  const slices = Array.from({ length: sliceCount }, (_, i) => {
    const top = (i / sliceCount) * 100;
    const height = 100 / sliceCount;
    const dir = i % 2 === 0 ? 1 : -1;
    const shift = dir * (clampedIntensity * 12 + 2);
    return { top, height, shift };
  });

  const isActive = glitching;
  const subtleAlways = trigger === "always";

  return (
    <div
      className={cn("relative inline-block overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Base content */}
      <div
        className={cn(
          "relative z-10",
          isActive && "animate-[glitch-flicker_100ms_steps(2,start)_infinite]"
        )}
        style={
          isActive && subtleAlways
            ? { animationDuration: "300ms" }
            : undefined
        }
      >
        {children}
      </div>

      {/* RGB Split — Red channel */}
      {isActive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            transform: `translateX(${rgbOffset}px)`,
            mixBlendMode: "screen",
            opacity: 0.6 * clampedIntensity,
          }}
        >
          <div style={{ filter: "url(#glitch-red)" }}>{children}</div>
        </div>
      )}

      {/* RGB Split — Blue channel */}
      {isActive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            transform: `translateX(-${rgbOffset}px)`,
            mixBlendMode: "screen",
            opacity: 0.6 * clampedIntensity,
          }}
        >
          <div style={{ filter: "url(#glitch-blue)" }}>{children}</div>
        </div>
      )}

      {/* Scanlines overlay */}
      {isActive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)",
            opacity: clampedIntensity * 0.8,
          }}
        />
      )}

      {/* Block displacement slices */}
      {isActive &&
        slices.map((slice, i) => (
          <div
            key={i}
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 z-20 overflow-hidden"
            style={{
              top: `${slice.top}%`,
              height: `${slice.height}%`,
              clipPath: `inset(0 0 0 0)`,
              transform: `translateX(${slice.shift}px)`,
              opacity: 0.5 * clampedIntensity,
              animation: `glitch-flicker ${80 + i * 30}ms steps(2,start) infinite`,
            }}
          >
            {children}
          </div>
        ))}

      {/* SVG Filters for RGB tinting */}
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="glitch-red">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id="glitch-blue">
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
