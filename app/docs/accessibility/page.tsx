"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useTheme } from "@/components/flexui/theme-provider";
import { themes } from "@/lib/themes";
import {
  Shield, Eye, Keyboard, Palette, Monitor, Sparkles,
  Search, ChevronRight, Check, AlertTriangle, Minus,
  Accessibility, ScanEye, MousePointer, Sun,
} from "lucide-react";

/* ── Cinematic Animations ──────────────────────────────────────────────── */

const fadeUpBlur = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const cardReveal = {
  initial: { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Animated Score Ring ───────────────────────────────────────────────── */

function ScoreRing({ score, size = 80, strokeWidth = 6, accent, glowRgb }: {
  score: number; size?: number; strokeWidth?: number; accent: string; glowRgb: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { stiffness: 60, damping: 20 });
  const strokeDashoffset = useTransform(springProgress, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    if (inView) progress.set(score);
  }, [inView, score, progress]);

  const color = score >= 95 ? "#34D399" : score >= 85 ? accent : score >= 70 ? "#FBBF24" : "#EF4444";

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(${glowRgb}, 0.15) 0%, transparent 70%)`,
          filter: "blur(8px)",
          transform: "scale(1.3)",
        }}
      />
      <svg width={size} height={size} className="relative -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--flexui-border)" strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black tabular-nums" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

/* ── Spotlight Card ────────────────────────────────────────────────────── */

function SpotlightHoverCard({ children, className = "", glowRgb }: {
  children: React.ReactNode; className?: string; accent?: string; glowRgb: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      className={`group/spot relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
      style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
      whileHover={{ borderColor: `rgba(${glowRgb}, 0.25)`, scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(${glowRgb}, 0.08), transparent 60%)`
          ),
        }}
      />
      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}

/* ── Data ───────────────────────────────────────────────────────────────── */

interface A11yAudit {
  component: string;
  keyboard: "pass" | "partial" | "na";
  ariaRoles: "pass" | "partial" | "na";
  screenReader: "pass" | "partial" | "na";
  contrast: "pass" | "partial" | "na";
  focusVisible: "pass" | "partial" | "na";
  motionSafe: "pass" | "partial" | "na";
  score: number;
}

const auditData: A11yAudit[] = [
  { component: "ShimmerButton", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "MagneticButton", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "GlowButton", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "Accordion", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "AnimatedTabs", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "Toast", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "partial", score: 92 },
  { component: "Drawer", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "DropdownMenu", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "Tooltip", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "partial", focusVisible: "pass", motionSafe: "pass", score: 96 },
  { component: "Popover", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "CommandMenu", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "SpotlightCard", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "NeonGlowCard", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "partial", focusVisible: "pass", motionSafe: "pass", score: 96 },
  { component: "ExpandableCard", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "FloatingNavbar", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "partial", score: 92 },
  { component: "DockMenu", keyboard: "pass", ariaRoles: "partial", screenReader: "partial", contrast: "pass", focusVisible: "pass", motionSafe: "partial", score: 84 },
  { component: "TextReveal", keyboard: "na", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "na", motionSafe: "pass", score: 100 },
  { component: "TypewriterText", keyboard: "na", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "na", motionSafe: "pass", score: 100 },
  { component: "NumberTicker", keyboard: "na", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "na", motionSafe: "pass", score: 100 },
  { component: "AnimatedInput", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "OTPInput", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "Switch", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "Slider", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "na", score: 100 },
  { component: "Rating", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
  { component: "ParticleField", keyboard: "na", ariaRoles: "na", screenReader: "na", contrast: "na", focusVisible: "na", motionSafe: "partial", score: 88 },
  { component: "InteractiveGlobe", keyboard: "na", ariaRoles: "na", screenReader: "na", contrast: "na", focusVisible: "na", motionSafe: "partial", score: 80 },
  { component: "HolographicCard", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "partial", focusVisible: "pass", motionSafe: "partial", score: 88 },
  { component: "DisintegrationEffect", keyboard: "na", ariaRoles: "pass", screenReader: "pass", contrast: "na", focusVisible: "na", motionSafe: "partial", score: 85 },
  { component: "GlitchTransition", keyboard: "na", ariaRoles: "na", screenReader: "na", contrast: "na", focusVisible: "na", motionSafe: "partial", score: 78 },
  { component: "Stepper", keyboard: "pass", ariaRoles: "pass", screenReader: "pass", contrast: "pass", focusVisible: "pass", motionSafe: "pass", score: 100 },
];

const wcagCriteria = [
  { id: "1.1", title: "Text Alternatives", level: "A" as const, desc: "All non-text content has text alternatives. Images use alt, icons have aria-labels, decorative elements are hidden from assistive tech.", icon: Eye },
  { id: "1.3", title: "Adaptable Content", level: "A" as const, desc: "Information structure is preserved in all presentations. Semantic HTML used throughout. Meaningful reading sequence maintained.", icon: Monitor },
  { id: "1.4", title: "Distinguishable", level: "AA" as const, desc: "4.5:1 contrast ratio for normal text, 3:1 for large text. Color is never the sole indicator. Text resizable up to 200% without loss.", icon: Palette },
  { id: "2.1", title: "Keyboard Accessible", level: "A" as const, desc: "All interactive components operable via keyboard. No keyboard traps. Focus follows logical order. ESC closes overlays.", icon: Keyboard },
  { id: "2.3", title: "Seizures & Motion", level: "AA" as const, desc: "Respects prefers-reduced-motion. No content flashes more than 3 times/second. Motion can be paused or disabled.", icon: Sparkles },
  { id: "2.4", title: "Navigable", level: "AA" as const, desc: "Skip navigation links. Descriptive page titles. Focus visible on all interactive elements. Multiple navigation mechanisms.", icon: MousePointer },
  { id: "3.2", title: "Predictable", level: "AA" as const, desc: "No unexpected context changes. Consistent navigation patterns. Components behave predictably across the application.", icon: ScanEye },
  { id: "4.1", title: "Compatible", level: "A" as const, desc: "Valid HTML parsing. ARIA roles, states, and properties used correctly. Status messages announced to screen readers.", icon: Accessibility },
];

const practices = [
  {
    icon: Eye,
    title: "Focus Management",
    desc: "Every interactive component has visible focus indicators. Focus trapping in modals/drawers. Focus restoration on close.",
    code: `<Drawer onClose={close}>
  {/* Focus is trapped inside */}
  {/* ESC key closes and restores focus */}
</Drawer>`,
  },
  {
    icon: Sun,
    title: "Reduced Motion",
    desc: "All animations respect prefers-reduced-motion. Spring physics, transitions, and WebGL effects gracefully degrade.",
    code: `import { prefersReducedMotion } from "@/lib/a11y";

if (prefersReducedMotion()) {
  // Skip animation
}`,
  },
  {
    icon: Shield,
    title: "ARIA Patterns",
    desc: "Correct ARIA roles for every component. Live regions for dynamic content. Proper labeling and descriptions.",
    code: `<button
  aria-expanded={open}
  aria-controls="panel-1"
>
  Section Title
</button>`,
  },
  {
    icon: Palette,
    title: "Color Contrast",
    desc: "All 6 theme presets meet WCAG AA contrast ratios. Theme tokens enforce minimum contrast between text and backgrounds.",
    code: `:root {
  --flexui-heading: #fafafa;  /* 15.3:1 */
  --flexui-body: #a1a1aa;     /* 5.9:1  */
  --flexui-caption: #71717a;  /* 4.6:1  */
}`,
  },
  {
    icon: ScanEye,
    title: "Screen Reader Support",
    desc: "Semantic HTML. Descriptive link text. Hidden labels for icon-only buttons. Status announcements via aria-live.",
    code: `<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>`,
  },
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    desc: "Tab order follows visual layout. Arrow keys for composite widgets. Enter/Space for activation. ESC for dismissal.",
    code: `// Accordion: Enter/Space toggle
// Tabs: Arrow keys switch
// Menu: Arrow keys, Enter select
// Modal: Tab trapped, ESC close`,
  },
];

