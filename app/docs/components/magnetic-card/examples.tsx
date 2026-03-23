"use client";

import React from "react";
import { MagneticCard } from "@/components/flexui/magnetic-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Magnet, MousePointer, Sparkles, Gauge } from "lucide-react";

const examples = [
  {
    id: "mc-default",
    title: "Default Magnetic",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default magnetic card with strength=30. Hover to see it follow your cursor.",
    preview: (
      <MagneticCard className="w-64">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
          <Magnet className="h-5 w-5 text-cyan-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Magnetic Card</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Move your cursor over this card to feel the magnetic pull.
        </p>
      </MagneticCard>
    ),
    code: `import { Magnet } from "lucide-react";

<MagneticCard className="w-64">
  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
    <Magnet className="h-5 w-5 text-cyan-400" />
  </div>
  <h3 className="text-lg font-semibold text-white">Magnetic Card</h3>
  <p className="mt-2 text-sm text-zinc-400">
    Move your cursor over this card to feel the magnetic pull.
  </p>
</MagneticCard>`,
    filename: "default.tsx",
  },
  {
    id: "mc-strengths",
    title: "Strength Variants",
    tag: "Props",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Compare different magnetic attraction strengths side by side.",
    preview: (
      <div className="flex flex-wrap gap-4">
        <MagneticCard className="w-44" strength={10}>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <MousePointer className="h-4 w-4 text-emerald-400" />
          </div>
          <h4 className="text-sm font-semibold text-white">Subtle</h4>
          <p className="mt-1 text-xs text-zinc-500">strength=10</p>
        </MagneticCard>
        <MagneticCard className="w-44" strength={30}>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
            <MousePointer className="h-4 w-4 text-blue-400" />
          </div>
          <h4 className="text-sm font-semibold text-white">Default</h4>
          <p className="mt-1 text-xs text-zinc-500">strength=30</p>
        </MagneticCard>
        <MagneticCard className="w-44" strength={60}>
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
            <MousePointer className="h-4 w-4 text-red-400" />
          </div>
          <h4 className="text-sm font-semibold text-white">Strong</h4>
          <p className="mt-1 text-xs text-zinc-500">strength=60</p>
        </MagneticCard>
      </div>
    ),
    code: `<MagneticCard className="w-44" strength={10}>
  <h4 className="text-sm font-semibold text-white">Subtle</h4>
  <p className="mt-1 text-xs text-zinc-500">strength=10</p>
</MagneticCard>

<MagneticCard className="w-44" strength={30}>
  <h4 className="text-sm font-semibold text-white">Default</h4>
  <p className="mt-1 text-xs text-zinc-500">strength=30</p>
</MagneticCard>

<MagneticCard className="w-44" strength={60}>
  <h4 className="text-sm font-semibold text-white">Strong</h4>
  <p className="mt-1 text-xs text-zinc-500">strength=60</p>
</MagneticCard>`,
    filename: "strengths.tsx",
  },
  {
    id: "mc-themed",
    title: "Themed Cards",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Custom background and border colors for branded magnetic cards.",
    preview: (
      <div className="flex flex-wrap gap-4">
        <MagneticCard className="w-52 bg-gradient-to-br from-purple-950/80 to-indigo-950/80 border-purple-500/20" strength={25}>
          <Sparkles className="h-5 w-5 text-purple-400 mb-2" />
          <h4 className="text-sm font-semibold text-purple-200">Premium</h4>
          <p className="mt-1 text-xs text-purple-400/60">Gradient themed magnetic card.</p>
        </MagneticCard>
        <MagneticCard className="w-52 bg-gradient-to-br from-emerald-950/80 to-teal-950/80 border-emerald-500/20" strength={25}>
          <Gauge className="h-5 w-5 text-emerald-400 mb-2" />
          <h4 className="text-sm font-semibold text-emerald-200">Analytics</h4>
          <p className="mt-1 text-xs text-emerald-400/60">Track performance metrics.</p>
        </MagneticCard>
      </div>
    ),
    code: `import { Sparkles, Gauge } from "lucide-react";

<MagneticCard
  className="w-52 bg-gradient-to-br from-purple-950/80 to-indigo-950/80 border-purple-500/20"
  strength={25}
>
  <Sparkles className="h-5 w-5 text-purple-400 mb-2" />
  <h4 className="text-sm font-semibold text-purple-200">Premium</h4>
  <p className="mt-1 text-xs text-purple-400/60">Gradient themed card.</p>
</MagneticCard>

<MagneticCard
  className="w-52 bg-gradient-to-br from-emerald-950/80 to-teal-950/80 border-emerald-500/20"
  strength={25}
>
  <Gauge className="h-5 w-5 text-emerald-400 mb-2" />
  <h4 className="text-sm font-semibold text-emerald-200">Analytics</h4>
  <p className="mt-1 text-xs text-emerald-400/60">Track metrics.</p>
</MagneticCard>`,
    filename: "themed.tsx",
  },
];

export function MagneticCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
