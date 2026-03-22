"use client";

import React from "react";
import { TextGradientScroll } from "@/components/flexui/text-gradient-scroll";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "tgs-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard scroll-driven gradient text reveal. Scroll the page to see the effect.",
    preview: (
      <div className="py-8">
        <TextGradientScroll text="Build beautiful interfaces" />
      </div>
    ),
    code: `<TextGradientScroll text="Build beautiful interfaces" />`,
    filename: "default.tsx",
  },
  {
    id: "tgs-hero",
    title: "Hero Headline",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Large hero-sized text with center alignment for landing pages.",
    preview: (
      <div className="py-8 text-center">
        <TextGradientScroll
          text="The future of design"
          className="text-5xl font-black"
        />
      </div>
    ),
    code: `<TextGradientScroll
  text="The future of design"
  className="text-5xl font-black text-center"
/>`,
    filename: "hero.tsx",
  },
  {
    id: "tgs-multiline",
    title: "Multi-Line",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Multiple gradient scroll instances stacked for a multi-line reveal effect.",
    preview: (
      <div className="space-y-4 py-8">
        <TextGradientScroll text="Animated." className="text-3xl font-bold" />
        <TextGradientScroll text="Accessible." className="text-3xl font-bold" />
        <TextGradientScroll text="Modern." className="text-3xl font-bold" />
      </div>
    ),
    code: `<div className="space-y-4">
  <TextGradientScroll text="Animated." className="text-3xl font-bold" />
  <TextGradientScroll text="Accessible." className="text-3xl font-bold" />
  <TextGradientScroll text="Modern." className="text-3xl font-bold" />
</div>`,
    filename: "multiline.tsx",
  },
  {
    id: "tgs-subtle",
    title: "Subtle Body Text",
    tag: "Variant",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Smaller font size for use in body text or section descriptions.",
    preview: (
      <div className="py-8">
        <TextGradientScroll
          text="Scroll to reveal the magic of gradient text animation"
          className="text-2xl font-semibold"
        />
      </div>
    ),
    code: `<TextGradientScroll
  text="Scroll to reveal the magic of gradient text animation"
  className="text-2xl font-semibold"
/>`,
    filename: "subtle.tsx",
  },
];

export function TextGradientScrollExamples() {
  return <ShowcaseGrid items={examples} />;
}
