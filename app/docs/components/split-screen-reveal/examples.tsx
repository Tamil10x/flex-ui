"use client";

import React, { useState } from "react";
import { SplitScreenReveal } from "@/components/flexui/split-screen-reveal";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── Horizontal Split ────────────────────────────────────────────────────────
function HorizontalSplitExample() {
  return (
    <SplitScreenReveal
      direction="horizontal"
      leftContent={
        <div className="text-center px-4">
          <p className="text-lg font-bold text-white">Before</p>
          <p className="mt-1 text-xs text-zinc-500">Click to split</p>
        </div>
      }
      rightContent={
        <div className="text-center px-4">
          <p className="text-lg font-bold text-white">After</p>
          <p className="mt-1 text-xs text-zinc-500">Click to split</p>
        </div>
      }
      className="h-[200px] rounded-xl border border-white/[0.08]"
    >
      <div className="flex h-full items-center justify-center bg-gradient-to-r from-violet-600/20 to-cyan-600/20">
        <p className="text-xl font-bold text-white">Revealed!</p>
      </div>
    </SplitScreenReveal>
  );
}

// ─── Vertical Split ─────────────────────────────────────────────────────────
function VerticalSplitExample() {
  return (
    <SplitScreenReveal
      direction="vertical"
      leftContent={
        <div className="text-center">
          <p className="text-lg font-bold text-white">Top Panel</p>
        </div>
      }
      rightContent={
        <div className="text-center">
          <p className="text-lg font-bold text-white">Bottom Panel</p>
        </div>
      }
      className="h-[200px] rounded-xl border border-white/[0.08]"
    >
      <div className="flex h-full items-center justify-center bg-gradient-to-b from-emerald-600/20 to-amber-600/20">
        <p className="text-xl font-bold text-white">Vertical Reveal</p>
      </div>
    </SplitScreenReveal>
  );
}

// ─── Controlled ─────────────────────────────────────────────────────────────
function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
      >
        {open ? "Close" : "Open"} Split
      </button>
      <SplitScreenReveal
        isOpen={open}
        onToggle={() => setOpen(!open)}
        leftContent={
          <div className="text-center px-4">
            <p className="text-lg font-bold text-white">Panel A</p>
          </div>
        }
        rightContent={
          <div className="text-center px-4">
            <p className="text-lg font-bold text-white">Panel B</p>
          </div>
        }
        className="h-[200px] rounded-xl border border-white/[0.08]"
      >
        <div className="flex h-full items-center justify-center bg-gradient-to-br from-rose-600/20 to-purple-600/20">
          <p className="text-xl font-bold text-white">Controlled State</p>
        </div>
      </SplitScreenReveal>
    </div>
  );
}

const examples = [
  {
    id: "ssr-horizontal",
    title: "Horizontal Split",
    tag: "Default",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    description: "Two panels split left and right to reveal hidden content.",
    preview: <HorizontalSplitExample />,
    code: `<SplitScreenReveal
  direction="horizontal"
  leftContent={<p className="text-lg font-bold text-white">Before</p>}
  rightContent={<p className="text-lg font-bold text-white">After</p>}
  className="h-[200px] rounded-xl border border-white/[0.08]"
>
  <div className="flex h-full items-center justify-center">
    <p className="text-xl font-bold text-white">Revealed!</p>
  </div>
</SplitScreenReveal>`,
    filename: "horizontal-split.tsx",
  },
  {
    id: "ssr-vertical",
    title: "Vertical Split",
    tag: "Direction",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    description: "Top and bottom panels slide apart vertically.",
    preview: <VerticalSplitExample />,
    code: `<SplitScreenReveal
  direction="vertical"
  leftContent={<p className="text-lg font-bold text-white">Top Panel</p>}
  rightContent={<p className="text-lg font-bold text-white">Bottom Panel</p>}
  className="h-[200px] rounded-xl border border-white/[0.08]"
>
  <div className="flex h-full items-center justify-center">
    <p className="text-xl font-bold text-white">Vertical Reveal</p>
  </div>
</SplitScreenReveal>`,
    filename: "vertical-split.tsx",
  },
  {
    id: "ssr-controlled",
    title: "Controlled State",
    tag: "Controlled",
    tagColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    description: "Control the split state externally with isOpen and onToggle.",
    preview: <ControlledExample />,
    code: `const [open, setOpen] = useState(false);

<button onClick={() => setOpen(!open)}>
  {open ? "Close" : "Open"} Split
</button>
<SplitScreenReveal
  isOpen={open}
  onToggle={() => setOpen(!open)}
  leftContent={<p>Panel A</p>}
  rightContent={<p>Panel B</p>}
>
  <div>Controlled State</div>
</SplitScreenReveal>`,
    filename: "controlled-split.tsx",
  },
];

export function SplitScreenRevealExamples() {
  return <ShowcaseGrid items={examples} />;
}
