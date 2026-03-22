"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/marketing/navbar";
import {
  Sparkles,
  Globe,
  Palette,
  Wand2,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Zap,
  Code2,
  Eye,
  Layers,
  Search,
  BookOpen,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateComponent, analyzeURL, checkAPI, type GenerateResult, type AnalyzeResult } from "@/lib/studio-api";
import { SyntaxHighlight } from "@/components/ui/syntax-highlight";
import { LiveCodePreview } from "@/components/studio/live-preview";
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { GlowButton } from "@/components/flexui/glow-button";
import { GradientText } from "@/components/flexui/gradient-text";
import { SpotlightCard } from "@/components/flexui/spotlight-card";
import { NeonGlowCard } from "@/components/flexui/neon-glow-card";
import { TypewriterText } from "@/components/flexui/typewriter-text";
import { NumberTicker } from "@/components/flexui/number-ticker";
import { RotatingText } from "@/components/flexui/rotating-text";
import { MorphingBlob } from "@/components/flexui/morphing-blob";
import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";
import { AmbientTilt } from "@/components/flexui/ambient-tilt";
import { GlitchTransition } from "@/components/flexui/glitch-transition";
import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";

// ── Tabs ────────────────────────────────────────────────────────────────────
type StudioTab = "generate" | "analyze" | "theme" | "customize";

const tabs: { id: StudioTab; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "generate", label: "Generate", icon: <Wand2 className="h-4 w-4" />, desc: "Describe a component, AI generates code" },
  { id: "analyze", label: "URL Analyzer", icon: <Globe className="h-4 w-4" />, desc: "Paste a URL, get matching FlexUI components" },
  { id: "theme", label: "Theme Studio", icon: <Palette className="h-4 w-4" />, desc: "Create a custom theme from presets" },
  { id: "customize", label: "Customize", icon: <Layers className="h-4 w-4" />, desc: "Pick a component and configure props visually" },
];

// ── Mock AI responses ───────────────────────────────────────────────────────
interface ComponentEntry {
  name: string;
  code: string;
  badge: string;
  badgeColor: string;
  docSlug: string;
  preview?: React.ReactNode;
  imports?: string[];
}

const componentMap: Record<string, ComponentEntry> = {
  button: {
    name: "ShimmerButton",
    badge: "Button",
    badgeColor: "bg-violet-500/15 text-violet-400",
    docSlug: "shimmer-button",
    preview: <ShimmerButton shimmerColor="rgba(139, 92, 246, 0.3)" className="px-8 py-3 text-white font-semibold">Get Started</ShimmerButton>,
    code: `import { ShimmerButton } from "@/components/flexui/shimmer-button";

export default function MyButton() {
  return (
    <ShimmerButton
      shimmerColor="rgba(139, 92, 246, 0.3)"
      className="px-8 py-3 text-white font-semibold"
    >
      Get Started
    </ShimmerButton>
  );
}`,
  },
  card: {
    name: "SpotlightCard",
    badge: "Card",
    badgeColor: "bg-cyan-500/15 text-cyan-400",
    docSlug: "spotlight-card",
    preview: <SpotlightCard className="max-w-xs p-6"><h3 className="text-lg font-bold text-white mb-1">Pro Plan</h3><p className="text-zinc-400 text-sm mb-3">Everything you need.</p><span className="text-2xl font-bold text-white">$49</span><span className="text-zinc-500">/mo</span></SpotlightCard>,
    code: `import { SpotlightCard } from "@/components/flexui/spotlight-card";

export default function MyCard() {
  return (
    <SpotlightCard className="max-w-sm p-8">
      <h3 className="text-xl font-bold text-white mb-2">Pro Plan</h3>
      <p className="text-zinc-400 mb-4">Everything you need.</p>
      <span className="text-3xl font-bold text-white">$49</span>
      <span className="text-zinc-500">/mo</span>
    </SpotlightCard>
  );
}`,
  },
  text: {
    name: "TextReveal",
    badge: "Text",
    badgeColor: "bg-amber-500/15 text-amber-400",
    docSlug: "text-reveal",
    code: `import { TextReveal } from "@/components/flexui/text-reveal";

export default function MyText() {
  return (
    <TextReveal
      text="Build beautiful interfaces"
      mode="word"
      className="text-4xl font-bold text-white"
    />
  );
}`,
  },
  hero: {
    name: "CinematicHero",
    badge: "Layout",
    badgeColor: "bg-emerald-500/15 text-emerald-400",
    docSlug: "cinematic-hero",
    code: `import { CinematicHero } from "@/components/flexui/cinematic-hero";

export default function MyHero() {
  return (
    <CinematicHero
      headline="Ship faster with FlexUI"
      subtitle="Premium animated components for modern web apps."
      background="particles"
      badge="New Release"
      primaryCta={{ label: "Get Started", href: "/docs" }}
      secondaryCta={{ label: "View Components", href: "/docs/components" }}
    />
  );
}`,
  },
  glow: {
    name: "NeonGlowCard",
    badge: "Card",
    badgeColor: "bg-cyan-500/15 text-cyan-400",
    docSlug: "neon-glow-card",
    preview: <NeonGlowCard color="#8B5CF6" intensity={1.2} pulse><div className="p-6"><h3 className="text-lg font-bold text-white">Neon Card</h3><p className="mt-1 text-sm text-zinc-400">Glowing border with cursor tracking.</p></div></NeonGlowCard>,
    code: `import { NeonGlowCard } from "@/components/flexui/neon-glow-card";

export default function MyGlowCard() {
  return (
    <NeonGlowCard color="#8B5CF6" intensity={1.2} pulse>
      <div className="p-8">
        <h3 className="text-xl font-bold text-white">Neon Card</h3>
        <p className="mt-2 text-zinc-400">Glowing border with cursor tracking.</p>
      </div>
    </NeonGlowCard>
  );
}`,
  },
  ripple: {
    name: "DisintegrationEffect",
    badge: "Effect",
    badgeColor: "bg-rose-500/15 text-rose-400",
    docSlug: "disintegration-effect",
    code: `import { DisintegrationEffect } from "@/components/flexui/disintegration-effect";
import { useState } from "react";

export default function MyEffect() {
  const [trigger, setTrigger] = useState(false);
  return (
    <div>
      <button onClick={() => setTrigger(true)}>Snap!</button>
      <DisintegrationEffect trigger={trigger} onComplete={() => setTrigger(false)}>
        <div className="p-8 bg-zinc-900 rounded-xl">
          <p className="text-white">This content will disintegrate!</p>
        </div>
      </DisintegrationEffect>
    </div>
  );
}`,
  },
  aurora: {
    name: "AuroraBackground",
    badge: "Background",
    badgeColor: "bg-indigo-500/15 text-indigo-400",
    docSlug: "aurora-background",
    code: `import { AuroraBackground } from "@/components/flexui/aurora-background";

export default function MyAurora() {
  return (
    <AuroraBackground
      colors={["#8B5CF6", "#06B6D4", "#EC4899"]}
      speed={0.5}
      blur={120}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center z-10">
        <h1 className="text-5xl font-bold text-white mb-4">Welcome</h1>
        <p className="text-lg text-zinc-300">Built with FlexUI Aurora</p>
      </div>
    </AuroraBackground>
  );
}`,
  },
  nav: {
    name: "FloatingNavbar",
    badge: "Layout",
    badgeColor: "bg-emerald-500/15 text-emerald-400",
    docSlug: "floating-navbar",
    code: `import { FloatingNavbar } from "@/components/flexui/floating-navbar";

export default function MyNavbar() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <FloatingNavbar
      links={links}
      logo={<span className="text-lg font-bold text-white">Acme</span>}
      blur
      className="border-b border-white/[0.06]"
    />
  );
}`,
  },
  tab: {
    name: "AnimatedTabs",
    badge: "Layout",
    badgeColor: "bg-emerald-500/15 text-emerald-400",
    docSlug: "animated-tabs",
    code: `import { AnimatedTabs } from "@/components/flexui/animated-tabs";
import { useState } from "react";

export default function MyTabs() {
  const [active, setActive] = useState("overview");
  const items = [
    { id: "overview", label: "Overview" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <AnimatedTabs
      items={items}
      activeId={active}
      onChange={setActive}
      variant="pill"
      className="mx-auto max-w-md"
    />
  );
}`,
  },
  toast: {
    name: "Toast",
    badge: "Layout",
    badgeColor: "bg-emerald-500/15 text-emerald-400",
    docSlug: "toast",
    code: `import { ToastProvider, useToast } from "@/components/flexui/toast";

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex gap-3">
      <button
        onClick={() => toast({ title: "Saved!", variant: "success" })}
        className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
      >
        Success
      </button>
      <button
        onClick={() => toast({ title: "Error", variant: "error" })}
        className="px-4 py-2 bg-red-600 text-white rounded-lg"
      >
        Error
      </button>
    </div>
  );
}

export default function MyToast() {
  return (
    <ToastProvider position="bottom-right">
      <ToastDemo />
    </ToastProvider>
  );
}`,
  },
  terminal: {
    name: "TypewriterTerminal",
    badge: "Effect",
    badgeColor: "bg-rose-500/15 text-rose-400",
    docSlug: "typewriter-terminal",
    code: `import { TypewriterTerminal } from "@/components/flexui/typewriter-terminal";

export default function MyTerminal() {
  const commands = [
    { prompt: "~", command: "npx create-next-app@latest my-app", output: "Creating a new Next.js app..." },
    { prompt: "~/my-app", command: "npm install flexui", output: "added 42 packages in 3.2s" },
    { prompt: "~/my-app", command: "npm run dev", output: "Ready on http://localhost:3000" },
  ];

  return (
    <TypewriterTerminal
      commands={commands}
      typingSpeed={50}
      className="max-w-2xl rounded-xl border border-white/[0.06]"
    />
  );
}`,
  },
  orbit: {
    name: "DataOrbit",
    badge: "Effect",
    badgeColor: "bg-rose-500/15 text-rose-400",
    docSlug: "data-orbit",
    code: `import { DataOrbit } from "@/components/flexui/data-orbit";

export default function MyOrbit() {
  const icons = [
    { icon: "react", label: "React" },
    { icon: "nextjs", label: "Next.js" },
    { icon: "typescript", label: "TypeScript" },
    { icon: "tailwind", label: "Tailwind" },
    { icon: "framer", label: "Framer Motion" },
    { icon: "vercel", label: "Vercel" },
  ];

  return (
    <DataOrbit
      items={icons}
      radius={160}
      speed={30}
      centerContent={<span className="text-2xl font-bold text-white">Stack</span>}
      className="h-[400px]"
    />
  );
}`,
  },
  blob: {
    name: "MorphingBlob",
    badge: "Background",
    badgeColor: "bg-indigo-500/15 text-indigo-400",
    docSlug: "morphing-blob",
    code: `import { MorphingBlob } from "@/components/flexui/morphing-blob";

export default function MyBlob() {
  return (
    <div className="relative h-[400px] flex items-center justify-center">
      <MorphingBlob
        colors={["#8B5CF6", "#EC4899", "#06B6D4"]}
        size={300}
        speed={4}
        blur={60}
        className="absolute inset-0"
      />
      <h2 className="relative z-10 text-4xl font-bold text-white">
        Organic Motion
      </h2>
    </div>
  );
}`,
  },
  glitch: {
    name: "GlitchTransition",
    badge: "Effect",
    badgeColor: "bg-rose-500/15 text-rose-400",
    docSlug: "glitch-transition",
    code: `import { GlitchTransition } from "@/components/flexui/glitch-transition";
import { useState } from "react";

export default function MyGlitch() {
  const [active, setActive] = useState(false);
  return (
    <div>
      <button
        onClick={() => setActive(!active)}
        className="mb-4 px-4 py-2 bg-cyan-600 text-white rounded-lg"
      >
        Toggle Glitch
      </button>
      <GlitchTransition active={active} intensity={0.8} slices={10}>
        <div className="p-8 bg-zinc-900 rounded-xl">
          <h3 className="text-xl font-bold text-white">Cyberpunk UI</h3>
          <p className="mt-2 text-zinc-400">Glitch effect on transition.</p>
        </div>
      </GlitchTransition>
    </div>
  );
}`,
  },
  annotation: {
    name: "HandwrittenAnnotation",
    badge: "Text",
    badgeColor: "bg-amber-500/15 text-amber-400",
    docSlug: "handwritten-annotation",
    code: `import { HandwrittenAnnotation } from "@/components/flexui/handwritten-annotation";

export default function MyAnnotation() {
  return (
    <div className="space-y-6">
      <HandwrittenAnnotation type="underline" color="#8B5CF6" strokeWidth={2} animate>
        <h2 className="text-3xl font-bold text-white">Important Headline</h2>
      </HandwrittenAnnotation>
      <HandwrittenAnnotation type="circle" color="#22D3EE" strokeWidth={2} animate>
        <span className="text-lg font-semibold text-cyan-400">$49/mo</span>
      </HandwrittenAnnotation>
    </div>
  );
}`,
  },
};

