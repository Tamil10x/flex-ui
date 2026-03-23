"use client";

import React from "react";
import { HolographicCard } from "@/components/flexui/holographic-card";

function DefaultExample() {
  return (
    <HolographicCard className="w-72 p-6">
      <h3 className="text-base font-bold text-white">Default</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Rainbow holographic foil with default intensity.
      </p>
    </HolographicCard>
  );
}

function HighIntensityExample() {
  return (
    <HolographicCard className="w-72 p-6" intensity={1}>
      <h3 className="text-base font-bold text-white">Full Intensity</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Maximum holographic effect with{" "}
        <code className="rounded bg-zinc-800 px-1 py-0.5 text-xs text-zinc-300">
          intensity={"{1}"}
        </code>
        .
      </p>
    </HolographicCard>
  );
}

function WithContentExample() {
  return (
    <HolographicCard className="w-72 p-6" intensity={0.8}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-400 text-lg">
          &#9733;
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Rare Card</h3>
          <p className="text-[11px] text-zinc-500">Holographic Edition</p>
        </div>
      </div>
      <p className="text-sm text-zinc-400">
        Move your cursor to see the rainbow foil effect shift and shimmer
        across the card surface.
      </p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
          CSS
        </span>
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
          conic-gradient
        </span>
      </div>
    </HolographicCard>
  );
}

export function HolographicCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <HighIntensityExample />
        <p className="text-xs text-zinc-500">Full Intensity</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <WithContentExample />
        <p className="text-xs text-zinc-500">With Content</p>
      </div>
    </div>
  );
}
