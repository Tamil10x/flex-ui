"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MousePointer,
  Box,
  Magnet,
  Layers,
  Sparkles,
  Zap,
  Globe,
  PanelTop,
  MessageSquare,
  Layout,
  Expand,
  Rows3,
  Scan,
  Video,
  MousePointerClick,
  Lightbulb,
  Type,
  Hash,
  AlignLeft,
  Monitor,
  PanelBottomOpen,
  Bell,
  MoveHorizontal,
  RotateCw,
  Waves,
  FlipHorizontal,
  Palette,
  Shuffle,
  Eye,
  SplitSquareHorizontal,
  Grid3x3,
  Circle,
  Star,
  Blend,
  Activity,
  Sun,
  CircleDot,
  ArrowUpDown,
  Pin,
  BarChart3,
  Calculator,
  Flame,
  Droplet,
  Square,
  PartyPopper,
  Flashlight,
  Navigation,
  TextCursor,
  KeyRound,
  Maximize,
  CreditCard,
  Megaphone,
  Search,
  TrendingUp,
  BarChart,
  MessageSquareQuote,
  Grid2x2,
  PenTool,
  Terminal,
  Smartphone,
  Waypoints,
  Orbit,
  Network,
  Music,
  Columns,
  Wind,
  Cloud,
  Move3d,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CardData {
  name: string;
  href: string;
  tier: string;
  tagline: string;
  description: string;
  deps: string[];
  gradient: string;
  glowColor: string;
  iconBg: string;
  icon: React.ReactNode;
  decorativeIcons: React.ReactNode;
  accentLine: string;
}

