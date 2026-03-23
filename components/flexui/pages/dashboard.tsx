"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface KPICard {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

interface DashboardProps {
  /** Brand name */
  brand?: string;
  /** Navigation items */
  navItems?: { label: string; href: string; active?: boolean }[];
  /** KPI cards */
  kpis?: KPICard[];
  /** Main content area */
  children?: React.ReactNode;
  /** User name */
  userName?: string;
  /** User avatar */
  userAvatar?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Inline SVG icon paths                                              */
/* ------------------------------------------------------------------ */

const icons: Record<string, React.ReactNode> = {
  Overview: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Analytics: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  ),
  Reports: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Settings: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  KPI icon + color configs                                           */
/* ------------------------------------------------------------------ */

const kpiIcons = [
  {
    bg: "from-blue-500/20 to-blue-600/10",
    color: "text-blue-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    sparkline: "M0,20 L4,18 L8,22 L12,15 L16,17 L20,10 L24,12 L28,5 L32,8 L36,3",
  },
  {
    bg: "from-violet-500/20 to-violet-600/10",
    color: "text-violet-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    sparkline: "M0,15 L4,12 L8,18 L12,10 L16,14 L20,8 L24,11 L28,6 L32,9 L36,4",
  },
  {
    bg: "from-emerald-500/20 to-emerald-600/10",
    color: "text-emerald-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    sparkline: "M0,18 L4,14 L8,16 L12,8 L16,12 L20,6 L24,10 L28,4 L32,7 L36,2",
  },
  {
    bg: "from-amber-500/20 to-amber-600/10",
    color: "text-amber-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    sparkline: "M0,10 L4,13 L8,11 L12,16 L16,14 L20,18 L24,15 L28,19 L32,17 L36,20",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated count-up hook                                             */
/* ------------------------------------------------------------------ */

function useCountUp(target: string, duration = 1200) {
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      setDisplay(target);
      return;
    }

    const prefix = target.match(/^[^0-9.]*/)?.[0] ?? "";
    const suffix = target.match(/[^0-9.]*$/)?.[0] ?? "";
    const hasDecimal = target.includes(".");
    const decimals = hasDecimal ? (target.split(".")[1]?.replace(/[^0-9]/g, "").length ?? 0) : 0;
    const hasCommas = target.includes(",");

    let start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (numeric - start) * eased;
      let formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString();
      if (hasCommas) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }
      setDisplay(prefix + formatted + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Circular progress ring component                                   */
/* ------------------------------------------------------------------ */

function ProgressRing({
  percent,
  color,
  label,
  delay = 0,
}: {
  percent: number;
  color: string;
  label: string;
  delay?: number;
}) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (circumference * percent) / 100 }}
            transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] as const }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{percent}%</span>
        </div>
      </div>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  KPI Card component                                                 */
/* ------------------------------------------------------------------ */

