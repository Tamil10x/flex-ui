"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, change, icon, className }: StatCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950/80 p-5 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{label}</p>
          <motion.p
            className="mt-1 text-3xl font-bold text-white"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.15 }}
          >
            {value}
          </motion.p>
        </div>
        {icon && <div className="text-zinc-500">{icon}</div>}
      </div>
      {change !== undefined && (
        <motion.div
          className="mt-3 flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <span
            className={cn(
              "text-sm font-medium",
              change >= 0 ? "text-emerald-400" : "text-red-400"
            )}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
          <span className="text-xs text-zinc-500">vs last period</span>
        </motion.div>
      )}
    </motion.div>
  );
}
