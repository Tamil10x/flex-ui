"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useTheme } from "@/components/flexui/theme-provider";
import { themes } from "@/lib/themes";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SpotlightCard } from "@/components/flexui/spotlight-card";
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { NumberTicker } from "@/components/flexui/number-ticker";
import { NeonGlowCard } from "@/components/flexui/neon-glow-card";
import { SparklineChart } from "@/components/flexui/sparkline-chart";

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const chartData1 = [20, 35, 28, 55, 42, 68, 52, 78, 65, 90, 72, 95];
const chartData2 = [50, 42, 58, 35, 65, 48, 72, 55, 80, 62, 88, 70];
const chartData3 = [10, 18, 25, 32, 40, 55, 62, 70, 78, 85, 90, 95];

const features = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Lightning Fast",
    desc: "Sub-50ms renders with automatic tree-shaking and lazy-loaded bundles.",
  },
  {
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 0V10m0-2a2 2 0 100-4m0 4V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 0V10",
    title: "Cinematic Motion",
    desc: "Spring physics, blur reveals, and staggered entrances running at 60fps.",
  },
  {
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    title: "Premium Themes",
    desc: "6 hand-crafted palettes with 30+ semantic tokens that adapt every pixel.",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Accessible First",
    desc: "WCAG 2.1 AA compliant with full keyboard navigation and screen-reader support.",
  },
  {
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    title: "Page Templates",
    desc: "7 cinematic full-page templates — SaaS, portfolio, dashboard, e-commerce & more.",
  },
  {
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    title: "CLI Powered",
    desc: "npx flexui add — install any component or theme in a single command.",
  },
];

const testimonials = [
  { name: "Sarah Chen", role: "Staff Engineer, Vercel", text: "FlexUI's theme engine is what shadcn should have shipped. We migrated in an afternoon." },
  { name: "Marcus Rivera", role: "Design Lead, Linear", text: "The cinematic animations are buttery smooth. Our designers can't stop creating with it." },
  { name: "Aiko Tanaka", role: "CTO, Raycast", text: "139+ components, zero config. FlexUI saved us months of engineering time." },
];

