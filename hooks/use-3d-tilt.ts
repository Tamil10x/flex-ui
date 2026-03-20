"use client";
import { useSpring, useTransform, type MotionValue } from "framer-motion";

interface Tilt3DOptions {
  maxAngle?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export function use3DTilt(
  percentX: MotionValue<number>,
  percentY: MotionValue<number>,
  options: Tilt3DOptions = {}
) {
  const { maxAngle = 12, stiffness = 120, damping = 18, mass = 0.6 } = options;
  const spring = { stiffness, damping, mass };
  const smoothX = useSpring(percentX, spring);
  const smoothY = useSpring(percentY, spring);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxAngle, -maxAngle]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxAngle, maxAngle]);

  return { rotateX, rotateY };
}
