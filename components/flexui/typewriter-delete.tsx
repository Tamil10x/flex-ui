"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TypewriterDeleteProps {
  text: string;
  className?: string;
  speed?: number;
  loop?: boolean;
}

export function TypewriterDelete({ text, className, speed = 80, loop = true }: TypewriterDeleteProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (displayed.length < text.length) {
        setDisplayed(text.slice(0, displayed.length + 1));
      } else {
        setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (displayed.length > 0) {
        setDisplayed(text.slice(0, displayed.length - 1));
      } else {
        setIsDeleting(false);
        if (!loop) return;
      }
    }
  }, [displayed, isDeleting, text, loop]);

  useEffect(() => {
    const id = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(id);
  }, [tick, speed, isDeleting]);

  return (
    <span className={cn("font-mono text-white", className)}>
      {displayed}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-cyan-400 animate-pulse align-middle" />
    </span>
  );
}