const defaultCode = componentMap.button;

// Alias map for flexible keyword matching
const aliasMap: Record<string, string> = {
  background: "aurora",
  navbar: "nav",
  tabs: "tab",
  notification: "toast",
  command: "terminal",
  icon: "orbit",
  morph: "blob",
  cyber: "glitch",
  highlight: "annotation",
};

function _badgeColor(badge: string): string {
  const colors: Record<string, string> = {
    Button: "bg-violet-500/15 text-violet-400",
    Card: "bg-cyan-500/15 text-cyan-400",
    Text: "bg-amber-500/15 text-amber-400",
    Background: "bg-emerald-500/15 text-emerald-400",
    Effect: "bg-rose-500/15 text-rose-400",
    Layout: "bg-blue-500/15 text-blue-400",
  };
  return colors[badge] || "bg-zinc-500/15 text-zinc-400";
}

function getResponse(prompt: string): ComponentEntry {
  const lower = prompt.toLowerCase();
  for (const [key, val] of Object.entries(componentMap)) {
    if (lower.includes(key)) return val;
  }
  for (const [alias, key] of Object.entries(aliasMap)) {
    if (lower.includes(alias)) return componentMap[key];
  }
  if (lower.includes("shimmer") || lower.includes("animate")) return componentMap.button;
  if (lower.includes("spotlight") || lower.includes("pricing")) return componentMap.card;
  if (lower.includes("reveal") || lower.includes("heading") || lower.includes("headline")) return componentMap.text;
  if (lower.includes("landing") || lower.includes("hero") || lower.includes("page")) return componentMap.hero;
  if (lower.includes("neon") || lower.includes("purple card")) return componentMap.glow;
  if (lower.includes("thanos") || lower.includes("dissolve") || lower.includes("snap")) return componentMap.ripple;
  if (lower.includes("typing") || lower.includes("typewriter")) return componentMap.terminal;
  if (lower.includes("spinning") || lower.includes("rotating icons")) return componentMap.orbit;
  if (lower.includes("organic") || lower.includes("liquid")) return componentMap.blob;
  if (lower.includes("synthwave") || lower.includes("retro")) return componentMap.aurora;
  if (lower.includes("wormhole") || lower.includes("portal")) return componentMap.glitch;
  if (lower.includes("particle") || lower.includes("field")) return componentMap.aurora;
  return defaultCode;
}

// ── Generate tab categories ─────────────────────────────────────────────────
type GenerateCategory = "All" | "Buttons" | "Cards" | "Text" | "Backgrounds" | "Effects" | "Layout";

const generateCategories: GenerateCategory[] = ["All", "Buttons", "Cards", "Text", "Backgrounds", "Effects", "Layout"];

const categorySuggestions: Record<GenerateCategory, string[]> = {
  All: [
    "A shimmer button with purple glow",
    "Spotlight card for pricing",
    "Text reveal for headline",
    "Aurora background for hero",
    "Thanos snap dissolve effect",
    "Floating navbar with blur",
    "Glitch transition on hover",
    "Handwritten annotation underline",
  ],
  Buttons: [
    "Shimmer button with gradient",
    "Glow button with cyan pulse",
    "Confetti button for celebration",
    "Purple shimmer CTA button",
    "Animated glow button with arrow",
    "Magnetic button with hover pull",
    "Liquid ripple button effect",
    "Neon outline button style",
  ],
  Cards: [
    "Spotlight card for pricing",
    "Neon glow card with purple",
    "Holographic card effect",
    "Feature card with cursor tracking",
    "Expandable card with details",
    "Glass morphism pricing card",
    "Tilt card with 3D depth",
    "Gradient border card",
  ],
  Text: [
    "Text reveal for headline",
    "Gradient text with animation",
    "Chromatic RGB split text",
    "Typewriter text effect",
    "Handwritten annotation underline",
    "Flip words rotating headline",
    "Highlighted annotation text",
    "Animated counter numbers",
  ],
  Backgrounds: [
    "Aurora background for hero",
    "Retro grid synthwave",
    "Particle field background",
    "Morphing blob background",
    "Starfield ambient particles",
    "Gradient mesh background",
    "Aurora with purple and cyan",
    "Neon grid perspective effect",
  ],
  Effects: [
    "Thanos snap dissolve",
    "Glitch transition on hover",
    "Portal wormhole reveal",
    "Data orbit spinning icons",
    "Terminal typing commands",
    "Disintegration snap effect",
    "Cyberpunk glitch distortion",
    "Wormhole portal animation",
  ],
  Layout: [
    "Floating navbar",
    "Animated tabs with pill style",
    "Terminal with typing commands",
    "Toast notification system",
    "Dock menu with magnify",
    "Sticky nav with glassmorphic blur",
    "Tab bar with sliding indicator",
    "Notification toast provider",
  ],
};

