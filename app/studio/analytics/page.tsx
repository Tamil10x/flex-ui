"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BarChart3, Activity, Eye, Zap, AlertCircle, Download, Trash2,
  ArrowUpRight, TrendingUp, MousePointer, RefreshCw, ChevronDown, Search, Flame,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/flexui/theme-provider";
import { themes } from "@/lib/themes";
import { tracker, type AnalyticsSnapshot, type ComponentStats } from "@/lib/analytics/tracker";
import { cn } from "@/lib/utils";

/* ── Demo data seeder ──────────────────────────────────────────────────── */

function seedDemoData() {
  const components = [
    "shimmer-button", "spotlight-card", "text-reveal", "aurora-background",
    "animated-tabs", "floating-navbar", "marquee", "parallax-scroll",
    "gradient-text", "morphing-card", "glow-button", "ripple-button",
    "holographic-card", "typewriter-text", "particle-field", "blob-cursor",
    "number-ticker", "expandable-card", "search-spotlight", "toast",
    "animated-input", "otp-input", "progress-ring", "sparkline-chart",
    "pricing-block", "hero-block", "testimonials-block", "features-block",
  ];
  const interactions = ["click", "hover", "focus", "scroll", "drag", "keydown"];

  for (const comp of components) {
    const renderCount = Math.floor(Math.random() * 300) + 20;
    for (let i = 0; i < renderCount; i++) tracker.trackRender(comp, Math.random() * 15 + 1);
    const interactionCount = Math.floor(Math.random() * 80) + 5;
    for (let i = 0; i < interactionCount; i++) tracker.trackInteraction(comp, interactions[Math.floor(Math.random() * interactions.length)]);
    if (Math.random() > 0.85) tracker.trackError(comp, "Hydration mismatch in SSR render");
  }
}

/* ── Cinematic Animations ──────────────────────────────────────────────── */

const fadeUpBlur = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
});

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

