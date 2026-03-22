"use client";

import React, { useState } from "react";
import { AnimatedCounter } from "@/components/flexui/animated-counter";

export function ComponentDemo() {
  const [count, setCount] = useState(1284);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <AnimatedCounter value={count} className="text-5xl" />
      <div className="flex gap-3">
        <button
          onClick={() => setCount((c) => c - 10)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
        >
          -10
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
        >
          +1
        </button>
        <button
          onClick={() => setCount((c) => c + 10)}
          className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
        >
          +10
        </button>
        <button
          onClick={() => setCount(Math.floor(Math.random() * 9999))}
          className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-500/20"
        >
          Random
        </button>
      </div>
    </div>
  );
}
