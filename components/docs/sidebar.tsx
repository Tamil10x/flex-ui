"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BookOpen, Download, Server, FileText, Sparkles, LayoutGrid, Search,
  MousePointer, Flame, Droplet, Square, PartyPopper,
  Box, Lightbulb, Expand, Scan, Layers,
  Type, Hash, RotateCw, Waves, Palette, Shuffle, Eye, SplitSquareHorizontal,
  Sun, CircleDot, Grid3x3, Circle, Zap, Star, Blend, Activity,
  ArrowUpDown, Pin, BarChart3, Calculator,
  Flashlight,
  PanelTop, Globe, Monitor, PanelBottomOpen, Bell, MoveHorizontal, Navigation, Maximize,
  TextCursor, KeyRound,
  Layout, CreditCard, Megaphone, MessageSquareQuote, Grid2x2,
  TrendingUp, BarChart,
  EyeIcon,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarSections: { heading: string; items: SidebarItem[] }[] = [
  {
    heading: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction", icon: <BookOpen className="h-4 w-4" /> },
      { title: "Installation", href: "/docs/installation", icon: <Download className="h-4 w-4" /> },
      { title: "All Components", href: "/docs/components", icon: <LayoutGrid className="h-4 w-4" /> },
      { title: "MCP Server", href: "/docs/mcp-server", icon: <Server className="h-4 w-4" /> },
      { title: "Changelog", href: "/docs/changelog", icon: <FileText className="h-4 w-4" /> },
      { title: "AI Studio", href: "/studio", icon: <Sparkles className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Buttons",
    items: [
      { title: "Magnetic Button", href: "/docs/components/magnetic-button", icon: <MousePointer className="h-4 w-4" /> },
      { title: "Shimmer Button", href: "/docs/components/shimmer-button", icon: <Sparkles className="h-4 w-4" /> },
      { title: "Glow Button", href: "/docs/components/glow-button", icon: <Flame className="h-4 w-4" /> },
      { title: "Ripple Button", href: "/docs/components/ripple-button", icon: <Droplet className="h-4 w-4" /> },
      { title: "Gradient Border", href: "/docs/components/gradient-border-button", icon: <Square className="h-4 w-4" /> },
      { title: "Confetti Button", href: "/docs/components/confetti-button", icon: <PartyPopper className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Cards",
    items: [
      { title: "3D Hover Card", href: "/docs/components/three-hover-card", icon: <Box className="h-4 w-4" /> },
      { title: "Spotlight Card", href: "/docs/components/spotlight-card", icon: <Lightbulb className="h-4 w-4" /> },
      { title: "Expandable Card", href: "/docs/components/expandable-card", icon: <Expand className="h-4 w-4" /> },
      { title: "Reflective Card", href: "/docs/components/reflective-card", icon: <Scan className="h-4 w-4" /> },
      { title: "Morphing Card", href: "/docs/components/morphing-card", icon: <Layers className="h-4 w-4" /> },
      { title: "KPI Card", href: "/docs/components/kpi-card", icon: <BarChart className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Text Animations",
    items: [
      { title: "Text Reveal", href: "/docs/components/text-reveal", icon: <Type className="h-4 w-4" /> },
      { title: "Typewriter", href: "/docs/components/typewriter-text", icon: <Type className="h-4 w-4" /> },
      { title: "Gradient Text", href: "/docs/components/gradient-text", icon: <Palette className="h-4 w-4" /> },
      { title: "Flip Words", href: "/docs/components/flip-words", icon: <RotateCw className="h-4 w-4" /> },
      { title: "Wavy Text", href: "/docs/components/wavy-text", icon: <Waves className="h-4 w-4" /> },
      { title: "Text Scramble", href: "/docs/components/text-scramble", icon: <Shuffle className="h-4 w-4" /> },
      { title: "Blur Text", href: "/docs/components/blur-text", icon: <Eye className="h-4 w-4" /> },
      { title: "Split Text", href: "/docs/components/split-text", icon: <SplitSquareHorizontal className="h-4 w-4" /> },
      { title: "Rotating Text", href: "/docs/components/rotating-text", icon: <RotateCw className="h-4 w-4" /> },
      { title: "Number Ticker", href: "/docs/components/number-ticker", icon: <Hash className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Backgrounds",
    items: [
      { title: "Aurora", href: "/docs/components/aurora-background", icon: <Sun className="h-4 w-4" /> },
      { title: "Particle Field", href: "/docs/components/particle-field", icon: <CircleDot className="h-4 w-4" /> },
      { title: "Grid Pattern", href: "/docs/components/grid-pattern", icon: <Grid3x3 className="h-4 w-4" /> },
      { title: "Dot Pattern", href: "/docs/components/dot-pattern", icon: <Circle className="h-4 w-4" /> },
      { title: "Beams", href: "/docs/components/beams-background", icon: <Zap className="h-4 w-4" /> },
      { title: "Stars", href: "/docs/components/stars-background", icon: <Star className="h-4 w-4" /> },
      { title: "Mesh Gradient", href: "/docs/components/mesh-gradient", icon: <Blend className="h-4 w-4" /> },
      { title: "Wavy Lines", href: "/docs/components/wavy-background", icon: <Activity className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Scroll Effects",
    items: [
      { title: "Parallax Scroll", href: "/docs/components/parallax-scroll", icon: <ArrowUpDown className="h-4 w-4" /> },
      { title: "Sticky Reveal", href: "/docs/components/sticky-scroll-reveal", icon: <Pin className="h-4 w-4" /> },
      { title: "Scroll Progress", href: "/docs/components/scroll-progress", icon: <BarChart3 className="h-4 w-4" /> },
      { title: "Fade on Scroll", href: "/docs/components/fade-on-scroll", icon: <Eye className="h-4 w-4" /> },
      { title: "Scroll Counter", href: "/docs/components/scroll-counter", icon: <Calculator className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Cursor Effects",
    items: [
      { title: "Follow Cursor", href: "/docs/components/follow-cursor", icon: <MousePointer className="h-4 w-4" /> },
      { title: "Blob Cursor", href: "/docs/components/blob-cursor", icon: <Circle className="h-4 w-4" /> },
      { title: "Spotlight Cursor", href: "/docs/components/spotlight-cursor", icon: <Flashlight className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Layout & Navigation",
    items: [
      { title: "Floating Panel", href: "/docs/components/floating-panel", icon: <PanelTop className="h-4 w-4" /> },
      { title: "Animated Tabs", href: "/docs/components/animated-tabs", icon: <Layers className="h-4 w-4" /> },
      { title: "Marquee", href: "/docs/components/marquee", icon: <MoveHorizontal className="h-4 w-4" /> },
      { title: "Drawer", href: "/docs/components/drawer", icon: <PanelBottomOpen className="h-4 w-4" /> },
      { title: "Toast", href: "/docs/components/toast", icon: <Bell className="h-4 w-4" /> },
      { title: "Dock Menu", href: "/docs/components/dock-menu", icon: <Monitor className="h-4 w-4" /> },
      { title: "Floating Navbar", href: "/docs/components/floating-navbar", icon: <Navigation className="h-4 w-4" /> },
      { title: "Morphing Dialog", href: "/docs/components/morphing-dialog", icon: <Maximize className="h-4 w-4" /> },
      { title: "Search Spotlight", href: "/docs/components/search-spotlight", icon: <Search className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Inputs",
    items: [
      { title: "Animated Input", href: "/docs/components/animated-input", icon: <TextCursor className="h-4 w-4" /> },
      { title: "OTP Input", href: "/docs/components/otp-input", icon: <KeyRound className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Page Blocks",
    items: [
      { title: "Hero Block", href: "/docs/components/hero-block", icon: <Layout className="h-4 w-4" /> },
      { title: "Pricing Block", href: "/docs/components/pricing-block", icon: <CreditCard className="h-4 w-4" /> },
      { title: "Features Block", href: "/docs/components/features-block", icon: <Grid2x2 className="h-4 w-4" /> },
      { title: "Testimonials", href: "/docs/components/testimonials-block", icon: <MessageSquareQuote className="h-4 w-4" /> },
      { title: "CTA Block", href: "/docs/components/cta-block", icon: <Megaphone className="h-4 w-4" /> },
    ],
  },
  {
    heading: "Data Visualization",
    items: [
      { title: "Sparkline Chart", href: "/docs/components/sparkline-chart", icon: <TrendingUp className="h-4 w-4" /> },
      { title: "Progress Ring", href: "/docs/components/progress-ring", icon: <CircleDot className="h-4 w-4" /> },
    ],
  },
  {
    heading: "WebGL",
    items: [
      { title: "Interactive Globe", href: "/docs/components/interactive-globe", icon: <Globe className="h-4 w-4" /> },
      { title: "Cosmic Eye", href: "/docs/components/cosmic-eye", icon: <EyeIcon className="h-4 w-4" /> },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);

  const handleHover = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!navRef.current) return;
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = e.currentTarget.getBoundingClientRect();
      setHoverY(itemRect.top - navRect.top + navRef.current.scrollTop + itemRect.height / 2);
    },
    []
  );

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-white/[0.06] py-8 pr-6 lg:block">
      {/* Logo */}
      <Link href="/" className="mb-4 flex items-center gap-2.5 px-3">
        <Image src="/logo.png" alt="FlexUI" width={28} height={28} className="rounded-lg" />
        <span className="text-sm font-bold text-white">
          Flex<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">UI</span>
          <span className="ml-1.5 rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">v0.2.0</span>
        </span>
      </Link>

      {/* Search */}
      <button
        onClick={() => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
        className="mb-6 flex w-full items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-zinc-500 transition-colors hover:border-white/[0.1] hover:bg-white/[0.05] hover:text-zinc-400"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
      </button>

      {/* Navigation */}
      <div ref={navRef} className="relative pl-4" onMouseLeave={() => setHoverY(null)}>
        {/* ── Left thread line ─────────────────────────────────── */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.06]" />

        {/* ── Hover glow on thread line ────────────────────────── */}
        {hoverY !== null && (
          <motion.div
            className="pointer-events-none absolute left-[-3px] z-20 h-6 w-[7px] rounded-full"
            animate={{ top: hoverY - 12 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.5), transparent)",
            }}
          />
        )}

        {sidebarSections.map((section) => (
          <div key={section.heading} className="mb-5">
            {/* Category heading */}
            <h4 className="mb-2 pl-3 text-[11px] font-semibold text-zinc-500">
              {section.heading}
            </h4>

            <nav className="flex flex-col">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={handleHover}
                    className={cn(
                      "group relative flex items-center gap-3 py-[7px] pl-3 pr-2 text-[13px] transition-colors duration-150",
                      isActive
                        ? "text-white"
                        : "text-zinc-500 hover:text-zinc-200"
                    )}
                  >
                    {/* Active indicator — glowing bar on the thread line */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-indicator"
                        className="absolute -left-4 top-1 bottom-1 w-[2px] rounded-full bg-gradient-to-b from-violet-400 to-cyan-400"
                        style={{
                          boxShadow: "0 0 8px 1px rgba(139,92,246,0.4), 0 0 20px 2px rgba(56,189,248,0.15)",
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}

                    {/* Icon */}
                    <span
                      className={cn(
                        "shrink-0 transition-colors duration-150",
                        isActive
                          ? "text-violet-400"
                          : "text-zinc-600 group-hover:text-zinc-400"
                      )}
                    >
                      {item.icon}
                    </span>

                    {/* Title */}
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
