"use client";

import React from "react";
import { CounterUp } from "@/components/flexui/counter-up";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "cu-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A simple counter that counts up to a target number on scroll.",
    preview: (
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <CounterUp end={1248} className="text-5xl" />
          <span className="text-sm text-zinc-500">Total Users</span>
        </div>
      </div>
    ),
    code: `<CounterUp end={1248} className="text-5xl" />`,
    filename: "default.tsx",
  },
  {
    id: "cu-stats-row",
    title: "Stats Row",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Multiple counters side by side for a statistics dashboard.",
    preview: (
      <div className="flex items-center justify-center gap-12">
        <div className="flex flex-col items-center gap-2">
          <CounterUp end={120} className="text-4xl" />
          <span className="text-xs text-zinc-500">Customers</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CounterUp end={4500} duration={3000} className="text-4xl" />
          <span className="text-xs text-zinc-500">Downloads</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <CounterUp end={99} duration={1500} className="text-4xl" />
          <span className="text-xs text-zinc-500">Uptime %</span>
        </div>
      </div>
    ),
    code: `<div className="flex gap-12">
  <div className="text-center">
    <CounterUp end={120} className="text-4xl" />
    <p className="text-xs text-zinc-500">Customers</p>
  </div>
  <div className="text-center">
    <CounterUp end={4500} duration={3000} className="text-4xl" />
    <p className="text-xs text-zinc-500">Downloads</p>
  </div>
  <div className="text-center">
    <CounterUp end={99} duration={1500} className="text-4xl" />
    <p className="text-xs text-zinc-500">Uptime %</p>
  </div>
</div>`,
    filename: "stats-row.tsx",
  },
  {
    id: "cu-slow",
    title: "Slow Dramatic",
    tag: "Duration",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A large counter with extended 5-second duration for dramatic effect.",
    preview: (
      <div className="flex flex-col items-center gap-2">
        <CounterUp end={9999} duration={5000} className="text-6xl text-cyan-400" />
        <span className="text-sm text-zinc-500">Revenue</span>
      </div>
    ),
    code: `<CounterUp end={9999} duration={5000} className="text-6xl text-cyan-400" />`,
    filename: "slow-dramatic.tsx",
  },
  {
    id: "cu-small",
    title: "Inline Small",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Small inline counter that blends with body text.",
    preview: (
      <p className="text-sm text-zinc-400">
        We have served{" "}
        <CounterUp end={5280} duration={2000} className="text-sm text-white" />{" "}
        customers across{" "}
        <CounterUp end={42} duration={1500} className="text-sm text-white" />{" "}
        countries.
      </p>
    ),
    code: `<p className="text-sm text-zinc-400">
  We have served{" "}
  <CounterUp end={5280} duration={2000} className="text-sm text-white" />{" "}
  customers across{" "}
  <CounterUp end={42} duration={1500} className="text-sm text-white" />{" "}
  countries.
</p>`,
    filename: "inline-small.tsx",
  },
];

export function CounterUpExamples() {
  return <ShowcaseGrid items={examples} />;
}
