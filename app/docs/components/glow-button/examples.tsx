"use client";

import React from "react";
import { GlowButton } from "@/components/flexui/glow-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Zap } from "lucide-react";

const examples = [
  {
    id: "gb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default glow button with a cyan pulsing glow.",
    preview: <GlowButton>Get Started</GlowButton>,
    code: `<GlowButton>Get Started</GlowButton>`,
    filename: "default.tsx",
  },
  {
    id: "gb-colors",
    title: "Custom Glow Colors",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different glow colors for different contexts.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <GlowButton glowColor="rgba(139,92,246,0.5)">Purple</GlowButton>
        <GlowButton glowColor="rgba(236,72,153,0.5)">Pink</GlowButton>
        <GlowButton glowColor="rgba(16,185,129,0.5)">Emerald</GlowButton>
      </div>
    ),
    code: `<GlowButton glowColor="rgba(139,92,246,0.5)">Purple</GlowButton>
<GlowButton glowColor="rgba(236,72,153,0.5)">Pink</GlowButton>
<GlowButton glowColor="rgba(16,185,129,0.5)">Emerald</GlowButton>`,
    filename: "colors.tsx",
  },
  {
    id: "gb-icon",
    title: "With Icon",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pair with an icon for action buttons.",
    preview: (
      <GlowButton glowColor="rgba(234,179,8,0.5)">
        <span className="flex items-center gap-2">
          <Zap className="h-4 w-4" /> Boost
        </span>
      </GlowButton>
    ),
    code: `import { Zap } from "lucide-react";

<GlowButton glowColor="rgba(234,179,8,0.5)">
  <span className="flex items-center gap-2">
    <Zap className="h-4 w-4" /> Boost
  </span>
</GlowButton>`,
    filename: "with-icon.tsx",
  },
];

export function GlowButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
