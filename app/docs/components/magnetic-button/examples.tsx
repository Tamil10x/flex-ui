"use client";

import React from "react";
import { MagneticButton } from "@/components/flexui/magnetic-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { ArrowRight, Zap, Download } from "lucide-react";

const examples = [
  {
    id: "mb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default magnetic button with standard styling.",
    preview: <MagneticButton>Click Me</MagneticButton>,
    code: `<MagneticButton>Click Me</MagneticButton>`,
    filename: "default.tsx",
  },
  {
    id: "mb-strength",
    title: "Configured Via Props",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Different magnetic strength and spotlight size values.",
    preview: (
      <div className="flex flex-wrap items-center gap-4">
        <MagneticButton magneticStrength={0.1} spotlightSize={100}>
          Subtle
        </MagneticButton>
        <MagneticButton magneticStrength={0.6} spotlightSize={300}>
          Strong
        </MagneticButton>
      </div>
    ),
    code: `<MagneticButton magneticStrength={0.1} spotlightSize={100}>
  Subtle
</MagneticButton>

<MagneticButton magneticStrength={0.6} spotlightSize={300}>
  Strong
</MagneticButton>

<MagneticButton magneticStrength={0.9} spotlightSize={400}>
  Maximum
</MagneticButton>`,
    filename: "props-configured.tsx",
  },
  {
    id: "mb-gradient",
    title: "Gradient Variant",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Rich gradient background with enhanced glow.",
    preview: (
      <MagneticButton className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
        Gradient CTA
      </MagneticButton>
    ),
    code: `<MagneticButton
  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white
    hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
>
  Gradient CTA
</MagneticButton>`,
    filename: "gradient.tsx",
  },
  {
    id: "mb-outline",
    title: "Outline Variant",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Transparent background with border emphasis.",
    preview: (
      <MagneticButton className="bg-transparent text-white border border-white/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
        Outline
      </MagneticButton>
    ),
    code: `<MagneticButton
  className="bg-transparent text-white border border-white/20
    hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
>
  Outline
</MagneticButton>`,
    filename: "outline.tsx",
  },
  {
    id: "mb-icons",
    title: "With Icons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pair with lucide-react icons for action buttons.",
    span: "2" as const,
    preview: (
      <div className="flex flex-wrap items-center gap-3">
        <MagneticButton className="flex items-center gap-2">
          Get Started <ArrowRight className="h-4 w-4" />
        </MagneticButton>
        <MagneticButton className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <Zap className="h-4 w-4" /> Boost
        </MagneticButton>
        <MagneticButton className="flex items-center gap-2 bg-zinc-800 text-white">
          <Download className="h-4 w-4" /> Download
        </MagneticButton>
      </div>
    ),
    code: `import { ArrowRight, Zap, Download } from "lucide-react";

<MagneticButton className="flex items-center gap-2">
  Get Started <ArrowRight className="h-4 w-4" />
</MagneticButton>

<MagneticButton className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
  <Zap className="h-4 w-4" /> Boost
</MagneticButton>

<MagneticButton className="flex items-center gap-2 bg-zinc-800 text-white">
  <Download className="h-4 w-4" /> Download
</MagneticButton>`,
    filename: "with-icons.tsx",
  },
  {
    id: "mb-disabled",
    title: "Disabled State",
    tag: "State",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Button with disabled prop — no magnetic effect.",
    preview: (
      <MagneticButton disabled className="opacity-50 cursor-not-allowed">
        Disabled
      </MagneticButton>
    ),
    code: `<MagneticButton disabled className="opacity-50 cursor-not-allowed">
  Disabled
</MagneticButton>`,
    filename: "disabled.tsx",
  },
];

export function MagneticButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
