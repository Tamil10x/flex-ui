"use client";

import React from "react";
import { CounterUp } from "@/components/flexui/counter-up";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-12 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex flex-col items-center gap-2">
        <CounterUp end={1248} className="text-5xl" />
        <span className="text-sm text-zinc-500">Users</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CounterUp end={56} duration={1500} className="text-5xl" />
        <span className="text-sm text-zinc-500">Countries</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CounterUp end={99} duration={2500} className="text-5xl" />
        <span className="text-sm text-zinc-500">Uptime %</span>
      </div>
    </div>
  );
}
