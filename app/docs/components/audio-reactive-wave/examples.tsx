"use client";

import React from "react";
import { AudioReactiveWave } from "@/components/flexui/audio-reactive-wave";

function DefaultExample() {
  return (
    <AudioReactiveWave className="flex min-h-[300px] items-center justify-center rounded-2xl">
      <h2 className="text-3xl font-bold text-white">Default Wave</h2>
    </AudioReactiveWave>
  );
}

function CyanWaveExample() {
  return (
    <AudioReactiveWave
      className="flex min-h-[300px] items-center justify-center rounded-2xl"
      color="#06B6D4"
      accentColor="#22D3EE"
      bars={48}
      gap={3}
    >
      <h2 className="text-3xl font-bold text-white">Cyan Wave</h2>
    </AudioReactiveWave>
  );
}

function DenseWaveExample() {
  return (
    <AudioReactiveWave
      className="flex min-h-[300px] items-center justify-center rounded-2xl"
      color="#F43F5E"
      accentColor="#FB923C"
      bars={128}
      gap={1}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Dense Bars</h2>
        <p className="mt-2 text-zinc-400">128 bars with 1px gap.</p>
      </div>
    </AudioReactiveWave>
  );
}

export function AudioReactiveWaveExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Cyan Wave</h3>
        <CyanWaveExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Dense Bars</h3>
        <DenseWaveExample />
      </div>
    </div>
  );
}
