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
  PenTool,
  Terminal, Smartphone,
  Waypoints,
  Orbit,
  Network,
  Music,
  Columns,
  Wind,
  Cloud,
  Move3d,
  Paintbrush,
  Film,
  ChevronDown, Users, Award, Clock, Scissors, Copy, ImageIcon, ToggleLeft,
  SlidersHorizontal, CheckCircle, ListOrdered, Tag, AlertCircle,
  Eraser, Magnet, Timer, Gauge, StarHalf, Calendar, Code2,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  isNew?: boolean;
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
      { title: "Theme Preview", href: "/docs/theme-preview", icon: <Palette className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Buttons",
    items: [
      { title: "Magnetic Button", href: "/docs/components/magnetic-button", icon: <MousePointer className="h-4 w-4" /> },
      { title: "Shimmer Button", href: "/docs/components/shimmer-button", icon: <Sparkles className="h-4 w-4" />, isNew: true },
      { title: "Glow Button", href: "/docs/components/glow-button", icon: <Flame className="h-4 w-4" />, isNew: true },
      { title: "Ripple Button", href: "/docs/components/ripple-button", icon: <Droplet className="h-4 w-4" />, isNew: true },
      { title: "Gradient Border", href: "/docs/components/gradient-border-button", icon: <Square className="h-4 w-4" />, isNew: true },
      { title: "Confetti Button", href: "/docs/components/confetti-button", icon: <PartyPopper className="h-4 w-4" />, isNew: true },
      { title: "Liquid Button", href: "/docs/components/liquid-button", icon: <Droplet className="h-4 w-4" />, isNew: true },
      { title: "Pulse Button", href: "/docs/components/pulse-button", icon: <CircleDot className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Cards",
    items: [
      { title: "3D Hover Card", href: "/docs/components/three-hover-card", icon: <Box className="h-4 w-4" /> },
      { title: "Spotlight Card", href: "/docs/components/spotlight-card", icon: <Lightbulb className="h-4 w-4" />, isNew: true },
      { title: "Expandable Card", href: "/docs/components/expandable-card", icon: <Expand className="h-4 w-4" /> },
      { title: "Reflective Card", href: "/docs/components/reflective-card", icon: <Scan className="h-4 w-4" /> },
      { title: "Morphing Card", href: "/docs/components/morphing-card", icon: <Layers className="h-4 w-4" />, isNew: true },
      { title: "KPI Card", href: "/docs/components/kpi-card", icon: <BarChart className="h-4 w-4" />, isNew: true },
      { title: "Holographic Card", href: "/docs/components/holographic-card", icon: <Sparkles className="h-4 w-4" />, isNew: true },
      { title: "Neon Glow Card", href: "/docs/components/neon-glow-card", icon: <Flame className="h-4 w-4" />, isNew: true },
      { title: "Hover Card", href: "/docs/components/hover-card", icon: <MousePointer className="h-4 w-4" />, isNew: true },
      { title: "Magnetic Card", href: "/docs/components/magnetic-card", icon: <Magnet className="h-4 w-4" />, isNew: true },
      { title: "Tilt Card", href: "/docs/components/tilt-card", icon: <Move3d className="h-4 w-4" />, isNew: true },
      { title: "Reveal Card", href: "/docs/components/reveal-card", icon: <Eye className="h-4 w-4" />, isNew: true },
      { title: "Wobble Card", href: "/docs/components/wobble-card", icon: <Waves className="h-4 w-4" />, isNew: true },
      { title: "Stat Card", href: "/docs/components/stat-card", icon: <BarChart className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Text Animations",
    items: [
      { title: "Text Reveal", href: "/docs/components/text-reveal", icon: <Type className="h-4 w-4" />, isNew: true },
      { title: "Typewriter", href: "/docs/components/typewriter-text", icon: <Type className="h-4 w-4" />, isNew: true },
      { title: "Gradient Text", href: "/docs/components/gradient-text", icon: <Palette className="h-4 w-4" />, isNew: true },
      { title: "Flip Words", href: "/docs/components/flip-words", icon: <RotateCw className="h-4 w-4" />, isNew: true },
      { title: "Wavy Text", href: "/docs/components/wavy-text", icon: <Waves className="h-4 w-4" />, isNew: true },
      { title: "Text Scramble", href: "/docs/components/text-scramble", icon: <Shuffle className="h-4 w-4" />, isNew: true },
      { title: "Blur Text", href: "/docs/components/blur-text", icon: <Eye className="h-4 w-4" />, isNew: true },
      { title: "Split Text", href: "/docs/components/split-text", icon: <SplitSquareHorizontal className="h-4 w-4" />, isNew: true },
      { title: "Rotating Text", href: "/docs/components/rotating-text", icon: <RotateCw className="h-4 w-4" />, isNew: true },
      { title: "Number Ticker", href: "/docs/components/number-ticker", icon: <Hash className="h-4 w-4" />, isNew: true },
      { title: "Handwritten Annotation", href: "/docs/components/handwritten-annotation", icon: <PenTool className="h-4 w-4" />, isNew: true },
      { title: "Chromatic Text", href: "/docs/components/chromatic-text", icon: <Blend className="h-4 w-4" />, isNew: true },
      { title: "Glow Text", href: "/docs/components/glow-text", icon: <Flame className="h-4 w-4" />, isNew: true },
      { title: "Blur Fade", href: "/docs/components/blur-fade", icon: <Eye className="h-4 w-4" />, isNew: true },
      { title: "Text Gradient Scroll", href: "/docs/components/text-gradient-scroll", icon: <Palette className="h-4 w-4" />, isNew: true },
      { title: "Typewriter Delete", href: "/docs/components/typewriter-delete", icon: <Eraser className="h-4 w-4" />, isNew: true },
      { title: "Animated Counter", href: "/docs/components/animated-counter", icon: <Hash className="h-4 w-4" />, isNew: true },
      { title: "Counter Up", href: "/docs/components/counter-up", icon: <TrendingUp className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Backgrounds",
    items: [
      { title: "Aurora", href: "/docs/components/aurora-background", icon: <Sun className="h-4 w-4" />, isNew: true },
      { title: "Particle Field", href: "/docs/components/particle-field", icon: <CircleDot className="h-4 w-4" />, isNew: true },
      { title: "Grid Pattern", href: "/docs/components/grid-pattern", icon: <Grid3x3 className="h-4 w-4" />, isNew: true },
      { title: "Dot Pattern", href: "/docs/components/dot-pattern", icon: <Circle className="h-4 w-4" />, isNew: true },
      { title: "Beams", href: "/docs/components/beams-background", icon: <Zap className="h-4 w-4" />, isNew: true },
      { title: "Stars", href: "/docs/components/stars-background", icon: <Star className="h-4 w-4" />, isNew: true },
      { title: "Mesh Gradient", href: "/docs/components/mesh-gradient", icon: <Blend className="h-4 w-4" />, isNew: true },
      { title: "Wavy Lines", href: "/docs/components/wavy-background", icon: <Activity className="h-4 w-4" />, isNew: true },
      { title: "Neural Network", href: "/docs/components/neural-network", icon: <Network className="h-4 w-4" />, isNew: true },
      { title: "Retro Grid", href: "/docs/components/retro-grid", icon: <Grid3x3 className="h-4 w-4" />, isNew: true },
      { title: "Flickering Grid", href: "/docs/components/flickering-grid", icon: <Grid3x3 className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Scroll Effects",
    items: [
      { title: "Parallax Scroll", href: "/docs/components/parallax-scroll", icon: <ArrowUpDown className="h-4 w-4" />, isNew: true },
      { title: "Sticky Reveal", href: "/docs/components/sticky-scroll-reveal", icon: <Pin className="h-4 w-4" />, isNew: true },
      { title: "Scroll Progress", href: "/docs/components/scroll-progress", icon: <BarChart3 className="h-4 w-4" />, isNew: true },
      { title: "Fade on Scroll", href: "/docs/components/fade-on-scroll", icon: <Eye className="h-4 w-4" />, isNew: true },
      { title: "Scroll Counter", href: "/docs/components/scroll-counter", icon: <Calculator className="h-4 w-4" />, isNew: true },
      { title: "Direction Hover", href: "/docs/components/direction-hover", icon: <MousePointer className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Cursor Effects",
    items: [
      { title: "Follow Cursor", href: "/docs/components/follow-cursor", icon: <MousePointer className="h-4 w-4" />, isNew: true },
      { title: "Blob Cursor", href: "/docs/components/blob-cursor", icon: <Circle className="h-4 w-4" />, isNew: true },
      { title: "Spotlight Cursor", href: "/docs/components/spotlight-cursor", icon: <Flashlight className="h-4 w-4" />, isNew: true },
      { title: "Gravity Grid", href: "/docs/components/gravity-grid", icon: <Grid2x2 className="h-4 w-4" />, isNew: true },
      { title: "Splash Cursor", href: "/docs/components/splash-cursor", icon: <Paintbrush className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Layout & Navigation",
    items: [
      { title: "Floating Panel", href: "/docs/components/floating-panel", icon: <PanelTop className="h-4 w-4" /> },
      { title: "Animated Tabs", href: "/docs/components/animated-tabs", icon: <Layers className="h-4 w-4" />, isNew: true },
      { title: "Marquee", href: "/docs/components/marquee", icon: <MoveHorizontal className="h-4 w-4" />, isNew: true },
      { title: "Drawer", href: "/docs/components/drawer", icon: <PanelBottomOpen className="h-4 w-4" />, isNew: true },
      { title: "Toast", href: "/docs/components/toast", icon: <Bell className="h-4 w-4" />, isNew: true },
      { title: "Dock Menu", href: "/docs/components/dock-menu", icon: <Monitor className="h-4 w-4" />, isNew: true },
      { title: "Floating Navbar", href: "/docs/components/floating-navbar", icon: <Navigation className="h-4 w-4" />, isNew: true },
      { title: "Morphing Dialog", href: "/docs/components/morphing-dialog", icon: <Maximize className="h-4 w-4" />, isNew: true },
      { title: "Search Spotlight", href: "/docs/components/search-spotlight", icon: <Search className="h-4 w-4" />, isNew: true },
      { title: "Moving Border", href: "/docs/components/moving-border", icon: <Square className="h-4 w-4" />, isNew: true },
      { title: "Border Beam", href: "/docs/components/border-beam", icon: <Sparkles className="h-4 w-4" />, isNew: true },
      { title: "Typewriter Terminal", href: "/docs/components/typewriter-terminal", icon: <Terminal className="h-4 w-4" />, isNew: true },
      { title: "Browser Frame", href: "/docs/components/browser-frame", icon: <Monitor className="h-4 w-4" />, isNew: true },
      { title: "Phone Frame", href: "/docs/components/phone-frame", icon: <Smartphone className="h-4 w-4" />, isNew: true },
      { title: "Split Screen Reveal", href: "/docs/components/split-screen-reveal", icon: <Columns className="h-4 w-4" />, isNew: true },
      { title: "Infinite Canvas", href: "/docs/components/infinite-canvas", icon: <Layout className="h-4 w-4" />, isNew: true },
      { title: "Accordion", href: "/docs/components/accordion", icon: <ChevronDown className="h-4 w-4" />, isNew: true },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu", icon: <ChevronDown className="h-4 w-4" />, isNew: true },
      { title: "Popover", href: "/docs/components/popover", icon: <MessageSquareQuote className="h-4 w-4" />, isNew: true },
      { title: "Tooltip", href: "/docs/components/tooltip", icon: <AlertCircle className="h-4 w-4" />, isNew: true },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb", icon: <Navigation className="h-4 w-4" />, isNew: true },
      { title: "Timeline", href: "/docs/components/timeline", icon: <Clock className="h-4 w-4" />, isNew: true },
      { title: "Stepper", href: "/docs/components/stepper", icon: <ListOrdered className="h-4 w-4" />, isNew: true },
      { title: "File Tree", href: "/docs/components/file-tree", icon: <FileText className="h-4 w-4" />, isNew: true },
      { title: "Command Menu", href: "/docs/components/command-menu", icon: <Terminal className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Inputs",
    items: [
      { title: "Animated Input", href: "/docs/components/animated-input", icon: <TextCursor className="h-4 w-4" />, isNew: true },
      { title: "OTP Input", href: "/docs/components/otp-input", icon: <KeyRound className="h-4 w-4" />, isNew: true },
      { title: "Color Picker", href: "/docs/components/color-picker", icon: <Palette className="h-4 w-4" />, isNew: true },
      { title: "Tag Input", href: "/docs/components/tag-input", icon: <Tag className="h-4 w-4" />, isNew: true },
      { title: "Slider", href: "/docs/components/slider", icon: <SlidersHorizontal className="h-4 w-4" />, isNew: true },
      { title: "Switch", href: "/docs/components/switch", icon: <ToggleLeft className="h-4 w-4" />, isNew: true },
      { title: "Calendar", href: "/docs/components/calendar", icon: <Calendar className="h-4 w-4" />, isNew: true },
      { title: "Rating", href: "/docs/components/rating", icon: <StarHalf className="h-4 w-4" />, isNew: true },
      { title: "Pricing Toggle", href: "/docs/components/pricing-toggle", icon: <ToggleLeft className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Page Blocks",
    items: [
      { title: "Hero Block", href: "/docs/components/hero-block", icon: <Layout className="h-4 w-4" />, isNew: true },
      { title: "Pricing Block", href: "/docs/components/pricing-block", icon: <CreditCard className="h-4 w-4" />, isNew: true },
      { title: "Features Block", href: "/docs/components/features-block", icon: <Grid2x2 className="h-4 w-4" />, isNew: true },
      { title: "Testimonials", href: "/docs/components/testimonials-block", icon: <MessageSquareQuote className="h-4 w-4" />, isNew: true },
      { title: "CTA Block", href: "/docs/components/cta-block", icon: <Megaphone className="h-4 w-4" />, isNew: true },
      { title: "Cinematic Hero", href: "/docs/components/cinematic-hero", icon: <Film className="h-4 w-4" />, isNew: true },
      { title: "Header Block", href: "/docs/components/header-block", icon: <PanelTop className="h-4 w-4" />, isNew: true },
      { title: "Footer Block", href: "/docs/components/footer-block", icon: <PanelBottomOpen className="h-4 w-4" />, isNew: true },
      { title: "FAQ Block", href: "/docs/components/faq-block", icon: <MessageSquareQuote className="h-4 w-4" />, isNew: true },
      { title: "Team Block", href: "/docs/components/team-block", icon: <Users className="h-4 w-4" />, isNew: true },
      { title: "Stats Block", href: "/docs/components/stats-block", icon: <BarChart className="h-4 w-4" />, isNew: true },
      { title: "Newsletter Block", href: "/docs/components/newsletter-block", icon: <Bell className="h-4 w-4" />, isNew: true },
      { title: "Login Block", href: "/docs/components/login-block", icon: <KeyRound className="h-4 w-4" />, isNew: true },
      { title: "Signup Block", href: "/docs/components/signup-block", icon: <ListOrdered className="h-4 w-4" />, isNew: true },
      { title: "Logo Cloud", href: "/docs/components/logo-cloud-block", icon: <Globe className="h-4 w-4" />, isNew: true },
      { title: "Comparison Block", href: "/docs/components/comparison-block", icon: <Columns className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Page Templates",
    items: [
      { title: "SaaS Landing", href: "/docs/components/saas-landing", icon: <Layout className="h-4 w-4" />, isNew: true },
      { title: "Portfolio", href: "/docs/components/portfolio", icon: <Users className="h-4 w-4" />, isNew: true },
      { title: "Dashboard", href: "/docs/components/dashboard", icon: <Monitor className="h-4 w-4" />, isNew: true },
      { title: "E-commerce", href: "/docs/components/ecommerce", icon: <CreditCard className="h-4 w-4" />, isNew: true },
      { title: "Blog", href: "/docs/components/blog", icon: <FileText className="h-4 w-4" />, isNew: true },
      { title: "Pricing Page", href: "/docs/components/pricing-page", icon: <CreditCard className="h-4 w-4" />, isNew: true },
      { title: "Auth Login", href: "/docs/components/auth-login", icon: <KeyRound className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Data Visualization",
    items: [
      { title: "Sparkline Chart", href: "/docs/components/sparkline-chart", icon: <TrendingUp className="h-4 w-4" />, isNew: true },
      { title: "Progress Ring", href: "/docs/components/progress-ring", icon: <CircleDot className="h-4 w-4" />, isNew: true },
      { title: "Animated Beam", href: "/docs/components/animated-beam", icon: <Waypoints className="h-4 w-4" />, isNew: true },
      { title: "Data Orbit", href: "/docs/components/data-orbit", icon: <Orbit className="h-4 w-4" />, isNew: true },
      { title: "Countdown", href: "/docs/components/countdown", icon: <Timer className="h-4 w-4" />, isNew: true },
      { title: "Progress Bar", href: "/docs/components/progress-bar", icon: <Gauge className="h-4 w-4" />, isNew: true },
      { title: "Orbit Animation", href: "/docs/components/orbit-animation", icon: <Orbit className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Effects",
    items: [
      { title: "Disintegration Effect", href: "/docs/components/disintegration-effect", icon: <Sparkles className="h-4 w-4" />, isNew: true },
      { title: "Morphing Blob", href: "/docs/components/morphing-blob", icon: <Circle className="h-4 w-4" />, isNew: true },
      { title: "Smoke Divider", href: "/docs/components/smoke-divider", icon: <Wind className="h-4 w-4" />, isNew: true },
      { title: "Audio Reactive Wave", href: "/docs/components/audio-reactive-wave", icon: <Music className="h-4 w-4" />, isNew: true },
      { title: "Portal Transition", href: "/docs/components/portal-transition", icon: <CircleDot className="h-4 w-4" />, isNew: true },
      { title: "Icon Cloud", href: "/docs/components/icon-cloud", icon: <Cloud className="h-4 w-4" />, isNew: true },
      { title: "Glitch Transition", href: "/docs/components/glitch-transition", icon: <Zap className="h-4 w-4" />, isNew: true },
      { title: "Ambient Tilt", href: "/docs/components/ambient-tilt", icon: <Move3d className="h-4 w-4" />, isNew: true },
      { title: "Spotlight Border", href: "/docs/components/spotlight-border", icon: <Flashlight className="h-4 w-4" />, isNew: true },
      { title: "Image Compare", href: "/docs/components/image-compare", icon: <ImageIcon className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "Display",
    items: [
      { title: "Avatar", href: "/docs/components/avatar", icon: <Users className="h-4 w-4" />, isNew: true },
      { title: "Avatar Group", href: "/docs/components/avatar-group", icon: <Users className="h-4 w-4" />, isNew: true },
      { title: "Badge", href: "/docs/components/badge", icon: <Award className="h-4 w-4" />, isNew: true },
      { title: "Notification Badge", href: "/docs/components/notification-badge", icon: <Bell className="h-4 w-4" />, isNew: true },
      { title: "Kbd", href: "/docs/components/kbd", icon: <KeyRound className="h-4 w-4" />, isNew: true },
      { title: "Code Inline", href: "/docs/components/code-inline", icon: <Code2 className="h-4 w-4" />, isNew: true },
      { title: "Copy Block", href: "/docs/components/copy-block", icon: <Copy className="h-4 w-4" />, isNew: true },
      { title: "Divider", href: "/docs/components/divider", icon: <Scissors className="h-4 w-4" />, isNew: true },
      { title: "Skeleton", href: "/docs/components/skeleton", icon: <Square className="h-4 w-4" />, isNew: true },
      { title: "Empty State", href: "/docs/components/empty-state", icon: <AlertCircle className="h-4 w-4" />, isNew: true },
    ],
  },
  {
    heading: "WebGL",
    items: [
      { title: "Interactive Globe", href: "/docs/components/interactive-globe", icon: <Globe className="h-4 w-4" /> },
      { title: "Cosmic Eye", href: "/docs/components/cosmic-eye", icon: <EyeIcon className="h-4 w-4" />, isNew: true },
      { title: "Shader Blob", href: "/docs/components/shader-blob", icon: <Circle className="h-4 w-4" />, isNew: true },
      { title: "Evolution Hero", href: "/docs/components/evolution-hero", icon: <Sparkles className="h-4 w-4" />, isNew: true },
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
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border py-8 pr-6 lg:block">
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
                    {item.isNew && (
                      <span className="ml-auto shrink-0 rounded bg-violet-500/15 px-1.5 py-0.5 text-[9px] font-bold text-violet-400 ring-1 ring-violet-500/20">
                        New
                      </span>
                    )}
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
