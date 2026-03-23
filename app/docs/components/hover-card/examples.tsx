"use client";

import React from "react";
import { HoverCard } from "@/components/flexui/hover-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Star, Zap, Shield, ArrowUpRight } from "lucide-react";

const examples = [
  {
    id: "hc-default",
    title: "Default Card",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A simple hover card with text content that lifts on hover.",
    preview: (
      <HoverCard className="w-72">
        <h3 className="text-lg font-semibold text-white">Hover me</h3>
        <p className="mt-2 text-sm text-zinc-400">
          This card lifts up and scales slightly on hover with a smooth spring animation.
        </p>
      </HoverCard>
    ),
    code: `<HoverCard className="w-72">
  <h3 className="text-lg font-semibold text-white">Hover me</h3>
  <p className="mt-2 text-sm text-zinc-400">
    This card lifts up and scales slightly on hover
    with a smooth spring animation.
  </p>
</HoverCard>`,
    filename: "default.tsx",
  },
  {
    id: "hc-icons",
    title: "Feature Cards with Icons",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Combine with Lucide icons to create engaging feature highlight cards.",
    preview: (
      <div className="grid grid-cols-2 gap-4">
        <HoverCard className="w-full">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
            <Star className="h-5 w-5 text-yellow-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Favorites</h3>
          <p className="mt-1 text-xs text-zinc-500">Save items for quick access later.</p>
        </HoverCard>
        <HoverCard className="w-full">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <Zap className="h-5 w-5 text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Performance</h3>
          <p className="mt-1 text-xs text-zinc-500">Optimized for 60fps animations.</p>
        </HoverCard>
        <HoverCard className="w-full">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
            <Shield className="h-5 w-5 text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Secure</h3>
          <p className="mt-1 text-xs text-zinc-500">Built with security best practices.</p>
        </HoverCard>
        <HoverCard className="w-full">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
            <ArrowUpRight className="h-5 w-5 text-purple-400" />
          </div>
          <h3 className="text-sm font-semibold text-white">Deploy</h3>
          <p className="mt-1 text-xs text-zinc-500">One-click deploy to any platform.</p>
        </HoverCard>
      </div>
    ),
    code: `import { Star, Zap, Shield, ArrowUpRight } from "lucide-react";

<div className="grid grid-cols-2 gap-4">
  <HoverCard>
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
      <Star className="h-5 w-5 text-yellow-400" />
    </div>
    <h3 className="text-sm font-semibold text-white">Favorites</h3>
    <p className="mt-1 text-xs text-zinc-500">Save items for quick access.</p>
  </HoverCard>
  <HoverCard>
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
      <Zap className="h-5 w-5 text-blue-400" />
    </div>
    <h3 className="text-sm font-semibold text-white">Performance</h3>
    <p className="mt-1 text-xs text-zinc-500">Optimized for 60fps.</p>
  </HoverCard>
</div>`,
    filename: "with-icons.tsx",
  },
  {
    id: "hc-themed",
    title: "Themed Cards",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Override default styles with className for branded card themes.",
    preview: (
      <div className="flex flex-wrap gap-4">
        <HoverCard className="w-56 bg-blue-950/50 border-blue-500/20">
          <h3 className="text-sm font-bold text-blue-400">Blue Theme</h3>
          <p className="mt-1 text-xs text-blue-300/60">Custom background and border colors.</p>
        </HoverCard>
        <HoverCard className="w-56 bg-purple-950/50 border-purple-500/20">
          <h3 className="text-sm font-bold text-purple-400">Purple Theme</h3>
          <p className="mt-1 text-xs text-purple-300/60">Matches your brand palette.</p>
        </HoverCard>
      </div>
    ),
    code: `<HoverCard className="w-56 bg-blue-950/50 border-blue-500/20">
  <h3 className="text-sm font-bold text-blue-400">Blue Theme</h3>
  <p className="mt-1 text-xs text-blue-300/60">
    Custom background and border colors.
  </p>
</HoverCard>

<HoverCard className="w-56 bg-purple-950/50 border-purple-500/20">
  <h3 className="text-sm font-bold text-purple-400">Purple Theme</h3>
  <p className="mt-1 text-xs text-purple-300/60">
    Matches your brand palette.
  </p>
</HoverCard>`,
    filename: "themed.tsx",
  },
  {
    id: "hc-rich",
    title: "Rich Content Card",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "A card with rich content including badges, stats, and call-to-action.",
    preview: (
      <HoverCard className="w-80">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">Pro Plan</h3>
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
            POPULAR
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">Everything you need to scale.</p>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white">$29</span>
          <span className="text-sm text-zinc-500">/month</span>
        </div>
        <div className="mt-4 space-y-2">
          {["Unlimited projects", "Priority support", "Advanced analytics"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="h-1 w-1 rounded-full bg-emerald-400" />
              {f}
            </div>
          ))}
        </div>
      </HoverCard>
    ),
    code: `<HoverCard className="w-80">
  <div className="flex items-center justify-between">
    <h3 className="text-base font-semibold text-white">Pro Plan</h3>
    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
      POPULAR
    </span>
  </div>
  <p className="mt-1 text-xs text-zinc-500">Everything you need to scale.</p>
  <div className="mt-4 flex items-baseline gap-1">
    <span className="text-3xl font-bold text-white">$29</span>
    <span className="text-sm text-zinc-500">/month</span>
  </div>
  <div className="mt-4 space-y-2">
    {["Unlimited projects", "Priority support", "Advanced analytics"].map((f) => (
      <div key={f} className="flex items-center gap-2 text-xs text-zinc-400">
        <div className="h-1 w-1 rounded-full bg-emerald-400" />
        {f}
      </div>
    ))}
  </div>
</HoverCard>`,
    filename: "rich-content.tsx",
  },
];

export function HoverCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
