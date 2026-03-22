"use client";

import React from "react";
import { BlurFade } from "@/components/flexui/blur-fade";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Sparkles, Layers, Zap } from "lucide-react";

const examples = [
  {
    id: "blur-fade-default",
    title: "Default Entrance",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Basic blur-to-clear fade animation triggered on viewport entry.",
    preview: (
      <BlurFade>
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">Welcome to FlexUI</h3>
          <p className="mt-2 text-sm text-zinc-400">This content fades in with a blur-to-clear transition.</p>
        </div>
      </BlurFade>
    ),
    code: `<BlurFade>
  <h3 className="text-xl font-bold text-white">Welcome to FlexUI</h3>
  <p className="mt-2 text-sm text-zinc-400">
    This content fades in with a blur-to-clear transition.
  </p>
</BlurFade>`,
    filename: "default.tsx",
  },
  {
    id: "blur-fade-staggered",
    title: "Staggered Sequence",
    tag: "Delay",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Incremental delays create a cascading reveal effect for multiple elements.",
    preview: (
      <div className="flex flex-col items-center gap-4">
        <BlurFade delay={0}>
          <h3 className="text-2xl font-bold text-white">Step One</h3>
        </BlurFade>
        <BlurFade delay={0.15}>
          <p className="text-sm text-zinc-400">This appears after the heading.</p>
        </BlurFade>
        <BlurFade delay={0.3}>
          <div className="flex gap-3">
            <div className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-400">Action A</div>
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">Action B</div>
          </div>
        </BlurFade>
      </div>
    ),
    code: `<BlurFade delay={0}>
  <h3 className="text-2xl font-bold">Step One</h3>
</BlurFade>
<BlurFade delay={0.15}>
  <p>This appears after the heading.</p>
</BlurFade>
<BlurFade delay={0.3}>
  <div className="flex gap-3">
    <div>Action A</div>
    <div>Action B</div>
  </div>
</BlurFade>`,
    filename: "staggered.tsx",
  },
  {
    id: "blur-fade-cards",
    title: "Card Grid",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Staggered blur-fade applied to a grid of cards with icons.",
    preview: (
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <Sparkles className="h-5 w-5 text-amber-400" />, label: "Animations" },
          { icon: <Layers className="h-5 w-5 text-blue-400" />, label: "Components" },
          { icon: <Zap className="h-5 w-5 text-emerald-400" />, label: "Performance" },
        ].map((item, i) => (
          <BlurFade key={item.label} delay={i * 0.12}>
            <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-4">
              {item.icon}
              <span className="text-xs font-medium text-white">{item.label}</span>
            </div>
          </BlurFade>
        ))}
      </div>
    ),
    code: `import { Sparkles, Layers, Zap } from "lucide-react";

const items = [
  { icon: <Sparkles className="h-5 w-5 text-amber-400" />, label: "Animations" },
  { icon: <Layers className="h-5 w-5 text-blue-400" />, label: "Components" },
  { icon: <Zap className="h-5 w-5 text-emerald-400" />, label: "Performance" },
];

{items.map((item, i) => (
  <BlurFade key={item.label} delay={i * 0.12}>
    <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-4">
      {item.icon}
      <span className="text-xs font-medium text-white">{item.label}</span>
    </div>
  </BlurFade>
))}`,
    filename: "cards.tsx",
  },
  {
    id: "blur-fade-slow",
    title: "Slow Cinematic",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Extended duration and delay for a dramatic, cinematic entrance.",
    preview: (
      <BlurFade delay={0.2} duration={1.2}>
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
            Cinematic Reveal
          </h2>
          <p className="mt-2 text-sm text-zinc-500">Duration: 1.2s with 0.2s delay</p>
        </div>
      </BlurFade>
    ),
    code: `<BlurFade delay={0.2} duration={1.2}>
  <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-bold text-transparent">
    Cinematic Reveal
  </h2>
  <p className="mt-2 text-sm text-zinc-500">
    Duration: 1.2s with 0.2s delay
  </p>
</BlurFade>`,
    filename: "cinematic.tsx",
  },
];

export function BlurFadeExamples() {
  return <ShowcaseGrid items={examples} />;
}
