"use client";
import { useMotionTemplate, type MotionValue } from "framer-motion";

interface SpotlightOptions {
  size?: number;
  color?: string;
  opacity?: number;
}

export function useSpotlight(
  x: MotionValue<number>,
  y: MotionValue<number>,
  options: SpotlightOptions = {}
) {
  const { size = 400, color = "255,255,255", opacity = 0.1 } = options;
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color},${opacity}), transparent 50%)`;
  return bg;
}