function KPICardInline({
  kpi,
  config,
}: {
  kpi: KPICard;
  config: (typeof kpiIcons)[0];
}) {
  const animatedValue = useCountUp(kpi.value);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.06)]">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-white/[0.03] to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />

      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br", config.bg, config.color)}>
          {config.icon}
        </div>
        {/* Sparkline */}
        <svg width="64" height="28" viewBox="0 0 36 24" className="opacity-30">
          <path
            d={config.sparkline}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={config.color}
          />
        </svg>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-zinc-500">
        {kpi.label}
      </p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-white">
        {animatedValue}
      </p>

      {kpi.change && (
        <div className="mt-2 flex items-center gap-1.5">
          {kpi.changeType === "positive" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
              <path d="M7 17l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 11l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : kpi.changeType === "negative" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-red-400">
              <path d="M17 7l-5 5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 13l-5 5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
          <span
            className={cn(
              "text-xs font-semibold",
              kpi.changeType === "positive" && "text-emerald-400",
              kpi.changeType === "negative" && "text-red-400",
              kpi.changeType === "neutral" && "text-zinc-400"
            )}
          >
            {kpi.change}
          </span>
          <span className="text-xs text-zinc-600">vs last month</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick action data                                                  */
/* ------------------------------------------------------------------ */

const quickActions = [
  {
    label: "Generate Report",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    label: "Add User",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    label: "View Analytics",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Revenue chart data                                                 */
/* ------------------------------------------------------------------ */

const revenueData = [
  { month: "Jan", value: 40 },
  { month: "Feb", value: 65 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 80 },
  { month: "May", value: 55 },
  { month: "Jun", value: 70 },
  { month: "Jul", value: 90 },
  { month: "Aug", value: 60 },
  { month: "Sep", value: 75 },
  { month: "Oct", value: 85 },
  { month: "Nov", value: 50 },
  { month: "Dec", value: 95 },
];

const yLabels = ["$0", "$25k", "$50k", "$75k", "$100k"];

/* ------------------------------------------------------------------ */
/*  Activity feed data                                                 */
/* ------------------------------------------------------------------ */

const activities = [
  { action: "New subscription", detail: "Enterprise plan activated", time: "2m ago", color: "bg-blue-400" },
  { action: "Payment received", detail: "$2,499.00 from Acme Corp", time: "15m ago", color: "bg-emerald-400" },
  { action: "User signed up", detail: "sarah@company.io", time: "1h ago", color: "bg-violet-400" },
  { action: "Report exported", detail: "Q4 Revenue Analysis", time: "3h ago", color: "bg-amber-400" },
  { action: "Server scaled", detail: "Auto-scaled to 8 instances", time: "5h ago", color: "bg-cyan-400" },
];

/* ------------------------------------------------------------------ */
/*  Main Dashboard component                                           */
/* ------------------------------------------------------------------ */

export function Dashboard({
  brand = "FlexUI",
  navItems = [
    { label: "Overview", href: "#", active: true },
    { label: "Analytics", href: "#" },
    { label: "Reports", href: "#" },
    { label: "Settings", href: "#" },
  ],
  kpis = [
    { label: "Total Revenue", value: "$45,231", change: "+20.1%", changeType: "positive" },
    { label: "Subscriptions", value: "2,350", change: "+12.5%", changeType: "positive" },
    { label: "Active Users", value: "12,543", change: "+8.2%", changeType: "positive" },
    { label: "Churn Rate", value: "2.4%", change: "-0.3%", changeType: "negative" },
  ],
  children,
  userName = "John Doe",
  userAvatar,
  className,
}: DashboardProps) {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className={cn("flex min-h-screen bg-[#09090b]", className)}>
      {/* ============================================================ */}
      {/*  SIDEBAR                                                     */}
      {/* ============================================================ */}
      <aside className="hidden w-64 shrink-0 lg:flex flex-col bg-gradient-to-b from-zinc-950 via-zinc-950 to-black border-r border-white/[0.06] relative overflow-hidden">
        {/* Animated gradient line at top */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, #3b82f6, #8b5cf6, #06b6d4, transparent)",
            backgroundSize: "200% 100%",
          }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-6">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
            <span className="text-sm font-black text-white">
              {brand.charAt(0)}
            </span>
            <div className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_6px_rgba(56,189,248,0.6)]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">{brand}</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-white/[0.06] text-white"
                  : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
              )}
            >
              {/* Active glow border */}
              {item.active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-blue-400 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className={cn("transition-colors", item.active ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400")}>
                {icons[item.label] ?? icons.Overview}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* User profile at bottom */}
        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 text-xs font-bold text-zinc-300 ring-2 ring-white/[0.06]">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                initials
              )}
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 bg-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-zinc-200">{userName}</span>
              <span className="text-[11px] text-zinc-600">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ============================================================ */}
      {/*  MAIN CONTENT                                                */}
      {/* ============================================================ */}
      <main className="flex-1 overflow-auto">
        {/* ---------------------------------------------------------- */}
        {/*  TOP BAR                                                    */}
        {/* ---------------------------------------------------------- */}
        <header className="relative flex h-16 items-center justify-between px-6">
          {/* Bottom gradient border */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          {/* Page title / breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-600">Pages</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-zinc-700">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-medium text-white">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-9 w-56 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-4 text-sm text-zinc-300 placeholder-zinc-600 outline-none backdrop-blur-md transition-colors focus:border-white/[0.12] focus:bg-white/[0.05]"
              />
            </div>

            {/* Notification bell */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
            </button>

            {/* Export */}
            <button className="hidden h-9 items-center gap-2 rounded-xl border border-white/[0.08] px-4 text-sm text-zinc-400 transition-all hover:border-white/[0.12] hover:bg-white/[0.04] hover:text-zinc-200 sm:flex">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>

            {/* Create Report */}
            <button className="flex h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 text-sm font-semibold text-white shadow-[0_0_20px_-6px_rgba(59,130,246,0.5)] transition-all hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.6)] hover:brightness-110">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Report
            </button>
          </div>
        </header>

        {/* ---------------------------------------------------------- */}
        {/*  DASHBOARD CONTENT                                          */}
        {/* ---------------------------------------------------------- */}
        <div className="p-6 space-y-6">
          {/* KPI Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {kpis.map((kpi, i) => (
              <motion.div key={i} variants={fadeUp}>
                <KPICardInline kpi={kpi} config={kpiIcons[i % kpiIcons.length]} />
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          {children ? (
            <div>{children}</div>
          ) : (
            <>
              {/* ====================================================== */}
              {/*  REVENUE CHART                                          */}
              {/* ====================================================== */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">Revenue Overview</h3>
                    <p className="mt-0.5 text-xs text-zinc-500">Last 12 months</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    <span className="text-xs text-zinc-500">Revenue</span>
                  </div>
                </div>

                <div className="flex">
                  {/* Y-axis labels */}
                  <div className="flex flex-col-reverse justify-between pr-4 py-1">
                    {yLabels.map((label) => (
                      <span key={label} className="text-[10px] text-zinc-600 leading-none">{label}</span>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="flex-1">
                    <div className="relative flex h-56 items-end gap-2">
                      {/* Grid lines */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="pointer-events-none absolute left-0 right-0 border-t border-white/[0.03]"
                          style={{ bottom: `${i * 25}%` }}
                        />
                      ))}

                      {revenueData.map((d, i) => (
                        <div
                          key={i}
                          className="relative flex flex-1 flex-col items-center"
                          onMouseEnter={() => setHoveredBar(i)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Tooltip */}
                          {hoveredBar === i && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-10 z-10 rounded-lg border border-white/[0.1] bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white shadow-xl"
                            >
                              ${Math.round(d.value * 1000).toLocaleString()}
                            </motion.div>
                          )}
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${d.value}%` }}
                            transition={{
                              delay: 0.4 + i * 0.06,
                              duration: 0.6,
                              ease: [0.25, 0.4, 0.25, 1],
                            }}
                            className={cn(
                              "w-full rounded-t-md bg-gradient-to-t from-blue-600/60 via-blue-500/80 to-cyan-400/90 transition-all duration-200",
                              hoveredBar === i
                                ? "shadow-[0_0_20px_rgba(59,130,246,0.3)] brightness-125"
                                : hoveredBar !== null
                                  ? "opacity-50"
                                  : ""
                            )}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Month labels */}
                    <div className="mt-3 flex">
                      {revenueData.map((d, i) => (
                        <span
                          key={i}
                          className={cn(
                            "flex-1 text-center text-[10px] transition-colors",
                            hoveredBar === i ? "text-zinc-300" : "text-zinc-600"
                          )}
                        >
                          {d.month}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ====================================================== */}
              {/*  ACTIVITY FEED + STATS PANEL                            */}
              {/* ====================================================== */}
              <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                {/* Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm"
                >
                  <h3 className="text-base font-semibold text-white">Recent Activity</h3>
                  <p className="mt-0.5 text-xs text-zinc-500">Latest events across your platform</p>

                  <div className="mt-5 space-y-1">
                    {activities.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                        className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.02]"
                      >
                        <div className="relative mt-1">
                          <div className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                          <div className={cn("absolute inset-0 h-2.5 w-2.5 animate-ping rounded-full opacity-20", item.color)} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-200">{item.action}</p>
                          <p className="mt-0.5 text-xs text-zinc-500 truncate">{item.detail}</p>
                        </div>
                        <span className="shrink-0 text-[11px] text-zinc-600">{item.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Stats Panel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm"
                >
                  <h3 className="text-base font-semibold text-white">Performance</h3>
                  <p className="mt-0.5 text-xs text-zinc-500">System health metrics</p>

                  <div className="mt-6 grid grid-cols-2 gap-6 place-items-center">
                    <ProgressRing percent={87} color="#3b82f6" label="Uptime" delay={0.7} />
                    <ProgressRing percent={64} color="#8b5cf6" label="CPU Usage" delay={0.8} />
                    <ProgressRing percent={92} color="#10b981" label="Satisfaction" delay={0.9} />
                    <ProgressRing percent={41} color="#f59e0b" label="Bandwidth" delay={1.0} />
                  </div>
                </motion.div>
              </div>

              {/* ====================================================== */}
              {/*  QUICK ACTIONS GRID                                     */}
              {/* ====================================================== */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
              >
                {quickActions.map((action, i) => (
                  <motion.button
                    key={action.label}
                    variants={fadeUp}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.08)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-zinc-400 transition-all duration-300 group-hover:bg-white/[0.08] group-hover:text-white group-hover:shadow-[0_0_20px_-6px_rgba(255,255,255,0.1)]">
                      {action.icon}
                    </div>
                    <span className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-white">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