type FilterType = "all" | "pass" | "partial" | "issues";

function getStatusInfo(status: "pass" | "partial" | "na") {
  if (status === "pass") return { icon: Check, color: "#34D399", bg: "rgba(52, 211, 153, 0.1)" };
  if (status === "partial") return { icon: AlertTriangle, color: "#FBBF24", bg: "rgba(251, 191, 36, 0.1)" };
  return { icon: Minus, color: "var(--flexui-caption)", bg: "transparent" };
}

/* ── Main Page ──────────────────────────────────────────────────────────── */

export default function AccessibilityPage() {
  const { themeName } = useTheme();
  const currentTheme = themes[themeName];
  const accent = currentTheme?.tokens["--flexui-accent"] ?? "#A78BFA";
  const glowRgb = currentTheme?.tokens["--flexui-glow-primary"] ?? "167,139,250";
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const avgScore = Math.round(auditData.reduce((sum, a) => sum + a.score, 0) / auditData.length);
  const perfectCount = auditData.filter((a) => a.score === 100).length;
  const partialCount = auditData.filter((a) => a.score >= 85 && a.score < 100).length;
  const issueCount = auditData.filter((a) => a.score < 85).length;

  const filteredData = auditData.filter((a) => {
    const matchesSearch = a.component.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "pass") return a.score === 100;
    if (filter === "partial") return a.score >= 85 && a.score < 100;
    if (filter === "issues") return a.score < 85;
    return true;
  });

  return (
    <div className="min-w-0 flex-1 space-y-16">
      {/* ── Cinematic Header ── */}
      <motion.div {...fadeUpBlur(0)}>
        <div className="relative">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[600px] -translate-x-1/2 rounded-full opacity-20"
            style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.4) 0%, transparent 70%)`, filter: "blur(40px)" }}
          />

          <div className="relative flex items-center gap-3 flex-wrap">
            <motion.span
              className="rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider"
              style={{ background: `rgba(${glowRgb}, 0.12)`, color: accent, border: `1px solid rgba(${glowRgb}, 0.25)` }}
              whileHover={{ scale: 1.05 }}
            >
              Accessibility
            </motion.span>
            <motion.span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "rgba(52, 211, 153, 0.12)", color: "#34D399", border: "1px solid rgba(52, 211, 153, 0.25)" }}
              whileHover={{ scale: 1.05 }}
            >
              WCAG 2.1 AA
            </motion.span>
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight" style={{ color: "var(--flexui-heading)" }}>
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, var(--flexui-heading) 0%, ${accent} 50%, var(--flexui-heading) 100%)`, backgroundSize: "200% 200%", WebkitBackgroundClip: "text" }}>
              Accessibility Engine
            </span>
          </h1>
          <motion.p {...fadeUpBlur(0.15)} className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--flexui-body)" }}>
            Every FlexUI component is audited for{" "}
            <strong style={{ color: accent }}>WCAG 2.1 AA compliance</strong>.
            Keyboard navigation, screen reader support, color contrast, and motion safety — all built in.
          </motion.p>
        </div>
      </motion.div>

      {/* Accent divider */}
      <div className="relative h-px">
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, rgba(${glowRgb}, 0.3), transparent)` }} />
        <motion.div
          className="absolute left-1/2 top-1/2 h-1 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: accent, filter: `blur(6px)`, opacity: 0.5 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* ── Score Overview — Cinematic Ring Cards ── */}
      <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Average Score", value: avgScore, ring: true, sub: `Across ${auditData.length} audited components` },
          { label: "Perfect Score", value: perfectCount, ring: false, sub: "Components with 100% compliance", color: "#34D399" },
          { label: "Partial", value: partialCount, ring: false, sub: "Minor enhancements needed", color: "#FBBF24" },
          { label: "WCAG Level", value: 0, ring: false, sub: "Full WCAG 2.1 AA target", text: "AA", color: accent },
        ].map((stat) => (
          <SpotlightHoverCard key={stat.label} accent={accent} glowRgb={glowRgb}>
            <motion.div variants={cardReveal} className="flex flex-col items-center p-6">
              {stat.ring ? (
                <ScoreRing score={stat.value} accent={accent} glowRgb={glowRgb} />
              ) : (
                <motion.p
                  className="text-4xl font-black tabular-nums"
                  style={{ color: stat.color ?? accent }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  {stat.text ?? stat.value}
                </motion.p>
              )}
              <p className="mt-3 text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>{stat.label}</p>
              <p className="mt-1 text-center text-[10px]" style={{ color: "var(--flexui-caption)" }}>{stat.sub}</p>
            </motion.div>
          </SpotlightHoverCard>
        ))}
      </motion.div>

      {/* ── WCAG Compliance Grid ── */}
      <section>
        <motion.h2 {...fadeUpBlur(0)} className="mb-6 text-2xl font-black" style={{ color: "var(--flexui-heading)" }}>
          WCAG 2.1 Compliance
        </motion.h2>
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2">
          {wcagCriteria.map((c) => {
            const Icon = c.icon;
            return (
              <SpotlightHoverCard key={c.id} accent={accent} glowRgb={glowRgb}>
                <motion.div variants={cardReveal} className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <motion.div
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ background: "rgba(52, 211, 153, 0.1)", border: "1px solid rgba(52, 211, 153, 0.15)" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#34D399" }} />
                    </motion.div>
                    <div>
                      <span className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>
                        {c.id} {c.title}
                      </span>
                      <span
                        className="ml-2.5 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase"
                        style={{
                          background: c.level === "AA" ? `rgba(${glowRgb}, 0.1)` : "rgba(52, 211, 153, 0.1)",
                          color: c.level === "AA" ? accent : "#34D399",
                          border: `1px solid ${c.level === "AA" ? `rgba(${glowRgb}, 0.2)` : "rgba(52, 211, 153, 0.2)"}`,
                        }}
                      >
                        Level {c.level}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--flexui-body)" }}>{c.desc}</p>
                </motion.div>
              </SpotlightHoverCard>
            );
          })}
        </motion.div>
      </section>

      {/* ── Component Audit Table ── */}
      <section>
        <motion.div {...fadeUpBlur(0)} className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-black" style={{ color: "var(--flexui-heading)" }}>
            Component Audit
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "var(--flexui-caption)" }} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-xl py-2 pl-9 pr-3 text-xs outline-none transition-all duration-300 focus:ring-1 placeholder:opacity-40"
                style={{
                  background: "var(--flexui-surface)",
                  border: "1px solid var(--flexui-border)",
                  color: "var(--flexui-foreground)",
                  width: 200,
                }}
              />
            </div>
            <div className="flex gap-1 rounded-xl p-1" style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}>
              {([["all", "All", null], ["pass", "Perfect", perfectCount], ["partial", "Partial", partialCount], ["issues", "Issues", issueCount]] as [FilterType, string, number | null][]).map(([key, label, count]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="relative rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all duration-200"
                  style={{ color: filter === key ? "var(--flexui-heading)" : "var(--flexui-caption)" }}
                >
                  {filter === key && (
                    <motion.div
                      layoutId="a11y-filter"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: `rgba(${glowRgb}, 0.1)`, border: `1px solid rgba(${glowRgb}, 0.2)` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {label}
                    {count !== null && (
                      <span className="rounded-full px-1.5 py-px text-[9px] font-bold tabular-nums" style={{ background: "var(--flexui-background)", color: "var(--flexui-caption)" }}>
                        {count}
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-2xl" style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}>
          {/* Header */}
          <div
            className="grid grid-cols-[1fr_48px_48px_48px_48px_48px_48px_64px] gap-2 px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider"
            style={{ borderBottom: "1px solid var(--flexui-border)", color: "var(--flexui-caption)", background: "var(--flexui-background)" }}
          >
            <div>Component</div>
            <div className="text-center">KBD</div>
            <div className="text-center">ARIA</div>
            <div className="text-center">SR</div>
            <div className="text-center">CLR</div>
            <div className="text-center">Focus</div>
            <div className="text-center">Motion</div>
            <div className="text-center">Score</div>
          </div>

          {/* Rows */}
          <AnimatePresence mode="popLayout">
            {filteredData.map((a, i) => (
              <motion.div
                key={a.component}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="grid grid-cols-[1fr_48px_48px_48px_48px_48px_48px_64px] items-center gap-2 px-5 py-3 text-xs transition-colors duration-200"
                style={{
                  borderBottom: "1px solid var(--flexui-border)",
                  background: hoveredRow === a.component ? `rgba(${glowRgb}, 0.03)` : "transparent",
                }}
                onMouseEnter={() => setHoveredRow(a.component)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <a
                  href={`/docs/components/${a.component.replace(/([A-Z])/g, "-$1").toLowerCase().slice(1)}`}
                  className="group flex items-center gap-2 font-semibold transition-colors duration-200"
                  style={{ color: hoveredRow === a.component ? accent : "var(--flexui-heading)" }}
                >
                  {a.component}
                  <ChevronRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60" />
                </a>
                {(["keyboard", "ariaRoles", "screenReader", "contrast", "focusVisible", "motionSafe"] as const).map((key) => {
                  const info = getStatusInfo(a[key]);
                  const StatusIcon = info.icon;
                  return (
                    <div key={key} className="flex justify-center">
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-md transition-transform duration-200"
                        style={{ background: info.bg }}
                      >
                        <StatusIcon className="h-3 w-3" style={{ color: info.color }} />
                      </span>
                    </div>
                  );
                })}
                <div className="flex justify-center">
                  <motion.span
                    className="inline-flex h-7 min-w-[36px] items-center justify-center rounded-lg px-2 text-[11px] font-bold tabular-nums"
                    style={{
                      background: a.score === 100 ? "rgba(52, 211, 153, 0.1)" : a.score >= 85 ? `rgba(${glowRgb}, 0.1)` : "rgba(251, 191, 36, 0.1)",
                      color: a.score >= 95 ? "#34D399" : a.score >= 85 ? accent : a.score >= 70 ? "#FBBF24" : "#EF4444",
                      border: `1px solid ${a.score >= 95 ? "rgba(52, 211, 153, 0.2)" : a.score >= 85 ? `rgba(${glowRgb}, 0.2)` : "rgba(251, 191, 36, 0.2)"}`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {a.score}
                  </motion.span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredData.length === 0 && (
            <div className="px-5 py-12 text-center text-xs" style={{ color: "var(--flexui-caption)" }}>
              No components match your filter.
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-5 text-[11px]" style={{ color: "var(--flexui-caption)" }}>
          <span className="flex items-center gap-1.5"><span className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: "rgba(52, 211, 153, 0.1)" }}><Check className="h-2.5 w-2.5 text-emerald-400" /></span> Pass</span>
          <span className="flex items-center gap-1.5"><span className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: "rgba(251, 191, 36, 0.1)" }}><AlertTriangle className="h-2.5 w-2.5 text-amber-400" /></span> Partial</span>
          <span className="flex items-center gap-1.5"><span className="flex h-5 w-5 items-center justify-center rounded-md"><Minus className="h-2.5 w-2.5" style={{ color: "var(--flexui-caption)" }} /></span> N/A</span>
          <span className="opacity-60">KBD = Keyboard · ARIA = ARIA Roles · SR = Screen Reader · CLR = Contrast</span>
        </div>
      </section>

      {/* ── Built-in Accessibility Practices ── */}
      <section>
        <motion.h2 {...fadeUpBlur(0)} className="mb-6 text-2xl font-black" style={{ color: "var(--flexui-heading)" }}>
          Built-in Accessibility
        </motion.h2>
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {practices.map((bp) => {
            const Icon = bp.icon;
            return (
              <SpotlightHoverCard key={bp.title} accent={accent} glowRgb={glowRgb}>
                <motion.div variants={cardReveal} className="p-6">
                  <motion.div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(${glowRgb}, 0.12), rgba(${glowRgb}, 0.04))`,
                      border: `1px solid rgba(${glowRgb}, 0.15)`,
                    }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </motion.div>
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>{bp.title}</h3>
                  <p className="mb-4 text-xs leading-relaxed" style={{ color: "var(--flexui-body)" }}>{bp.desc}</p>
                  <pre
                    className="overflow-x-auto rounded-xl p-3.5 text-[11px] leading-relaxed"
                    style={{
                      background: "var(--flexui-background)",
                      color: "var(--flexui-body)",
                      border: "1px solid var(--flexui-border)",
                    }}
                  >
                    {bp.code}
                  </pre>
                </motion.div>
              </SpotlightHoverCard>
            );
          })}
        </motion.div>
      </section>

      {/* ── Testing Guide ── */}
      <section>
        <motion.h2 {...fadeUpBlur(0)} className="mb-6 text-2xl font-black" style={{ color: "var(--flexui-heading)" }}>
          Testing Your App
        </motion.h2>
        <div className="rounded-2xl p-6" style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}>
          <div className="space-y-5">
            {[
              { step: "1", title: "Automated Testing", desc: "Run axe-core or Lighthouse accessibility audits in CI.", code: "npx @axe-core/cli http://localhost:3000", icon: Shield },
              { step: "2", title: "Keyboard Testing", desc: "Tab through your entire page. Every interactive element should be reachable and operable.", code: "// Test: Tab → Tab → Enter → ESC → Tab", icon: Keyboard },
              { step: "3", title: "Screen Reader", desc: "Test with VoiceOver (macOS), NVDA (Windows), or Orca (Linux).", code: "// macOS: Cmd+F5 to toggle VoiceOver", icon: ScanEye },
              { step: "4", title: "Reduced Motion", desc: "Enable prefers-reduced-motion in your OS. All animations should gracefully degrade.", code: "// System Settings → Accessibility → Reduce motion", icon: Sun },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
                  className="flex gap-4"
                >
                  <motion.div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(${glowRgb}, 0.15), rgba(${glowRgb}, 0.05))`,
                      border: `1px solid rgba(${glowRgb}, 0.2)`,
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon className="h-4 w-4" style={{ color: accent }} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="mb-1 text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>{item.title}</p>
                    <p className="mb-2.5 text-xs" style={{ color: "var(--flexui-body)" }}>{item.desc}</p>
                    <pre
                      className="rounded-xl p-3 text-[11px]"
                      style={{ background: "var(--flexui-background)", color: "var(--flexui-body)", border: "1px solid var(--flexui-border)" }}
                    >
                      {item.code}
                    </pre>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
