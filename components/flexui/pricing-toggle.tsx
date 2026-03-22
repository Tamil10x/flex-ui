"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PricingToggleProps {
  isYearly: boolean;
  onChange: (yearly: boolean) => void;
  className?: string;
}

export function PricingToggle({ isYearly, onChange, className }: PricingToggleProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn("text-sm transition-colors", !isYearly ? "text-white" : "text-zinc-500")}
      >
        Monthly
      </span>
      <button
        onClick={() => onChange(!isYearly)}
        className="relative h-7 w-12 rounded-full border border-white/[0.08] bg-zinc-900 p-0.5 transition-colors"
        aria-label="Toggle pricing"
      >
        <motion.div
          className="h-6 w-6 rounded-full bg-cyan-400"
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{ marginLeft: isYearly ? "auto" : 0 }}
        />
      </button>
      <span
        className={cn("text-sm transition-colors", isYearly ? "text-white" : "text-zinc-500")}
      >
        Yearly
      </span>
      {isYearly && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400"
        >
          Save 20%
        </motion.span>
      )}
    </div>
  );
}
