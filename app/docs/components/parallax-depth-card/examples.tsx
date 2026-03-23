"use client";

import React from "react";
import { ParallaxDepthCard } from "@/components/flexui/parallax-depth-card";

function DefaultExample() {
  return (
    <ParallaxDepthCard className="w-72">
      <ParallaxDepthCard.Layer depth={0.5} className="p-6 pb-2">
        <div className="h-20 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={1.2} className="px-6 pb-6">
        <h3 className="text-base font-bold text-white">Default Parallax</h3>
        <p className="mt-1 text-sm text-zinc-400">Two layers at different depths.</p>
      </ParallaxDepthCard.Layer>
    </ParallaxDepthCard>
  );
}

function DramaticExample() {
  return (
    <ParallaxDepthCard className="w-72" maxTilt={20} perspective={600} maxShift={35}>
      <ParallaxDepthCard.Layer depth={0.2} className="p-6 pb-2">
        <div className="h-20 rounded-lg bg-gradient-to-br from-amber-500/20 to-red-500/20" />
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={2} className="px-6 pb-6">
        <h3 className="text-base font-bold text-white">Dramatic Tilt</h3>
        <p className="mt-1 text-sm text-zinc-400">Max tilt 20deg, high parallax shift.</p>
      </ParallaxDepthCard.Layer>
    </ParallaxDepthCard>
  );
}

function ThreeLayerExample() {
  return (
    <ParallaxDepthCard className="w-72">
      <ParallaxDepthCard.Layer depth={0.2} className="p-6 pb-0">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
          Background
        </span>
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={1} className="px-6 py-3">
        <h3 className="text-base font-bold text-white">Three Layers</h3>
        <p className="mt-1 text-sm text-zinc-400">Stacked depth planes.</p>
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={2} className="px-6 pb-6">
        <div className="flex gap-2">
          <span className="rounded-md border border-purple-500/20 bg-purple-500/10 px-2 py-1 text-[11px] text-purple-400">
            Foreground
          </span>
          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
            depth=2
          </span>
        </div>
      </ParallaxDepthCard.Layer>
    </ParallaxDepthCard>
  );
}

function FeatureCardExample() {
  return (
    <ParallaxDepthCard className="w-full max-w-md">
      <ParallaxDepthCard.Layer depth={0.3} className="p-6 pb-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-xl text-blue-400">
          &#9733;
        </div>
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={1} className="p-6 pt-4">
        <h3 className="text-lg font-bold text-white">Feature Highlight</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Combine with icons and content for a stunning feature card with real
          depth perception.
        </p>
      </ParallaxDepthCard.Layer>
      <ParallaxDepthCard.Layer depth={1.5} className="px-6 pb-6">
        <button className="mt-2 rounded-lg bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.1]">
          Learn More
        </button>
      </ParallaxDepthCard.Layer>
    </ParallaxDepthCard>
  );
}

export function ParallaxDepthCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <DramaticExample />
        <p className="text-xs text-zinc-500">Dramatic Tilt</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ThreeLayerExample />
        <p className="text-xs text-zinc-500">Three Layers</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FeatureCardExample />
        <p className="text-xs text-zinc-500">Feature Card</p>
      </div>
    </div>
  );
}
