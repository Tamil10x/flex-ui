"use client";

import React from "react";
import { GlitchTransition } from "@/components/flexui/glitch-transition";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "gt-hover",
    title: "Hover Trigger",
    tag: "Trigger",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Default hover-activated glitch effect with medium intensity.",
    preview: (
      <div className="flex items-center justify-center py-8">
        <GlitchTransition trigger="hover" intensity={0.5}>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center">
            <h3 className="text-xl font-bold text-white">Hover Me</h3>
            <p className="mt-1 text-sm text-zinc-400">CRT glitch on hover</p>
          </div>
        </GlitchTransition>
      </div>
    ),
    code: `<GlitchTransition trigger="hover" intensity={0.5}>
  <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
    <h3 className="text-xl font-bold text-white">Hover Me</h3>
    <p className="mt-1 text-sm text-zinc-400">CRT glitch on hover</p>
  </div>
</GlitchTransition>`,
    filename: "hover-trigger.tsx",
  },
  {
    id: "gt-click",
    title: "Click Burst",
    tag: "Trigger",
    tagColor: "bg-yellow-500/10 text-yellow-400",
    description:
      "A single glitch burst on click with high intensity and 500ms duration.",
    preview: (
      <div className="flex items-center justify-center py-8">
        <GlitchTransition trigger="click" intensity={0.8} duration={500}>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center cursor-pointer">
            <h3 className="text-xl font-bold text-white">Click Me</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Single burst on click
            </p>
          </div>
        </GlitchTransition>
      </div>
    ),
    code: `<GlitchTransition trigger="click" intensity={0.8} duration={500}>
  <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 cursor-pointer">
    <h3 className="text-xl font-bold text-white">Click Me</h3>
    <p className="mt-1 text-sm text-zinc-400">Single burst on click</p>
  </div>
</GlitchTransition>`,
    filename: "click-burst.tsx",
  },
  {
    id: "gt-always",
    title: "Always Active",
    tag: "Continuous",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description:
      "Subtle continuous glitch at low intensity for ambient background effects.",
    preview: (
      <div className="flex items-center justify-center py-8">
        <GlitchTransition trigger="always" intensity={0.3}>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center">
            <h3 className="text-xl font-bold text-white">Always On</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Subtle continuous glitch
            </p>
          </div>
        </GlitchTransition>
      </div>
    ),
    code: `<GlitchTransition trigger="always" intensity={0.3}>
  <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
    <h3 className="text-xl font-bold text-white">Always On</h3>
    <p className="mt-1 text-sm text-zinc-400">Subtle continuous glitch</p>
  </div>
</GlitchTransition>`,
    filename: "always-active.tsx",
  },
];

export function GlitchTransitionExamples() {
  return <ShowcaseGrid items={examples} />;
}
