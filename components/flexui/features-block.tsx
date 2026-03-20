"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesBlockProps {
  features: Feature[];
  className?: string;
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Section heading */
  heading?: string;
  /** Section subtitle */
  subtitle?: string;
}

// ─── Animation variants ─────────────────────────────────────────────────────

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// ─── Column class map ───────────────────────────────────────────────────────

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

// ─── FeaturesBlock ──────────────────────────────────────────────────────────

export function FeaturesBlock({
  features,
  className,
  columns = 3,
  heading,
  subtitle,
}: FeaturesBlockProps) {
  return (
    <motion.div
      className={cn("w-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Section header */}
      {(heading || subtitle) && (
        <motion.div className="mb-12 text-center" variants={headingVariants}>
          {heading && (
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Feature grid */}
      <motion.div
        className={cn("grid gap-4", columnClasses[columns])}
        variants={containerVariants}
      >
        {features.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.05] hover:shadow-lg hover:shadow-black/20"
          >
            {/* Icon */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400 transition-all duration-300 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 group-hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.4)]">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-white">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
