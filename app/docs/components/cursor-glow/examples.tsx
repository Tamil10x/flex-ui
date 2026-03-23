"use client";

import React from "react";
import { CursorGlow } from "@/components/flexui/cursor-glow";

function DefaultExample() {
  return (
    <CursorGlow className="w-72">
      <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6">
        <h3 className="text-base font-bold text-white">Default Glow</h3>
        <p className="mt-2 text-sm text-zinc-400">Purple + blue trail.</p>
      </div>
    </CursorGlow>
  );
}

function EmeraldExample() {
  return (
    <CursorGlow
      className="w-72"
      glowColor="16,185,129"
      secondaryColor="52,211,153"
    >
      <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6">
        <h3 className="text-base font-bold text-white">Emerald Glow</h3>
        <p className="mt-2 text-sm text-zinc-400">Green dual-tone trail.</p>
      </div>
    </CursorGlow>
  );
}

function NoTrailExample() {
  return (
    <CursorGlow className="w-72" trail={false} glowColor="245,158,11">
      <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6">
        <h3 className="text-base font-bold text-white">No Trail</h3>
        <p className="mt-2 text-sm text-zinc-400">Single-layer amber glow.</p>
      </div>
    </CursorGlow>
  );
}

function IntenseExample() {
  return (
    <CursorGlow
      className="w-72"
      glowColor="236,72,153"
      secondaryColor="217,70,239"
      glowOpacity={0.3}
      glowSize={450}
    >
      <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6">
        <h3 className="text-base font-bold text-white">Intense Pink</h3>
        <p className="mt-2 text-sm text-zinc-400">
          High opacity, large radius for bold effect.
        </p>
      </div>
    </CursorGlow>
  );
}

function GridExample() {
  return (
    <CursorGlow className="w-full max-w-xl" glowSize={500}>
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-6">
        {["Design", "Develop", "Deploy", "Scale"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-center"
          >
            <p className="text-sm font-medium text-zinc-300">{label}</p>
          </div>
        ))}
      </div>
    </CursorGlow>
  );
}

export function CursorGlowExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <EmeraldExample />
        <p className="text-xs text-zinc-500">Emerald</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <NoTrailExample />
        <p className="text-xs text-zinc-500">No Trail</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <IntenseExample />
        <p className="text-xs text-zinc-500">Intense Pink</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <GridExample />
        <p className="text-xs text-zinc-500">Grid Layout</p>
      </div>
    </div>
  );
}
