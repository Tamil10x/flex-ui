"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  className?: string;
  color?: string;
}

export function NotificationBadge({
  count,
  maxCount = 99,
  className,
  color = "bg-red-500",
}: NotificationBadgeProps) {
  const display = count > maxCount ? `${maxCount}+` : String(count);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
          className={cn(
            "inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none text-white",
            color,
            className
          )}
        >
          {display}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
