"use client";

import React from "react";
import { GradientBorderButton } from "@/components/flexui/gradient-border-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "gbb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default gradient border button with rotating conic-gradient.",
    preview: <GradientBorderButton>Get Started</GradientBorderButton>,
    code: `<GradientBorderButton>Get Started</GradientBorderButton>`,
    filename: "default.tsx",
  },
  {
    id: "gbb-custom-colors",
    title: "Custom Gradient Colors",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different color sets for the rotating border.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <GradientBorderButton colors={["#22d3ee", "#3b82f6", "#8b5cf6", "#22d3ee"]}>
          Ocean
        </GradientBorderButton>
        <GradientBorderButton colors={["#f43f5e", "#f97316", "#eab308", "#f43f5e"]}>
          Sunset
        </GradientBorderButton>
      </div>
    ),
    code: `<GradientBorderButton colors={["#22d3ee", "#3b82f6", "#8b5cf6", "#22d3ee"]}>
  Ocean
</GradientBorderButton>
<GradientBorderButton colors={["#f43f5e", "#f97316", "#eab308", "#f43f5e"]}>
  Sunset
</GradientBorderButton>`,
    filename: "custom-colors.tsx",
  },
  {
    id: "gbb-speed",
    title: "Slow Rotation",
    tag: "Config",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Slower rotation speed and thicker border.",
    preview: (
      <GradientBorderButton speed={8} borderWidth={2}>
        Slow & Thick
      </GradientBorderButton>
    ),
    code: `<GradientBorderButton speed={8} borderWidth={2}>
  Slow & Thick
</GradientBorderButton>`,
    filename: "slow-rotation.tsx",
  },
];

export function GradientBorderButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
