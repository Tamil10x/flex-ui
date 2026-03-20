"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTABlockProps {
  heading: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function CTABlock({
  heading,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CTABlockProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-b border-white/[0.06] px-6 py-24",
        className
      )}
    >
      {/* Radial gradient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-purple-500/15 blur-[100px]" />
      </div>

      {/* Animated gradient border line (top) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Animated gradient border line (bottom) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl font-bold tracking-tight text-white"
        >
          {heading}
        </motion.h2>

        {/* Description */}
        {description && (
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-lg text-lg leading-relaxed text-zinc-400"
          >
            {description}
          </motion.p>
        )}

        {/* CTA buttons */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center gap-4"
          >
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-zinc-950 shadow-lg shadow-white/10 transition-all duration-200 hover:bg-zinc-200 hover:shadow-white/20"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03] px-6 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
              >
                {secondaryCta.label}
              </a>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
