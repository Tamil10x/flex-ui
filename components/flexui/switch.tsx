"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const track = { sm: "h-5 w-9", md: "h-6 w-11", lg: "h-7 w-[52px]" };
const thumb = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };
const travel = { sm: 16, md: 20, lg: 24 };

export function Switch({ checked, onChange, disabled, className, size = "md" }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-white/[0.06] transition-colors",
        checked ? "bg-white/20" : "bg-white/[0.06]",
        disabled && "cursor-not-allowed opacity-50",
        track[size],
        className
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn("block rounded-full bg-white shadow-sm", thumb[size])}
        style={{ marginLeft: 3 }}
        animate={{ x: checked ? travel[size] : 0 }}
      />
    </button>
  );
}
