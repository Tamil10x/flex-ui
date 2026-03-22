"use client";

import React from "react";
import { OrbitAnimation } from "@/components/flexui/orbit-animation";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "oa-default",
    title: "Default Orbit",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default configuration with 6 cyan dots orbiting at standard speed.",
    preview: (
      <div className="flex items-center justify-center">
        <OrbitAnimation />
      </div>
    ),
    code: `<OrbitAnimation />`,
    filename: "default.tsx",
  },
  {
    id: "oa-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different colored orbits for matching various brand palettes.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <OrbitAnimation dotCount={4} color="rgb(168,85,247)" />
          <span className="text-xs text-zinc-500">Purple</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <OrbitAnimation dotCount={4} color="rgb(52,211,153)" />
          <span className="text-xs text-zinc-500">Emerald</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <OrbitAnimation dotCount={4} color="rgb(251,191,36)" />
          <span className="text-xs text-zinc-500">Amber</span>
        </div>
      </div>
    ),
    code: `<OrbitAnimation dotCount={4} color="rgb(168,85,247)" />
<OrbitAnimation dotCount={4} color="rgb(52,211,153)" />
<OrbitAnimation dotCount={4} color="rgb(251,191,36)" />`,
    filename: "colors.tsx",
  },
  {
    id: "oa-speed",
    title: "Speed Variations",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Compare fast and slow orbital speeds using the speed prop.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <OrbitAnimation dotCount={4} speed={3} color="rgb(244,63,94)" />
          <span className="text-xs text-zinc-500">Fast (speed=3)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <OrbitAnimation dotCount={6} speed={8} color="rgb(56,189,248)" />
          <span className="text-xs text-zinc-500">Normal (speed=8)</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <OrbitAnimation dotCount={8} speed={16} color="rgb(99,102,241)" />
          <span className="text-xs text-zinc-500">Slow (speed=16)</span>
        </div>
      </div>
    ),
    code: `{/* Fast orbit */}
<OrbitAnimation dotCount={4} speed={3} color="rgb(244,63,94)" />

{/* Normal speed */}
<OrbitAnimation dotCount={6} speed={8} color="rgb(56,189,248)" />

{/* Slow, dense orbit */}
<OrbitAnimation dotCount={8} speed={16} color="rgb(99,102,241)" />`,
    filename: "speed.tsx",
  },
  {
    id: "oa-dense",
    title: "Dense Orbit",
    tag: "Advanced",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A dense orbit with many dots for a complex, mesmerizing animation pattern.",
    preview: (
      <div className="flex items-center justify-center">
        <OrbitAnimation dotCount={10} speed={12} color="rgb(52,211,153)" />
      </div>
    ),
    code: `<OrbitAnimation
  dotCount={10}
  speed={12}
  color="rgb(52,211,153)"
/>`,
    filename: "dense.tsx",
  },
];

export function OrbitAnimationExamples() {
  return <ShowcaseGrid items={examples} />;
}
