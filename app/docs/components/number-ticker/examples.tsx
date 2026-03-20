"use client";

import React from "react";
import { NumberTicker } from "@/components/flexui/number-ticker";

function StatsRow() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Platform Stats
      </h3>
      <div className="grid grid-cols-3 gap-8">
        <div className="text-center">
          <NumberTicker
            value={50000}
            suffix="+"
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-zinc-500">Downloads</p>
        </div>
        <div className="text-center">
          <NumberTicker
            value={4.9}
            decimals={1}
            stiffness={80}
            damping={20}
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-zinc-500">Rating</p>
        </div>
        <div className="text-center">
          <NumberTicker
            value={128}
            prefix="#"
            stiffness={120}
            damping={25}
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-zinc-500">Contributors</p>
        </div>
      </div>
    </div>
  );
}

function PricingExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8 text-center">
      <p className="text-sm text-zinc-500">Starting at</p>
      <div className="mt-2 flex items-baseline justify-center gap-1">
        <NumberTicker
          value={29}
          prefix="$"
          stiffness={60}
          damping={15}
          className="text-6xl font-black text-white"
        />
        <span className="text-lg text-zinc-500">/mo</span>
      </div>
    </div>
  );
}

function PercentageExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <div className="flex items-center justify-around">
        <div className="text-center">
          <NumberTicker
            value={99.99}
            suffix="%"
            decimals={2}
            stiffness={50}
            damping={20}
            className="text-4xl font-bold text-emerald-400"
          />
          <p className="mt-1 text-sm text-zinc-500">Uptime SLA</p>
        </div>
        <div className="text-center">
          <NumberTicker
            value={3.2}
            suffix="ms"
            decimals={1}
            stiffness={150}
            damping={20}
            className="text-4xl font-bold text-blue-400"
          />
          <p className="mt-1 text-sm text-zinc-500">Avg Latency</p>
        </div>
      </div>
    </div>
  );
}

export function NumberTickerExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Stats Dashboard</h3>
        <StatsRow />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Pricing</h3>
        <PricingExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Performance Metrics</h3>
        <PercentageExample />
      </div>
    </div>
  );
}