/* ------------------------------------------------------------------ */
/*  Animated Count-Up hook                                             */
/* ------------------------------------------------------------------ */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Animated Bar                                                       */
/* ------------------------------------------------------------------ */
function AnimatedBar({
  height,
  delay,
  accent,
  glowPrimary,
  label,
}: {
  height: number;
  delay: number;
  accent: string;
  glowPrimary: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: `${height}%` }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="group relative flex-1 cursor-pointer rounded-t-md transition-all duration-200 hover:brightness-125"
      style={{
        background: `linear-gradient(to top, rgba(${glowPrimary}, 0.2), rgba(${glowPrimary}, 0.9))`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-bold opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: "var(--flexui-surface-active)",
          color: "var(--flexui-heading)",
          border: "1px solid var(--flexui-border-hover)",
        }}
      >
        ${Math.round(height * 52)}
      </div>
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px]"
        style={{ color: "var(--flexui-caption)" }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Fullscreen Experience (compact portal)                             */
/* ------------------------------------------------------------------ */

function FullscreenExperience({
  onClose,
  themeName,
  setTheme,
  availableThemes,
}: {
  onClose: () => void;
  themeName: string;
  setTheme: (name: string) => void;
  availableThemes: string[];
}) {
  const currentTheme = themes[themeName];
  const accent = currentTheme?.tokens["--flexui-accent"] ?? "#A78BFA";
  const secondary = currentTheme?.tokens["--flexui-secondary"] ?? "#818CF8";
  const glowPrimary = currentTheme?.tokens["--flexui-glow-primary"] ?? "167,139,250";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{ background: "var(--flexui-background)" }}
    >
      {/* ── Sticky top bar ── */}
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 backdrop-blur-xl"
        style={{
          background: "color-mix(in srgb, var(--flexui-background) 85%, transparent)",
          borderBottom: "1px solid var(--flexui-border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-black"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${secondary})`,
              color: "var(--flexui-accent-foreground)",
            }}
          >
            F
          </div>
          <p className="text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>
            {currentTheme?.label}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex">
            {availableThemes.map((name) => {
              const t = themes[name];
              return (
                <button
                  key={name}
                  onClick={() => setTheme(name)}
                  className="rounded-full p-0.5 transition-all duration-200"
                  title={t.label}
                >
                  <div
                    className="h-4 w-4 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: t.tokens["--flexui-accent"],
                      boxShadow:
                        themeName === name
                          ? `0 0 0 2px var(--flexui-background), 0 0 0 3px ${t.tokens["--flexui-accent"]}`
                          : "none",
                    }}
                  />
                </button>
              );
            })}
          </div>
          <button
            onClick={onClose}
            className="ml-2 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 hover:brightness-125"
            style={{
              background: "var(--flexui-surface)",
              color: "var(--flexui-body)",
              border: "1px solid var(--flexui-border)",
            }}
          >
            <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            ESC
          </button>
        </div>
      </motion.div>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden px-6 pb-20 pt-24">
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
            style={{ background: accent }}
          />
          <motion.div
            animate={{ scale: [1.15, 1, 1.15], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full blur-[150px]"
            style={{ background: secondary }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              color: "var(--flexui-heading)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: `rgba(${glowPrimary}, 0.1)`,
                color: accent,
                border: `1px solid rgba(${glowPrimary}, 0.15)`,
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: accent }} />
              {currentTheme?.label} Active
            </span>

            <h1
              className="mt-8 text-5xl font-black tracking-tight sm:text-7xl"
              style={{ color: "var(--flexui-heading)" }}
            >
              Experience{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${secondary})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {currentTheme?.label}
              </span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed"
              style={{ color: "var(--flexui-body)" }}
            >
              {currentTheme?.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <ShimmerButton shimmerColor={accent} className="px-7 py-2.5 text-sm font-bold">
              <span style={{ color: "var(--flexui-heading)" }}>Get Started</span>
            </ShimmerButton>
            <button
              className="rounded-xl px-7 py-2.5 text-sm font-semibold transition-all duration-300 hover:brightness-125"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              Documentation
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-4"
        >
          {[
            { label: "Components", value: 140, suffix: "+" },
            { label: "Theme Tokens", value: 30, suffix: "+" },
            { label: "Page Templates", value: 7, suffix: "" },
            { label: "Lighthouse", value: 99, suffix: "" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-xl p-5 text-center transition-all duration-500"
              style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
            >
              <p className="text-3xl font-black tabular-nums" style={{ color: accent }}>
                <NumberTicker value={stat.value} stiffness={50} damping={18} />
                {stat.suffix}
              </p>
              <p
                className="mt-1 text-[10px] font-medium uppercase tracking-wider"
                style={{ color: "var(--flexui-caption)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Dashboard ── */}
      <div className="mx-auto mt-16 max-w-4xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-5 text-xl font-bold"
          style={{ color: "var(--flexui-heading)" }}
        >
          Dashboard
        </motion.h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Revenue", value: 45231, prefix: "$", change: "+20.1%", up: true, data: chartData1 },
            { label: "Users", value: 12543, prefix: "", change: "+8.2%", up: true, data: chartData2 },
            { label: "Growth", value: 94, prefix: "", change: "+12.5%", up: true, data: chartData3 },
          ].map((kpi) => (
            <SpotlightCard key={kpi.label} spotlightColor={glowPrimary} spotlightSize={280} className="rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--flexui-caption)" }}>
                    {kpi.label}
                  </p>
                  <p className="mt-1.5 text-2xl font-bold tabular-nums" style={{ color: "var(--flexui-heading)" }}>
                    {kpi.prefix}
                    <NumberTicker value={kpi.value} decimals={kpi.value < 10 ? 1 : 0} stiffness={60} damping={20} />
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold" style={{ color: kpi.up ? "var(--flexui-success)" : "var(--flexui-error)" }}>
                    {kpi.change}
                  </p>
                </div>
                <div className="w-20">
                  <SparklineChart data={kpi.data} color={accent} height={40} width={80} showArea animate />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="mx-auto mt-16 max-w-4xl px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {features.slice(0, 3).map((card) => (
            <NeonGlowCard key={card.title} color={accent} intensity={0.7} pulse className="rounded-xl p-5">
              <div
                className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: `rgba(${glowPrimary}, 0.1)`, color: accent }}
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none">
                  <path d={card.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>{card.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "var(--flexui-body)" }}>{card.desc}</p>
            </NeonGlowCard>
          ))}
        </div>
      </div>

      {/* ── CTA Footer ── */}
      <div className="mx-auto mt-20 max-w-4xl px-6 pb-16">
        <div
          className="relative overflow-hidden rounded-2xl px-8 py-14 text-center"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{ background: `radial-gradient(ellipse at center, rgba(${glowPrimary}, 0.2), transparent 70%)` }}
          />
          <h2 className="relative text-2xl font-bold sm:text-3xl" style={{ color: "var(--flexui-heading)" }}>
            Ready to build with{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${accent}, ${secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {currentTheme?.label}
            </span>
            ?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm" style={{ color: "var(--flexui-body)" }}>
            Switch themes at any time — your entire app adapts instantly.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <ShimmerButton shimmerColor={accent} className="px-7 py-2.5 text-sm font-bold">
              <span style={{ color: "var(--flexui-heading)" }}>Start Building</span>
            </ShimmerButton>
            <button
              onClick={onClose}
              className="rounded-xl px-7 py-2.5 text-sm font-semibold transition-all duration-200"
              style={{ background: "var(--flexui-surface-hover)", color: "var(--flexui-heading)", border: "1px solid var(--flexui-border)" }}
            >
              Back to Docs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline Live Preview — Full template page                           */
/* ------------------------------------------------------------------ */

function LivePreviewTemplate({
  themeName,
  accent,
  secondary,
  glowPrimary,
}: {
  themeName: string;
  accent: string;
  secondary: string;
  glowPrimary: string;
}) {
  const currentTheme = themes[themeName];
  const rev1 = useCountUp(45231, 2000);
  const rev2 = useCountUp(12543, 2000);
  const rev3 = useCountUp(99, 1600);

  return (
    <motion.div
      key={themeName}
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.45, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="overflow-hidden rounded-2xl"
      style={{ background: "var(--flexui-background)", border: "1px solid var(--flexui-border)" }}
    >
      {/* ── Mini Navbar ── */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: "1px solid var(--flexui-border)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-md text-[9px] font-black"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${secondary})`,
              color: "var(--flexui-accent-foreground)",
            }}
          >
            F
          </div>
          <span className="text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>FlexUI</span>
        </div>
        <div className="flex items-center gap-4">
          {["Features", "Pricing", "Docs"].map((item) => (
            <span key={item} className="text-[11px] font-medium" style={{ color: "var(--flexui-body)" }}>
              {item}
            </span>
          ))}
          <div
            className="rounded-md px-2.5 py-1 text-[10px] font-bold"
            style={{ background: accent, color: "var(--flexui-accent-foreground)" }}
          >
            Sign Up
          </div>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden px-6 py-16">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-20 -top-20 h-[320px] w-[320px] rounded-full blur-[120px]"
            style={{ background: accent }}
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.28, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -right-20 h-[280px] w-[280px] rounded-full blur-[120px]"
            style={{ background: secondary }}
          />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              color: "var(--flexui-heading)",
            }}
          />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="relative mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: `rgba(${glowPrimary}, 0.1)`,
                color: accent,
                border: `1px solid rgba(${glowPrimary}, 0.12)`,
              }}
            >
              <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: accent }} />
              Introducing FlexUI
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-3xl font-black tracking-tight sm:text-4xl"
            style={{ color: "var(--flexui-heading)" }}
          >
            Build stunning apps{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${accent}, ${secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              10x faster
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-md text-sm leading-relaxed"
            style={{ color: "var(--flexui-body)" }}
          >
            The most comprehensive React component registry with cinematic animations,
            premium themes, and production-ready templates.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ShimmerButton shimmerColor={accent} className="px-6 py-2 text-xs font-bold">
              <span style={{ color: "var(--flexui-heading)" }}>Start Building Free</span>
            </ShimmerButton>
            <button
              className="rounded-lg px-5 py-2 text-xs font-semibold transition-all duration-300"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              View Components →
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Trusted By / Brand Bar ── */}
      <div
        className="flex items-center justify-center gap-8 px-6 py-4"
        style={{ borderTop: "1px solid var(--flexui-border)", borderBottom: "1px solid var(--flexui-border)" }}
      >
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--flexui-caption)" }}>
          Trusted by
        </span>
        {["Vercel", "Linear", "Raycast", "Supabase", "Resend"].map((brand) => (
          <span key={brand} className="text-[11px] font-bold tracking-wide opacity-40" style={{ color: "var(--flexui-heading)" }}>
            {brand}
          </span>
        ))}
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-3" style={{ borderBottom: "1px solid var(--flexui-border)" }}>
        {[
          { label: "Revenue", value: rev1, prefix: "$" },
          { label: "Active Users", value: rev2, prefix: "" },
          { label: "Uptime", value: rev3, prefix: "", suffix: "%" },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-5 text-center">
            <p className="text-2xl font-black tabular-nums" ref={stat.value.ref} style={{ color: accent }}>
              {stat.prefix}{stat.value.count.toLocaleString()}{stat.suffix ?? ""}
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--flexui-caption)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Feature Grid ── */}
      <div className="p-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-3"
        >
          {features.slice(0, 6).map((f) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              className="group rounded-xl p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "var(--flexui-surface)",
                border: "1px solid var(--flexui-border)",
              }}
            >
              <div
                className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110"
                style={{ background: `rgba(${glowPrimary}, 0.1)`, color: accent }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d={f.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h4 className="text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>{f.title}</h4>
              <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "var(--flexui-body)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Dashboard KPIs ── */}
      <div className="px-6 pb-6">
        <div
          className="overflow-hidden rounded-xl"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${accent}, ${secondary}, ${accent})`, backgroundSize: "200% 100%", animation: "gradient-shift 4s linear infinite" }} />
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>Revenue Overview</h3>
                <p className="mt-0.5 text-[10px]" style={{ color: "var(--flexui-caption)" }}>Last 12 months</p>
              </div>
              <div className="rounded-md px-2 py-1 text-[10px] font-bold" style={{ background: `rgba(${glowPrimary}, 0.1)`, color: accent }}>
                +24.5%
              </div>
            </div>
            <div className="mt-5 flex h-36 items-end gap-1.5 pb-6">
              {[40, 65, 45, 80, 55, 70, 92, 60, 75, 85, 50, 98].map((h, i) => (
                <AnimatedBar
                  key={i + themeName}
                  height={h}
                  delay={0.04 * i}
                  accent={accent}
                  glowPrimary={glowPrimary}
                  label={["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div className="px-6 pb-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-3 sm:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="rounded-xl p-4"
              style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
            >
              <div className="mb-2 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-3 w-3" viewBox="0 0 20 20" fill={accent}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--flexui-body)" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: `rgba(${glowPrimary}, 0.12)`, color: accent }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] font-bold" style={{ color: "var(--flexui-heading)" }}>{t.name}</p>
                  <p className="text-[9px]" style={{ color: "var(--flexui-caption)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── UI Elements Showcase ── */}
      <div className="px-6 pb-6">
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <h4 className="mb-3 text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>UI Components</h4>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {[
              { label: "Deployed", token: "--flexui-success" },
              { label: "Building", token: "--flexui-warning" },
              { label: "Failed", token: "--flexui-error" },
              { label: "Queued", token: "--flexui-info" },
              { label: "Premium", token: "--flexui-accent" },
              { label: "Beta", token: "--flexui-secondary" },
            ].map((b) => (
              <span
                key={b.label}
                className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{
                  background: `color-mix(in srgb, var(${b.token}) 10%, transparent)`,
                  color: `var(${b.token})`,
                  border: `1px solid color-mix(in srgb, var(${b.token}) 15%, transparent)`,
                }}
              >
                {b.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ShimmerButton shimmerColor={accent} className="px-4 py-1.5 text-[11px] font-semibold">
              <span style={{ color: "var(--flexui-heading)" }}>Shimmer</span>
            </ShimmerButton>
            <button
              className="rounded-lg px-4 py-1.5 text-[11px] font-semibold transition-all hover:brightness-110"
              style={{ background: accent, color: "var(--flexui-accent-foreground)", boxShadow: "var(--flexui-shadow-md)" }}
            >
              Primary
            </button>
            <button
              className="rounded-lg px-4 py-1.5 text-[11px] font-semibold"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              Outlined
            </button>
            <button
              className="rounded-lg px-4 py-1.5 text-[11px] font-medium"
              style={{ background: "var(--flexui-surface-hover)", color: "var(--flexui-body)", border: "1px solid var(--flexui-border)" }}
            >
              Ghost
            </button>
          </div>
        </div>
      </div>

      {/* ── Login Form + Color Palette ── */}
      <div className="grid gap-3 px-6 pb-6 sm:grid-cols-2">
        {/* Login form */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <h4 className="mb-3 text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>Sign In</h4>
          <div className="space-y-2.5">
            {["Email", "Password"].map((f) => (
              <div key={f}>
                <label className="mb-1 block text-[10px] font-medium" style={{ color: "var(--flexui-body)" }}>{f}</label>
                <input
                  type={f === "Password" ? "password" : "email"}
                  placeholder={f === "Password" ? "••••••••" : "you@example.com"}
                  className="w-full rounded-lg px-3 py-2 text-xs outline-none transition-all duration-200 placeholder:opacity-25 focus:ring-1"
                  style={{
                    background: "var(--flexui-background)",
                    border: "1px solid var(--flexui-border)",
                    color: "var(--flexui-foreground)",
                    // @ts-expect-error CSS custom properties
                    "--tw-ring-color": "var(--flexui-border-focus)",
                  }}
                />
              </div>
            ))}
            <button
              className="w-full rounded-lg py-2 text-xs font-bold transition-all duration-200 hover:brightness-110"
              style={{ background: accent, color: "var(--flexui-accent-foreground)", boxShadow: "var(--flexui-shadow-glow)" }}
            >
              Sign In
            </button>
            <p className="text-center text-[10px]" style={{ color: "var(--flexui-caption)" }}>
              or continue with Google / GitHub
            </p>
          </div>
        </div>

        {/* Color palette */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <h4 className="mb-3 text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>
            Color System — {currentTheme?.label}
          </h4>
          <div className="grid grid-cols-5 gap-2.5">
            {[
              { l: "BG", v: "--flexui-background" },
              { l: "Surface", v: "--flexui-surface" },
              { l: "Accent", v: "--flexui-accent" },
              { l: "2nd", v: "--flexui-secondary" },
              { l: "Heading", v: "--flexui-heading" },
              { l: "Body", v: "--flexui-body" },
              { l: "Border", v: "--flexui-border" },
              { l: "Success", v: "--flexui-success" },
              { l: "Warn", v: "--flexui-warning" },
              { l: "Error", v: "--flexui-error" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div
                  className="mx-auto h-7 w-7 rounded-md ring-1 ring-white/[0.05]"
                  style={{ backgroundColor: `var(${s.v})` }}
                />
                <p className="mt-1 text-[8px] font-medium" style={{ color: "var(--flexui-caption)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Footer ── */}
      <div className="px-6 pb-6">
        <div
          className="relative overflow-hidden rounded-xl px-6 py-10 text-center"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(ellipse at center, rgba(${glowPrimary}, 0.25), transparent 70%)` }}
          />
          <h3 className="relative text-xl font-bold" style={{ color: "var(--flexui-heading)" }}>
            Ready to build with{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${accent}, ${secondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {currentTheme?.label}
            </span>
            ?
          </h3>
          <p className="relative mt-2 text-xs" style={{ color: "var(--flexui-body)" }}>
            One command away. npx flexui theme apply {themeName}
          </p>
          <div className="relative mt-5 flex flex-wrap justify-center gap-2">
            <ShimmerButton shimmerColor={accent} className="px-5 py-2 text-[11px] font-bold">
              <span style={{ color: "var(--flexui-heading)" }}>Get Started</span>
            </ShimmerButton>
            <button
              className="rounded-lg px-5 py-2 text-[11px] font-semibold"
              style={{ color: accent, border: `1px solid ${accent}` }}
            >
              Documentation
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ThemePreviewPage() {
  const { themeName, setTheme, availableThemes } = useTheme();
  const currentTheme = themes[themeName];
  const accent = currentTheme?.tokens["--flexui-accent"] ?? "#A78BFA";
  const secondary = currentTheme?.tokens["--flexui-secondary"] ?? "#818CF8";
  const glowPrimary = currentTheme?.tokens["--flexui-glow-primary"] ?? "167,139,250";
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="min-w-0 flex-1 space-y-12">
      {/* ── Header ── */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-all duration-500"
            style={{
              background: `rgba(${glowPrimary}, 0.12)`,
              color: accent,
              border: `1px solid rgba(${glowPrimary}, 0.18)`,
            }}
          >
            Theme Engine
          </span>
        </div>
        <h1
          className="mt-5 text-4xl font-bold tracking-tight transition-colors duration-500"
          style={{ color: "var(--flexui-heading)" }}
        >
          Theme Preview
        </h1>
        <p
          className="mt-3 max-w-2xl text-lg leading-relaxed transition-colors duration-500"
          style={{ color: "var(--flexui-body)" }}
        >
          6 ultra-premium themes. Select one — the{" "}
          <strong style={{ color: "var(--flexui-heading)" }}>entire application</strong>{" "}
          transforms instantly.
        </p>
      </div>

      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, var(--flexui-accent), transparent)`, opacity: 0.2 }} />

      {/* ── Theme Selector ── */}
      <div>
        <h2 className="mb-5 text-lg font-semibold" style={{ color: "var(--flexui-heading)" }}>
          Select Theme
        </h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {availableThemes.map((name) => {
            const t = themes[name];
            const isActive = themeName === name;
            return (
              <motion.button
                key={name}
                variants={fadeUp}
                onClick={() => setTheme(name)}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.015 }}
                className="group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300"
                style={{
                  background: isActive ? t.tokens["--flexui-surface-active"] : t.tokens["--flexui-surface"],
                  border: `1px solid ${isActive ? t.tokens["--flexui-accent"] : t.tokens["--flexui-border"]}`,
                  boxShadow: isActive ? t.tokens["--flexui-shadow-glow"] : "none",
                }}
              >
                <div className="mb-3 flex gap-1.5">
                  {[
                    t.tokens["--flexui-accent"],
                    t.tokens["--flexui-secondary"],
                    t.tokens["--flexui-success"],
                    t.tokens["--flexui-warning"],
                    t.tokens["--flexui-error"],
                  ].map((color, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full ring-1 ring-black/20 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm font-bold" style={{ color: t.tokens["--flexui-heading"] }}>
                  {t.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed" style={{ color: t.tokens["--flexui-body"] }}>
                  {t.description}
                </p>
                {isActive && (
                  <motion.div
                    layoutId="theme-check"
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: t.tokens["--flexui-accent"] }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                  >
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" style={{ color: t.tokens["--flexui-accent-foreground"] }}>
                      <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                )}
                <div
                  className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                  style={{ background: t.tokens["--flexui-accent-glow"] }}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Go Live — Compact Pill ── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setFullscreen(true)}
          className="group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
          style={{
            background: `linear-gradient(135deg, ${accent}, ${secondary})`,
            color: "var(--flexui-accent-foreground)",
            boxShadow: "var(--flexui-shadow-md)",
          }}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2.5 1A1.5 1.5 0 001 2.5v3a.5.5 0 001 0v-3a.5.5 0 01.5-.5h3a.5.5 0 000-1h-3zm10 0a.5.5 0 000 1h1a.5.5 0 01.5.5v1a.5.5 0 001 0v-1A1.5 1.5 0 0013.5 1h-1zM1 11.5a.5.5 0 011 0v1a.5.5 0 00.5.5h1a.5.5 0 010 1h-1A1.5 1.5 0 011 13.5v-2zm13 0a.5.5 0 011 0v2a1.5 1.5 0 01-1.5 1.5h-1a.5.5 0 010-1h1a.5.5 0 00.5-.5v-2zM6 4.5l5 3.5-5 3.5v-7z" />
          </svg>
          Go Live
        </button>
        <span className="text-[11px]" style={{ color: "var(--flexui-caption)" }}>
          Fullscreen experience · ESC to close
        </span>
      </div>

      {/* ── Live Preview — Full Template ── */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <h2 className="text-lg font-semibold" style={{ color: "var(--flexui-heading)" }}>
            Live Preview
          </h2>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ background: `rgba(${glowPrimary}, 0.1)`, color: accent }}
          >
            Full Template
          </span>
        </div>
        <p className="mb-6 text-sm" style={{ color: "var(--flexui-caption)" }}>
          A complete SaaS landing page built with real FlexUI components — hero, features,
          dashboard, testimonials, forms — all reacting to the active theme.
        </p>

        <AnimatePresence mode="wait">
          <LivePreviewTemplate
            key={themeName}
            themeName={themeName}
            accent={accent}
            secondary={secondary}
            glowPrimary={glowPrimary}
          />
        </AnimatePresence>
      </div>

      {/* ── Quick Start ── */}
      <div>
        <h2 className="mb-4 text-lg font-semibold" style={{ color: "var(--flexui-heading)" }}>
          Quick Start
        </h2>
        <div
          className="space-y-4 rounded-xl p-5"
          style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
        >
          {[
            { step: "1", title: "Wrap your app", code: `<ThemeProvider defaultTheme="midnight">\n  <App />\n</ThemeProvider>` },
            { step: "2", title: "Switch from anywhere", code: `const { setTheme } = useTheme();\nsetTheme("ocean"); // Instant switch` },
            { step: "3", title: "Theme-aware classes", code: `<div className="bg-surface border-border">\n  <button className="bg-accent">Action</button>\n</div>` },
          ].map((item) => (
            <div key={item.step}>
              <p className="mb-2 text-xs font-medium" style={{ color: "var(--flexui-heading)" }}>
                <span
                  className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ background: `rgba(${glowPrimary}, 0.12)`, color: accent }}
                >
                  {item.step}
                </span>
                {item.title}
              </p>
              <pre
                className="rounded-lg p-3 text-xs overflow-x-auto"
                style={{ background: "var(--flexui-background)", color: "var(--flexui-body)", border: "1px solid var(--flexui-border)" }}
              >
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* ── Fullscreen Portal ── */}
      {typeof document !== "undefined" &&
        ReactDOM.createPortal(
          <AnimatePresence>
            {fullscreen && (
              <FullscreenExperience
                onClose={() => setFullscreen(false)}
                themeName={themeName}
                setTheme={setTheme}
                availableThemes={availableThemes}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
