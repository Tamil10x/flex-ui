"use client";

import React from "react";
import { GravityGrid } from "@/components/flexui/gravity-grid";

function DefaultExample() {
  return (
    <GravityGrid className="flex min-h-[300px] items-center justify-center rounded-2xl bg-black">
      <h2 className="text-3xl font-bold text-white">Default Repel</h2>
    </GravityGrid>
  );
}

function AttractExample() {
  return (
    <GravityGrid
      className="flex min-h-[300px] items-center justify-center rounded-2xl bg-black"
      cols={14}
      rows={10}
      effect="attract"
      color="rgba(56,189,248,0.5)"
      radius={120}
    >
      <h2 className="text-3xl font-bold text-white">Attract Mode</h2>
    </GravityGrid>
  );
}

function DenseExample() {
  return (
    <GravityGrid
      className="flex min-h-[300px] items-center justify-center rounded-2xl bg-black"
      cols={20}
      rows={14}
      dotSize={3}
      color="rgba(244,114,182,0.4)"
      radius={80}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Dense Pink</h2>
        <p className="mt-2 text-zinc-400">20x14 grid, smaller dots.</p>
      </div>
    </GravityGrid>
  );
}

export function GravityGridExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Attract Mode</h3>
        <AttractExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Dense Pink</h3>
        <DenseExample />
      </div>
    </div>
  );
}
