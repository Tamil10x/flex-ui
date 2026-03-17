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