const components: CardData[] = [
  {
    name: "Magnetic Button",
    href: "/docs/components/magnetic-button",
    tier: "Tier 1",
    tagline: "Spring Physics",
    description:
      "Cursor-tracking magnetic attraction with spotlight glow border and spring-physics animation.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-fuchsia-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
    accentLine: "from-violet-500 to-fuchsia-500",
    icon: <Magnet className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <MousePointer className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-fuchsia-500/[0.1] -rotate-12" />
        <Zap className="absolute right-8 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "3D Hover Card",
    href: "/docs/components/three-hover-card",
    tier: "Tier 3",
    tagline: "WebGL Scene",
    description:
      "Lazy-loaded Three.js card with rotating icosahedron, orbiting ring, and particle field.",
    deps: ["three", "@react-three/fiber", "@react-three/drei"],
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(34,211,238,0.15)",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    accentLine: "from-cyan-500 to-blue-500",
    icon: <Globe className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Box className="absolute right-6 top-6 h-16 w-16 text-cyan-500/[0.07] rotate-12" />
        <Layers className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Floating Panel",
    href: "/docs/components/floating-panel",
    tier: "Tier 2",
    tagline: "Layout & Forms",
    description:
      "Headless composable floating panel with spring-physics morphing, glassmorphic backdrop, and built-in form support.",
    deps: ["framer-motion", "lucide-react"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    glowColor: "rgba(16,185,129,0.15)",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    accentLine: "from-emerald-500 to-teal-500",
    icon: <PanelTop className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Layout className="absolute right-6 top-6 h-16 w-16 text-emerald-500/[0.07] rotate-12" />
        <MessageSquare className="absolute right-20 top-14 h-8 w-8 text-teal-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-green-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Interactive Globe",
    href: "/docs/components/interactive-globe",
    tier: "Tier 3",
    tagline: "WebGL Globe",
    description:
      "Three.js-powered interactive world globe with animated connection arcs, ring pulses, and 5 built-in color themes.",
    deps: ["three-globe", "@react-three/fiber", "@react-three/drei"],
    gradient: "from-orange-600/20 via-rose-600/10 to-transparent",
    glowColor: "rgba(249,115,22,0.15)",
    iconBg: "bg-gradient-to-br from-orange-500 to-rose-500",
    accentLine: "from-orange-500 to-rose-500",
    icon: <Globe className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Globe className="absolute right-6 top-6 h-16 w-16 text-orange-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-rose-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-amber-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Cosmic Eye",
    href: "/docs/components/cosmic-eye",
    tier: "Tier 3",
    tagline: "WebGL Shader",
    description:
      "A WebGL shader-based animated eye with two-tone iris, mouse-tracking pupil, swirling noise tendrils, and pulsing corona glow.",
    deps: ["ogl"],
    gradient: "from-violet-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-cyan-500",
    accentLine: "from-violet-500 to-cyan-500",
    icon: <Eye className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Eye className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Circle className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Expandable Card",
    href: "/docs/components/expandable-card",
    tier: "Tier 1",
    tagline: "Click to Expand",
    description:
      "Composable click-to-expand card with spring-physics resize, blur/fade/slide content presets, and staggered reveals.",
    deps: ["framer-motion"],
    gradient: "from-amber-600/20 via-yellow-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-yellow-500",
    accentLine: "from-amber-500 to-yellow-500",
    icon: <Expand className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Expand className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Rows3 className="absolute right-20 top-14 h-8 w-8 text-yellow-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-orange-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Reflective Card",
    href: "/docs/components/reflective-card",
    tier: "Tier 3",
    tagline: "Webcam + SVG Filters",
    description:
      "Metallic ID-card with live webcam backdrop, SVG displacement, specular lighting, 3D tilt, and holographic glass border on hover.",
    deps: ["framer-motion"],
    gradient: "from-pink-600/20 via-rose-600/10 to-transparent",
    glowColor: "rgba(236,72,153,0.15)",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    accentLine: "from-pink-500 to-rose-500",
    icon: <Scan className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Scan className="absolute right-6 top-6 h-16 w-16 text-pink-500/[0.07] rotate-12" />
        <Video className="absolute right-20 top-14 h-8 w-8 text-rose-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Spotlight Card",
    href: "/docs/components/spotlight-card",
    tier: "Tier 1",
    tagline: "Cursor Spotlight",
    description:
      "Lightweight dark card with a cursor-following radial spotlight effect. Pure CSS + Framer Motion springs — no Three.js, no WebGL.",
    deps: ["framer-motion"],
    gradient: "from-cyan-600/20 via-sky-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500",
    accentLine: "from-cyan-500 to-sky-500",
    icon: <Lightbulb className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Lightbulb className="absolute right-6 top-6 h-16 w-16 text-cyan-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-sky-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Shimmer Button",
    href: "/docs/components/shimmer-button",
    tier: "Tier 1",
    tagline: "Animated Sweep",
    description:
      "Dark-themed button with a continuous diagonal shimmer sweep effect, configurable color, and spring-physics hover interactions.",
    deps: ["framer-motion"],
    gradient: "from-sky-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-indigo-500",
    accentLine: "from-sky-500 to-indigo-500",
    icon: <MousePointerClick className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <MousePointerClick className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Text Reveal",
    href: "/docs/components/text-reveal",
    tier: "Tier 1",
    tagline: "Text Animation",
    description:
      "Staggered text reveal animation that unveils text character-by-character or word-by-word with blur-and-slide transitions on viewport entry.",
    deps: ["framer-motion"],
    gradient: "from-rose-600/20 via-red-600/10 to-transparent",
    glowColor: "rgba(244,63,94,0.15)",
    iconBg: "bg-gradient-to-br from-rose-500 to-red-500",
    accentLine: "from-rose-500 to-red-500",
    icon: <Type className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Type className="absolute right-6 top-6 h-16 w-16 text-rose-500/[0.07] rotate-12" />
        <AlignLeft className="absolute right-20 top-14 h-8 w-8 text-red-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-pink-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Number Ticker",
    href: "/docs/components/number-ticker",
    tier: "Tier 1",
    tagline: "Animated Counter",
    description:
      "Spring-animated number counter that ticks up to a target value on viewport entry. Supports prefix, suffix, decimals, and configurable spring physics.",
    deps: ["framer-motion"],
    gradient: "from-teal-600/20 via-emerald-600/10 to-transparent",
    glowColor: "rgba(20,184,166,0.15)",
    iconBg: "bg-gradient-to-br from-teal-500 to-emerald-500",
    accentLine: "from-teal-500 to-emerald-500",
    icon: <Hash className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Hash className="absolute right-6 top-6 h-16 w-16 text-teal-500/[0.07] rotate-12" />
        <Zap className="absolute right-20 top-14 h-8 w-8 text-emerald-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-green-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Dock Menu",
    href: "/docs/components/dock-menu",
    tier: "Tier 1",
    tagline: "macOS Dock",
    description:
      "A macOS-style dock bar with spring-physics magnification effect. Icons scale smoothly based on cursor proximity using Framer Motion values.",
    deps: ["framer-motion"],
    gradient: "from-indigo-600/20 via-violet-600/10 to-transparent",
    glowColor: "rgba(99,102,241,0.15)",
    iconBg: "bg-gradient-to-br from-indigo-500 to-violet-500",
    accentLine: "from-indigo-500 to-violet-500",
    icon: <Monitor className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Monitor className="absolute right-6 top-6 h-16 w-16 text-indigo-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-violet-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Drawer",
    href: "/docs/components/drawer",
    tier: "Tier 1",
    tagline: "Bottom Sheet",
    description:
      "An animated bottom sheet / side drawer with spring physics, backdrop blur overlay, ESC-to-close, and body scroll lock. Opens from bottom, right, or left.",
    deps: ["framer-motion"],
    gradient: "from-lime-600/20 via-green-600/10 to-transparent",
    glowColor: "rgba(132,204,22,0.15)",
    iconBg: "bg-gradient-to-br from-lime-500 to-green-500",
    accentLine: "from-lime-500 to-green-500",
    icon: <PanelBottomOpen className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <PanelBottomOpen className="absolute right-6 top-6 h-16 w-16 text-lime-500/[0.07] rotate-12" />
        <Layers className="absolute right-20 top-14 h-8 w-8 text-green-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-emerald-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Toast",
    href: "/docs/components/toast",
    tier: "Tier 1",
    tagline: "Notifications",
    description:
      "Context-based toast notification system with spring-physics entry, auto-dismiss, four color-coded types, stacked positioning, and manual dismiss.",
    deps: ["framer-motion", "lucide-react"],
    gradient: "from-fuchsia-600/20 via-pink-600/10 to-transparent",
    glowColor: "rgba(217,70,239,0.15)",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
    accentLine: "from-fuchsia-500 to-pink-500",
    icon: <Bell className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Bell className="absolute right-6 top-6 h-16 w-16 text-fuchsia-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-pink-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-rose-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Animated Tabs",
    href: "/docs/components/animated-tabs",
    tier: "Tier 1",
    tagline: "Tab Navigation",
    description:
      "Sliding animated indicator with spring physics and smooth fade+slide content transitions. Three variants: underline, pill, and bordered.",
    deps: ["framer-motion"],
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    accentLine: "from-blue-500 to-indigo-500",
    icon: <Layers className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Layers className="absolute right-6 top-6 h-16 w-16 text-blue-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Marquee",
    href: "/docs/components/marquee",
    tier: "Tier 1",
    tagline: "Infinite Scroll",
    description:
      "Pure CSS infinite horizontal scrolling with configurable speed, direction, hover-to-pause, and fade edge masks. No Framer Motion needed.",
    deps: [],
    gradient: "from-emerald-600/20 via-green-600/10 to-transparent",
    glowColor: "rgba(16,185,129,0.15)",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-500",
    accentLine: "from-emerald-500 to-green-500",
    icon: <MoveHorizontal className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <MoveHorizontal className="absolute right-6 top-6 h-16 w-16 text-emerald-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-green-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-teal-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Flip Words",
    href: "/docs/components/flip-words",
    tier: "Tier 1",
    tagline: "3D Word Flip",
    description:
      "Words that flip and rotate in and out with 3D perspective animation and spring physics. Auto-cycles through an array of words.",
    deps: ["framer-motion"],
    gradient: "from-purple-600/20 via-violet-600/10 to-transparent",
    glowColor: "rgba(168,85,247,0.15)",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    accentLine: "from-purple-500 to-violet-500",
    icon: <RotateCw className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <FlipHorizontal className="absolute right-6 top-6 h-16 w-16 text-purple-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-violet-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Wavy Text",
    href: "/docs/components/wavy-text",
    tier: "Tier 1",
    tagline: "Wave Animation",
    description:
      "Text where each character animates in with a staggered wave pattern using spring physics, triggered on scroll into viewport.",
    deps: ["framer-motion"],
    gradient: "from-sky-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-cyan-500",
    accentLine: "from-sky-500 to-cyan-500",
    icon: <Waves className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Waves className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Typewriter Text",
    href: "/docs/components/typewriter-text",
    tier: "Tier 1",
    tagline: "Typing Effect",
    description:
      "A typewriter effect that types text character by character with a blinking cursor. Cycles through an array of words with configurable speeds.",
    deps: [],
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    accentLine: "from-amber-500 to-orange-500",
    icon: <Type className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Type className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-orange-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-yellow-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Gradient Text",
    href: "/docs/components/gradient-text",
    tier: "Tier 1",
    tagline: "Flowing Colors",
    description:
      "Animated gradient text with flowing color stops that shift across the text. Configurable colors, speed, and static mode.",
    deps: [],
    gradient: "from-violet-600/20 via-pink-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-pink-500",
    accentLine: "from-violet-500 to-pink-500",
    icon: <Palette className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Palette className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-pink-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Text Scramble",
    href: "/docs/components/text-scramble",
    tier: "Tier 1",
    tagline: "Decode Effect",
    description:
      "Text that scrambles through random characters before resolving left-to-right. Configurable speed, character set, and viewport trigger.",
    deps: ["framer-motion"],
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    accentLine: "from-amber-500 to-orange-500",
    icon: <Shuffle className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Shuffle className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-orange-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-yellow-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Blur Text",
    href: "/docs/components/blur-text",
    tier: "Tier 1",
    tagline: "Focus Reveal",
    description:
      "Text that fades in from a blurred state, word by word or all at once. Configurable blur amount, stagger, and scroll trigger.",
    deps: ["framer-motion"],
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(6,182,212,0.15)",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    accentLine: "from-cyan-500 to-blue-500",
    icon: <Eye className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Eye className="absolute right-6 top-6 h-16 w-16 text-cyan-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Split Text",
    href: "/docs/components/split-text",
    tier: "Tier 1",
    tagline: "Text Animation",
    description:
      "Text that splits apart into characters or words with staggered slide, fade, or scale animations triggered on scroll into view.",
    deps: ["framer-motion"],
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    accentLine: "from-amber-500 to-orange-500",
    icon: <SplitSquareHorizontal className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <SplitSquareHorizontal className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-orange-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-yellow-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Rotating Text",
    href: "/docs/components/rotating-text",
    tier: "Tier 1",
    tagline: "Slot Machine",
    description:
      "Text that rotates through multiple strings with a rolling slot-machine effect. Spring-physics transitions with configurable direction.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    accentLine: "from-violet-500 to-purple-500",
    icon: <RotateCw className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <RotateCw className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-purple-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Grid Pattern",
    href: "/docs/components/grid-pattern",
    tier: "Tier 1",
    tagline: "Background Pattern",
    description:
      "A subtle CSS grid background pattern with configurable cell size, line color, opacity, and an optional radial fade mask. Pure CSS, no JS.",
    deps: [],
    gradient: "from-slate-600/20 via-zinc-600/10 to-transparent",
    glowColor: "rgba(148,163,184,0.15)",
    iconBg: "bg-gradient-to-br from-slate-500 to-zinc-500",
    accentLine: "from-slate-500 to-zinc-500",
    icon: <Grid3x3 className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Grid3x3 className="absolute right-6 top-6 h-16 w-16 text-slate-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-zinc-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-gray-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Dot Pattern",
    href: "/docs/components/dot-pattern",
    tier: "Tier 1",
    tagline: "Background Pattern",
    description:
      "A dot matrix background pattern with configurable spacing, dot size, color, and an optional radial fade mask. Pure CSS, no JS.",
    deps: [],
    gradient: "from-neutral-600/20 via-stone-600/10 to-transparent",
    glowColor: "rgba(163,163,163,0.15)",
    iconBg: "bg-gradient-to-br from-neutral-500 to-stone-500",
    accentLine: "from-neutral-500 to-stone-500",
    icon: <Circle className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Circle className="absolute right-6 top-6 h-16 w-16 text-neutral-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-stone-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-gray-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Beams Background",
    href: "/docs/components/beams-background",
    tier: "Tier 1",
    tagline: "Light Sweep",
    description:
      "Animated light beams that sweep across the background with staggered delays and randomized angles. Pure CSS keyframes — no JS animation loop.",
    deps: [],
    gradient: "from-yellow-600/20 via-amber-600/10 to-transparent",
    glowColor: "rgba(234,179,8,0.15)",
    iconBg: "bg-gradient-to-br from-yellow-500 to-amber-500",
    accentLine: "from-yellow-500 to-amber-500",
    icon: <Zap className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Zap className="absolute right-6 top-6 h-16 w-16 text-yellow-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-amber-500/[0.1] -rotate-12" />
        <Layers className="absolute right-10 top-24 h-6 w-6 text-orange-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Stars Background",
    href: "/docs/components/stars-background",
    tier: "Tier 1",
    tagline: "Twinkle Field",
    description:
      "A twinkling star field background with randomly scattered stars that pulse in and out at varying speeds. Pure CSS — no canvas, no WebGL.",
    deps: [],
    gradient: "from-indigo-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(99,102,241,0.15)",
    iconBg: "bg-gradient-to-br from-indigo-500 to-blue-500",
    accentLine: "from-indigo-500 to-blue-500",
    icon: <Star className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Star className="absolute right-6 top-6 h-16 w-16 text-indigo-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-violet-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Mesh Gradient",
    href: "/docs/components/mesh-gradient",
    tier: "Tier 1",
    tagline: "Background Effect",
    description:
      "Animated mesh gradient background with multiple color blobs that blend together using heavy CSS blur. Zero dependencies.",
    deps: [],
    gradient: "from-violet-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-cyan-500",
    accentLine: "from-violet-500 to-cyan-500",
    icon: <Blend className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Blend className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-pink-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Wavy Background",
    href: "/docs/components/wavy-background",
    tier: "Tier 1",
    tagline: "Background Effect",
    description:
      "SVG-based animated wavy lines that drift horizontally in the background. Multiple sine-wave paths with decreasing opacity for depth.",
    deps: [],
    gradient: "from-sky-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-500",
    accentLine: "from-sky-500 to-blue-500",
    icon: <Activity className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Activity className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-cyan-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Aurora Background",
    href: "/docs/components/aurora-background",
    tier: "Tier 1",
    tagline: "Background Effect",
    description:
      "CSS-only animated aurora borealis background with soft blurred gradient bands that drift and rotate. Configurable colors, speed, and blur.",
    deps: [],
    gradient: "from-violet-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-cyan-500",
    accentLine: "from-violet-500 to-cyan-500",
    icon: <Sun className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Sun className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-emerald-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Particle Field",
    href: "/docs/components/particle-field",
    tier: "Tier 1",
    tagline: "Background Effect",
    description:
      "Floating particle dots that drift slowly across the background with CSS keyframe animations. Randomized positions, sizes, and timing for organic feel.",
    deps: [],
    gradient: "from-sky-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-indigo-500",
    accentLine: "from-sky-500 to-indigo-500",
    icon: <CircleDot className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <CircleDot className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Parallax Scroll",
    href: "/docs/components/parallax-scroll",
    tier: "Tier 1",
    tagline: "Scroll Effect",
    description:
      "A composable parallax wrapper that translates child content along the Y axis based on scroll progress. Configurable speed and direction.",
    deps: ["framer-motion"],
    gradient: "from-teal-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(20,184,166,0.15)",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
    accentLine: "from-teal-500 to-cyan-500",
    icon: <ArrowUpDown className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <ArrowUpDown className="absolute right-6 top-6 h-16 w-16 text-teal-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-emerald-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Sticky Scroll Reveal",
    href: "/docs/components/sticky-scroll-reveal",
    tier: "Tier 1",
    tagline: "Scroll Layout",
    description:
      "Two-column scroll-linked layout with a sticky glassmorphic content panel and text sections that fade in based on scroll progress.",
    deps: ["framer-motion"],
    gradient: "from-rose-600/20 via-pink-600/10 to-transparent",
    glowColor: "rgba(244,63,94,0.15)",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-500",
    accentLine: "from-rose-500 to-pink-500",
    icon: <Pin className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Pin className="absolute right-6 top-6 h-16 w-16 text-rose-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-pink-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Scroll Progress",
    href: "/docs/components/scroll-progress",
    tier: "Tier 1",
    tagline: "Progress Bar",
    description:
      "A fixed progress bar that animates from 0% to 100% based on page scroll. Uses useScroll and useSpring for smooth, spring-physics animation.",
    deps: ["framer-motion"],
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    accentLine: "from-blue-500 to-cyan-500",
    icon: <BarChart3 className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <BarChart3 className="absolute right-6 top-6 h-16 w-16 text-blue-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Fade on Scroll",
    href: "/docs/components/fade-on-scroll",
    tier: "Tier 1",
    tagline: "Scroll Reveal",
    description:
      "A wrapper that fades and slides children into view when scrolled into the viewport. Configurable direction, distance, delay, and spring physics.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    accentLine: "from-violet-500 to-purple-500",
    icon: <Eye className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Eye className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-purple-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Scroll Counter",
    href: "/docs/components/scroll-counter",
    tier: "Tier 1",
    tagline: "Animated Counter",
    description:
      "Counts from one number to another when scrolled into view. Uses spring physics and direct DOM updates via ref for zero re-render performance.",
    deps: ["framer-motion"],
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    accentLine: "from-amber-500 to-orange-500",
    icon: <Calculator className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Calculator className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-orange-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-yellow-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Glow Button",
    href: "/docs/components/glow-button",
    tier: "Tier 1",
    tagline: "Pulsing Glow",
    description:
      "A button with a pulsing glow shadow that intensifies on hover. CSS keyframe animation for idle pulse, Framer Motion spring for hover/tap interactions.",
    deps: ["framer-motion"],
    gradient: "from-sky-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-cyan-500",
    accentLine: "from-sky-500 to-cyan-500",
    icon: <Flame className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Flame className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Ripple Button",
    href: "/docs/components/ripple-button",
    tier: "Tier 1",
    tagline: "Click Ripple",
    description:
      "Material-design-style ripple effect on click. Expanding circles at click position that scale and fade out. Multiple ripples can stack. Pure CSS animation.",
    deps: [],
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    accentLine: "from-blue-500 to-indigo-500",
    icon: <Droplet className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Droplet className="absolute right-6 top-6 h-16 w-16 text-blue-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Gradient Border Button",
    href: "/docs/components/gradient-border-button",
    tier: "Tier 1",
    tagline: "Rotating Border",
    description:
      "An animated rotating conic-gradient border with a solid dark inner background. Configurable colors, border width, and rotation speed. Framer Motion hover/tap.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-fuchsia-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
    accentLine: "from-violet-500 to-fuchsia-500",
    icon: <Square className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Square className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-fuchsia-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Confetti Button",
    href: "/docs/components/confetti-button",
    tier: "Tier 1",
    tagline: "Particle Burst",
    description:
      "On click, bursts colorful confetti particles that fly outward in random directions with random colors, sizes, and rotations. Auto-cleanup after animation.",
    deps: ["framer-motion"],
    gradient: "from-pink-600/20 via-rose-600/10 to-transparent",
    glowColor: "rgba(236,72,153,0.15)",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    accentLine: "from-pink-500 to-rose-500",
    icon: <PartyPopper className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <PartyPopper className="absolute right-6 top-6 h-16 w-16 text-pink-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-rose-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Follow Cursor",
    href: "/docs/components/follow-cursor",
    tier: "Tier 1",
    tagline: "Spring Physics",
    description:
      "A decorative glowing dot that smoothly follows the cursor with configurable spring stiffness and damping. Zero re-renders.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    accentLine: "from-violet-500 to-purple-500",
    icon: <MousePointer className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <MousePointer className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-purple-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Blob Cursor",
    href: "/docs/components/blob-cursor",
    tier: "Tier 1",
    tagline: "Liquid Effect",
    description:
      "A large blurred blob that follows the cursor with heavy spring inertia for an organic, liquid feel. Uses mix-blend-mode for color blending.",
    deps: ["framer-motion"],
    gradient: "from-cyan-600/20 via-sky-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-cyan-500 to-sky-500",
    accentLine: "from-cyan-500 to-sky-500",
    icon: <Circle className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Circle className="absolute right-6 top-6 h-16 w-16 text-cyan-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-sky-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Spotlight Cursor",
    href: "/docs/components/spotlight-cursor",
    tier: "Tier 1",
    tagline: "Radial Light",
    description:
      "A full-viewport radial gradient spotlight that follows the cursor, subtly illuminating content beneath. Built with useMotionTemplate.",
    deps: ["framer-motion"],
    gradient: "from-amber-600/20 via-yellow-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-yellow-500",
    accentLine: "from-amber-500 to-yellow-500",
    icon: <Flashlight className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Flashlight className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-yellow-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-orange-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Floating Navbar",
    href: "/docs/components/floating-navbar",
    tier: "Tier 1",
    tagline: "Navigation",
    description:
      "A navbar that floats, shrinks into a glassmorphic pill on scroll, and hides/shows based on scroll direction. Spring-physics transitions.",
    deps: ["framer-motion"],
    gradient: "from-sky-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-500",
    accentLine: "from-sky-500 to-blue-500",
    icon: <Navigation className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Navigation className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-cyan-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Animated Input",
    href: "/docs/components/animated-input",
    tier: "Tier 1",
    tagline: "Form Input",
    description:
      "A text input with animated floating label that transitions on focus, expanding underline, glassmorphic styling, and configurable accent colors.",
    deps: ["framer-motion"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    glowColor: "rgba(16,185,129,0.15)",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    accentLine: "from-emerald-500 to-teal-500",
    icon: <TextCursor className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <TextCursor className="absolute right-6 top-6 h-16 w-16 text-emerald-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-teal-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-green-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "OTP Input",
    href: "/docs/components/otp-input",
    tier: "Tier 1",
    tagline: "Verification Code",
    description:
      "An animated OTP/verification code input with auto-focus between boxes, paste support, spring-physics glow on the active input, and glass-morphic styling.",
    deps: ["framer-motion"],
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500",
    accentLine: "from-blue-500 to-indigo-500",
    icon: <KeyRound className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <KeyRound className="absolute right-6 top-6 h-16 w-16 text-blue-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Morphing Dialog",
    href: "/docs/components/morphing-dialog",
    tier: "Tier 1",
    tagline: "Layout Morph",
    description:
      "A dialog that morphs from its trigger element using shared layout animation with spring physics, backdrop blur, and glassmorphic styling.",
    deps: ["framer-motion", "lucide-react"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    accentLine: "from-violet-500 to-purple-500",
    icon: <Maximize className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Maximize className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-purple-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Morphing Card",
    href: "/docs/components/morphing-card",
    tier: "Tier 1",
    tagline: "Shape Morph",
    description:
      "A card that smoothly morphs between collapsed and expanded states using layout animation with spring physics and content crossfade.",
    deps: ["framer-motion"],
    gradient: "from-teal-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(20,184,166,0.15)",
    iconBg: "bg-gradient-to-br from-teal-500 to-cyan-500",
    accentLine: "from-teal-500 to-cyan-500",
    icon: <Layers className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Layers className="absolute right-6 top-6 h-16 w-16 text-teal-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-emerald-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Hero Block",
    href: "/docs/components/hero-block",
    tier: "Tier 1",
    tagline: "Page Section",
    description:
      "A complete hero section with staggered fade-in animations, gradient badge, dual CTA buttons, radial gradient glow, and optional dot-grid background.",
    deps: ["framer-motion"],
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    accentLine: "from-blue-500 to-cyan-500",
    icon: <Layout className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Layout className="absolute right-6 top-6 h-16 w-16 text-blue-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Pricing Block",
    href: "/docs/components/pricing-block",
    tier: "Tier 1",
    tagline: "Page Section",
    description:
      "A pricing section with animated monthly/yearly toggle, glassmorphic cards, gradient-border highlighted tier, animated price counter, and staggered entrance.",
    deps: ["framer-motion", "lucide-react"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    glowColor: "rgba(16,185,129,0.15)",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    accentLine: "from-emerald-500 to-teal-500",
    icon: <CreditCard className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <CreditCard className="absolute right-6 top-6 h-16 w-16 text-emerald-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-teal-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-green-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "CTA Block",
    href: "/docs/components/cta-block",
    tier: "Tier 1",
    tagline: "Call to Action",
    description:
      "A call-to-action section with animated gradient borders, radial glow background, centered text, and staggered entrance animation. Matching HeroBlock CTA styles.",
    deps: ["framer-motion"],
    gradient: "from-orange-600/20 via-amber-600/10 to-transparent",
    glowColor: "rgba(249,115,22,0.15)",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    accentLine: "from-orange-500 to-amber-500",
    icon: <Megaphone className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Megaphone className="absolute right-6 top-6 h-16 w-16 text-orange-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-amber-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-yellow-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Search Spotlight",
    href: "/docs/components/search-spotlight",
    tier: "Tier 1",
    tagline: "Search Dialog",
    description:
      "A macOS Spotlight / Raycast-style search dialog with keyboard navigation, category grouping, glass-morphic styling, and spring animations.",
    deps: ["framer-motion", "lucide-react"],
    gradient: "from-indigo-600/20 via-violet-600/10 to-transparent",
    glowColor: "rgba(99,102,241,0.15)",
    iconBg: "bg-gradient-to-br from-indigo-500 to-violet-500",
    accentLine: "from-indigo-500 to-violet-500",
    icon: <Search className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Search className="absolute right-6 top-6 h-16 w-16 text-indigo-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-violet-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Testimonials Block",
    href: "/docs/components/testimonials-block",
    tier: "Page Block",
    tagline: "Social Proof",
    description:
      "Animated testimonial section with masonry grid and horizontal marquee variants, star ratings, glassmorphic cards, and gradient-avatar fallbacks.",
    deps: ["framer-motion"],
    gradient: "from-amber-600/20 via-orange-600/10 to-transparent",
    glowColor: "rgba(245,158,11,0.15)",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-500",
    accentLine: "from-amber-500 to-orange-500",
    icon: <MessageSquareQuote className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <MessageSquareQuote className="absolute right-6 top-6 h-16 w-16 text-amber-500/[0.07] rotate-12" />
        <Star className="absolute right-20 top-14 h-8 w-8 text-orange-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-yellow-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Features Block",
    href: "/docs/components/features-block",
    tier: "Page Block",
    tagline: "Content Section",
    description:
      "Animated features/benefits grid with configurable columns, staggered viewport-triggered entrance, hover lift with icon glow, and optional section heading.",
    deps: ["framer-motion"],
    gradient: "from-sky-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-500",
    accentLine: "from-sky-500 to-blue-500",
    icon: <Grid2x2 className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Grid2x2 className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-cyan-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Sparkline Chart",
    href: "/docs/components/sparkline-chart",
    tier: "Tier 1",
    tagline: "Data Viz",
    description:
      "A minimal pure-SVG sparkline with smooth cubic bezier curves, optional gradient area fill, and animated line drawing via stroke-dashoffset. No charting library.",
    deps: ["framer-motion"],
    gradient: "from-sky-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-cyan-500",
    accentLine: "from-sky-500 to-cyan-500",
    icon: <TrendingUp className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <TrendingUp className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "KPI Card",
    href: "/docs/components/kpi-card",
    tier: "Tier 1",
    tagline: "Data Viz",
    description:
      "A glassmorphic dashboard card with spring-animated number counter, color-coded change indicator with arrow, and optional embedded sparkline.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    accentLine: "from-violet-500 to-purple-500",
    icon: <BarChart className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <BarChart className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-purple-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Progress Ring",
    href: "/docs/components/progress-ring",
    tier: "Tier 1",
    tagline: "Data Viz",
    description:
      "An SVG circular progress ring with animated stroke-dashoffset, gradient stroke, rounded line caps, and a center content slot. Animates on scroll into view.",
    deps: ["framer-motion"],
    gradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
    glowColor: "rgba(16,185,129,0.15)",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500",
    accentLine: "from-emerald-500 to-teal-500",
    icon: <CircleDot className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <CircleDot className="absolute right-6 top-6 h-16 w-16 text-emerald-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-teal-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-green-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Disintegration Effect",
    href: "/docs/components/disintegration-effect",
    tier: "Tier 1",
    tagline: "Particle Dissolve",
    description:
      "A Thanos-snap style particle dissolve wrapper. Toggle a boolean to disintegrate any element into colored particles, then reassemble.",
    deps: ["framer-motion"],
    gradient: "from-fuchsia-600/20 via-pink-600/10 to-transparent",
    glowColor: "rgba(236,72,153,0.15)",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
    accentLine: "from-fuchsia-500 to-pink-500",
    icon: <Sparkles className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Sparkles className="absolute right-6 top-6 h-16 w-16 text-fuchsia-500/[0.07] rotate-12" />
        <Zap className="absolute right-20 top-14 h-8 w-8 text-pink-500/[0.1] -rotate-12" />
        <Star className="absolute right-10 top-24 h-6 w-6 text-rose-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Holographic Card",
    href: "/docs/components/holographic-card",
    tier: "Tier 1",
    tagline: "Rainbow Foil",
    description:
      "A card with a real-time rainbow holographic foil effect that shifts with viewing angle, like a Pokemon holographic card.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-cyan-500",
    accentLine: "from-violet-500 to-cyan-500",
    icon: <Sparkles className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Sparkles className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Star className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Moving Border",
    href: "/docs/components/moving-border",
    tier: "Tier 1",
    tagline: "CSS Keyframes",
    description:
      "An animated gradient light that travels along the border of an element. Pure CSS rotation with conic-gradient.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-fuchsia-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
    accentLine: "from-violet-500 to-fuchsia-500",
    icon: <Square className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Square className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-fuchsia-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Handwritten Annotation",
    href: "/docs/components/handwritten-annotation",
    tier: "Tier 1",
    tagline: "SVG Draw Effect",
    description:
      "SVG annotations — circles, underlines, highlights, arrows — that animate as if being drawn by hand in real-time.",
    deps: ["framer-motion"],
    gradient: "from-red-600/20 via-orange-600/10 to-transparent",
    glowColor: "rgba(239,68,68,0.15)",
    iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
    accentLine: "from-red-500 to-orange-500",
    icon: <PenTool className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <PenTool className="absolute right-6 top-6 h-16 w-16 text-red-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-orange-500/[0.1] -rotate-12" />
        <Circle className="absolute right-10 top-24 h-6 w-6 text-red-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Shader Blob",
    href: "/docs/components/shader-blob",
    tier: "Tier 3",
    tagline: "WebGL Shader",
    description:
      "A real-time GLSL metaball that morphs organically using FBM noise, reacts to cursor, and emits a soft emissive glow with two-tone color gradients.",
    deps: ["ogl"],
    gradient: "from-violet-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-blue-500",
    accentLine: "from-violet-500 to-blue-500",
    icon: <Circle className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Circle className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Blend className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Liquid Button",
    href: "/docs/components/liquid-button",
    tier: "Tier 1",
    tagline: "Spring Ripples",
    description:
      "A button whose surface ripples like liquid mercury when hovered and clicked. Organic spring-physics ripples expand from cursor position.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-purple-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    accentLine: "from-violet-500 to-purple-500",
    icon: <Droplet className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Droplet className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-purple-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Morphing Blob",
    href: "/docs/components/morphing-blob",
    tier: "Tier 1",
    tagline: "SVG Morph",
    description:
      "An SVG blob that continuously morphs between organic shapes using requestAnimationFrame interpolation with gradient fill.",
    deps: [],
    gradient: "from-indigo-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(99,102,241,0.15)",
    iconBg: "bg-gradient-to-br from-indigo-500 to-cyan-500",
    accentLine: "from-indigo-500 to-cyan-500",
    icon: <Circle className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Circle className="absolute right-6 top-6 h-16 w-16 text-indigo-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Blend className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Chromatic Text",
    href: "/docs/components/chromatic-text",
    tier: "Tier 1",
    tagline: "Text Effect",
    description:
      "Text with chromatic aberration -- RGB channels split apart on hover or always active. Pure CSS layers with mix-blend-mode screen and Framer Motion springs.",
    deps: ["framer-motion"],
    gradient: "from-red-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(239,68,68,0.15)",
    iconBg: "bg-gradient-to-br from-red-500 via-green-500 to-blue-500",
    accentLine: "from-red-500 to-blue-500",
    icon: <Blend className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Blend className="absolute right-6 top-6 h-16 w-16 text-red-500/[0.07] rotate-12" />
        <Type className="absolute right-20 top-14 h-8 w-8 text-green-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Typewriter Terminal",
    href: "/docs/components/typewriter-terminal",
    tier: "Tier 1",
    tagline: "Terminal Emulator",
    description:
      "A realistic terminal emulator with typing animation, command sequences, dark and matrix themes, and optional looping.",
    deps: ["react"],
    gradient: "from-green-600/20 via-emerald-600/10 to-transparent",
    glowColor: "rgba(34,197,94,0.15)",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    accentLine: "from-green-500 to-emerald-500",
    icon: <Terminal className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Terminal className="absolute right-6 top-6 h-16 w-16 text-green-500/[0.07] rotate-12" />
        <Type className="absolute right-20 top-14 h-8 w-8 text-emerald-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-lime-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Browser Frame",
    href: "/docs/components/browser-frame",
    tier: "Tier 1",
    tagline: "Display Frame",
    description:
      "A browser window mockup frame with traffic lights, navigation buttons, URL bar, and glassmorphic dark styling for showcasing content.",
    deps: ["react"],
    gradient: "from-sky-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(14,165,233,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-500",
    accentLine: "from-sky-500 to-blue-500",
    icon: <Monitor className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Monitor className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Layout className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-cyan-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Phone Frame",
    href: "/docs/components/phone-frame",
    tier: "Tier 1",
    tagline: "Device Mockup",
    description:
      "A phone/mobile device mockup frame with dynamic island, status bar, and home indicator for showcasing mobile designs.",
    deps: ["react"],
    gradient: "from-pink-600/20 via-rose-600/10 to-transparent",
    glowColor: "rgba(236,72,153,0.15)",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-500",
    accentLine: "from-pink-500 to-rose-500",
    icon: <Smartphone className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Smartphone className="absolute right-6 top-6 h-16 w-16 text-pink-500/[0.07] rotate-12" />
        <Layout className="absolute right-20 top-14 h-8 w-8 text-rose-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Animated Beam",
    href: "/docs/components/animated-beam",
    tier: "Tier 1",
    tagline: "SVG Path",
    description:
      "An animated light beam that travels along any SVG path — perfect for integration diagrams and data flow visualizations with glow effects.",
    deps: ["react"],
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(56,156,253,0.15)",
    iconBg: "bg-gradient-to-br from-cyan-500 to-blue-500",
    accentLine: "from-cyan-500 to-blue-500",
    icon: <Waypoints className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Waypoints className="absolute right-6 top-6 h-16 w-16 text-cyan-500/[0.07] rotate-12" />
        <Zap className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Activity className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Data Orbit",
    href: "/docs/components/data-orbit",
    tier: "Tier 1",
    tagline: "CSS Orbit",
    description:
      "Icons and elements orbiting in concentric rings around a center element. Each item counter-rotates to stay upright while the ring spins.",
    deps: ["react"],
    gradient: "from-purple-600/20 via-violet-600/10 to-transparent",
    glowColor: "rgba(168,85,247,0.15)",
    iconBg: "bg-gradient-to-br from-purple-500 to-violet-500",
    accentLine: "from-purple-500 to-violet-500",
    icon: <Orbit className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Orbit className="absolute right-6 top-6 h-16 w-16 text-purple-500/[0.07] rotate-12" />
        <CircleDot className="absolute right-20 top-14 h-8 w-8 text-violet-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Neural Network",
    href: "/docs/components/neural-network",
    tier: "Tier 2",
    tagline: "Canvas Animation",
    description:
      "An animated network graph where nodes pulse and connections fire like synapses. Canvas-based rendering for smooth performance.",
    deps: [],
    gradient: "from-violet-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-cyan-500",
    accentLine: "from-violet-500 to-cyan-500",
    icon: <Network className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Network className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Zap className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <CircleDot className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Gravity Grid",
    href: "/docs/components/gravity-grid",
    tier: "Tier 1",
    tagline: "Cursor Effect",
    description:
      "A grid of dots that respond to your cursor with gravity or repulsion. Uses direct DOM transforms via refs for silky-smooth performance.",
    deps: [],
    gradient: "from-fuchsia-600/20 via-violet-600/10 to-transparent",
    glowColor: "rgba(168,85,247,0.15)",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-violet-500",
    accentLine: "from-fuchsia-500 to-violet-500",
    icon: <Grid2x2 className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Grid2x2 className="absolute right-6 top-6 h-16 w-16 text-fuchsia-500/[0.07] rotate-12" />
        <MousePointer className="absolute right-20 top-14 h-8 w-8 text-violet-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Audio Reactive Wave",
    href: "/docs/components/audio-reactive-wave",
    tier: "Tier 2",
    tagline: "Web Audio API",
    description:
      "A waveform visualizer with gradient-colored bars that react to audio input or generate animated demo sine waves with glow effects.",
    deps: [],
    gradient: "from-violet-600/20 via-blue-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-blue-500",
    accentLine: "from-violet-500 to-blue-500",
    icon: <Music className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Music className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Activity className="absolute right-20 top-14 h-8 w-8 text-blue-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Portal Transition",
    href: "/docs/components/portal-transition",
    tier: "Tier 2",
    tagline: "Framer Motion",
    description:
      "A circular portal/wormhole transition effect that reveals content with an expanding clip-path, glowing ring, and particle effects.",
    deps: ["framer-motion"],
    gradient: "from-purple-600/20 via-pink-600/10 to-transparent",
    glowColor: "rgba(168,85,247,0.15)",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-500",
    accentLine: "from-purple-500 to-pink-500",
    icon: <CircleDot className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <CircleDot className="absolute right-6 top-6 h-16 w-16 text-purple-500/[0.07] rotate-12" />
        <Circle className="absolute right-20 top-14 h-8 w-8 text-pink-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-fuchsia-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Split Screen Reveal",
    href: "/docs/components/split-screen-reveal",
    tier: "Tier 1",
    tagline: "Layout & Reveal",
    description:
      "Two glassmorphic panels that split apart on click to reveal content underneath with spring-physics animation.",
    deps: ["framer-motion"],
    gradient: "from-violet-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-indigo-500",
    accentLine: "from-violet-500 to-indigo-500",
    icon: <Columns className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Columns className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Layers className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Smoke Divider",
    href: "/docs/components/smoke-divider",
    tier: "Tier 1",
    tagline: "Decorative",
    description:
      "A section divider with animated smoke/fog particles drifting across. Pure CSS animation with hydration-safe seeded randomization.",
    deps: [],
    gradient: "from-cyan-600/20 via-teal-600/10 to-transparent",
    glowColor: "rgba(34,211,238,0.15)",
    iconBg: "bg-gradient-to-br from-cyan-500 to-teal-500",
    accentLine: "from-cyan-500 to-teal-500",
    icon: <Wind className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Wind className="absolute right-6 top-6 h-16 w-16 text-cyan-500/[0.07] rotate-12" />
        <Activity className="absolute right-20 top-14 h-8 w-8 text-teal-500/[0.1] -rotate-12" />
        <Sparkles className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Glitch Transition",
    href: "/docs/components/glitch-transition",
    tier: "Tier 1",
    tagline: "CRT Glitch",
    description:
      "A CRT TV glitch effect with RGB channel splitting, scanline overlays, block displacement, and rapid flicker. Wrap any content for cinematic transitions.",
    deps: ["framer-motion"],
    gradient: "from-red-600/20 via-rose-600/10 to-transparent",
    glowColor: "rgba(239,68,68,0.15)",
    iconBg: "bg-gradient-to-br from-red-500 to-rose-500",
    accentLine: "from-red-500 to-rose-500",
    icon: <Zap className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Zap className="absolute right-6 top-6 h-16 w-16 text-red-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-rose-500/[0.1] -rotate-12" />
        <Activity className="absolute right-10 top-24 h-6 w-6 text-orange-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Ambient Tilt",
    href: "/docs/components/ambient-tilt",
    tier: "Tier 1",
    tagline: "3D Tilt",
    description:
      "A wrapper that adds subtle 3D tilt based on cursor position or device gyroscope. Spring-animated transforms for a smooth, natural feel.",
    deps: ["framer-motion"],
    gradient: "from-blue-600/20 via-cyan-600/10 to-transparent",
    glowColor: "rgba(59,130,246,0.15)",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    accentLine: "from-blue-500 to-cyan-500",
    icon: <Move3d className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Move3d className="absolute right-6 top-6 h-16 w-16 text-blue-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-cyan-500/[0.1] -rotate-12" />
        <Box className="absolute right-10 top-24 h-6 w-6 text-sky-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Icon Cloud",
    href: "/docs/components/icon-cloud",
    tier: "Tier 2",
    tagline: "3D Tag Cloud",
    description:
      "A 3D tag cloud of floating icons that rotate as a sphere. Drag to interact, icons scale and fade based on depth. Pure math + CSS transforms.",
    deps: [],
    gradient: "from-sky-600/20 via-indigo-600/10 to-transparent",
    glowColor: "rgba(56,189,248,0.15)",
    iconBg: "bg-gradient-to-br from-sky-500 to-indigo-500",
    accentLine: "from-sky-500 to-indigo-500",
    icon: <Cloud className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Cloud className="absolute right-6 top-6 h-16 w-16 text-sky-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-indigo-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-blue-500/[0.08] rotate-45" />
      </>
    ),
  },
  {
    name: "Retro Grid",
    href: "/docs/components/retro-grid",
    tier: "Tier 1",
    tagline: "Background Pattern",
    description:
      "A perspective grid that vanishes to a horizon point -- retro synthwave/Tron aesthetic. Pure CSS with optional scroll animation.",
    deps: [],
    gradient: "from-violet-600/20 via-fuchsia-600/10 to-transparent",
    glowColor: "rgba(139,92,246,0.15)",
    iconBg: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
    accentLine: "from-violet-500 to-fuchsia-500",
    icon: <Grid3x3 className="h-5 w-5 text-white" />,
    decorativeIcons: (
      <>
        <Grid3x3 className="absolute right-6 top-6 h-16 w-16 text-violet-500/[0.07] rotate-12" />
        <Sparkles className="absolute right-20 top-14 h-8 w-8 text-fuchsia-500/[0.1] -rotate-12" />
        <Zap className="absolute right-10 top-24 h-6 w-6 text-purple-500/[0.08] rotate-45" />
      </>
    ),
  },
];

function ComponentCard({
  card,
  index,
}: {
  card: CardData;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Mouse-tracking outer glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: hovered
            ? `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${card.glowColor}, transparent 60%)`
            : undefined,
        }}
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/90 backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.15] group-hover:shadow-2xl">
        {/* Top accent line */}
        <div
          className={cn(
            "h-[2px] bg-gradient-to-r",
            card.accentLine
          )}
        />

        {/* Header section with gradient bg */}
        <div className="relative overflow-hidden px-6 pt-6 pb-5">
          {/* Gradient background wash */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
              card.gradient
            )}
          />

          {/* Decorative background icons */}
          {card.decorativeIcons}

          {/* Logo + tier row */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Icon circle */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl shadow-lg",
                  card.iconBg
                )}
              >
                {card.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  {card.name}
                </h2>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  {card.tagline}
                </p>
              </div>
            </div>

            <span className="rounded-lg border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {card.tier}
            </span>
          </div>

          {/* FlexUI watermark */}
          <div className="relative z-10 mt-4 flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="FlexUI"
              width={16}
              height={16}
              className="rounded-sm"
            />
            <span className="text-[10px] font-medium text-zinc-600">
              FlexUI Registry
            </span>
          </div>
        </div>

        {/* Description + deps */}
        <div className="border-t border-white/[0.04] px-6 py-5">
          <p className="text-sm leading-relaxed text-zinc-400">
            {card.description}
          </p>

          {/* Dependency pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {card.deps.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono font-medium text-zinc-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                {dep}
              </span>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-white/[0.04] px-6 py-4">
          <Link
            href={card.href}
            className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-white transition-all"
          >
            <span className="relative">
              View Documentation
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-gradient-to-r transition-all duration-300 group-hover/btn:w-full",
                  card.accentLine
                )}
              />
            </span>
            <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-all duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover/btn:text-white" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ComponentCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {components.map((card, i) => (
        <ComponentCard key={card.href} card={card} index={i} />
      ))}
    </div>
  );
}
