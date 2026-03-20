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
    description: "Default card with portrait image, glass border, and 3D tilt on hover.",
    preview: (
      <div className="w-full max-w-xs">
        <ThreeHoverCard />
      </div>
    ),
    code: `<ThreeHoverCard />`,
    filename: "default.tsx",
  },
  {
    id: "thc-custom-image",
    title: "Custom Image",
    tag: "Props",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Use any image URL with custom title and description.",
    preview: (
      <div className="w-full max-w-xs">
        <ThreeHoverCard
          imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=faces"
          title="Creative Director"
          description="Hover for a cinematic glass shimmer effect."
        />
      </div>
    ),
    code: `<ThreeHoverCard
  imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=faces"
  title="Creative Director"
  description="Hover for a cinematic glass shimmer effect."
/>`,
    filename: "custom-image.tsx",
  },
  {
    id: "thc-children",
    title: "With Children",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Add badges, CTAs, or any content via children.",
    preview: (
      <div className="w-full max-w-xs">
        <ThreeHoverCard
          imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=faces"
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
  imageSrc="/your-image.jpg"
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
    title: "Full Width",
    tag: "Layout",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description: "Stretches to fill container with landscape crop.",
    span: "2" as const,
    preview: (
      <div className="w-full">
        <ThreeHoverCard
          imageSrc="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&h=600&fit=crop&crop=faces"
          title="Landscape Mode"
          description="Works at any aspect ratio — the image fills and crops."
          className="h-[280px] w-full"
        />
      </div>
    ),
    code: `<ThreeHoverCard
  imageSrc="/landscape.jpg"
  title="Landscape Mode"
  description="Works at any aspect ratio."
  className="h-[280px] w-full"
/>`,
    filename: "full-width.tsx",
  },
];

export function ThreeHoverCardExamples() {
  return <ShowcaseGrid items={examples} />;
}
