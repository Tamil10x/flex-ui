"use client";

import React from "react";
import { MorphingBorderCard } from "@/components/flexui/morphing-border-card";

function DefaultExample() {
  return (
    <MorphingBorderCard className="w-72 p-6">
      <h3 className="text-base font-bold text-white">Default</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Four-color rotating gradient border.
      </p>
    </MorphingBorderCard>
  );
}

function RainbowExample() {
  return (
    <MorphingBorderCard
      className="w-72 p-6"
      colors={[
        "239,68,68",
        "245,158,11",
        "234,179,8",
        "16,185,129",
        "59,130,246",
        "139,92,246",
        "236,72,153",
      ]}
      speed={6}
    >
      <h3 className="text-base font-bold text-white">Rainbow</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Seven-color spectrum with slower rotation.
      </p>
    </MorphingBorderCard>
  );
}

function MonochromeExample() {
  return (
    <MorphingBorderCard
      className="w-72 p-6"
      colors={["139,92,246", "168,85,247", "192,132,252"]}
      speed={3}
    >
      <h3 className="text-base font-bold text-white">Monochrome Purple</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Single-hue gradient for brand consistency.
      </p>
    </MorphingBorderCard>
  );
}

function FastGlowExample() {
  return (
    <MorphingBorderCard
      className="w-72 p-6"
      speed={1.5}
      borderWidth={3}
      glowIntensity={0.9}
      colors={["59,130,246", "139,92,246"]}
    >
      <h3 className="text-base font-bold text-white">Fast + Thick</h3>
      <p className="mt-2 text-sm text-zinc-400">
        1.5s rotation, 3px border, max glow.
      </p>
    </MorphingBorderCard>
  );
}

function FeatureExample() {
  return (
    <MorphingBorderCard className="w-full max-w-md p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400 text-lg">
          &#9889;
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Premium Feature</h3>
          <p className="text-[11px] text-zinc-500">Enterprise-grade</p>
        </div>
      </div>
      <p className="text-sm text-zinc-400">
        Combine morphing borders with rich content for premium feature cards
        that demand attention.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["4 Colors", "Rotating", "Glow"].map((label) => (
          <div
            key={label}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 text-center"
          >
            <p className="text-[11px] font-medium text-zinc-400">{label}</p>
          </div>
        ))}
      </div>
    </MorphingBorderCard>
  );
}

export function MorphingBorderCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <RainbowExample />
        <p className="text-xs text-zinc-500">Rainbow</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <MonochromeExample />
        <p className="text-xs text-zinc-500">Monochrome</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FastGlowExample />
        <p className="text-xs text-zinc-500">Fast + Thick</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <FeatureExample />
        <p className="text-xs text-zinc-500">Feature Card</p>
      </div>
    </div>
  );
}