const cardReveal = {
  initial: { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Spotlight Card ────────────────────────────────────────────────────── */

function SpotlightCard({ children, className = "", glowRgb }: {
  children: React.ReactNode; className?: string; glowRgb: string;
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

/* ── Page Component ────────────────────────────────────────────────────── */

export default function AnalyticsPage() {
  const { themeName } = useTheme();
  const theme = themes[themeName] || themes.midnight;
  const accent = theme.tokens["--flexui-accent"];
  const glowRgb = theme.tokens["--flexui-glow-primary"] ?? "167,139,250";

  const [snapshot, setSnapshot] = useState<AnalyticsSnapshot | null>(null);
  const [tab, setTab] = useState<"overview" | "components" | "timeline" | "errors">("overview");
  const [sortKey, setSortKey] = useState<keyof ComponentStats>("renders");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const seededRef = useRef(false);

  const refresh = useCallback(() => setSnapshot(tracker.getSnapshot()), []);

  useEffect(() => {
    if (!seededRef.current) {
      seededRef.current = true;
      const existing = tracker.getSnapshot();
      if (existing.uniqueComponents === 0) seedDemoData();
    }
    refresh();
  }, [refresh]);

  const sortedComponents = useMemo(() => {
    if (!snapshot) return [];
    let list = Object.values(snapshot.componentStats);
    if (search) list = list.filter((c) => c.component.toLowerCase().includes(search.toLowerCase()));
    return list.sort((a, b) => {
      const av = a[sortKey] as number;
      const bv = b[sortKey] as number;
      return sortDir === "desc" ? bv - av : av - bv;
    });
  }, [snapshot, sortKey, sortDir, search]);

  const handleSort = (key: keyof ComponentStats) => {
    if (sortKey === key) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const handleExport = () => {
    const data = tracker.export();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `flexui-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm("Clear all analytics data? This cannot be undone.")) {
      tracker.clear();
      refresh();
    }
  };

  if (!snapshot) return null;

  const maxTimelineRenders = Math.max(...snapshot.timeline.map((t) => t.renders), 1);
  const maxTimelineInteractions = Math.max(...snapshot.timeline.map((t) => t.interactions), 1);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* ── Cinematic Header ── */}
      <motion.div {...fadeUpBlur(0)} className="relative mb-12">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[700px] -translate-x-1/2 rounded-full opacity-15"
          style={{ background: `radial-gradient(ellipse, rgba(${glowRgb}, 0.5) 0%, transparent 70%)`, filter: "blur(50px)" }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/studio" className="text-xs font-medium transition-colors hover:opacity-80" style={{ color: "var(--flexui-caption)" }}>
              AI Studio
            </Link>
            <span style={{ color: "var(--flexui-caption)" }}>/</span>
            <span className="text-xs font-bold" style={{ color: accent }}>Analytics</span>
          </div>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, var(--flexui-heading) 0%, ${accent} 50%, var(--flexui-heading) 100%)`, backgroundSize: "200% 200%", WebkitBackgroundClip: "text" }}>
                  Component Analytics
                </span>
              </h1>
              <motion.p {...fadeUpBlur(0.15)} className="mt-3 max-w-lg text-sm leading-relaxed" style={{ color: "var(--flexui-body)" }}>
                Track component usage, interactions, and performance across your application.
              </motion.p>
            </div>

            <motion.div {...fadeUpBlur(0.2)} className="flex items-center gap-2">
              {[
                { onClick: refresh, icon: RefreshCw, label: "Refresh", danger: false },
                { onClick: handleExport, icon: Download, label: "Export", danger: false },
                { onClick: handleClear, icon: Trash2, label: "Clear", danger: true },
              ].map((btn) => (
                <motion.button
                  key={btn.label}
                  onClick={btn.onClick}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-colors"
                  style={{
                    background: "var(--flexui-surface)",
                    border: "1px solid var(--flexui-border)",
                    color: btn.danger ? "#EF4444" : "var(--flexui-heading)",
                  }}
                >
                  <btn.icon className="h-3.5 w-3.5" /> {btn.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Accent divider */}
      <div className="relative mb-12 h-px">
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent, rgba(${glowRgb}, 0.3), transparent)` }} />
      </div>

      {/* ── Stat Cards ── */}
      <motion.div initial="initial" animate="animate" variants={stagger} className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total Renders", value: snapshot.totalRenders.toLocaleString(), icon: Eye, color: accent, trend: "+12%" },
          { label: "Interactions", value: snapshot.totalInteractions.toLocaleString(), icon: MousePointer, color: "#22C55E", trend: "+8%" },
          { label: "Components", value: snapshot.uniqueComponents.toString(), icon: BarChart3, color: "#3B82F6", trend: null },
          { label: "Errors", value: snapshot.totalErrors.toString(), icon: AlertCircle, color: snapshot.totalErrors > 0 ? "#EF4444" : "#22C55E", trend: snapshot.totalErrors > 0 ? `${snapshot.totalErrors}` : "0" },
        ].map((stat) => (
          <SpotlightCard key={stat.label} glowRgb={glowRgb}>
            <motion.div variants={cardReveal} className="p-5">
              <div className="flex items-center justify-between mb-4">
                <motion.span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <stat.icon className="h-4.5 w-4.5" style={{ color: stat.color }} />
                </motion.span>
                {stat.trend && stat.label !== "Errors" && (
                  <span className="flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: `${stat.color}12`, color: stat.color }}>
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-3xl font-black tabular-nums" style={{ color: "var(--flexui-heading)" }}>{stat.value}</p>
              <p className="mt-1 text-xs" style={{ color: "var(--flexui-caption)" }}>{stat.label}</p>
            </motion.div>
          </SpotlightCard>
        ))}
      </motion.div>

      {/* ── Tabs ── */}
      <div
        className="mb-8 flex items-center gap-1 rounded-2xl p-1.5"
        style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
      >
        {(["overview", "components", "timeline", "errors"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="relative rounded-xl px-5 py-2.5 text-xs font-semibold capitalize transition-colors"
            style={{ color: tab === t ? "var(--flexui-heading)" : "var(--flexui-caption)" }}
          >
            {tab === t && (
              <motion.div
                layoutId="analytics-tab"
                className="absolute inset-0 rounded-xl"
                style={{ background: `rgba(${glowRgb}, 0.1)`, border: `1px solid rgba(${glowRgb}, 0.2)` }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        {/* ── Overview ── */}
        {tab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Top by renders */}
            <SpotlightCard glowRgb={glowRgb}>
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
                    <TrendingUp className="h-4 w-4" style={{ color: accent }} />
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>Most Rendered</h3>
                </div>
                <div className="space-y-3.5">
                  {snapshot.topByRenders.slice(0, 8).map((c, i) => (
                    <motion.div
                      key={c.component}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 text-right text-[11px] font-bold tabular-nums" style={{ color: "var(--flexui-caption)" }}>{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="truncate text-xs font-medium" style={{ color: "var(--flexui-heading)" }}>{c.component}</span>
                          <span className="text-[11px] font-bold tabular-nums" style={{ color: accent }}>{c.renders.toLocaleString()}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--flexui-background)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(c.renders / snapshot.topByRenders[0].renders) * 100}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, rgba(${glowRgb}, 0.4), ${accent})` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Top by interactions */}
            <SpotlightCard glowRgb={glowRgb}>
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(34, 197, 94, 0.1)" }}>
                    <MousePointer className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>Most Interacted</h3>
                </div>
                <div className="space-y-3.5">
                  {snapshot.topByInteractions.slice(0, 8).map((c, i) => (
                    <motion.div
                      key={c.component}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 text-right text-[11px] font-bold tabular-nums" style={{ color: "var(--flexui-caption)" }}>{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="truncate text-xs font-medium" style={{ color: "var(--flexui-heading)" }}>{c.component}</span>
                          <span className="text-[11px] font-bold tabular-nums text-emerald-400">{c.interactions.toLocaleString()}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--flexui-background)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(c.interactions / Math.max(snapshot.topByInteractions[0].interactions, 1)) * 100}%` }}
                            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, rgba(34, 197, 94, 0.3), #22C55E)" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* 24h Activity Chart */}
            <SpotlightCard glowRgb={glowRgb} className="md:col-span-2">
              <div className="p-6">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${accent}15` }}>
                    <Activity className="h-4 w-4" style={{ color: accent }} />
                  </div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>24h Activity</h3>
                </div>
                <div className="flex items-end gap-[3px] h-36">
                  {snapshot.timeline.map((t, i) => (
                    <div key={t.hour} className="group relative flex flex-1 flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max((t.renders / maxTimelineRenders) * 100, 2)}%` }}
                        transition={{ duration: 0.6, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] as const }}
                        className="w-full rounded-t-sm transition-all duration-200 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(180deg, ${accent}, rgba(${glowRgb}, 0.3))`,
                          opacity: 0.5 + (t.renders / maxTimelineRenders) * 0.5,
                          boxShadow: `0 0 8px rgba(${glowRgb}, ${(t.renders / maxTimelineRenders) * 0.3})`,
                        }}
                      />
                      {/* Tooltip */}
                      <div
                        className="pointer-events-none absolute -top-16 left-1/2 z-30 -translate-x-1/2 rounded-xl px-3 py-1.5 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        style={{ background: "var(--flexui-background)", border: "1px solid var(--flexui-border)", boxShadow: `0 4px 20px rgba(0,0,0,0.3)` }}
                      >
                        <p className="text-[10px] font-bold whitespace-nowrap" style={{ color: "var(--flexui-heading)" }}>{t.hour}</p>
                        <p className="text-[9px] whitespace-nowrap" style={{ color: "var(--flexui-caption)" }}>{t.renders}r · {t.interactions}i</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between">
                  <span className="text-[10px]" style={{ color: "var(--flexui-caption)" }}>{snapshot.timeline[0]?.hour}</span>
                  <span className="text-[10px]" style={{ color: "var(--flexui-caption)" }}>{snapshot.timeline[snapshot.timeline.length - 1]?.hour}</span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}

        {/* ── Components Table ── */}
        {tab === "components" && (
          <motion.div
            key="components"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="mb-5">
              <div className="relative inline-block">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: "var(--flexui-caption)" }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter components..."
                  className="w-full max-w-xs rounded-xl py-2.5 pl-9 pr-4 text-sm outline-none transition-all duration-300 focus:ring-1"
                  style={{
                    background: "var(--flexui-surface)",
                    border: "1px solid var(--flexui-border)",
                    color: "var(--flexui-heading)",
                  }}
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--flexui-border)" }}>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr style={{ background: "var(--flexui-background)" }}>
                    {[
                      { key: "component", label: "Component" },
                      { key: "renders", label: "Renders" },
                      { key: "interactions", label: "Interactions" },
                      { key: "errors", label: "Errors" },
                      { key: "avgRenderMs", label: "Avg Render" },
                      { key: "lastSeen", label: "Last Seen" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key as keyof ComponentStats)}
                        className="cursor-pointer px-5 py-4 text-[10px] font-bold uppercase tracking-wider transition-colors"
                        style={{ color: sortKey === col.key ? accent : "var(--flexui-caption)", borderBottom: "1px solid var(--flexui-border)" }}
                      >
                        <span className="flex items-center gap-1">
                          {col.label}
                          {sortKey === col.key && (
                            <ChevronDown className={cn("h-3 w-3 transition-transform", sortDir === "asc" && "rotate-180")} />
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedComponents.map((c, i) => (
                    <motion.tr
                      key={c.component}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      className="transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: "1px solid var(--flexui-border)" }}
                    >
                      <td className="px-5 py-3.5 font-semibold" style={{ color: "var(--flexui-heading)" }}>{c.component}</td>
                      <td className="px-5 py-3.5 tabular-nums font-bold" style={{ color: accent }}>{c.renders.toLocaleString()}</td>
                      <td className="px-5 py-3.5 tabular-nums font-bold text-emerald-400">{c.interactions.toLocaleString()}</td>
                      <td className={cn("px-5 py-3.5 tabular-nums font-bold", c.errors > 0 ? "text-red-400" : "")} style={{ color: c.errors === 0 ? "var(--flexui-caption)" : undefined }}>
                        {c.errors}
                      </td>
                      <td className="px-5 py-3.5 tabular-nums" style={{ color: "var(--flexui-body)" }}>
                        {c.avgRenderMs ? `${c.avgRenderMs.toFixed(1)}ms` : "—"}
                      </td>
                      <td className="px-5 py-3.5" style={{ color: "var(--flexui-caption)" }}>{formatRelativeTime(c.lastSeen)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* ── Timeline ── */}
        {tab === "timeline" && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <SpotlightCard glowRgb={glowRgb}>
              <div className="p-6">
                <h3 className="mb-6 text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>
                  Hourly Breakdown (Last 24h)
                </h3>
                <div className="space-y-2.5">
                  {snapshot.timeline.map((t, i) => (
                    <motion.div
                      key={t.hour}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02, duration: 0.3 }}
                      className="flex items-center gap-4"
                    >
                      <span className="w-12 text-right text-[11px] font-bold tabular-nums" style={{ color: "var(--flexui-caption)" }}>{t.hour}</span>
                      <div className="flex flex-1 items-center gap-1.5">
                        <div className="flex-1 h-5 overflow-hidden rounded-lg" style={{ background: "var(--flexui-background)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(t.renders / maxTimelineRenders) * 100}%` }}
                            transition={{ duration: 0.5, delay: i * 0.02 }}
                            className="h-full rounded-lg"
                            style={{ background: `linear-gradient(90deg, rgba(${glowRgb}, 0.3), ${accent})` }}
                          />
                        </div>
                        <span className="w-10 text-right text-[10px] font-bold tabular-nums" style={{ color: accent }}>{t.renders}</span>
                      </div>
                      <div className="flex items-center gap-1.5 w-24">
                        <div className="flex-1 h-5 overflow-hidden rounded-lg" style={{ background: "var(--flexui-background)" }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(t.interactions / maxTimelineInteractions) * 100}%` }}
                            transition={{ duration: 0.5, delay: i * 0.02 }}
                            className="h-full rounded-lg bg-emerald-500"
                          />
                        </div>
                        <span className="w-8 text-right text-[10px] font-bold tabular-nums text-emerald-400">{t.interactions}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-6">
                  <span className="flex items-center gap-2 text-[11px]" style={{ color: "var(--flexui-caption)" }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} /> Renders
                  </span>
                  <span className="flex items-center gap-2 text-[11px]" style={{ color: "var(--flexui-caption)" }}>
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Interactions
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        )}

        {/* ── Errors ── */}
        {tab === "errors" && (
          <motion.div
            key="errors"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {snapshot.recentErrors.length === 0 ? (
              <div className="rounded-2xl p-16 text-center" style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}>
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)" }}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Zap className="h-7 w-7 text-emerald-400" />
                </motion.div>
                <p className="text-sm font-bold" style={{ color: "var(--flexui-heading)" }}>No errors recorded</p>
                <p className="mt-1.5 text-xs" style={{ color: "var(--flexui-caption)" }}>All components are running smoothly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {snapshot.recentErrors.map((err, i) => (
                  <motion.div
                    key={`${err.component}-${err.timestamp}-${i}`}
                    initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="flex items-start gap-4 rounded-2xl p-5 transition-colors hover:bg-white/[0.02]"
                    style={{ background: "var(--flexui-surface)", border: "1px solid var(--flexui-border)" }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold" style={{ color: "var(--flexui-heading)" }}>{err.component}</p>
                      <p className="mt-1 text-[11px]" style={{ color: "var(--flexui-body)" }}>{err.detail}</p>
                    </div>
                    <span className="shrink-0 text-[10px] font-medium tabular-nums" style={{ color: "var(--flexui-caption)" }}>
                      {formatRelativeTime(err.timestamp)}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Helpers ────────────────────────────────────────────────────────────── */

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
