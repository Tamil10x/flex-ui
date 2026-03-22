"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

function Digit({ digit, className }: { digit: string; className?: string }) {
  return (
    <span className={cn("relative inline-block h-[1em] w-[0.6em] overflow-hidden", className)}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const digits = String(value).split("");

  return (
    <span className={cn("inline-flex tabular-nums font-bold text-white", className)}>
      {digits.map((d, i) => (
        <Digit key={`${i}-${digits.length}`} digit={d} />
      ))}
    </span>
  );
}
