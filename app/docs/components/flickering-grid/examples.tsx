"use client";

import React from "react";
import { FlickeringGrid } from "@/components/flexui/flickering-grid";

function DefaultExample() {
  return (
    <FlickeringGrid
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-400">Default &mdash; violet flicker</p>
      </div>
    </FlickeringGrid>
  );
}

function CyanDenseExample() {
  return (
    <FlickeringGrid
      color="rgba(34,211,238,0.35)"
      cellSize={6}
      gap={1}
      density={0.25}
      speed={5}
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-cyan-400">Dense cyan grid &mdash; fast flicker</p>
      </div>
    </FlickeringGrid>
  );
}

function LargeSlowExample() {
  return (
    <FlickeringGrid
      color="rgba(249,115,22,0.25)"
      cellSize={14}
      gap={4}
      density={0.1}
      speed={1}
      className="h-[250px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-orange-400">Large cells &mdash; slow pulse</p>
      </div>
    </FlickeringGrid>
  );
}

export function FlickeringGridExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Dense Cyan</h3>
        <CyanDenseExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Large Slow Cells</h3>
        <LargeSlowExample />
      </div>
    </div>
  );
}
