"use client";

import React from "react";
import { TiltCard } from "@/components/flexui/tilt-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Sparkles, Zap, Shield } from "lucide-react";

const examples = [
  {
    id: "tilt-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard tilt card with 15-degree max tilt. Hover and move your cursor to see the 3D effect.",
    preview: (
      <TiltCard className="max-w-xs">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Interactive Card</h3>
          <p className="text-sm text-zinc-400">Hover and move your cursor around to see the 3D tilt effect in action.</p>
        </div>
      </TiltCard>
    ),
    code: `import { Sparkles } from "lucide-react";

<TiltCard className="max-w-xs">
  <div className="space-y-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500">
      <Sparkles className="h-5 w-5 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-white">Interactive Card</h3>
    <p className="text-sm text-zinc-400">Hover to see the 3D tilt effect.</p>
  </div>
</TiltCard>`,
    filename: "default.tsx",
  },
  {
    id: "tilt-dramatic",
    title: "Dramatic Tilt",
    tag: "Intensity",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Higher tilt angle (25 degrees) with closer perspective (600px) for a more dramatic effect.",
    preview: (
      <TiltCard maxTilt={25} perspective={600} className="max-w-xs">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Dramatic</h3>
          <p className="text-sm text-zinc-400">Higher tilt angle with closer perspective for an exaggerated 3D effect.</p>
        </div>
      </TiltCard>
    ),
    code: `<TiltCard maxTilt={25} perspective={600}>
  <div className="space-y-3">
    <Zap className="h-5 w-5 text-white" />
    <h3 className="text-lg font-semibold text-white">Dramatic</h3>
    <p className="text-sm text-zinc-400">Exaggerated 3D effect.</p>
  </div>
</TiltCard>`,
    filename: "dramatic.tsx",
  },
  {
    id: "tilt-subtle",
    title: "Subtle Tilt",
    tag: "Intensity",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Gentle 5-degree tilt with distant perspective (1500px) for a refined, barely noticeable effect.",
    preview: (
      <TiltCard maxTilt={5} perspective={1500} className="max-w-xs">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">Subtle</h3>
          <p className="text-sm text-zinc-400">Gentle, barely noticeable tilt for a refined interactive feel.</p>
        </div>
      </TiltCard>
    ),
    code: `<TiltCard maxTilt={5} perspective={1500}>
  <div className="space-y-3">
    <Shield className="h-5 w-5 text-white" />
    <h3 className="text-lg font-semibold text-white">Subtle</h3>
    <p className="text-sm text-zinc-400">Gentle, barely noticeable tilt.</p>
  </div>
</TiltCard>`,
    filename: "subtle.tsx",
  },
  {
    id: "tilt-grid",
    title: "Card Grid",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Multiple tilt cards arranged in a responsive grid layout.",
    preview: (
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <TiltCard>
          <p className="text-sm font-semibold text-white">Performance</p>
          <p className="mt-1 text-xs text-zinc-400">Optimized for speed</p>
        </TiltCard>
        <TiltCard>
          <p className="text-sm font-semibold text-white">Security</p>
          <p className="mt-1 text-xs text-zinc-400">Enterprise-grade protection</p>
        </TiltCard>
      </div>
    ),
    code: `<div className="grid gap-4 sm:grid-cols-2">
  <TiltCard>
    <p className="text-sm font-semibold text-white">Performance</p>
    <p className="mt-1 text-xs text-zinc-400">Optimized for speed</p>
  </TiltCard>
  <TiltCard>
    <p className="text-sm font-semibold text-white">Security</p>
    <p className="mt-1 text-xs text-zinc-400">Enterprise-grade protection</p>
  </TiltCard>
</div>`,
    filename: "grid.tsx",
  },
];

export function TiltCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
