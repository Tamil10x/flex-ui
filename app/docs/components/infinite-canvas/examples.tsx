"use client";

import React from "react";
import { InfiniteCanvas } from "@/components/flexui/infinite-canvas";

function DefaultExample() {
  return (
    <InfiniteCanvas className="h-[400px] rounded-2xl border border-white/[0.06]">
      <div className="absolute left-[80px] top-[60px] rounded-xl border border-white/[0.08] bg-zinc-900/80 p-5 backdrop-blur-sm">
        <h3 className="font-bold text-white">Node 1</h3>
        <p className="mt-1 text-xs text-zinc-500">Default canvas with grid</p>
      </div>
      <div className="absolute left-[300px] top-[150px] rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
        <h3 className="font-bold text-emerald-300">Node 2</h3>
        <p className="mt-1 text-xs text-emerald-400/60">Connected element</p>
      </div>
    </InfiniteCanvas>
  );
}

function NoGridExample() {
  return (
    <InfiniteCanvas
      className="h-[400px] rounded-2xl border border-white/[0.06]"
      showGrid={false}
    >
      <div className="absolute left-[120px] top-[100px] rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-cyan-500/10 p-6">
        <h3 className="text-lg font-bold text-white">Clean Canvas</h3>
        <p className="mt-1 text-sm text-zinc-400">
          No grid, just floating content.
        </p>
      </div>
      <div className="absolute left-[350px] top-[220px] h-24 w-24 rounded-full border border-pink-500/20 bg-pink-500/10 flex items-center justify-center">
        <span className="text-2xl font-bold text-pink-300">!</span>
      </div>
    </InfiniteCanvas>
  );
}

function CustomZoomExample() {
  return (
    <InfiniteCanvas
      className="h-[400px] rounded-2xl border border-white/[0.06]"
      initialZoom={0.8}
      minZoom={0.1}
      maxZoom={5}
      gridSize={60}
    >
      <div className="absolute left-[60px] top-[40px] rounded-xl border border-amber-500/20 bg-amber-500/10 p-5">
        <h3 className="font-bold text-amber-300">Wide Range</h3>
        <p className="mt-1 text-xs text-amber-400/60">0.1x to 5x zoom</p>
      </div>
      <div className="absolute left-[250px] top-[160px] rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
        <h3 className="font-bold text-blue-300">Large Grid</h3>
        <p className="mt-1 text-xs text-blue-400/60">60px grid cells</p>
      </div>
      <div className="absolute left-[100px] top-[280px] rounded-xl border border-rose-500/20 bg-rose-500/10 p-5">
        <h3 className="font-bold text-rose-300">Initial 80%</h3>
        <p className="mt-1 text-xs text-rose-400/60">Starts zoomed out</p>
      </div>
    </InfiniteCanvas>
  );
}

export function InfiniteCanvasExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">No Grid</h3>
        <NoGridExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Custom Zoom Range
        </h3>
        <CustomZoomExample />
      </div>
    </div>
  );
}
