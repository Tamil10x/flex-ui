"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/flexui/theme-provider";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/flexui/spotlight-card";
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { NumberTicker } from "@/components/flexui/number-ticker";
import { NeonGlowCard } from "@/components/flexui/neon-glow-card";
import { SparklineChart } from "@/components/flexui/sparkline-chart";

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Sparkline data                                                     */
/* ------------------------------------------------------------------ */
const chartData1 = [20, 35, 28, 55, 42, 68, 52, 78, 65, 90, 72, 95];
const chartData2 = [50, 42, 58, 35, 65, 48, 72, 55, 80, 62, 88, 70];
const chartData3 = [80, 75, 70, 65, 55, 60, 50, 45, 40, 42, 38, 35];

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function ThemePreviewPage() {
  const { themeName, setTheme, availableThemes } = useTheme();
  const currentTheme = themes[themeName];
  const accent = currentTheme?.tokens["--flexui-accent"] ?? "#A78BFA";
  const secondary = currentTheme?.tokens["--flexui-secondary"] ?? "#818CF8";
  const glowPrimary = currentTheme?.tokens["--flexui-glow-primary"] ?? "167,139,250";
  const glowSecondary = currentTheme?.tokens["--flexui-glow-secondary"] ?? "129,140,248";
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-w-0 flex-1 space-y-16">
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
          <strong style={{ color: "var(--flexui-heading)" }}>
            entire application
          </strong>{" "}
          transforms instantly. Every component below is a real FlexUI cinematic
          component reacting to theme tokens.
        </p>
      </div>

      <div
        className="h-px"
        style={{
          background: `linear-gradient(90deg, transparent, var(--flexui-accent), transparent)`,
          opacity: 0.2,
        }}
      />

      {/* ── Theme Selector ── */}
      <div>
        <h2
          className="mb-6 text-lg font-semibold"
          style={{ color: "var(--flexui-heading)" }}
        >
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
                {/* Color dots */}
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

                <p
                  className="text-sm font-bold"
                  style={{ color: t.tokens["--flexui-heading"] }}
                >
                  {t.label}
                </p>
                <p
                  className="mt-0.5 text-[11px] leading-relaxed"
                  style={{ color: t.tokens["--flexui-body"] }}
                >
                  {t.description}
                </p>

                {isActive && (
                  <motion.div
                    layoutId="theme-check"
                    className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full"
                    style={{ background: t.tokens["--flexui-accent"] }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{ color: t.tokens["--flexui-accent-foreground"] }}
                    >
                      <path
                        d="M2.5 6l2.5 2.5 4.5-5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                  style={{ background: t.tokens["--flexui-accent-glow"] }}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Live Preview — Real FlexUI Components ── */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--flexui-heading)" }}
          >
            Live Preview
          </h2>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: `rgba(${glowPrimary}, 0.1)`,
              color: accent,
            }}
          >
            Real Components
          </span>
        </div>
        <p className="mb-8 text-sm" style={{ color: "var(--flexui-caption)" }}>
          These are actual FlexUI cinematic components — SpotlightCard,
          NumberTicker, SparklineChart, NeonGlowCard, ShimmerButton — all
          reacting to the active theme.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={themeName}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const }}
            className="space-y-6"
          >
            {/* ── KPI Row with SpotlightCards ── */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Total Revenue",
                  value: 45231,
                  prefix: "$",
                  suffix: "",
                  change: "+20.1%",
                  up: true,
                  data: chartData1,
                },
                {
                  label: "Active Users",
                  value: 12543,
                  prefix: "",
                  suffix: "",
                  change: "+8.2%",
                  up: true,
                  data: chartData2,
                },
                {
                  label: "Churn Rate",
                  value: 2.4,
                  prefix: "",
                  suffix: "%",
                  change: "-0.3%",
                  up: false,
                  data: chartData3,
                },
              ].map((kpi, i) => (
                <SpotlightCard
                  key={kpi.label + themeName}
                  spotlightColor={glowPrimary}
                  spotlightSize={300}
                  className="rounded-xl p-5 transition-all duration-500"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className="text-[11px] font-medium uppercase tracking-wider"
                        style={{ color: "var(--flexui-caption)" }}
                      >
                        {kpi.label}
                      </p>
                      <p
                        className="mt-2 text-3xl font-bold tabular-nums"
                        style={{ color: "var(--flexui-heading)" }}
                      >
                        {kpi.prefix}
                        <NumberTicker
                          value={kpi.value}
                          decimals={kpi.value < 10 ? 1 : 0}
                          stiffness={60}
                          damping={20}
                        />
                        {kpi.suffix}
                      </p>
                      <p
                        className="mt-1 text-xs font-semibold"
                        style={{
                          color: kpi.up
                            ? "var(--flexui-success)"
                            : "var(--flexui-error)",
                        }}
                      >
                        {kpi.change} from last month
                      </p>
                    </div>
                    <div className="w-24">
                      <SparklineChart
                        data={kpi.data}
                        color={accent}
                        height={48}
                        width={96}
                        showArea
                        animate
                      />
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>

            {/* ── Feature Cards with NeonGlowCard ── */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Lightning Performance",
                  desc: "Sub-50ms renders with lazy loading, tree-shaking, and zero-config optimization.",
                  icon: (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M11 2L4 12h5l-1 6 7-10h-5l1-6z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Cinematic Animations",
                  desc: "Spring physics, blur reveals, staggered entrances — 60fps buttery smooth motion.",
                  icon: (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8.5 7.5l4 2.5-4 2.5V7.5z"
                        fill="currentColor"
                      />
                    </svg>
                  ),
                },
                {
                  title: "6 Premium Themes",
                  desc: "Hand-crafted color systems with 30+ semantic tokens. Zero-cost CSS variable switching.",
                  icon: (
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="14"
                        height="14"
                        rx="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
                      <circle cx="13" cy="7" r="1.5" fill="currentColor" />
                      <circle cx="10" cy="13" r="1.5" fill="currentColor" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <NeonGlowCard
                  key={card.title + themeName}
                  color={accent}
                  intensity={0.8}
                  pulse
                  className="rounded-xl p-6"
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      background: `rgba(${glowPrimary}, 0.12)`,
                      color: accent,
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3
                    className="text-sm font-bold"
                    style={{ color: "var(--flexui-heading)" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: "var(--flexui-body)" }}
                  >
                    {card.desc}
                  </p>
                </NeonGlowCard>
              ))}
            </div>

            {/* ── Badges + Buttons Row ── */}
            <div
              className="rounded-xl p-6 transition-all duration-500"
              style={{
                background: "var(--flexui-surface)",
                border: "1px solid var(--flexui-border)",
              }}
            >
              <h3
                className="mb-4 text-sm font-bold"
                style={{ color: "var(--flexui-heading)" }}
              >
                Status Badges & Actions
              </h3>

              {/* Badges */}
              <div className="mb-5 flex flex-wrap gap-2">
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
                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-500"
                    style={{
                      background: `color-mix(in srgb, var(${b.token}) 12%, transparent)`,
                      color: `var(${b.token})`,
                      border: `1px solid color-mix(in srgb, var(${b.token}) 18%, transparent)`,
                    }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <ShimmerButton
                  shimmerColor={accent}
                  className="px-6 py-2.5 text-sm font-semibold"
                >
                  <span style={{ color: "var(--flexui-heading)" }}>
                    Shimmer Button
                  </span>
                </ShimmerButton>

                <button
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:brightness-110"
                  style={{
                    background: accent,
                    color: "var(--flexui-accent-foreground)",
                    boxShadow: `var(--flexui-shadow-glow)`,
                  }}
                >
                  Glow Primary
                </button>

                <button
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                  style={{
                    background: "transparent",
                    color: accent,
                    border: `1px solid ${accent}`,
                  }}
                >
                  Outlined
                </button>

                <button
                  className="rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300"
                  style={{
                    background: "var(--flexui-surface-hover)",
                    color: "var(--flexui-body)",
                    border: "1px solid var(--flexui-border)",
                  }}
                >
                  Ghost
                </button>
              </div>
            </div>

            {/* ── Mini Dashboard Card ── */}
            <div
              className="overflow-hidden rounded-xl transition-all duration-500"
              style={{
                background: "var(--flexui-surface)",
                border: "1px solid var(--flexui-border)",
              }}
            >
              {/* Gradient bar */}
              <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, ${accent}, ${secondary}, ${accent})`,
                  backgroundSize: "200% 100%",
                  animation: "gradient-shift 4s linear infinite",
                }}
              />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "var(--flexui-heading)" }}
                    >
                      Revenue Overview
                    </h3>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--flexui-caption)" }}
                    >
                      Last 12 months performance
                    </p>
                  </div>
                  <div
                    className="rounded-lg px-3 py-1.5 text-xs font-bold"
                    style={{
                      background: `rgba(${glowPrimary}, 0.1)`,
                      color: accent,
                    }}
                  >
                    +24.5%
                  </div>
                </div>

                {/* Animated bar chart */}
                <div className="mt-6 flex h-40 items-end gap-1.5">
                  {[40, 65, 45, 80, 55, 70, 92, 60, 75, 85, 50, 98].map(
                    (h, i) => (
                      <motion.div
                        key={i + themeName}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{
                          delay: 0.05 * i,
                          duration: 0.6,
                          ease: [0.25, 0.4, 0.25, 1] as const,
                        }}
                        className="group relative flex-1 cursor-pointer rounded-t-sm transition-all duration-200"
                        style={{
                          background: `linear-gradient(to top, rgba(${glowPrimary}, 0.3), rgba(${glowPrimary}, 0.8))`,
                        }}
                      >
                        {/* Hover tooltip */}
                        <div
                          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100"
                          style={{
                            background: "var(--flexui-surface-active)",
                            color: "var(--flexui-heading)",
                            border: "1px solid var(--flexui-border-hover)",
                          }}
                        >
                          ${Math.round(h * 52)}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
                <div
                  className="mt-2 flex justify-between text-[10px]"
                  style={{ color: "var(--flexui-caption)" }}
                >
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                    (m) => (
                      <span key={m}>{m}</span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* ── Form Preview ── */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div
                className="rounded-xl p-6 transition-all duration-500"
                style={{
                  background: "var(--flexui-surface)",
                  border: "1px solid var(--flexui-border)",
                }}
              >
                <h3
                  className="mb-4 text-sm font-bold"
                  style={{ color: "var(--flexui-heading)" }}
                >
                  Sign In
                </h3>
                <div className="space-y-3">
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-medium"
                      style={{ color: "var(--flexui-body)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all duration-300 placeholder:opacity-30"
                      style={{
                        background: "var(--flexui-background)",
                        border: "1px solid var(--flexui-border)",
                        color: "var(--flexui-foreground)",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-medium"
                      style={{ color: "var(--flexui-body)" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-all duration-300 placeholder:opacity-30"
                      style={{
                        background: "var(--flexui-background)",
                        border: "1px solid var(--flexui-border)",
                        color: "var(--flexui-foreground)",
                      }}
                    />
                  </div>
                  <button
                    className="mt-1 w-full rounded-lg py-2.5 text-sm font-bold transition-all duration-300 hover:brightness-110"
                    style={{
                      background: accent,
                      color: "var(--flexui-accent-foreground)",
                      boxShadow: "var(--flexui-shadow-glow)",
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Color palette */}
              <div
                className="rounded-xl p-6 transition-all duration-500"
                style={{
                  background: "var(--flexui-surface)",
                  border: "1px solid var(--flexui-border)",
                }}
              >
                <h3
                  className="mb-4 text-sm font-bold"
                  style={{ color: "var(--flexui-heading)" }}
                >
                  Color System — {currentTheme?.label}
                </h3>
                <div className="grid grid-cols-5 gap-3">
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
                        className="mx-auto h-8 w-8 rounded-lg ring-1 ring-white/[0.06] transition-all duration-500"
                        style={{ backgroundColor: `var(${s.v})` }}
                      />
                      <p
                        className="mt-1.5 text-[9px] font-medium"
                        style={{ color: "var(--flexui-caption)" }}
                      >
                        {s.l}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Quick Start ── */}
      <div>
        <h2
          className="mb-4 text-lg font-semibold"
          style={{ color: "var(--flexui-heading)" }}
        >
          Quick Start
        </h2>
        <div
          className="space-y-4 rounded-xl p-5 transition-all duration-500"
          style={{
            background: "var(--flexui-surface)",
            border: "1px solid var(--flexui-border)",
          }}
        >
          {[
            {
              step: "1",
              title: "Wrap your app",
              code: `<ThemeProvider defaultTheme="midnight">
  <App />
</ThemeProvider>`,
            },
            {
              step: "2",
              title: "Switch from anywhere",
              code: `const { setTheme } = useTheme();
setTheme("ocean"); // Instant full-app switch`,
            },
            {
              step: "3",
              title: "Use theme-aware classes",
              code: `<div className="bg-background text-heading">
  <div className="bg-surface border-border">
    <button className="bg-accent text-accent-foreground">
      Themed Button
    </button>
  </div>
</div>`,
            },
          ].map((item) => (
            <div key={item.step}>
              <p
                className="mb-2 text-xs font-medium"
                style={{ color: "var(--flexui-heading)" }}
              >
                <span
                  className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: `rgba(${glowPrimary}, 0.12)`,
                    color: accent,
                  }}
                >
                  {item.step}
                </span>
                {item.title}
              </p>
              <pre
                className="rounded-lg p-3 text-xs overflow-x-auto transition-all duration-500"
                style={{
                  background: "var(--flexui-background)",
                  color: "var(--flexui-body)",
                  border: "1px solid var(--flexui-border)",
                }}
              >
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
