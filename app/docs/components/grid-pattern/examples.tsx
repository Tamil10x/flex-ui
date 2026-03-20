"use client";

import React from "react";
import { GridPattern } from "@/components/flexui/grid-pattern";

function DefaultGridExample() {
  return (
    <GridPattern
      size={48}
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-400">Default grid &mdash; no fade</p>
      </div>
    </GridPattern>
  );
}

function FadedGridExample() {
  return (
    <GridPattern
      size={32}
      fade
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-400">Faded radial mask</p>
      </div>
    </GridPattern>
  );
}

function ColoredGridExample() {
  return (
    <GridPattern
      size={36}
      color="rgb(59 130 246)"
      opacity={0.12}
      fade
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-blue-400">Blue-tinted grid with fade</p>
      </div>
    </GridPattern>
  );
}

export function GridPatternExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default Grid</h3>
        <DefaultGridExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Faded Grid</h3>
        <FadedGridExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Custom Color Grid</h3>
        <ColoredGridExample />
      </div>
    </div>
  );
}
