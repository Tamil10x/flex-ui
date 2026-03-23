"use client";

import React from "react";
import { NeuralNetwork } from "@/components/flexui/neural-network";

function DefaultExample() {
  return (
    <NeuralNetwork className="flex min-h-[300px] items-center justify-center rounded-2xl bg-black">
      <h2 className="text-3xl font-bold text-white">Default Network</h2>
    </NeuralNetwork>
  );
}

function CyanExample() {
  return (
    <NeuralNetwork
      className="flex min-h-[300px] items-center justify-center rounded-2xl bg-black"
      nodeCount={50}
      color="#38BDF8"
      connectionColor="rgba(56,189,248,0.2)"
      connectionDistance={180}
    >
      <h2 className="text-3xl font-bold text-white">Cyan Dense</h2>
    </NeuralNetwork>
  );
}

function FastExample() {
  return (
    <NeuralNetwork
      className="flex min-h-[300px] items-center justify-center rounded-2xl bg-black"
      nodeCount={20}
      color="#F472B6"
      connectionColor="rgba(244,114,182,0.15)"
      speed={2.5}
      connectionDistance={200}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Fast Synapses</h2>
        <p className="mt-2 text-zinc-400">Speed 2.5x, fewer nodes.</p>
      </div>
    </NeuralNetwork>
  );
}

export function NeuralNetworkExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Cyan Dense</h3>
        <CyanExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Fast Synapses</h3>
        <FastExample />
      </div>
    </div>
  );
}
