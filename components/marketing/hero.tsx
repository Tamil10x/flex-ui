"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MagneticButton } from "@/components/flexui/magnetic-button";
import { CopyButton } from "@/components/ui/copy-button";

const headlineWords = ["Build", "Cinematic", "Interfaces."];
const subHeadlineWords = ["Zero", "npm", "bloat."];

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function Hero() {
  const installCmd = "npx shadcn@latest add @flexui/magnetic-button";

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.05] blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-8"
      >
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
          FLEX<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UI</span>{" "}
          <span className="text-zinc-600">v0.1.0</span> — Now in public beta
        </span>
      </motion.div>

      {/* Headline */}
      <h1 className="relative z-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
        {headlineWords.map((word, i) => (
          <motion.span
            key={word}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className={
              word === "Cinematic"
                ? "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                : ""
            }
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Sub-headline */}
      <h2 className="relative z-10 mt-2 flex flex-wrap items-center justify-center gap-x-3 text-3xl font-semibold tracking-tight text-zinc-500 sm:text-4xl md:text-5xl">
        {subHeadlineWords.map((word, i) => (
          <motion.span
            key={word}
            custom={i + headlineWords.length}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Description */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-8 max-w-xl text-lg text-zinc-400"
      >
        A premium component registry with cinematic Framer Motion animations
        and interactive Three.js experiences. Copy. Paste. Ship.
      </motion.p>

      {/* CTA */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row"
      >
        <Link href="/docs/introduction">
          <MagneticButton className="bg-white px-10 py-4 text-base font-semibold text-black">
            Browse Components
          </MagneticButton>
        </Link>
        <Link
          href="/docs/installation"
          className="rounded-xl border border-white/10 px-8 py-4 text-sm font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Install snippet with copy button */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-8"
      >
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-zinc-900/50 pl-5 pr-1.5 py-1.5 backdrop-blur-sm">
          <code className="text-sm text-zinc-400">
            <span className="text-zinc-600">$</span>{" "}
            <span className="text-zinc-300">{installCmd}</span>
          </code>
          <CopyButton text={installCmd} />
        </div>
      </motion.div>
    </section>
  );
}
