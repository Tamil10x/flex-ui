"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("relative space-y-8 pl-8", className)}>
      {/* Vertical line */}
      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/[0.06]" />

      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.05 }}
          className="relative"
        >
          {/* Dot / Icon */}
          <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.06] bg-zinc-950 text-xs text-white/50">
            {item.icon ?? <span className="h-2 w-2 rounded-full bg-white/30" />}
          </div>

          {item.date && <span className="mb-1 block text-xs text-white/30">{item.date}</span>}
          <h4 className="text-sm font-medium text-white">{item.title}</h4>
          <p className="mt-1 text-sm text-white/50">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
