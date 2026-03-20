"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { SparklineChart } from "./sparkline-chart";

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  sparklineData?: number[];
  className?: string;
}

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20, mass: 1 });
  const display = useTransform(spring, (v: number) => {
    if (Number.isInteger(value)) return Math.round(v).toLocaleString();
    return v.toFixed(2);
  });

  useEffect(() => {
    if (isInView) motionVal.set(value);
  }, [isInView, value, motionVal]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      {prefix && (
        <span className="text-lg font-semibold text-zinc-500">{prefix}</span>
      )}
      <motion.span className="tabular-nums">{display}</motion.span>
      {suffix && (
        <span className="text-lg font-semibold text-zinc-500">{suffix}</span>
      )}
    </span>
  );
}

export function KPICard({
  title,
  value,
  prefix,
  suffix,
  change,
  sparklineData,
  className,
}: KPICardProps) {
  const isPositive = change !== undefined && change >= 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80 backdrop-blur-xl",
        className
      )}
    >
      {/* Top accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="p-6">
        {/* Title row */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          {change !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                isPositive &&
                  "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
                isNegative &&
                  "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
              )}
            >
              {/* Arrow */}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className={cn(isNegative && "rotate-180")}
              >
                <path
                  d="M5 2L8 6H2L5 2Z"
                  fill="currentColor"
                />
              </svg>
              {Math.abs(change).toFixed(1)}%
            </span>
          )}
        </div>

        {/* Big number */}
        <div className="mt-3 text-3xl font-bold tracking-tight text-white">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </div>

        {/* Sparkline */}
        {sparklineData && sparklineData.length >= 2 && (
          <div className="mt-4">
            <SparklineChart
              data={sparklineData}
              width={220}
              height={40}
              showArea
              animate
              color={isNegative ? "#f87171" : "#34d399"}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
