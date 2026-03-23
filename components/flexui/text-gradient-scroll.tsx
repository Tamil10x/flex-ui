"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGradientScrollProps {
  text: string;
  className?: string;
}

export function TextGradientScroll({ text, className }: TextGradientScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.3"],
  });

  const clipRight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <span className="text-4xl font-bold text-zinc-700">{text}</span>
      <motion.span
        className="absolute inset-0 text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
        style={{ clipPath: useTransform(clipRight, (v) => `inset(0 ${100 - parseFloat(v)}% 0 0)`) }}
      >
        {text}
      </motion.span>
    </div>
  );
}
