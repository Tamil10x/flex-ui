"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function RevealCard({ title, children, className }: RevealCardProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl",
        className
      )}
    >
      <div className="relative z-10 p-6">
        <div className="text-lg font-semibold text-white">{title}</div>
      </div>
      <motion.div
        variants={{
          rest: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900/95 p-6 backdrop-blur-sm"
      >
        <div className="text-sm text-zinc-300">{children}</div>
      </motion.div>
    </motion.div>
  );
}
