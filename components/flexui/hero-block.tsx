"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroBlockProps {
  /** Main headline — can include JSX */
  headline: React.ReactNode;
  /** Subtitle text */
  subtitle?: string;
  /** Primary CTA button */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA button */
  secondaryCta?: { label: string; href: string };
  /** Badge text above headline */
  badge?: string;
  /** Additional content below CTAs */
  children?: React.ReactNode;
  className?: string;
  /** Show grid background pattern */
  showGrid?: boolean;
  /** Layout variant */
  variant?: "centered" | "split" | "cinematic" | "minimal";
  /** Image or media for split variant */
  media?: React.ReactNode;
}

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

function HeroBadge({ badge }: { badge: string }) {
  return (
    <motion.div variants={fadeUp}>
      <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-zinc-400 backdrop-blur-sm">
        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
        {badge}
      </span>
    </motion.div>
  );
}

function HeroButtons({
  primaryCta,
  secondaryCta,
}: Pick<HeroBlockProps, "primaryCta" | "secondaryCta">) {
  if (!primaryCta && !secondaryCta) return null;
  return (
    <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
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
  );
}

export function HeroBlock({
  headline,
  subtitle,
  primaryCta,
  secondaryCta,
  badge,
  children,
  className,
  showGrid = true,
  variant = "centered",
  media,
}: HeroBlockProps) {
  // ── Minimal variant ──────────────────────────────────────────
  if (variant === "minimal") {
    return (
      <section className={cn("flex min-h-[60vh] items-center px-6 py-24", className)}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-2xl"
        >
          {badge && <HeroBadge badge={badge} />}
          <motion.h1 variants={fadeUp} className="mt-4 text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl">
            {headline}
          </motion.h1>
          {subtitle && (
            <motion.p variants={fadeUp} className="mt-5 text-lg leading-relaxed text-zinc-400">
              {subtitle}
            </motion.p>
          )}
          <HeroButtons primaryCta={primaryCta} secondaryCta={secondaryCta} />
          {children && <motion.div variants={fadeUp} className="mt-10">{children}</motion.div>}
        </motion.div>
      </section>
    );
  }

  // ── Split variant ────────────────────────────────────────────
  if (variant === "split") {
    return (
      <section className={cn("relative overflow-hidden px-6 py-24", className)}>
        {showGrid && (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            {badge && <HeroBadge badge={badge} />}
            <motion.h1 variants={fadeUp} className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {headline}
            </motion.h1>
            {subtitle && (
              <motion.p variants={fadeUp} className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                {subtitle}
              </motion.p>
            )}
            <HeroButtons primaryCta={primaryCta} secondaryCta={secondaryCta} />
          </motion.div>
          {media && (
            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex-1"
            >
              {media}
            </motion.div>
          )}
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-10 mx-auto mt-16 max-w-6xl"
          >
            {children}
          </motion.div>
        )}
      </section>
    );
  }

  // ── Cinematic variant ────────────────────────────────────────
  if (variant === "cinematic") {
    return (
      <section className={cn("relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24", className)}>
        {/* Multi-layer glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-violet-500/20 via-blue-500/15 to-cyan-500/20 blur-[150px]" />
          <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
          <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>
        {showGrid && (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        )}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          {badge && <HeroBadge badge={badge} />}
          <motion.h1 variants={fadeUp} className="mt-8 text-6xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
            {headline}
          </motion.h1>
          {subtitle && (
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-xl leading-relaxed text-zinc-400">
              {subtitle}
            </motion.p>
          )}
          <HeroButtons primaryCta={primaryCta} secondaryCta={secondaryCta} />
          {children && <motion.div variants={fadeUp} className="mt-12 w-full">{children}</motion.div>}
        </motion.div>
      </section>
    );
  }

  // ── Default centered variant ─────────────────────────────────
  return (
    <section
      className={cn(
        "relative flex min-h-[80vh] items-center justify-center overflow-hidden px-6 py-24",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/15 to-purple-500/20 blur-[120px]" />
      </div>
      {showGrid && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        {badge && <HeroBadge badge={badge} />}
        <motion.h1 variants={fadeUp} className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
          {headline}
        </motion.h1>
        {subtitle && (
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
            {subtitle}
          </motion.p>
        )}
        <HeroButtons primaryCta={primaryCta} secondaryCta={secondaryCta} />
        {children && <motion.div variants={fadeUp} className="mt-10 w-full">{children}</motion.div>}
      </motion.div>
    </section>
  );
}
