"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <motion.kbd
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-flex h-6 min-w-[24px] items-center justify-center rounded-md border border-white/[0.1] bg-white/[0.04] px-1.5 font-mono text-[11px] font-medium text-white/60 shadow-[0_1px_0_1px_rgba(255,255,255,0.04)]",
        className
      )}
    >
      {children}
    </motion.kbd>
  );
}
