"use client";

import React from "react";
import { DotPattern } from "@/components/flexui/dot-pattern";

function DefaultDotExample() {
  return (
    <DotPattern
      spacing={20}
      dotSize={1}
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-400">Default dots &mdash; no fade</p>
      </div>
    </DotPattern>
  );
}

function FadedDotExample() {
  return (
    <DotPattern
      spacing={28}
      dotSize={1.5}
      fade
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-400">Faded radial mask</p>
      </div>
    </DotPattern>
  );
}

function ColoredDotExample() {
  return (
    <DotPattern
      spacing={18}
      dotSize={1.4}
      color="rgb(168 85 247 / 0.5)"
      fade
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-purple-400">Purple dots with fade</p>
      </div>
    </DotPattern>
  );
}

export function DotPatternExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default Dots</h3>
        <DefaultDotExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Faded Dots</h3>
        <FadedDotExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Custom Color Dots</h3>
        <ColoredDotExample />
      </div>
    </div>
  );
}
