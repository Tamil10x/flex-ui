"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  /** Array of strings to rotate through */
  words: string[];
  /** Duration each word is shown in ms */
  duration?: number;
  /** Animation direction */
  direction?: "up" | "down";
  className?: string;
}

export function RotatingText({
  words,
  duration = 2000,
  direction = "up",
  className,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  const enterY = direction === "up" ? 30 : -30;
  const exitY = direction === "up" ? -30 : 30;

  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden",
        className
      )}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={words[index]}
          initial={{ y: enterY, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: exitY, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
