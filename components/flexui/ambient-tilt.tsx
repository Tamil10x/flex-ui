"use client";

import React, { useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AmbientTiltProps {
  children: React.ReactNode;
  className?: string;
  /** Max tilt angle in degrees */
  maxAngle?: number;
  /** Perspective distance in px */
  perspective?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  /** Use device gyroscope on mobile */
  useGyroscope?: boolean;
}

/**
 * AmbientTilt — A wrapper that adds subtle 3D tilt based on
 * cursor position (desktop) or device gyroscope (mobile).
 */
export function AmbientTilt({
  children,
  className,
  maxAngle = 8,
  perspective = 1000,
  stiffness = 100,
  damping = 20,
  useGyroscope = true,
}: AmbientTiltProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Raw motion values for mouse/gyro input (normalised -1 to 1)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed values
  const springX = useSpring(rawX, { stiffness, damping });
  const springY = useSpring(rawY, { stiffness, damping });

  // Map normalised input to rotation degrees
  const rotateX = useTransform(springY, [-1, 1], [maxAngle, -maxAngle]);
  const rotateY = useTransform(springX, [-1, 1], [-maxAngle, maxAngle]);

  // ── Desktop: mouse tracking ──────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Normalise to -1…1 from window centre
      rawX.set((e.clientX - w / 2) / (w / 2));
      rawY.set((e.clientY - h / 2) / (h / 2));
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // ── Mobile: gyroscope ────────────────────────────────────────────
  useEffect(() => {
    if (!useGyroscope) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const beta = e.beta ?? 0; // front-to-back tilt (-180 … 180)
      const gamma = e.gamma ?? 0; // left-to-right tilt (-90 … 90)

      // Normalise to -1…1 (clamped at ±45deg for beta, ±45deg for gamma)
      rawY.set(Math.max(-1, Math.min(1, beta / 45)));
      rawX.set(Math.max(-1, Math.min(1, gamma / 45)));
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [useGyroscope, rawX, rawY]);

  return (
    <motion.div
      ref={wrapperRef}
      className={cn("will-change-transform", className)}
      style={{
        perspective,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
}
