"use client";

import React from "react";
import { NeonGlowCard } from "@/components/flexui/neon-glow-card";

function DefaultExample() {
  return (
    <NeonGlowCard className="w-72 p-6">
      <h3 className="text-base font-bold text-white">Default</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Blue neon glow with default settings.
      </p>
    </NeonGlowCard>
  );
}

function PurpleExample() {
  return (
    <NeonGlowCard className="w-72 p-6" color="#8B5CF6" intensity={1.5}>
      <h3 className="text-base font-bold text-white">Purple Neon</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Custom purple color with higher intensity.
      </p>
    </NeonGlowCard>
  );
}

function GreenNoPulseExample() {
  return (
    <NeonGlowCard className="w-72 p-6" color="#10B981" pulse={false}>
      <h3 className="text-base font-bold text-white">Static Glow</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Green neon with pulse animation disabled.
      </p>
    </NeonGlowCard>
  );
}

export function NeonGlowCardExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <PurpleExample />
        <p className="text-xs text-zinc-500">Purple, High Intensity</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <GreenNoPulseExample />
        <p className="text-xs text-zinc-500">Green, No Pulse</p>
      </div>
    </div>
  );
}
