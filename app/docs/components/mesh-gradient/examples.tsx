"use client";

import React from "react";
import { MeshGradient } from "@/components/flexui/mesh-gradient";

function WarmSunsetExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <MeshGradient
        colors={[
          "rgba(249, 115, 22, 0.35)",
          "rgba(244, 63, 94, 0.35)",
          "rgba(245, 158, 11, 0.3)",
          "rgba(236, 72, 153, 0.3)",
        ]}
        className="flex h-[300px] items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Warm Sunset</h2>
          <p className="mt-2 text-sm text-white/60">
            Orange, rose, amber, and pink blobs
          </p>
        </div>
      </MeshGradient>
    </div>
  );
}

function OceanDeepExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <MeshGradient
        colors={[
          "rgba(6, 182, 212, 0.35)",
          "rgba(59, 130, 246, 0.35)",
          "rgba(99, 102, 241, 0.3)",
          "rgba(14, 165, 233, 0.3)",
        ]}
        blur={120}
        speed={25}
        className="flex h-[300px] items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Ocean Deep</h2>
          <p className="mt-2 text-sm text-white/60">
            Cyan, blue, indigo, and sky with extra blur
          </p>
        </div>
      </MeshGradient>
    </div>
  );
}

function SubtleBackgroundExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <MeshGradient
        colors={[
          "rgba(139, 92, 246, 0.15)",
          "rgba(6, 182, 212, 0.15)",
          "rgba(236, 72, 153, 0.15)",
          "rgba(16, 185, 129, 0.15)",
        ]}
        blur={80}
        speed={30}
        className="flex h-[300px] items-center justify-center"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Subtle Mode</h2>
          <p className="text-sm text-zinc-400 max-w-sm">
            Low opacity blobs with reduced blur for a subtle, elegant background
            that does not distract from content.
          </p>
        </div>
      </MeshGradient>
    </div>
  );
}

export function MeshGradientExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Warm Sunset
        </h3>
        <WarmSunsetExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Ocean Deep
        </h3>
        <OceanDeepExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Subtle Background
        </h3>
        <SubtleBackgroundExample />
      </div>
    </div>
  );
}
