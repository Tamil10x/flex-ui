"use client";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TypewriterTextProps {
  /** Array of strings to cycle through */
  words: string[];
  /** Typing speed in ms per character */
  typingSpeed?: number;
  /** Deleting speed in ms per character */
  deletingSpeed?: number;
  /** Pause duration between words in ms */
  pauseDuration?: number;
  /** Cursor character */
  cursor?: string;
  /** Loop the animation */
  loop?: boolean;
  className?: string;
}

export function TypewriterText({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 1500,
  cursor = "|",
  loop = true,
  className,
}: TypewriterTextProps) {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const currentWord = words[wordIndex] ?? "";

  const tick = useCallback(() => {
    if (isDone) return;

    if (!isDeleting) {
      // Typing
      if (displayText.length < currentWord.length) {
        return setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      }
      // Finished typing — pause then delete
      return setTimeout(() => {
        const isLastWord = wordIndex === words.length - 1;
        if (!loop && isLastWord) {
          setIsDone(true);
          return;
        }
        setIsDeleting(true);
      }, pauseDuration);
    }

    // Deleting
    if (displayText.length > 0) {
      return setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deletingSpeed);
    }

    // Finished deleting — move to next word
    setIsDeleting(false);
    setWordIndex((prev) => (prev + 1) % words.length);
  }, [
    displayText,
    isDeleting,
    isDone,
    currentWord,
    wordIndex,
    words.length,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  useEffect(() => {
    const timer = tick();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [tick]);

  if (reducedMotion) {
    return (
      <span className={cn("inline-flex items-baseline", className)}>
        <span>{words[0] ?? ""}</span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span>{displayText}</span>
      <span
        className="ml-[1px] inline-block w-[2px] self-stretch bg-current"
        style={{
          animation: "typewriter-blink 1.06s step-end infinite",
        }}
      />
    </span>
  );
}
