"use client";

import React from "react";
import { TypewriterDelete } from "@/components/flexui/typewriter-delete";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "tw-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard typewriter effect that types and deletes text in a continuous loop.",
    preview: (
      <div className="py-4">
        <TypewriterDelete text="Hello, World!" className="text-2xl" />
      </div>
    ),
    code: `<TypewriterDelete text="Hello, World!" className="text-2xl" />`,
    filename: "default.tsx",
  },
  {
    id: "tw-fast",
    title: "Fast Speed",
    tag: "Speed",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Higher typing speed (30ms per character) for a rapid-fire effect.",
    preview: (
      <div className="py-4">
        <TypewriterDelete text="Lightning fast typing" speed={30} className="text-2xl" />
      </div>
    ),
    code: `<TypewriterDelete text="Lightning fast typing" speed={30} />`,
    filename: "fast.tsx",
  },
  {
    id: "tw-slow",
    title: "Slow & Deliberate",
    tag: "Speed",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Slower typing speed (150ms) for a more deliberate, thoughtful feel.",
    preview: (
      <div className="py-4">
        <TypewriterDelete text="Slow and steady..." speed={150} className="text-xl text-zinc-300" />
      </div>
    ),
    code: `<TypewriterDelete text="Slow and steady..." speed={150} className="text-xl text-zinc-300" />`,
    filename: "slow.tsx",
  },
  {
    id: "tw-hero",
    title: "Hero Headline",
    tag: "Compose",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Typewriter effect composed with a static prefix for dynamic hero headlines.",
    preview: (
      <div className="py-4 text-center">
        <span className="text-2xl font-bold text-white">We build </span>
        <TypewriterDelete text="stunning interfaces" speed={60} className="text-2xl font-bold text-cyan-400" />
      </div>
    ),
    code: `<span className="text-2xl font-bold text-white">We build </span>
<TypewriterDelete
  text="stunning interfaces"
  speed={60}
  className="text-2xl font-bold text-cyan-400"
/>`,
    filename: "hero.tsx",
  },
];

export function TypewriterDeleteExamples() {
  return <ShowcaseGrid items={examples} />;
}
