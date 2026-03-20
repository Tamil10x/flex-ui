"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  /** "char" reveals letter by letter, "word" reveals word by word */
  mode?: "char" | "word";
  /** Delay between each unit in seconds */
  stagger?: number;
  /** Animation duration per unit */
  duration?: number;
  className?: string;
  /** Only animate once */
  once?: boolean;
}

export function TextReveal({
  text,
  mode = "char",
  stagger = 0.03,
  duration = 0.5,
  className,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  const units =
    mode === "word"
      ? text.split(/(\s+)/)
      : text.split("");

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block overflow-hidden",
        className
      )}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 20, filter: "blur(8px)" }
          }
          transition={{
            duration,
            delay: i * stagger,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {unit}
        </motion.span>
      ))}
    </span>
  );
}
