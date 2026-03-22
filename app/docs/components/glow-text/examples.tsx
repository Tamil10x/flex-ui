"use client";

import React from "react";
import { GlowText } from "@/components/flexui/glow-text";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "gt-default",
    title: "Default Cyan Glow",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default glowing text with cyan color pulsation.",
    preview: (
      <div className="flex items-center justify-center">
        <GlowText className="text-4xl">Glowing Text</GlowText>
      </div>
    ),
    code: `<GlowText className="text-4xl">Glowing Text</GlowText>`,
    filename: "default.tsx",
  },
  {
    id: "gt-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different glow colors for various accent themes.",
    preview: (
      <div className="flex flex-col items-center gap-5">
        <GlowText className="text-3xl" color="rgb(168,85,247)">
          Purple Glow
        </GlowText>
        <GlowText className="text-3xl" color="rgb(52,211,153)">
          Emerald Glow
        </GlowText>
        <GlowText className="text-3xl" color="rgb(251,191,36)">
          Amber Glow
        </GlowText>
        <GlowText className="text-3xl" color="rgb(244,63,94)">
          Rose Glow
        </GlowText>
      </div>
    ),
    code: `<GlowText className="text-3xl" color="rgb(168,85,247)">
  Purple Glow
</GlowText>

<GlowText className="text-3xl" color="rgb(52,211,153)">
  Emerald Glow
</GlowText>

<GlowText className="text-3xl" color="rgb(251,191,36)">
  Amber Glow
</GlowText>

<GlowText className="text-3xl" color="rgb(244,63,94)">
  Rose Glow
</GlowText>`,
    filename: "colors.tsx",
  },
  {
    id: "gt-inline",
    title: "Inline with Text",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "GlowText renders inline, so it flows naturally within paragraphs.",
    preview: (
      <div className="max-w-md text-center">
        <p className="text-lg text-zinc-400">
          Introducing{" "}
          <GlowText color="rgb(34,211,238)" className="text-lg">
            FlexUI
          </GlowText>{" "}
          — the next-gen component library for building{" "}
          <GlowText color="rgb(168,85,247)" className="text-lg">
            stunning
          </GlowText>{" "}
          interfaces.
        </p>
      </div>
    ),
    code: `<p className="text-lg text-zinc-400">
  Introducing{" "}
  <GlowText color="rgb(34,211,238)" className="text-lg">
    FlexUI
  </GlowText>{" "}
  — the next-gen component library for building{" "}
  <GlowText color="rgb(168,85,247)" className="text-lg">
    stunning
  </GlowText>{" "}
  interfaces.
</p>`,
    filename: "inline.tsx",
  },
  {
    id: "gt-hero",
    title: "Hero Heading",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Large hero-style heading with dramatic glow for landing pages.",
    preview: (
      <div className="flex flex-col items-center gap-3 text-center">
        <GlowText className="text-5xl tracking-tight" color="rgb(99,102,241)">
          Build Faster
        </GlowText>
        <p className="text-sm text-zinc-500 max-w-xs">
          Ship production-ready interfaces with animated components that delight your users.
        </p>
      </div>
    ),
    code: `<div className="flex flex-col items-center gap-3 text-center">
  <GlowText className="text-5xl tracking-tight" color="rgb(99,102,241)">
    Build Faster
  </GlowText>
  <p className="text-sm text-zinc-500 max-w-xs">
    Ship production-ready interfaces with animated components
    that delight your users.
  </p>
</div>`,
    filename: "hero.tsx",
  },
];

export function GlowTextExamples() {
  return <ShowcaseGrid items={examples} />;
}