function extractImports(code: string): string[] {
  const matches = code.match(/import\s+\{([^}]+)\}\s+from\s+"([^"]+)"/g);
  if (!matches) return [];
  return matches.map((m) => {
    const nameMatch = m.match(/import\s+\{([^}]+)\}/);
    const pathMatch = m.match(/from\s+"([^"]+)"/);
    if (nameMatch && pathMatch) return `${nameMatch[1].trim()} from ${pathMatch[1]}`;
    return m;
  });
}

// ── URL Analysis mock ───────────────────────────────────────────────────────
interface AnalysisResult {
  colors: { name: string; hex: string }[];
  fonts: string[];
  components: string[];
  suggestions: string[];
}

function mockAnalyze(): AnalysisResult {
  return {
    colors: [
      { name: "Primary", hex: "#6366F1" },
      { name: "Accent", hex: "#22D3EE" },
      { name: "Background", hex: "#0F0F1A" },
      { name: "Text", hex: "#E4E4E7" },
    ],
    fonts: ["Inter", "JetBrains Mono"],
    components: [
      "FloatingNavbar — sticky nav with glassmorphic blur",
      "GradientText — gradient headline text",
      "SpotlightCard — feature cards with cursor glow",
      "AnimatedTabs — navigation with sliding indicator",
      "ShimmerButton — CTA with sweep animation",
      "ParticleField — ambient background particles",
    ],
    suggestions: [
      "Replace static hero with CinematicHero (background='particles')",
      "Add GlitchTransition on page navigation for cyberpunk feel",
      "Use NeonGlowCard for pricing cards instead of plain borders",
      "Add ScrollProgress bar at the top for reading progress",
      "Wrap testimonials in AmbientTilt for subtle 3D depth",
    ],
  };
}

// ── Theme presets ───────────────────────────────────────────────────────────
const themePresets = [
  { name: "Midnight", primary: "#8B5CF6", accent: "#389CFD", bg: "#0B0B18" },
  { name: "Neon", primary: "#22D3EE", accent: "#EC4899", bg: "#050505" },
  { name: "Frost", primary: "#38BDF8", accent: "#E2E8F0", bg: "#0C1222" },
  { name: "Ember", primary: "#F97316", accent: "#EF4444", bg: "#0A0503" },
  { name: "Forest", primary: "#22C55E", accent: "#4ADE80", bg: "#030F05" },
  { name: "Royal", primary: "#A855F7", accent: "#FBBF24", bg: "#0D0520" },
  { name: "Ocean", primary: "#0EA5E9", accent: "#6366F1", bg: "#020617" },
  { name: "Sunset", primary: "#FB923C", accent: "#F43F5E", bg: "#0C0400" },
  { name: "Monochrome", primary: "#A1A1AA", accent: "#E4E4E7", bg: "#09090B" },
  { name: "Candy", primary: "#EC4899", accent: "#A855F7", bg: "#0D0208" },
];

// ── Component list for customizer ───────────────────────────────────────────
const componentList = [
  "ShimmerButton", "GlowButton", "MagneticButton", "ConfettiButton", "LiquidButton",
  "SpotlightCard", "HolographicCard", "NeonGlowCard", "ExpandableCard",
  "TextReveal", "TypewriterText", "GradientText", "FlipWords", "ChromaticText",
  "AuroraBackground", "ParticleField", "StarsBackground", "RetroGrid",
  "FloatingNavbar", "AnimatedTabs", "DockMenu", "Toast",
  "DisintegrationEffect", "GlitchTransition", "PortalTransition",
];

