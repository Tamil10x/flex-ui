"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  /** Characters to use for scrambling */
  characters?: string;
  /** Speed of scramble in ms per tick */
  speed?: number;
  /** How many ticks before each character resolves */
  revealDelay?: number;
  /** Trigger on scroll into view */
  triggerOnView?: boolean;
  className?: string;
}

const DEFAULT_CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

export function TextScramble({
  text,
  characters = DEFAULT_CHARACTERS,
  speed = 50,
  revealDelay = 3,
  triggerOnView = true,
  className,
}: TextScrambleProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const hasRunRef = useRef(false);

  const scramble = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    let tick = 0;
    const length = text.length;

    const interval = setInterval(() => {
      const resolved = Math.floor(tick / revealDelay);

      if (resolved >= length) {
        el.textContent = text;
        clearInterval(interval);
        return;
      }

      let output = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          output += " ";
        } else if (i < resolved) {
          output += text[i];
        } else {
          output += characters[Math.floor(Math.random() * characters.length)];
        }
      }

      el.textContent = output;
      tick++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, characters, speed, revealDelay]);

  useEffect(() => {
    if (triggerOnView && isInView && !hasRunRef.current) {
      hasRunRef.current = true;
      const cleanup = scramble();
      return cleanup;
    }
    if (!triggerOnView && !hasRunRef.current) {
      hasRunRef.current = true;
      const cleanup = scramble();
      return cleanup;
    }
  }, [isInView, triggerOnView, scramble]);

  return (
    <span
      ref={containerRef}
      className={cn("inline-block font-mono", className)}
    >
      {triggerOnView ? "\u00A0".repeat(text.length) : text}
    </span>
  );
}
