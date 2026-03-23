"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface StatsBlockProps {
  /** Stats to display */
  stats: Stat[];
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
  className?: string;
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function StatsBlock({
  stats,
  heading,
  subtitle,
  className,
}: StatsBlockProps) {
  return (
    <section className={cn("px-6 py-24", className)}>
      <div className="mx-auto max-w-5xl">
        {(heading || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-center"
          >
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-white">{heading}</h2>
            )}
            {subtitle && (
              <p className="mt-3 text-lg text-zinc-400">{subtitle}</p>
            )}
          </motion.div>
        )}

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={cn(
            "grid gap-6",
            stats.length === 2 && "sm:grid-cols-2",
            stats.length === 3 && "sm:grid-cols-3",
            stats.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-zinc-900/30"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="relative text-4xl font-bold tracking-tight text-white">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </p>
              <p className="relative mt-2 text-sm text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
