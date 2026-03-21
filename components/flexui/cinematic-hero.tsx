"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Lazy background imports (ssr: false for canvas-based ones) ──
const ParticleField = dynamic(
  () =>
    import("@/components/flexui/particle-field").then((m) => ({
      default: m.ParticleField,
    })),
  { ssr: false }
);

const GridPattern = dynamic(
  () =>
    import("@/components/flexui/grid-pattern").then((m) => ({
      default: m.GridPattern,
    })),
  { ssr: true }
);

const StarsBackground = dynamic(
  () =>
    import("@/components/flexui/stars-background").then((m) => ({
      default: m.StarsBackground,
    })),
  { ssr: false }
);

const AuroraBackground = dynamic(
  () =>
    import("@/components/flexui/aurora-background").then((m) => ({
      default: m.AuroraBackground,
    })),
  { ssr: true }
);

interface CinematicHeroProps {
  /** Main headline */
  headline: string;
  /** Subtitle text */
  subtitle?: string;
  /** Background variant */
  background?: "particles" | "grid" | "stars" | "aurora" | "none";
  /** Primary CTA */
  primaryCta?: { label: string; href: string };
  /** Secondary CTA */
  secondaryCta?: { label: string; href: string };
  /** Badge text */
  badge?: string;
  className?: string;
  children?: React.ReactNode;
}

// ── Word blur-reveal animation (inline) ────────────────────────
function AnimatedHeadline({ text }: { text: string }) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block"
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1 + i * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

// ── Background renderer ────────────────────────────────────────
function BackgroundLayer({
  variant,
}: {
  variant: CinematicHeroProps["background"];
}) {
  switch (variant) {
    case "particles":
      return (
        <ParticleField
          className="absolute inset-0"
          count={60}
          color="rgba(139, 92, 246, 0.5)"
          maxSize={3}
          speed={0.6}
        />
      );
    case "grid":
      return (
        <GridPattern
          className="absolute inset-0"
          size={48}
          opacity={0.05}
          fade
        />
      );
    case "stars":
      return (
        <StarsBackground
          className="absolute inset-0"
          count={100}
          twinkle
          twinkleSpeed={[2, 5]}
        />
      );
    case "aurora":
      return <AuroraBackground className="absolute inset-0" speed={10} blur={120} />;
    case "none":
    default:
      return null;
  }
}

export function CinematicHero({
  headline,
  subtitle,
  background = "particles",
  primaryCta,
  secondaryCta,
  badge,
  className,
  children,
}: CinematicHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950",
        className
      )}
    >
      {/* Background */}
      <BackgroundLayer variant={background} />

      {/* Radial vignette overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.7) 100%)",
        }}
      />

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-48 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* Content */}
      <div className="relative z-[2] mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-zinc-300 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {badge}
          </motion.div>
        )}

        {/* Headline with staggered word blur-reveal */}
        <AnimatedHeadline text={headline} />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTAs */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-zinc-200 hover:shadow-lg hover:shadow-white/10"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-300 backdrop-blur-sm transition-all hover:border-white/[0.2] hover:bg-white/[0.08]"
              >
                {secondaryCta.label}
              </a>
            )}
          </motion.div>
        )}

        {/* Custom children */}
        {children}
      </div>
    </section>
  );
}
