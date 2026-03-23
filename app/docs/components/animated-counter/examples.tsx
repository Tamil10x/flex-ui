"use client";

import React, { useState } from "react";
import { AnimatedCounter } from "@/components/flexui/animated-counter";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { TrendingUp, DollarSign, Users, Zap } from "lucide-react";

function DefaultExample() {
  const [count, setCount] = useState(1284);
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedCounter value={count} className="text-5xl" />
      <div className="flex gap-2">
        <button onClick={() => setCount((c) => c + 1)} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-white hover:bg-white/[0.08]">+1</button>
        <button onClick={() => setCount((c) => c + 100)} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-white hover:bg-white/[0.08]">+100</button>
        <button onClick={() => setCount(Math.floor(Math.random() * 9999))} className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-sm text-purple-400 hover:bg-purple-500/20">Random</button>
      </div>
    </div>
  );
}

function StatsExample() {
  const [revenue, setRevenue] = useState(48250);
  const [users, setUsers] = useState(3847);
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <button onClick={() => { setRevenue((r) => r + 150); setUsers((u) => u + 12); }} className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-400 hover:bg-emerald-500/20">Simulate Growth</button>
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-zinc-900/50 px-5 py-3">
        <DollarSign className="h-5 w-5 text-emerald-400" />
        <div>
          <p className="text-xs text-zinc-500">Revenue</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-zinc-400">$</span>
            <AnimatedCounter value={revenue} className="text-2xl text-emerald-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-zinc-900/50 px-5 py-3">
        <Users className="h-5 w-5 text-blue-400" />
        <div>
          <p className="text-xs text-zinc-500">Users</p>
          <AnimatedCounter value={users} className="text-2xl text-blue-400" />
        </div>
      </div>
    </div>
  );
}

function LargeExample() {
  const [val, setVal] = useState(99);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-8 w-8 text-amber-400" />
        <AnimatedCounter value={val} className="text-7xl text-amber-400" />
        <span className="text-3xl font-bold text-amber-400/60">%</span>
      </div>
      <button onClick={() => setVal(Math.floor(Math.random() * 100))} className="rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/20">Randomize</button>
    </div>
  );
}

function InlineExample() {
  const [msgs, setMsgs] = useState(42);
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-zinc-400">
        You have <AnimatedCounter value={msgs} className="text-lg text-white" /> unread messages and{" "}
        <AnimatedCounter value={msgs * 3} className="text-lg text-cyan-400" /> total notifications.
      </p>
      <div className="flex gap-2">
        <button onClick={() => setMsgs((m) => m + 1)} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-sm text-white hover:bg-white/[0.08]">
          <Zap className="inline h-3 w-3 mr-1" />New Message
        </button>
        <button onClick={() => setMsgs(0)} className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/20">Clear</button>
      </div>
    </div>
  );
}

const examples = [
  {
    id: "counter-default",
    title: "Default Interactive",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Per-digit spring animation with increment and random controls.",
    preview: <DefaultExample />,
    code: `const [count, setCount] = useState(1284);

<AnimatedCounter value={count} className="text-5xl" />
<button onClick={() => setCount(c => c + 1)}>+1</button>
<button onClick={() => setCount(Math.floor(Math.random() * 9999))}>Random</button>`,
    filename: "default.tsx",
  },
  {
    id: "counter-stats",
    title: "Stats Dashboard",
    tag: "Compose",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Revenue and user count cards with animated counters and Lucide icons.",
    preview: <StatsExample />,
    code: `import { DollarSign, Users } from "lucide-react";

const [revenue, setRevenue] = useState(48250);
const [users, setUsers] = useState(3847);

<div className="flex items-center gap-3">
  <DollarSign className="h-5 w-5 text-emerald-400" />
  <span className="text-sm text-zinc-400">$</span>
  <AnimatedCounter value={revenue} className="text-2xl text-emerald-400" />
</div>

<div className="flex items-center gap-3">
  <Users className="h-5 w-5 text-blue-400" />
  <AnimatedCounter value={users} className="text-2xl text-blue-400" />
</div>`,
    filename: "stats.tsx",
  },
  {
    id: "counter-large",
    title: "Large Display",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Extra-large counter with icon and suffix for hero-style metrics.",
    preview: <LargeExample />,
    code: `import { TrendingUp } from "lucide-react";

const [val, setVal] = useState(99);

<div className="flex items-center gap-3">
  <TrendingUp className="h-8 w-8 text-amber-400" />
  <AnimatedCounter value={val} className="text-7xl text-amber-400" />
  <span className="text-3xl font-bold text-amber-400/60">%</span>
</div>`,
    filename: "large.tsx",
  },
  {
    id: "counter-inline",
    title: "Inline Text",
    tag: "Layout",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Counter embedded within body text for inline numeric updates.",
    preview: <InlineExample />,
    code: `const [msgs, setMsgs] = useState(42);

<p className="text-sm text-zinc-400">
  You have <AnimatedCounter value={msgs} className="text-lg text-white" /> unread
  messages and <AnimatedCounter value={msgs * 3} className="text-lg text-cyan-400" /> total notifications.
</p>`,
    filename: "inline.tsx",
  },
];

export function AnimatedCounterExamples() {
  return <ShowcaseGrid items={examples} />;
}
