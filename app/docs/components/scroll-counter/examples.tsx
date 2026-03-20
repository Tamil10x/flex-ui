"use client";

import React from "react";
import { ScrollCounter } from "@/components/flexui/scroll-counter";

function StatsRow() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Platform Stats
      </h3>
      <div className="grid grid-cols-3 gap-8">
        <div className="text-center">
          <ScrollCounter
            to={50000}
            suffix="+"
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-zinc-500">Downloads</p>
        </div>
        <div className="text-center">
          <ScrollCounter
            to={4.9}
            decimals={1}
            duration={3}
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-zinc-500">Rating</p>
        </div>
        <div className="text-center">
          <ScrollCounter
            to={128}
            prefix="#"
            className="text-3xl font-bold text-white"
          />
          <p className="mt-1 text-sm text-zinc-500">Contributors</p>
        </div>
      </div>
    </div>
  );
}

function CountdownExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8 text-center">
      <p className="text-sm text-zinc-500">Counting from a custom start</p>
      <div className="mt-4 flex items-baseline justify-center gap-1">
        <ScrollCounter
          from={1000}
          to={0}
          duration={3}
          className="text-6xl font-black text-white"
        />
      </div>
      <p className="mt-2 text-xs text-zinc-600">from=1000 to=0</p>
    </div>
  );
}

function CurrencyExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <div className="flex items-center justify-around">
        <div className="text-center">
          <ScrollCounter
            to={1299.99}
            prefix="$"
            decimals={2}
            duration={2.5}
            className="text-4xl font-bold text-emerald-400"
          />
          <p className="mt-1 text-sm text-zinc-500">Revenue</p>
        </div>
        <div className="text-center">
          <ScrollCounter
            from={100}
            to={73}
            suffix="%"
            duration={2}
            className="text-4xl font-bold text-blue-400"
          />
          <p className="mt-1 text-sm text-zinc-500">Conversion</p>
        </div>
      </div>
    </div>
  );
}

export function ScrollCounterExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Stats Dashboard</h3>
        <StatsRow />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Count Down</h3>
        <CountdownExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Currency & Percentages</h3>
        <CurrencyExample />
      </div>
    </div>
  );
}
