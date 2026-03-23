"use client";

import React from "react";
import { LiquidButton } from "@/components/flexui/liquid-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Zap } from "lucide-react";

const examples = [
  {
    id: "lb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default liquid button with a violet ripple effect.",
    preview: <LiquidButton>Get Started</LiquidButton>,
    code: `<LiquidButton>Get Started</LiquidButton>`,
    filename: "default.tsx",
  },
  {
    id: "lb-colors",
    title: "Custom Colors",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different ripple colors for different contexts.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <LiquidButton color="#EC4899">Pink</LiquidButton>
        <LiquidButton color="#10B981">Emerald</LiquidButton>
        <LiquidButton color="#F59E0B">Amber</LiquidButton>
      </div>
    ),
    code: `<LiquidButton color="#EC4899">Pink</LiquidButton>
<LiquidButton color="#10B981">Emerald</LiquidButton>
<LiquidButton color="#F59E0B">Amber</LiquidButton>`,
    filename: "colors.tsx",
  },
  {
    id: "lb-icon",
    title: "With Icon",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pair with an icon for action buttons.",
    preview: (
      <LiquidButton color="#38BDF8">
        <span className="flex items-center gap-2">
          <Zap className="h-4 w-4" /> Launch
        </span>
      </LiquidButton>
    ),
    code: `import { Zap } from "lucide-react";

<LiquidButton color="#38BDF8">
  <span className="flex items-center gap-2">
    <Zap className="h-4 w-4" /> Launch
  </span>
</LiquidButton>`,
    filename: "with-icon.tsx",
  },
];

export function LiquidButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
