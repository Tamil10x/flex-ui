"use client";

import React, { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  /** Prefix like "$" or "#" */
  prefix?: string;
  /** Suffix like "+" or "%" */
  suffix?: string;
  /** Decimal places */
  decimals?: number;
  /** Spring stiffness */
  stiffness?: number;
  /** Spring damping */
  damping?: number;
  className?: string;
  /** Only animate once */
  once?: boolean;
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  stiffness = 100,
  damping = 30,
  className,
  once = true,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness, damping });
  const displayValue = useTransform(springValue, (latest) => {
    return `${prefix}${latest.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {displayValue}
    </motion.span>
  );
}
