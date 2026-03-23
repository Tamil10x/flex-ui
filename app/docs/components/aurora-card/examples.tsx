"use client";

import React from "react";
import { AuroraCard } from "@/components/flexui/aurora-card";

function DefaultExample() {
  return (
    <AuroraCard className="w-72 p-6">
      <h3 className="text-base font-bold text-white">Default Aurora</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Purple, blue, and emerald aurora with default settings.
      </p>
    </AuroraCard>
  );
}

function SunsetExample() {
  return (
    <AuroraCard
      className="w-72 p-6"
      primaryColor="245,158,11"
      secondaryColor="239,68,68"
      tertiaryColor="217,70,239"
    >
      <h3 className="text-base font-bold text-white">Sunset Aurora</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Warm amber, red, and pink tones for a sunset feel.
      </p>
    </AuroraCard>
  );
}

function OceanExample() {
  return (
    <AuroraCard
      className="w-72 p-6"
      primaryColor="6,182,212"
      secondaryColor="59,130,246"
      tertiaryColor="99,102,241"
    >
      <h3 className="text-base font-bold text-white">Ocean Aurora</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Cool cyan, blue, and indigo — deep ocean vibes.
      </p>
    </AuroraCard>
  );
}

function FeatureCardExample() {
  return (
    <AuroraCard className="w-72 p-6" intensity={0.9} spread={500}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 text-lg">
          &#10024;
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">AI Powered</h3>
          <p className="text-[11px] text-zinc-500">Next-gen features</p>
        </div>
      </div>
      <p className="text-sm text-zinc-400">
        High intensity aurora with wider spread — perfect for feature highlights.
      </p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
          framer-motion
        </span>
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-500">
          3 layers
        </span>
      </div>
    </AuroraCard>
  );
}

function FullWidthExample() {
  return (
    <AuroraCard
      className="w-full max-w-xl p-8"
      primaryColor="168,85,247"
      secondaryColor="236,72,153"
      tertiaryColor="244,114,182"
      spread={600}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Full Width Aurora</h3>
          <p className="mt-1 text-sm text-zinc-400">
            A wide card with expanded spread — ideal for hero sections
            or feature callouts.
          </p>
        </div>
        <span className="shrink-0 rounded-lg border border-pink-500/20 bg-pink-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-pink-400">
          Premium
        </span>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        {["3 Layers", "Spring Physics", "Mix Blend"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"
          >
            <p className="text-xs font-medium text-zinc-300">{label}</p>
          </div>
        ))}
      </div>
    </AuroraCard>
  );
}

export function AuroraCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <SunsetExample />
        <p className="text-xs text-zinc-500">Sunset</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <OceanExample />
        <p className="text-xs text-zinc-500">Ocean</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FeatureCardExample />
        <p className="text-xs text-zinc-500">Feature Card</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FullWidthExample />
        <p className="text-xs text-zinc-500">Full Width</p>
      </div>
    </div>
  );
}
