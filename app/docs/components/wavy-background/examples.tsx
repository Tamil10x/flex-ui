"use client";

import React from "react";
import { WavyBackground } from "@/components/flexui/wavy-background";

function CyanWavesExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <WavyBackground
        waveCount={8}
        color="rgba(6, 182, 212, 0.15)"
        speed={12}
        className="flex h-[300px] items-center justify-center bg-zinc-950"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Cyan Waves</h2>
          <p className="mt-2 text-sm text-white/60">
            8 wave lines with a cyan tint
          </p>
        </div>
      </WavyBackground>
    </div>
  );
}

function LargeAmplitudeExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <WavyBackground
        waveCount={4}
        amplitude={60}
        speed={20}
        color="rgba(139, 92, 246, 0.12)"
        className="flex h-[300px] items-center justify-center bg-zinc-950"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Large Amplitude</h2>
          <p className="mt-2 text-sm text-white/60">
            Dramatic wave height with slow drift
          </p>
        </div>
      </WavyBackground>
    </div>
  );
}

function MinimalWavesExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] overflow-hidden">
      <WavyBackground
        waveCount={3}
        amplitude={15}
        speed={25}
        color="rgba(255, 255, 255, 0.06)"
        className="flex h-[300px] items-center justify-center bg-zinc-950"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-white">Minimal</h2>
          <p className="text-sm text-zinc-400 max-w-sm">
            Just 3 faint waves with low amplitude for an ultra-subtle background
            texture.
          </p>
        </div>
      </WavyBackground>
    </div>
  );
}

export function WavyBackgroundExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Cyan Waves
        </h3>
        <CyanWavesExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Large Amplitude
        </h3>
        <LargeAmplitudeExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">
          Minimal
        </h3>
        <MinimalWavesExample />
      </div>
    </div>
  );
}
