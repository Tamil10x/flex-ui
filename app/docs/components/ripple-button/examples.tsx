"use client";

import React from "react";
import { RippleButton } from "@/components/flexui/ripple-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "rb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default ripple button with a white ripple effect.",
    preview: <RippleButton>Click Me</RippleButton>,
    code: `<RippleButton>Click Me</RippleButton>`,
    filename: "default.tsx",
  },
  {
    id: "rb-colors",
    title: "Custom Ripple Colors",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different ripple colors for different contexts.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <RippleButton rippleColor="rgba(139,92,246,0.4)">Purple</RippleButton>
        <RippleButton rippleColor="rgba(56,189,248,0.4)">Cyan</RippleButton>
        <RippleButton rippleColor="rgba(236,72,153,0.4)">Pink</RippleButton>
      </div>
    ),
    code: `<RippleButton rippleColor="rgba(139,92,246,0.4)">Purple</RippleButton>
<RippleButton rippleColor="rgba(56,189,248,0.4)">Cyan</RippleButton>
<RippleButton rippleColor="rgba(236,72,153,0.4)">Pink</RippleButton>`,
    filename: "colors.tsx",
  },
  {
    id: "rb-gradient",
    title: "Gradient Background",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Ripple on a gradient background button.",
    preview: (
      <RippleButton className="bg-gradient-to-r from-blue-600 to-violet-600 border-blue-500/20">
        Gradient Ripple
      </RippleButton>
    ),
    code: `<RippleButton className="bg-gradient-to-r from-blue-600 to-violet-600 border-blue-500/20">
  Gradient Ripple
</RippleButton>`,
    filename: "gradient.tsx",
  },
];

export function RippleButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
