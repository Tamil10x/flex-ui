"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, type AvatarProps } from "@/components/flexui/avatar";

/* ── Types ────────────────────────────────────────────────────────────────── */

export interface AvatarGroupItem {
  src?: string;
  name: string;
  status?: AvatarProps["status"];
}

export interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  spacing?: "tight" | "normal" | "loose";
  expandable?: boolean;
  className?: string;
}

/* ── Constants ────────────────────────────────────────────────────────────── */

const spacingMap = {
  tight: "-space-x-3",
  normal: "-space-x-2.5",
  loose: "-space-x-1.5",
};

const overflowSizes = {
  xs: "h-7 w-7 text-[9px]",
  sm: "h-9 w-9 text-[10px]",
  md: "h-11 w-11 text-xs",
  lg: "h-14 w-14 text-sm",
  xl: "h-20 w-20 text-base",
};

/* ── Component ────────────────────────────────────────────────────────────── */

export function AvatarGroup({
  avatars,
  max = 5,
  size = "md",
  spacing = "normal",
  expandable = false,
  className,
}: AvatarGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const displayMax = expanded ? avatars.length : max;
  const visible = avatars.slice(0, displayMax);
  const overflow = avatars.length - displayMax;

  return (
    <div
      className={cn("flex items-center", spacingMap[spacing], className)}
      onMouseLeave={() => expandable && setExpanded(false)}
    >
      <AnimatePresence mode="popLayout">
        {visible.map((a, i) => (
          <motion.div
            key={a.name + i}
            layout
            initial={{ opacity: 0, scale: 0.6, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: -8 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              delay: i * 0.03,
            }}
            className="relative rounded-full ring-2 ring-zinc-950"
            style={{ zIndex: visible.length - i }}
          >
            <Avatar src={a.src} name={a.name} size={size} status={a.status} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Overflow count */}
      {overflow > 0 && (
        <motion.button
          layout
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => expandable && setExpanded(true)}
          onMouseEnter={() => expandable && setExpanded(true)}
          className={cn(
            "relative z-0 inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-2 ring-zinc-950 transition-colors duration-200",
            overflowSizes[size],
            expandable
              ? "cursor-pointer bg-white/[0.06] text-white/70 hover:bg-white/[0.1] hover:text-white"
              : "bg-white/[0.04] text-white/50",
            "border border-white/[0.06]"
          )}
        >
          <span className="relative">+{overflow}</span>
          {/* Subtle gradient shine */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/[0.04] to-transparent" />
        </motion.button>
      )}
    </div>
  );
}
