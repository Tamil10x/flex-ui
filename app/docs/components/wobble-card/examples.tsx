"use client";

import React from "react";
import { WobbleCard } from "@/components/flexui/wobble-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { BarChart3, Shield, Zap } from "lucide-react";

const examples = [
  {
    id: "wobble-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard wobble card with spring physics. Hover and move your cursor to see the bouncy wobble.",
    preview: (
      <WobbleCard className="max-w-xs">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Wobble Card</h3>
          <p className="text-sm text-zinc-400">Hover and move your cursor to see the bouncy spring animation.</p>
        </div>
      </WobbleCard>
    ),
    code: `import { Zap } from "lucide-react";

<WobbleCard className="max-w-xs">
  <div className="space-y-3">
    <Zap className="h-5 w-5 text-white" />
    <h3 className="text-lg font-semibold text-white">Wobble Card</h3>
    <p className="text-sm text-zinc-400">Hover to see the bouncy spring animation.</p>
  </div>
</WobbleCard>`,
    filename: "default.tsx",
  },
  {
    id: "wobble-feature",
    title: "Feature Card",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A feature card layout with icon, heading, and description inside a wobble card.",
    preview: (
      <WobbleCard className="max-w-sm">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">Analytics Dashboard</h3>
          <p className="text-sm text-zinc-400">Track your metrics in real time with beautiful visualizations and instant insights.</p>
        </div>
      </WobbleCard>
    ),
    code: `import { BarChart3 } from "lucide-react";

<WobbleCard className="max-w-sm">
  <div className="space-y-3">
    <BarChart3 className="h-5 w-5 text-white" />
    <h3 className="text-lg font-bold text-white">Analytics Dashboard</h3>
    <p className="text-sm text-zinc-400">Track metrics in real time.</p>
  </div>
</WobbleCard>`,
    filename: "feature.tsx",
  },
  {
    id: "wobble-grid",
    title: "Card Grid",
    tag: "Layout",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Multiple wobble cards in a responsive grid. Each card wobbles independently.",
    preview: (
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <WobbleCard>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Security</p>
              <p className="text-xs text-zinc-400">Enterprise-grade</p>
            </div>
          </div>
        </WobbleCard>
        <WobbleCard>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Performance</p>
              <p className="text-xs text-zinc-400">Sub-millisecond</p>
            </div>
          </div>
        </WobbleCard>
      </div>
    ),
    code: `<div className="grid gap-4 sm:grid-cols-2">
  <WobbleCard>
    <p className="font-semibold text-white">Security</p>
    <p className="text-xs text-zinc-400">Enterprise-grade</p>
  </WobbleCard>
  <WobbleCard>
    <p className="font-semibold text-white">Performance</p>
    <p className="text-xs text-zinc-400">Sub-millisecond</p>
  </WobbleCard>
</div>`,
    filename: "grid.tsx",
  },
  {
    id: "wobble-gradient",
    title: "Gradient Background",
    tag: "Style",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Wobble card with a gradient background applied via className.",
    preview: (
      <WobbleCard className="max-w-xs bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border-indigo-500/20">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Premium</h3>
          <p className="text-sm text-indigo-300/70">Gradient-styled wobble card with a premium dark feel.</p>
        </div>
      </WobbleCard>
    ),
    code: `<WobbleCard className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border-indigo-500/20">
  <h3 className="text-lg font-bold text-white">Premium</h3>
  <p className="text-sm text-indigo-300/70">Gradient-styled wobble card.</p>
</WobbleCard>`,
    filename: "gradient.tsx",
  },
];

export function WobbleCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
