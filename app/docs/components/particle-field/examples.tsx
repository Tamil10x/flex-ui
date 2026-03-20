"use client";

import React from "react";
import { ParticleField } from "@/components/flexui/particle-field";

function DefaultExample() {
  return (
    <ParticleField className="flex min-h-[300px] items-center justify-center rounded-2xl">
      <h2 className="text-3xl font-bold text-white">Default Particles</h2>
    </ParticleField>
  );
}

function ColoredExample() {
  return (
    <ParticleField
      className="flex min-h-[300px] items-center justify-center rounded-2xl"
      count={60}
      color="rgba(56, 189, 248, 0.7)"
      maxSize={5}
    >
      <h2 className="text-3xl font-bold text-white">Cyan Particles</h2>
    </ParticleField>
  );
}

function DenseExample() {
  return (
    <ParticleField
      className="flex min-h-[300px] items-center justify-center rounded-2xl"
      count={100}
      color="rgba(168, 85, 247, 0.5)"
      maxSize={3}
      speed={0.5}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Dense &amp; Slow</h2>
        <p className="mt-2 text-zinc-400">100 particles, half speed.</p>
      </div>
    </ParticleField>
  );
}

export function ParticleFieldExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Colored Particles</h3>
        <ColoredExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Dense &amp; Slow</h3>
        <DenseExample />
      </div>
    </div>
  );
}
