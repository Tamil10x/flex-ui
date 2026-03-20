"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function ScrollCounter({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  once = true,
  className,
}: ScrollCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    stiffness: 100 / duration,
    damping: 30,
    restDelta: decimals > 0 ? 0.001 : 0.5,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(to);
    } else if (!once) {
      motionValue.set(from);
    }
  }, [isInView, to, from, motionValue, once]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix, decimals]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {`${prefix}${from.toFixed(decimals)}${suffix}`}
    </span>
  );
}
