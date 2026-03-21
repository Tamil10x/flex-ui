"use client";

import React from "react";
import { RetroGrid } from "@/components/flexui/retro-grid";

function DefaultExample() {
  return (
    <RetroGrid className="h-[300px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-400">Default violet grid</p>
      </div>
    </RetroGrid>
  );
}

function CyanGridExample() {
  return (
    <RetroGrid
      color="rgba(56,189,248,0.2)"
      cellSize={50}
      speed={1.5}
      className="h-[300px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-cyan-400">Cyan grid &mdash; faster scroll</p>
      </div>
    </RetroGrid>
  );
}

function StaticGridExample() {
  return (
    <RetroGrid
      color="rgba(234,179,8,0.12)"
      angle={55}
      animate={false}
      cellSize={30}
      className="h-[300px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-yellow-400">Static gold grid &mdash; no animation</p>
      </div>
    </RetroGrid>
  );
}

export function RetroGridExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default Grid</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Cyan Fast Grid</h3>
        <CyanGridExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Static Gold Grid</h3>
        <StaticGridExample />
      </div>
    </div>
  );
}
