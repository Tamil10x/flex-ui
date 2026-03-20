"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface WavyTextProps {
  text: string;
  /** Wave amplitude in pixels */
  amplitude?: number;
  /** Wave speed - duration per character */
  speed?: number;
  /** Delay between characters */
  delay?: number;
  /** Replay on each view */
  once?: boolean;
  className?: string;
}

export function WavyText({
  text,
  amplitude = 20,
  speed = 0.3,
  delay = 0.04,
  once = true,
  className,
}: WavyTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  const chars = text.split("");

  return (
    <span
      ref={ref}
      className={cn("inline-block overflow-hidden", className)}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: amplitude }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: amplitude }
          }
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
            mass: 0.5,
            delay: i * delay,
            duration: speed,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
