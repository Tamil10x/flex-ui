"use client";

import React from "react";
import { ThreeHoverCard } from "@/components/flexui/three-hover-card";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "thc-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard 3D hover card with default title and description.",
    preview: (
      <div className="w-full max-w-xs">
        <ThreeHoverCard />
      </div>
    ),
    code: `<ThreeHoverCard />`,
    filename: "default.tsx",
  },
  {
    id: "thc-custom-text",
    title: "Configured Via Props",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Custom title and description passed via props.",
    preview: (
      <div className="w-full max-w-xs">
        <ThreeHoverCard
          title="WebGL Experience"
          description="An immersive 3D scene with distorted geometry."
        />
      </div>
    ),
    code: `<ThreeHoverCard
  title="WebGL Experience"
  description="An immersive 3D scene with distorted geometry."
/>`,
    filename: "custom-text.tsx",
  },
  {
    id: "thc-children",
    title: "With Custom Content",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Inject children content like pricing badges or CTAs.",
    preview: (
      <div className="w-full max-w-xs">
        <ThreeHoverCard
          title="Premium Plan"
          description="Everything you need for cinematic interfaces."
        >
          <div className="mt-3">
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
              $99/month
            </span>
          </div>
        </ThreeHoverCard>
      </div>
    ),
    code: `<ThreeHoverCard
  title="Premium Plan"
  description="Everything you need for cinematic interfaces."
>
  <div className="mt-3">
    <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-400">
      $99/month
    </span>
  </div>
</ThreeHoverCard>`,
    filename: "with-children.tsx",
  },
  {
    id: "thc-wide",
    title: "Custom Size",
    tag: "Layout",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description: "Stretch the card to custom dimensions with className.",
    span: "2" as const,
    preview: (
      <div className="w-full">
        <ThreeHoverCard
          title="Full Width"
          description="This card stretches to fill its container."
          className="h-[280px] w-full"
        />
      </div>
    ),
    code: `<ThreeHoverCard
  title="Full Width"
  description="This card stretches to fill its container."
  className="h-[280px] w-full"
/>`,
    filename: "custom-size.tsx",
  },
];

export function ThreeHoverCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
