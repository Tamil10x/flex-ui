"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { value: 134, suffix: "+", label: "Components" },
  { value: 100, suffix: "%", label: "TypeScript" },
  { value: 0, suffix: "", label: "Runtime CSS" },
  { value: 0, suffix: "", label: "Copy & Paste" },
];

// For the last two items we show text instead of animated numbers
const textOnlyIndices = new Set([2, 3]);
const textOnlyLabels: Record<number, string> = {
  2: "0",
  3: "Copy &\nPaste",
};

function AnimatedCounter({
  value,
  suffix,
  label,
  index,
}: StatItem & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      motionVal.set(value);
    }
  }, [isInView, motionVal, value]);

  const isTextOnly = textOnlyIndices.has(index);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-zinc-950/80 px-6 py-8 backdrop-blur-md"
    >
      {/* Subtle top-edge gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {isTextOnly ? (
        <span className="text-4xl font-bold tracking-tight text-white whitespace-pre-line text-center sm:text-5xl">
          {textOnlyLabels[index]}
        </span>
      ) : (
        <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          <motion.span>{display}</motion.span>
          {suffix}
        </span>
      )}

      <span className="text-sm text-zinc-500">{label}</span>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <AnimatedCounter key={stat.label} index={i} {...stat} />
        ))}
      </div>
    </section>
  );
}
