"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  /** Split by "char" or "word" */
  splitBy?: "char" | "word";
  /** Stagger delay in seconds */
  stagger?: number;
  /** Animation variant */
  variant?: "slide-up" | "slide-down" | "fade" | "scale";
  once?: boolean;
  className?: string;
}

const variants = {
  "slide-up": {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  "slide-down": {
    hidden: { y: -40, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
};

export function SplitText({
  text,
  splitBy = "char",
  stagger = 0.03,
  variant = "slide-up",
  once = true,
  className,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  const units =
    splitBy === "word" ? text.split(/(\s+)/) : text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const childVariants = {
    hidden: variants[variant].hidden,
    visible: {
      ...variants[variant].visible,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {units.map((unit, i) => (
        <span
          key={`${unit}-${i}`}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className="inline-block whitespace-pre"
            variants={childVariants}
          >
            {unit}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
