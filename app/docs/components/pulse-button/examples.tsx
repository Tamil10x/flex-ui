"use client";

import React from "react";
import { PulseButton } from "@/components/flexui/pulse-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { ArrowRight, Bell, Rocket } from "lucide-react";

const examples = [
  {
    id: "plb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default pulse button with cyan radiating rings.",
    preview: <PulseButton>Get Started</PulseButton>,
    code: `<PulseButton>Get Started</PulseButton>`,
    filename: "default.tsx",
  },
  {
    id: "plb-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different pulse ring colors to match your action intent.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-8">
        <PulseButton color="rgba(139,92,246,0.5)">Purple</PulseButton>
        <PulseButton color="rgba(16,185,129,0.5)">Green</PulseButton>
        <PulseButton color="rgba(239,68,68,0.5)">Red Alert</PulseButton>
        <PulseButton color="rgba(245,158,11,0.5)">Warning</PulseButton>
      </div>
    ),
    code: `<PulseButton color="rgba(139,92,246,0.5)">Purple</PulseButton>
<PulseButton color="rgba(16,185,129,0.5)">Green</PulseButton>
<PulseButton color="rgba(239,68,68,0.5)">Red Alert</PulseButton>
<PulseButton color="rgba(245,158,11,0.5)">Warning</PulseButton>`,
    filename: "colors.tsx",
  },
  {
    id: "plb-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Combine with Lucide icons for contextual action buttons.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-8">
        <PulseButton color="rgba(59,130,246,0.5)">
          <span className="flex items-center gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </span>
        </PulseButton>
        <PulseButton color="rgba(245,158,11,0.5)" pulseCount={2}>
          <span className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notify
          </span>
        </PulseButton>
        <PulseButton color="rgba(139,92,246,0.5)" pulseCount={4}>
          <span className="flex items-center gap-2">
            <Rocket className="h-4 w-4" /> Launch
          </span>
        </PulseButton>
      </div>
    ),
    code: `import { ArrowRight, Bell, Rocket } from "lucide-react";

<PulseButton color="rgba(59,130,246,0.5)">
  <span className="flex items-center gap-2">
    Continue <ArrowRight className="h-4 w-4" />
  </span>
</PulseButton>

<PulseButton color="rgba(245,158,11,0.5)" pulseCount={2}>
  <span className="flex items-center gap-2">
    <Bell className="h-4 w-4" /> Notify
  </span>
</PulseButton>

<PulseButton color="rgba(139,92,246,0.5)" pulseCount={4}>
  <span className="flex items-center gap-2">
    <Rocket className="h-4 w-4" /> Launch
  </span>
</PulseButton>`,
    filename: "with-icons.tsx",
  },
  {
    id: "plb-ring-counts",
    title: "Ring Count Variants",
    tag: "Config",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Control the intensity by adjusting the number of radiating pulse rings.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-8">
        <PulseButton pulseCount={1} color="rgba(56,189,248,0.5)">
          1 Ring
        </PulseButton>
        <PulseButton pulseCount={3} color="rgba(56,189,248,0.5)">
          3 Rings
        </PulseButton>
        <PulseButton pulseCount={5} color="rgba(56,189,248,0.5)">
          5 Rings
        </PulseButton>
      </div>
    ),
    code: `<PulseButton pulseCount={1}>1 Ring</PulseButton>
<PulseButton pulseCount={3}>3 Rings</PulseButton>
<PulseButton pulseCount={5}>5 Rings</PulseButton>`,
    filename: "ring-counts.tsx",
  },
];

export function PulseButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
