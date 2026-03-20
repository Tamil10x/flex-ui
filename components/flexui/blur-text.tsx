"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  /** "word" animates word by word, "all" animates entire text */
  mode?: "word" | "all";
  /** Blur amount in pixels */
  blur?: number;
  /** Stagger delay between words in seconds */
  delay?: number;
  /** Duration of each word's animation */
  duration?: number;
  once?: boolean;
  className?: string;
}

export function BlurText({
  text,
  mode = "word",
  blur = 10,
  delay = 0.08,
  duration = 0.5,
  once = true,
  className,
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  if (mode === "all") {
    return (
      <motion.span
        ref={ref}
        className={cn("inline-block", className)}
        initial={{ opacity: 0, filter: `blur(${blur}px)`, y: 8 }}
        animate={
          isInView
            ? { opacity: 1, filter: "blur(0px)", y: 0 }
            : { opacity: 0, filter: `blur(${blur}px)`, y: 8 }
        }
        transition={{
          duration,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {text}
      </motion.span>
    );
  }

  const words = text.split(/(\s+)/);

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, filter: `blur(${blur}px)`, y: 8 }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: `blur(${blur}px)`, y: 8 }
          }
          transition={{
            duration,
            delay: i * delay,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
