"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className }: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6 backdrop-blur-xl",
        "shadow-[0_4px_20px_rgba(0,0,0,0.3)]",
        "hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:border-white/[0.15]",
        "transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