// ── Main Component ──────────────────────────────────────────────────────────
export function AIStudio() {
  const [activeTab, setActiveTab] = useState<StudioTab>("generate");

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-1.5 text-xs font-semibold text-violet-400">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Component{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Studio
            </span>
          </h1>
          <p className="mt-3 text-zinc-500">
            Generate, analyze, theme, and customize FlexUI components with AI.
          </p>
        </div>

        {/* Tab bar */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all",
                activeTab === tab.id
                  ? "bg-white/[0.08] text-white ring-1 ring-white/[0.1]"
                  : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "generate" && <GenerateTab />}
            {activeTab === "analyze" && <AnalyzeTab />}
            {activeTab === "theme" && <ThemeTab />}
            {activeTab === "customize" && <CustomizeTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Tab 1: Generate ─────────────────────────────────────────────────────────
function GenerateTab() {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<ComponentEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const [category, setCategory] = useState<GenerateCategory>("All");

  const [apiError, setApiError] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setResult(null);
    setApiError(null);

    // Real API call — no mock fallback
    generateComponent(prompt, category !== "All" ? category : undefined)
      .then((res) => {
        setResult({
          name: res.name,
          code: res.code,
          badge: res.badge,
          badgeColor: res.badge_color || _badgeColor(res.badge),
          docSlug: res.doc_slug,
          imports: res.imports || [],
        });
      })
      .catch((err) => {
        setApiError(err.message || "Failed to generate. Is the backend running?");
      })
      .finally(() => setGenerating(false));
  }, [prompt, generating]);

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const suggestions = categorySuggestions[category];

  const usedImports = useMemo(() => {
    if (!result) return [];
    // Use imports from API response if available, otherwise extract from code
    if (result.imports && result.imports.length > 0) return result.imports;
    return extractImports(result.code);
  }, [result]);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Left — Input */}
      <div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Describe your component
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A purple shimmer button with an arrow icon for my SaaS landing page..."
            rows={4}
            className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/30"
            onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
          />

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || generating}
            className={cn(
              "mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all",
              prompt.trim() && !generating
                ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white shadow-[0_0_20px_-6px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_-6px_rgba(139,92,246,0.5)]"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            )}
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
                </span>
                Generating...
              </span>
            ) : (
              <><Sparkles className="h-4 w-4" /> Generate Component</>
            )}
          </button>
        </div>

        {/* Category filter */}
        <div className="mt-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">Category</p>
          <div className="flex flex-wrap gap-1.5">
            {generateCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
                  category === cat
                    ? "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/20"
                    : "bg-white/[0.03] text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">Try these</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:bg-white/[0.05] hover:text-zinc-300"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Output */}
      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        {!generating && !result && !apiError && (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
              <Code2 className="h-6 w-6 text-zinc-700" />
            </div>
            <p className="text-sm text-zinc-600">Generated code will appear here</p>
            <p className="mt-1 text-xs text-zinc-700">Cmd+Enter to generate</p>
          </div>
        )}

        {generating && (
          <div className="min-h-[300px] space-y-4 p-4">
            {/* Skeleton header */}
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-md bg-violet-500/20 animate-pulse" />
              <div className="h-4 w-32 rounded-md bg-white/[0.06] animate-pulse" />
              <div className="h-4 w-16 rounded-full bg-white/[0.04] animate-pulse" />
            </div>
            {/* Skeleton tabs */}
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-md bg-white/[0.06] animate-pulse" />
              <div className="h-8 w-16 rounded-md bg-white/[0.04] animate-pulse" />
            </div>
            {/* Skeleton preview area */}
            <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-8">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-white/[0.04] animate-pulse" />
                <div className="h-4 w-40 rounded-md bg-white/[0.06] animate-pulse" />
                <div className="h-3 w-56 rounded-md bg-white/[0.04] animate-pulse" />
                <div className="mt-2 flex gap-2">
                  <div className="h-8 w-24 rounded-lg bg-violet-500/10 animate-pulse" />
                  <div className="h-8 w-20 rounded-lg bg-white/[0.04] animate-pulse" />
                </div>
              </div>
            </div>
            {/* Loading text */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-400 [animation-delay:300ms]" />
              </div>
              <p className="text-xs text-zinc-500">AI is generating your component...</p>
            </div>
          </div>
        )}

        {apiError && !generating && (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
              <span className="text-xl">⚠</span>
            </div>
            <p className="text-sm font-medium text-red-400">Generation Failed</p>
            <p className="mt-2 max-w-xs text-xs text-zinc-500">{apiError}</p>
            <button
              onClick={() => setApiError(null)}
              className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {result && !generating && (
          <GenerateOutput result={result} copied={copied} onCopy={handleCopy} usedImports={usedImports} />
        )}
      </div>
    </div>
  );
}

// ── Live preview map — renders actual components by name ─────────────────────
const previewMap: Record<string, React.ReactNode> = {
  ShimmerButton: <ShimmerButton className="px-8 py-3 text-white font-semibold">Get Started</ShimmerButton>,
  GlowButton: <GlowButton className="px-8 py-3 font-semibold">Get Started</GlowButton>,
  MagneticButton: <ShimmerButton className="px-8 py-3 text-white font-semibold">Hover Me</ShimmerButton>,
  SpotlightCard: <SpotlightCard className="max-w-xs p-6"><h3 className="text-lg font-bold text-white mb-1">Pro Plan</h3><p className="text-zinc-400 text-sm mb-3">Everything you need.</p><span className="text-2xl font-bold text-white">$49</span><span className="text-zinc-500">/mo</span></SpotlightCard>,
  NeonGlowCard: <NeonGlowCard color="#8B5CF6" intensity={1.2} pulse><div className="p-6"><h3 className="text-lg font-bold text-white">Neon Card</h3><p className="mt-1 text-sm text-zinc-400">Glowing border effect.</p></div></NeonGlowCard>,
  GradientText: <GradientText className="text-4xl font-bold" animate>Beautiful Typography</GradientText>,
  TextReveal: <span className="text-2xl font-bold text-white">Build Something Amazing ✨</span>,
  TypewriterText: <TypewriterText words={["Fast", "Beautiful", "Cinematic", "Powerful"]} typingSpeed={60} className="text-2xl font-medium text-white" />,
  FlipWords: <span className="text-2xl font-bold text-white">We build <span className="text-violet-400">amazing</span> things</span>,
  NumberTicker: <div className="flex items-center gap-2"><NumberTicker value={10000} className="text-4xl font-bold text-white" /><span className="text-lg text-zinc-400">+ users</span></div>,
  RotatingText: <span className="text-2xl font-bold text-white">Build <RotatingText words={["Cinematic", "Beautiful", "Stunning"]} duration={2000} className="text-violet-400" /> UI</span>,
  ChromaticText: <span className="text-3xl font-bold text-white">Chromatic Effect</span>,
  MorphingBlob: <MorphingBlob size={150} color="#8B5CF6" accentColor="#389CFD" speed={4} />,
  HandwrittenAnnotation: <HandwrittenAnnotation type="circle" color="#EF4444"><span className="text-xl font-bold text-white px-4 py-2">Important!</span></HandwrittenAnnotation>,
  ConfettiButton: <ShimmerButton className="px-8 py-3 text-white font-semibold">Celebrate! 🎉</ShimmerButton>,
  LiquidButton: <GlowButton glowColor="rgba(139,92,246,0.5)" className="px-8 py-3 font-semibold">Liquid Effect</GlowButton>,
  HolographicCard: <SpotlightCard className="max-w-xs p-6"><h3 className="text-lg font-bold text-white">Holographic</h3><p className="text-sm text-zinc-400">Rainbow foil effect</p></SpotlightCard>,
  PricingCard: <NeonGlowCard color="#389CFD" intensity={1}><div className="p-6"><h3 className="text-lg font-bold text-white">Pro</h3><p className="text-3xl font-bold text-white mt-2">$49<span className="text-sm text-zinc-500">/mo</span></p></div></NeonGlowCard>,
  DisintegrationEffect: <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-6 text-center"><p className="text-lg font-bold text-white mb-2">Thanos Snap Effect</p><p className="text-sm text-zinc-400">Click to dissolve into particles</p><div className="mt-3 flex justify-center gap-1">{[0,1,2,3,4].map(i=><span key={i} className="inline-block h-2 w-2 rounded-full bg-rose-400 animate-ping" style={{animationDelay:`${i*100}ms`,animationDuration:"1.5s"}}/>)}</div></div>,
  GlitchTransition: <GlitchTransition trigger="always" intensity={0.3}><div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center"><p className="text-lg font-bold text-white">Glitch Effect</p><p className="text-sm text-zinc-400 mt-1">RGB split + scanlines</p></div></GlitchTransition>,
  AmbientTilt: <AmbientTilt maxAngle={12}><div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 text-center"><p className="text-lg font-bold text-white">3D Tilt</p><p className="text-sm text-zinc-400 mt-1">Move cursor to tilt</p></div></AmbientTilt>,
  PortalTransition: <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center"><p className="text-lg font-bold text-white">Portal Reveal</p><p className="text-sm text-zinc-400 mt-1">Wormhole circle transition</p><div className="mt-3 mx-auto h-12 w-12 rounded-full border-2 border-blue-400 animate-ping opacity-30"/></div>,
  ShaderBlob: <MorphingBlob size={120} color="#8B5CF6" accentColor="#EC4899" speed={3} />,
  FloatingNavbar: <div className="w-full max-w-sm mx-auto rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-xl px-6 py-2.5 flex items-center justify-between"><span className="text-sm font-bold text-white">FlexUI</span><div className="flex gap-4 text-xs text-zinc-400"><span>Docs</span><span>Components</span></div></div>,
  AnimatedTabs: <div className="w-full max-w-xs mx-auto"><div className="flex rounded-lg bg-white/[0.04] p-1 gap-1">{["Preview","Code","API"].map((t,i)=><div key={t} className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-center ${i===0?"bg-white/[0.08] text-white":"text-zinc-500"}`}>{t}</div>)}</div></div>,
  Toast: <div className="w-full max-w-xs mx-auto rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-start gap-3"><div className="mt-0.5 h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs">✓</div><div><p className="text-sm font-medium text-white">Success!</p><p className="text-xs text-zinc-400 mt-0.5">Component generated.</p></div></div>,
  TypewriterTerminal: <div className="w-full max-w-sm mx-auto rounded-xl border border-white/[0.06] bg-zinc-950 overflow-hidden"><div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.02]"><div className="h-2.5 w-2.5 rounded-full bg-red-500/60"/><div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60"/><div className="h-2.5 w-2.5 rounded-full bg-green-500/60"/></div><div className="px-4 py-3 font-mono text-xs text-green-400"><span className="text-zinc-500">$</span> npx flexui init<span className="animate-pulse">▊</span></div></div>,
  DataOrbit: <div className="relative h-32 w-32 mx-auto"><div className="absolute inset-0 rounded-full border border-violet-500/20 animate-spin" style={{animationDuration:"8s"}}/><div className="absolute inset-3 rounded-full border border-cyan-500/20 animate-spin" style={{animationDuration:"6s",animationDirection:"reverse"}}/><div className="absolute inset-0 flex items-center justify-center"><div className="h-8 w-8 rounded-full bg-violet-500/20 border border-violet-500/30"/></div></div>,
  ExpandableCard: <div className="max-w-xs mx-auto rounded-xl border border-white/[0.08] bg-zinc-950/80 p-5"><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-white">Meeting Details</h3><span className="text-xs text-violet-400">▼ Click to expand</span></div><p className="mt-2 text-xs text-zinc-500">1:30 PM — Design Sync</p></div>,
  SparklineChart: <div className="max-w-xs mx-auto p-4"><p className="text-xs text-zinc-500 mb-2">Revenue</p><div className="flex items-end gap-0.5 h-12">{[30,45,35,60,50,70,65,80,75,90].map((h,i)=><div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-cyan-400" style={{height:`${h}%`}}/>)}</div><p className="mt-2 text-lg font-bold text-white">$12,847</p></div>,
  KPICard: <NeonGlowCard color="#389CFD" intensity={0.8}><div className="p-5"><p className="text-xs text-zinc-500">Revenue</p><p className="text-2xl font-bold text-white mt-1">$12,847</p><div className="mt-2 flex items-center gap-1 text-xs text-emerald-400"><span>↑ 12.5%</span></div></div></NeonGlowCard>,
  ExpandableTrigger: <div className="max-w-xs mx-auto rounded-xl border border-white/[0.08] bg-zinc-950/80 p-5"><h3 className="text-sm font-bold text-white">Click to expand</h3></div>,
  Marquee: <div className="overflow-hidden"><div className="flex gap-4 animate-marquee"><span className="whitespace-nowrap text-sm text-zinc-400">FlexUI • Cinematic Components • 90+ Ready</span><span className="whitespace-nowrap text-sm text-zinc-400">FlexUI • Cinematic Components • 90+ Ready</span></div></div>,
  DockMenu: <div className="flex items-end justify-center gap-2 py-3 px-4 rounded-2xl bg-zinc-900/80 border border-white/[0.06] mx-auto w-fit">{["🏠","🔍","📧","📅","⚙️","🎵"].map((e,i)=><div key={i} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-lg hover:scale-125 transition-transform cursor-pointer">{e}</div>)}</div>,
  SearchSpotlight: <div className="max-w-sm mx-auto rounded-xl border border-white/[0.08] bg-zinc-950/90 p-4 backdrop-blur-xl"><div className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]"><span className="text-zinc-600 text-xs">🔍</span><span className="text-xs text-zinc-500">Search components...</span><span className="text-[10px] text-zinc-700 ml-auto">⌘K</span></div></div>,
  Drawer: <div className="max-w-xs mx-auto rounded-t-2xl border border-white/[0.08] bg-zinc-950/90 p-5"><div className="mx-auto mb-3 h-1 w-8 rounded-full bg-zinc-700"/><h3 className="text-sm font-bold text-white">Drawer Content</h3><p className="mt-1 text-xs text-zinc-500">Slides up from bottom</p></div>,
  AuroraBackground: <div className="w-full h-40 rounded-xl overflow-hidden relative bg-[#060612]"><div className="absolute inset-0 opacity-40" style={{background:"linear-gradient(120deg, transparent 30%, rgba(139,92,246,0.3) 50%, transparent 70%)"}}><div className="absolute inset-0" style={{background:"linear-gradient(200deg, transparent 40%, rgba(56,189,248,0.2) 55%, transparent 70%)",animation:"aurora-shift 8s ease-in-out infinite alternate"}}/></div><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Aurora Background</p></div></div>,
  ParticleField: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute inset-0">{[...Array(20)].map((_,i)=><div key={i} className="absolute rounded-full bg-violet-400 animate-pulse" style={{left:`${(i*17+5)%100}%`,top:`${(i*23+10)%100}%`,width:`${2+i%3}px`,height:`${2+i%3}px`,opacity:0.3+((i%5)*0.1),animationDelay:`${i*200}ms`}}/>)}</div><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Particle Field</p></div></div>,
  StarsBackground: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute inset-0">{[...Array(30)].map((_,i)=><div key={i} className="absolute rounded-full bg-white animate-pulse" style={{left:`${(i*13+7)%100}%`,top:`${(i*19+3)%100}%`,width:`${1+i%2}px`,height:`${1+i%2}px`,opacity:0.2+((i%4)*0.15),animationDelay:`${i*150}ms`,animationDuration:`${1.5+i%3}s`}}/>)}</div><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Stars Background ✨</p></div></div>,
  RetroGrid: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute inset-0" style={{perspective:"200px"}}><div className="absolute inset-0 origin-bottom" style={{transform:"rotateX(60deg)",backgroundImage:"repeating-linear-gradient(rgba(139,92,246,0.15) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(139,92,246,0.15) 0px, transparent 1px, transparent 40px)",backgroundSize:"40px 40px"}}/></div><div className="relative z-10 flex items-end justify-center h-full pb-4"><p className="text-sm font-bold text-violet-300">Retro Grid</p></div></div>,
  NeuralNetwork: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><svg className="absolute inset-0 w-full h-full"><line x1="20%" y1="30%" x2="50%" y2="60%" stroke="rgba(139,92,246,0.2)" strokeWidth="1"/><line x1="50%" y1="60%" x2="80%" y2="25%" stroke="rgba(56,189,248,0.2)" strokeWidth="1"/><line x1="30%" y1="70%" x2="70%" y2="40%" stroke="rgba(139,92,246,0.15)" strokeWidth="1"/><line x1="15%" y1="50%" x2="45%" y2="20%" stroke="rgba(56,189,248,0.15)" strokeWidth="1"/>{[{x:"20%",y:"30%"},{x:"50%",y:"60%"},{x:"80%",y:"25%"},{x:"30%",y:"70%"},{x:"70%",y:"40%"},{x:"15%",y:"50%"},{x:"45%",y:"20%"},{x:"85%",y:"65%"}].map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill={i%2===0?"rgba(139,92,246,0.6)":"rgba(56,189,248,0.6)"} className="animate-pulse" style={{animationDelay:`${i*300}ms`}}/>)}</svg><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Neural Network</p></div></div>,
  FlickeringGrid: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute inset-0 grid grid-cols-12 grid-rows-6 gap-[2px] p-2">{[...Array(72)].map((_,i)=><div key={i} className="rounded-sm animate-pulse" style={{backgroundColor:`rgba(139,92,246,${0.05+((i*7)%10)*0.03})`,animationDelay:`${(i*137)%3000}ms`,animationDuration:`${1+(i%4)*0.5}s`}}/>)}</div><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Flickering Grid</p></div></div>,
  GridPattern: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",backgroundSize:"30px 30px"}}/><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Grid Pattern</p></div></div>,
  DotPattern: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute inset-0 opacity-[0.15]" style={{backgroundImage:"radial-gradient(circle, rgba(139,92,246,0.8) 1px, transparent 1px)",backgroundSize:"20px 20px"}}/><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Dot Pattern</p></div></div>,
  BeamsBackground: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden">{[30,60,100,140].map((deg,i)=><div key={i} className="absolute inset-0" style={{background:`linear-gradient(${deg}deg, transparent 45%, rgba(56,189,248,0.04) 50%, transparent 55%)`,animation:`beam-sweep ${8+i*2}s linear infinite`,animationDelay:`${i*1.5}s`}}/>)}<div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Beams Background</p></div></div>,
  MeshGradient: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><div className="absolute left-[20%] top-[20%] h-24 w-24 rounded-full bg-violet-500/20 blur-[40px]"/><div className="absolute right-[20%] bottom-[20%] h-20 w-20 rounded-full bg-cyan-500/15 blur-[40px]"/><div className="absolute left-[50%] top-[50%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[30px]"/><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Mesh Gradient</p></div></div>,
  WavyBackground: <div className="w-full h-40 rounded-xl relative bg-[#060612] overflow-hidden"><svg className="absolute bottom-0 w-full h-24 opacity-20" viewBox="0 0 400 100" preserveAspectRatio="none"><path d="M0,50 C100,80 200,20 300,50 C350,65 400,40 400,50 L400,100 L0,100 Z" fill="rgba(139,92,246,0.3)"/><path d="M0,60 C80,40 160,80 240,50 C320,30 400,60 400,60 L400,100 L0,100 Z" fill="rgba(56,189,248,0.2)"/></svg><div className="relative z-10 flex items-center justify-center h-full"><p className="text-sm font-bold text-white">Wavy Background</p></div></div>,
};

// ── Extract props from AI code to build dynamic previews ─────────────────────
function extractPropValue(code: string, comp: string, prop: string): string | undefined {
  // Match: <Component prop="value" or prop={value} or prop='value'
  const patterns = [
    new RegExp(`<${comp}[^>]*?${prop}=["']([^"']+)["']`, "s"),
    new RegExp(`<${comp}[^>]*?${prop}=\\{["']([^"']+)["']\\}`, "s"),
    new RegExp(`<${comp}[^>]*?${prop}=\\{([^}]+)\\}`, "s"),
  ];
  for (const p of patterns) {
    const m = code.match(p);
    if (m) return m[1];
  }
  return undefined;
}

function extractWords(code: string, comp: string): string[] {
  const m = code.match(new RegExp(`<${comp}[^>]*?words=\\{\\[([^\\]]+)\\]\\}`, "s"));
  if (m) {
    return m[1].replace(/['"]/g, "").split(",").map(s => s.trim()).filter(Boolean);
  }
  return [];
}

function extractChildren(code: string, comp: string): string {
  // Try children="text" prop first
  const m = code.match(new RegExp(`<${comp}[^]*?children=["']([^"']+)["']`, "s"));
  if (m) return m[1];

  // Try children={'text'} prop
  const m1b = code.match(new RegExp(`<${comp}[^]*?children=\\{["']([^"']+)["']\\}`, "s"));
  if (m1b) return m1b[1];

  // Try text between closing > and </Component>
  // Find the closing tag first, then work backwards to find the content
  const closeTag = `</${comp}>`;
  const closeIdx = code.indexOf(closeTag);
  if (closeIdx === -1) return "";

  // Find the last > before the close tag (this is where the opening tag ends)
  const beforeClose = code.substring(0, closeIdx);
  const lastGt = beforeClose.lastIndexOf(">");
  if (lastGt === -1) return "";

  const content = beforeClose.substring(lastGt + 1).trim();
  // Clean up — remove any nested JSX tags, keep only text
  const textOnly = content.replace(/<[^>]*>/g, "").trim();
  if (textOnly && textOnly.length < 100) return textOnly;

  return "";
}

function getPreviewForResult(result: ComponentEntry): React.ReactNode {
  if (result.preview) return result.preview;

  const code = result.code;
  const imports = result.imports || [];
  const seen = new Set<string>();
  const matched: { name: string; node: React.ReactNode }[] = [];

  // Build DYNAMIC previews from the actual AI code
  for (const imp of imports) {
    if (seen.has(imp)) continue;
    seen.add(imp);

    switch (imp) {
      case "ShimmerButton": {
        const label = extractChildren(code, "ShimmerButton") || extractPropValue(code, "ShimmerButton", "children") || "Get Started";
        matched.push({ name: imp, node: <ShimmerButton className="px-8 py-3 text-white font-semibold">{label}</ShimmerButton> });
        break;
      }
      case "GlowButton": {
        const label = extractChildren(code, "GlowButton") || "Click Me";
        const color = extractPropValue(code, "GlowButton", "glowColor");
        matched.push({ name: imp, node: <GlowButton glowColor={color} className="px-8 py-3 font-semibold">{label}</GlowButton> });
        break;
      }
      case "TypewriterText": {
        const words = extractWords(code, "TypewriterText");
        matched.push({ name: imp, node: <TypewriterText words={words.length > 0 ? words : ["Hello", "World"]} typingSpeed={60} className="text-2xl font-medium text-white" /> });
        break;
      }
      case "GradientText": {
        const text = extractChildren(code, "GradientText") || "Gradient Text";
        matched.push({ name: imp, node: <GradientText className="text-3xl font-bold" animate>{text}</GradientText> });
        break;
      }
      case "NumberTicker": {
        const val = parseInt(extractPropValue(code, "NumberTicker", "value") || "1000");
        const prefix = extractPropValue(code, "NumberTicker", "prefix") || "";
        const suffix = extractPropValue(code, "NumberTicker", "suffix") || "";
        matched.push({ name: imp, node: <div className="flex items-center gap-1"><span className="text-lg text-zinc-400">{prefix}</span><NumberTicker value={isNaN(val) ? 1000 : val} className="text-4xl font-bold text-white" /><span className="text-lg text-zinc-400">{suffix}</span></div> });
        break;
      }
      case "RotatingText": {
        const words = extractWords(code, "RotatingText");
        matched.push({ name: imp, node: <span className="text-2xl font-bold text-white">Build <RotatingText words={words.length > 0 ? words : ["Cinematic", "Beautiful"]} duration={2000} className="text-violet-400" /> UI</span> });
        break;
      }
      case "SpotlightCard": {
        matched.push({ name: imp, node: previewMap.SpotlightCard });
        break;
      }
      case "NeonGlowCard": {
        const color = extractPropValue(code, "NeonGlowCard", "color") || "#8B5CF6";
        matched.push({ name: imp, node: <NeonGlowCard color={color} intensity={1.2} pulse><div className="p-6"><h3 className="text-lg font-bold text-white">Neon Card</h3><p className="mt-1 text-sm text-zinc-400">Glowing border effect</p></div></NeonGlowCard> });
        break;
      }
      case "GlitchTransition": {
        matched.push({ name: imp, node: <GlitchTransition trigger="always" intensity={0.3}><div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center"><p className="text-lg font-bold text-white">Glitch Effect</p></div></GlitchTransition> });
        break;
      }
      case "AmbientTilt": {
        matched.push({ name: imp, node: <AmbientTilt maxAngle={12}><div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-6 text-center"><p className="text-lg font-bold text-white">3D Tilt — Move cursor</p></div></AmbientTilt> });
        break;
      }
      case "HandwrittenAnnotation": {
        const text = extractChildren(code, "HandwrittenAnnotation") || "Annotated!";
        matched.push({ name: imp, node: <HandwrittenAnnotation type="circle" color="#EF4444"><span className="text-xl font-bold text-white px-4 py-2">{text}</span></HandwrittenAnnotation> });
        break;
      }
      case "MorphingBlob": {
        const color = extractPropValue(code, "MorphingBlob", "color") || "#8B5CF6";
        matched.push({ name: imp, node: <MorphingBlob size={120} color={color} accentColor="#389CFD" speed={4} /> });
        break;
      }
      default: {
        // Fall back to static previewMap
        if (previewMap[imp]) {
          matched.push({ name: imp, node: previewMap[imp] });
        }
        break;
      }
    }
  }

  // If no imports matched, try by name and code extraction
  if (matched.length === 0) {
    if (previewMap[result.name]) return previewMap[result.name];
    const jsxMatch = result.code.match(/<(\w+)\s/g);
    if (jsxMatch) {
      for (const match of jsxMatch) {
        const compName = match.replace(/</, "").replace(/\s/, "");
        if (previewMap[compName] && !seen.has(compName)) {
          matched.push({ name: compName, node: previewMap[compName] });
          seen.add(compName);
        }
      }
    }
  }

  if (matched.length === 0) return null;
  if (matched.length === 1) return matched[0].node;

  return (
    <div className="w-full space-y-4 max-h-[400px] overflow-y-auto">
      {matched.map(({ name, node }) => (
        <div key={name}>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">{name}</p>
          <div className="flex items-center justify-center">{node}</div>
        </div>
      ))}
    </div>
  );
}

// ── Generate Output with Preview/Code tabs ──────────────────────────────────
function GenerateOutput({ result, copied, onCopy, usedImports }: {
  result: ComponentEntry;
  copied: boolean;
  onCopy: () => void;
  usedImports: string[];
}) {
  const [viewTab, setViewTab] = useState<"preview" | "code">("preview");
  const livePreview = getPreviewForResult(result);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Zap className="h-4 w-4 text-violet-400" />
          <span className="text-sm font-semibold text-white">{result.name}</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", result.badgeColor)}>
            {result.badge}
          </span>
        </div>
        <a
          href={`/docs/components/${result.docSlug}`}
          className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors"
        >
          <BookOpen className="h-3.5 w-3.5" />
          Docs
        </a>
      </div>

      {/* Preview / Code tab switcher */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1 rounded-lg bg-white/[0.03] p-0.5">
          <button
            onClick={() => setViewTab("preview")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              viewTab === "preview" ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button
            onClick={() => setViewTab("code")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              viewTab === "code" ? "bg-white/[0.08] text-white" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            Code
          </button>
        </div>
        {viewTab === "code" && (
          <button onClick={onCopy} className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white transition-colors">
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewTab === "preview" ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LiveCodePreview code={result.code} />
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="max-h-[320px] overflow-auto rounded-xl bg-black/50 p-4">
              <SyntaxHighlight code={result.code} showLineNumbers />
            </div>
            {usedImports.length > 0 && (
              <div className="mt-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Package className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Used components</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {usedImports.map((imp) => (
                    <span key={imp} className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] font-mono text-zinc-400">{imp}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Tab 2: URL Analyzer ─────────────────────────────────────────────────────
function AnalyzeTab() {
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (!url.trim() || analyzing) return;
    setAnalyzing(true);
    setResult(null);
    setAnalyzeError(null);

    // Try real API first, fall back to mock
    analyzeURL(url)
      .then((res) => {
        setResult({
          colors: res.colors,
          fonts: res.fonts,
          components: res.components,
          suggestions: res.suggestions,
        });
      })
      .catch(() => {
        // Fallback to mock
        setResult(mockAnalyze());
      })
      .finally(() => setAnalyzing(false));
  };

  return (
    <div>
      {/* URL Input */}
      <div className="mx-auto max-w-2xl">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste any website URL — e.g., https://linear.app"
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/30"
              onKeyDown={(e) => { if (e.key === "Enter") handleAnalyze(); }}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={!url.trim() || analyzing}
            className={cn(
              "rounded-xl px-6 py-3 text-sm font-semibold transition-all",
              url.trim() && !analyzing
                ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-white"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            )}
          >
            {analyzing ? "Analyzing..." : "Analyze"}
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-zinc-700">
          AI will extract colors, typography, layout patterns, and suggest matching FlexUI components
        </p>
      </div>

      {/* Results */}
      {analyzing && (
        <div className="mt-12 flex flex-col items-center">
          <div className="flex gap-2">
            <span className="h-3 w-3 animate-bounce rounded-full bg-violet-400 [animation-delay:0ms]" />
            <span className="h-3 w-3 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]" />
            <span className="h-3 w-3 animate-bounce rounded-full bg-violet-400 [animation-delay:300ms]" />
          </div>
          <p className="mt-4 text-sm text-zinc-500">Analyzing {url}...</p>
          <div className="mt-3 h-1 w-48 overflow-hidden rounded-full bg-zinc-800">
            <motion.div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500" animate={{ width: ["0%", "80%", "100%"] }} transition={{ duration: 2.5 }} />
          </div>
        </div>
      )}

      {result && !analyzing && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Colors */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Palette className="h-4 w-4 text-violet-400" /> Extracted Colors
            </h3>
            <div className="flex flex-wrap gap-3">
              {result.colors.map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg ring-1 ring-white/10" style={{ backgroundColor: c.hex }} />
                  <div>
                    <p className="text-xs font-medium text-zinc-300">{c.name}</p>
                    <p className="text-[10px] text-zinc-600">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fonts */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Code2 className="h-4 w-4 text-cyan-400" /> Typography
            </h3>
            {result.fonts.map((f) => (
              <div key={f} className="mb-2 rounded-lg bg-white/[0.03] px-3 py-2 text-sm text-zinc-300" style={{ fontFamily: f }}>
                {f}
              </div>
            ))}
          </div>

          {/* Matching Components */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Layers className="h-4 w-4 text-emerald-400" /> Matching FlexUI Components
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {result.components.map((comp) => (
                <div key={comp} className="flex items-start gap-2 rounded-lg bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-300">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400" />
                  {comp}
                </div>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:col-span-2">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4 text-yellow-400" /> AI Suggestions
            </h3>
            <div className="space-y-2">
              {result.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-violet-500/10 text-[10px] font-bold text-violet-400">
                    {i + 1}
                  </span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Tab 3: Theme Studio ─────────────────────────────────────────────────────
function ThemeTab() {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [codeTab, setCodeTab] = useState<"css" | "tailwind">("css");
  const [primaryColor, setPrimaryColor] = useState(themePresets[0].primary);
  const [accentColor, setAccentColor] = useState(themePresets[0].accent);
  const [bgColor, setBgColor] = useState(themePresets[0].bg);

  const handlePresetSelect = (i: number) => {
    setSelected(i);
    setPrimaryColor(themePresets[i].primary);
    setAccentColor(themePresets[i].accent);
    setBgColor(themePresets[i].bg);
  };

  const themeName = themePresets[selected].name;

  const cssCode = `/* FlexUI Theme: ${themeName} */
:root {
  --flexui-primary: ${primaryColor};
  --flexui-accent: ${accentColor};
  --flexui-bg: ${bgColor};
  --flexui-text: #E4E4E7;
  --flexui-border: rgba(255, 255, 255, 0.06);
  --flexui-glass: rgba(255, 255, 255, 0.03);
}`;

  const tailwindCode = `// tailwind.config.ts
theme: {
  extend: {
    colors: {
      flexui: {
        primary: "${primaryColor}",
        accent: "${accentColor}",
        bg: "${bgColor}",
      }
    }
  }
}`;

  const activeCode = codeTab === "css" ? cssCode : tailwindCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Presets + Color Controls */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-white">Choose a preset</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {themePresets.map((t, i) => (
            <button
              key={t.name}
              onClick={() => handlePresetSelect(i)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all",
                selected === i &&
                  primaryColor === t.primary &&
                  accentColor === t.accent &&
                  bgColor === t.bg
                  ? "border-violet-500/30 bg-violet-500/5 ring-1 ring-violet-500/20"
                  : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
              )}
            >
              <div className="mb-3 flex gap-2">
                <div className="h-5 w-5 rounded-full ring-1 ring-white/10" style={{ backgroundColor: t.primary }} />
                <div className="h-5 w-5 rounded-full ring-1 ring-white/10" style={{ backgroundColor: t.accent }} />
              </div>
              <p className="text-sm font-medium text-white">{t.name}</p>
            </button>
          ))}
        </div>

        {/* Custom Color Controls */}
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Custom Colors</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Primary</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">{primaryColor}</span>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border border-white/[0.1] bg-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Accent</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">{accentColor}</span>
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border border-white/[0.1] bg-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">Background</label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-500">{bgColor}</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border border-white/[0.1] bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview + Code */}
      <div>
        {/* Enhanced Live Preview */}
        <div className="mb-4 overflow-hidden rounded-2xl border border-white/[0.06]" style={{ backgroundColor: bgColor }}>
          <h3 className="px-6 pt-5 mb-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Preview</h3>

          {/* Mini Navbar */}
          <div
            className="mx-4 mb-4 flex items-center justify-between rounded-xl px-4 py-2.5"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <span className="text-sm font-bold text-white">FlexUI</span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400 hover:text-white cursor-pointer">Docs</span>
              <span className="text-xs text-zinc-400 hover:text-white cursor-pointer">Components</span>
            </div>
          </div>

          <div className="space-y-4 px-6 pb-6">
            {/* Heading */}
            <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
              {themeName} Theme
            </h2>

            {/* Paragraph */}
            <p className="text-sm text-zinc-400">
              This is how your components will look with the selected theme applied across your application.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="rounded-lg px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Primary Action
              </button>
              <button
                className="rounded-lg px-5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                Secondary
              </button>
            </div>

            {/* Card */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: `${primaryColor}08`,
                border: `1px solid ${primaryColor}20`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                <p className="text-xs font-semibold text-zinc-300">Feature Card</p>
              </div>
              <p className="text-xs text-zinc-500">
                Cards, modals, and surfaces will inherit your theme colors with subtle opacity for depth.
              </p>
            </div>
          </div>
        </div>

        {/* Code with Tab Switcher */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center justify-between">
            {/* Tab Switcher */}
            <div className="flex gap-1 rounded-lg bg-white/[0.03] p-0.5">
              <button
                onClick={() => setCodeTab("css")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-all",
                  codeTab === "css"
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                CSS Variables
              </button>
              <button
                onClick={() => setCodeTab("tailwind")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-all",
                  codeTab === "tailwind"
                    ? "bg-white/[0.08] text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                Tailwind Config
              </button>
            </div>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white">
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-auto rounded-xl bg-black/50 p-3 text-xs text-zinc-400">
            <code>{activeCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// ── Tab 4: Customize ────────────────────────────────────────────────────────

interface PropControl {
  name: string;
  label: string;
  type: "text" | "number" | "boolean" | "color" | "select" | "range";
  default: string | number | boolean;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface ComponentConfig {
  name: string;
  import: string;
  controls: PropControl[];
}

const customizerConfigs: ComponentConfig[] = [
  {
    name: "ShimmerButton",
    import: "@/components/flexui/shimmer-button",
    controls: [
      { name: "label", label: "Label", type: "text", default: "Get Started" },
      { name: "shimmerColor", label: "Shimmer Color", type: "color", default: "#ffffff" },
      { name: "borderRadius", label: "Border Radius", type: "text", default: "12px" },
      { name: "disabled", label: "Disabled", type: "boolean", default: false },
    ],
  },
  {
    name: "GlowButton",
    import: "@/components/flexui/glow-button",
    controls: [
      { name: "label", label: "Label", type: "text", default: "Click Me" },
      { name: "glowColor", label: "Glow Color", type: "color", default: "#38bdf8" },
      { name: "disabled", label: "Disabled", type: "boolean", default: false },
    ],
  },
  {
    name: "GradientText",
    import: "@/components/flexui/gradient-text",
    controls: [
      { name: "text", label: "Text", type: "text", default: "Gradient Text" },
      { name: "speed", label: "Speed", type: "range", default: 3, min: 1, max: 10, step: 1 },
      { name: "animate", label: "Animate", type: "boolean", default: true },
    ],
  },
  {
    name: "SpotlightCard",
    import: "@/components/flexui/spotlight-card",
    controls: [
      { name: "spotlightColor", label: "Spotlight Color", type: "color", default: "#38bdf8" },
      { name: "spotlightSize", label: "Spotlight Size", type: "range", default: 350, min: 200, max: 600, step: 10 },
    ],
  },
  {
    name: "NeonGlowCard",
    import: "@/components/flexui/neon-glow-card",
    controls: [
      { name: "color", label: "Color", type: "color", default: "#389CFD" },
      { name: "intensity", label: "Intensity", type: "range", default: 1, min: 0.5, max: 2, step: 0.1 },
      { name: "pulse", label: "Pulse", type: "boolean", default: true },
    ],
  },
  {
    name: "TypewriterText",
    import: "@/components/flexui/typewriter-text",
    controls: [
      { name: "typingSpeed", label: "Typing Speed (ms)", type: "range", default: 80, min: 30, max: 150, step: 5 },
      { name: "deletingSpeed", label: "Deleting Speed (ms)", type: "range", default: 50, min: 20, max: 80, step: 5 },
      { name: "pauseDuration", label: "Pause Duration (ms)", type: "range", default: 1500, min: 500, max: 3000, step: 100 },
    ],
  },
  {
    name: "NumberTicker",
    import: "@/components/flexui/number-ticker",
    controls: [
      { name: "value", label: "Value", type: "number", default: 1234, min: 0, max: 999999, step: 1 },
      { name: "prefix", label: "Prefix", type: "text", default: "$" },
      { name: "suffix", label: "Suffix", type: "text", default: "+" },
      { name: "decimals", label: "Decimals", type: "range", default: 0, min: 0, max: 3, step: 1 },
    ],
  },
  {
    name: "RotatingText",
    import: "@/components/flexui/rotating-text",
    controls: [
      { name: "duration", label: "Duration (ms)", type: "range", default: 2000, min: 1000, max: 5000, step: 100 },
      { name: "direction", label: "Direction", type: "select", default: "up", options: ["up", "down"] },
    ],
  },
];

function buildInitialPropValues() {
  const initial: Record<string, Record<string, string | number | boolean>> = {};
  customizerConfigs.forEach((cfg) => {
    const vals: Record<string, string | number | boolean> = {};
    cfg.controls.forEach((c) => {
      vals[c.name] = c.default;
    });
    initial[cfg.name] = vals;
  });
  return initial;
}

function CustomizeTab() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const config = customizerConfigs[selectedIdx];
  const [propValues, setPropValues] = useState<Record<string, Record<string, string | number | boolean>>>(buildInitialPropValues);
  const [copied, setCopied] = useState(false);

  const currentProps = propValues[config.name];

  const updateProp = useCallback(
    (name: string, value: string | number | boolean) => {
      setPropValues((prev) => ({
        ...prev,
        [config.name]: { ...prev[config.name], [name]: value },
      }));
    },
    [config.name]
  );

  // Build generated code string
  const generatedCode = useMemo(() => {
    const controls = config.controls;
    const vals = currentProps;
    const compName = config.name;
    const importPath = config.import;

    const childrenComponents = ["ShimmerButton", "GlowButton", "GradientText", "SpotlightCard", "NeonGlowCard"];
    const hasChildren = childrenComponents.includes(compName);

    let propsStr = "";
    controls.forEach((ctrl) => {
      const val = vals[ctrl.name];
      if (val === ctrl.default) return;
      if (ctrl.name === "label" || ctrl.name === "text") return;
      if (typeof val === "boolean") {
        propsStr += val ? `\n      ${ctrl.name}` : `\n      ${ctrl.name}={false}`;
      } else if (typeof val === "number") {
        propsStr += `\n      ${ctrl.name}={${val}}`;
      } else {
        propsStr += `\n      ${ctrl.name}="${val}"`;
      }
    });

    let childContent = "";
    if (compName === "ShimmerButton" || compName === "GlowButton") {
      childContent = String(vals.label || "Button");
    } else if (compName === "GradientText") {
      childContent = String(vals.text || "Gradient Text");
    } else if (compName === "SpotlightCard") {
      childContent = `\n      <div className="p-8">\n        <h3 className="text-xl font-bold text-white">Spotlight Card</h3>\n        <p className="mt-2 text-zinc-400">Hover to see the spotlight effect.</p>\n      </div>`;
    } else if (compName === "NeonGlowCard") {
      childContent = `\n      <div className="p-8">\n        <h3 className="text-xl font-bold text-white">Neon Card</h3>\n        <p className="mt-2 text-zinc-400">Glowing border effect.</p>\n      </div>`;
    }

    let extraProps = "";
    if (compName === "TypewriterText") {
      extraProps = `\n      words={["Hello", "World", "FlexUI"]}`;
    } else if (compName === "RotatingText") {
      extraProps = `\n      words={["Beautiful", "Modern", "Animated", "Powerful"]}`;
    }

    if (hasChildren) {
      return `import { ${compName} } from "${importPath}";\n\nexport default function Example() {\n  return (\n    <${compName}${propsStr}${extraProps}>\n      ${childContent}\n    </${compName}>\n  );\n}`;
    }
    return `import { ${compName} } from "${importPath}";\n\nexport default function Example() {\n  return (\n    <${compName}${propsStr}${extraProps} />\n  );\n}`;
  }, [config, currentProps]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render live preview
  const livePreview = useMemo(() => {
    const vals = currentProps;
    const compName = config.name;

    switch (compName) {
      case "ShimmerButton":
        return (
          <ShimmerButton
            shimmerColor={String(vals.shimmerColor)}
            borderRadius={String(vals.borderRadius)}
            disabled={Boolean(vals.disabled)}
            className="px-8 py-3 text-white font-semibold"
          >
            {String(vals.label)}
          </ShimmerButton>
        );
      case "GlowButton":
        return (
          <GlowButton
            glowColor={String(vals.glowColor)}
            disabled={Boolean(vals.disabled)}
          >
            {String(vals.label)}
          </GlowButton>
        );
      case "GradientText":
        return (
          <GradientText
            speed={Number(vals.speed)}
            animate={Boolean(vals.animate)}
            className="text-4xl font-bold"
          >
            {String(vals.text)}
          </GradientText>
        );
      case "SpotlightCard": {
        const hex = String(vals.spotlightColor).replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16) || 56;
        const g = parseInt(hex.substring(2, 4), 16) || 189;
        const b = parseInt(hex.substring(4, 6), 16) || 248;
        return (
          <SpotlightCard
            spotlightColor={`${r},${g},${b}`}
            spotlightSize={Number(vals.spotlightSize)}
            className="max-w-sm"
          >
            <div className="p-8">
              <h3 className="text-xl font-bold text-white">Spotlight Card</h3>
              <p className="mt-2 text-zinc-400">Hover to see the spotlight effect.</p>
            </div>
          </SpotlightCard>
        );
      }
      case "NeonGlowCard":
        return (
          <NeonGlowCard
            color={String(vals.color)}
            intensity={Number(vals.intensity)}
            pulse={Boolean(vals.pulse)}
          >
            <div className="p-8">
              <h3 className="text-xl font-bold text-white">Neon Card</h3>
              <p className="mt-2 text-zinc-400">Glowing border effect.</p>
            </div>
          </NeonGlowCard>
        );
      case "TypewriterText":
        return (
          <TypewriterText
            words={["Hello", "World", "FlexUI"]}
            typingSpeed={Number(vals.typingSpeed)}
            deletingSpeed={Number(vals.deletingSpeed)}
            pauseDuration={Number(vals.pauseDuration)}
            className="text-3xl font-bold text-white"
          />
        );
      case "NumberTicker":
        return (
          <NumberTicker
            value={Number(vals.value)}
            prefix={String(vals.prefix)}
            suffix={String(vals.suffix)}
            decimals={Number(vals.decimals)}
            className="text-5xl font-bold text-white"
          />
        );
      case "RotatingText":
        return (
          <div className="flex items-center gap-2 text-3xl font-bold text-white">
            Build{" "}
            <RotatingText
              words={["Beautiful", "Modern", "Animated", "Powerful"]}
              duration={Number(vals.duration)}
              direction={String(vals.direction) as "up" | "down"}
              className="text-violet-400"
            />{" "}
            UIs
          </div>
        );
      default:
        return null;
    }
  }, [config, currentProps]);

  return (
    <div>
      {/* Component selector row */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {customizerConfigs.map((cfg, i) => (
          <button
            key={cfg.name}
            onClick={() => setSelectedIdx(i)}
            className={cn(
              "shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
              selectedIdx === i
                ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 text-white ring-1 ring-violet-500/30"
                : "border border-white/[0.06] bg-white/[0.02] text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300"
            )}
          >
            {cfg.name}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left panel -- Props editor */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
            Props
          </h3>
          <div className="space-y-4">
            {config.controls.map((ctrl) => {
              const val = currentProps[ctrl.name];
              return (
                <div key={ctrl.name}>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    {ctrl.label}
                  </label>

                  {ctrl.type === "text" && (
                    <input
                      type="text"
                      value={String(val)}
                      onChange={(e) => updateProp(ctrl.name, e.target.value)}
                      className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-violet-500/30"
                    />
                  )}

                  {ctrl.type === "number" && (
                    <input
                      type="number"
                      value={Number(val)}
                      min={ctrl.min}
                      max={ctrl.max}
                      step={ctrl.step ?? 1}
                      onChange={(e) => updateProp(ctrl.name, Number(e.target.value))}
                      className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-violet-500/30"
                    />
                  )}

                  {ctrl.type === "boolean" && (
                    <button
                      onClick={() => updateProp(ctrl.name, !val)}
                      className={cn(
                        "relative h-7 w-12 rounded-full transition-colors",
                        val ? "bg-violet-500" : "bg-zinc-700"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform",
                          val && "translate-x-5"
                        )}
                      />
                    </button>
                  )}

                  {ctrl.type === "color" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={String(val)}
                        onChange={(e) => updateProp(ctrl.name, e.target.value)}
                        className="h-8 w-10 cursor-pointer rounded border border-white/[0.06] bg-transparent"
                      />
                      <span className="text-xs font-mono text-zinc-400">{String(val)}</span>
                    </div>
                  )}

                  {ctrl.type === "select" && (
                    <select
                      value={String(val)}
                      onChange={(e) => updateProp(ctrl.name, e.target.value)}
                      className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-sm text-white outline-none focus:border-violet-500/30"
                    >
                      {ctrl.options?.map((opt) => (
                        <option key={opt} value={opt} className="bg-zinc-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {ctrl.type === "range" && (
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={ctrl.min}
                        max={ctrl.max}
                        step={ctrl.step}
                        value={Number(val)}
                        onChange={(e) => updateProp(ctrl.name, Number(e.target.value))}
                        className="flex-1 accent-violet-500"
                      />
                      <span className="min-w-[3rem] text-right text-xs font-mono text-zinc-400">
                        {Number(val)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right panel -- Live preview + Code */}
        <div className="space-y-6">
          {/* Live preview */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <div className="mb-4 flex items-center gap-2">
              <Eye className="h-4 w-4 text-violet-400" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                Live Preview
              </span>
            </div>
            <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-black/30 p-8">
              {livePreview}
            </div>
          </div>

          {/* Generated code */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Generated Code
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="max-h-[300px] overflow-auto rounded-xl bg-black/50 p-4">
              <SyntaxHighlight code={generatedCode} showLineNumbers />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
