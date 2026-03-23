"use client";

import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface FlipWordsProps {
  words: string[];
  /** Duration each word is shown in ms */
  duration?: number;
  className?: string;
}

export function FlipWords({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  useEffect(() => {
    if (reducedMotion) return;
    const id = setInterval(next, duration);
    return () => clearInterval(id);
  }, [next, duration, reducedMotion]);

  if (reducedMotion) {
    return (
      <span className={cn("inline-block relative overflow-hidden", className)}>
        <span className="inline-block">{words[0]}</span>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-block relative overflow-hidden", className)}
      style={{ perspective: 300 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block"
          initial={{
            rotateX: 90,
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
          }}
          animate={{
            rotateX: 0,
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            rotateX: -90,
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 0.8,
          }}
          style={{ transformOrigin: "center center" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
