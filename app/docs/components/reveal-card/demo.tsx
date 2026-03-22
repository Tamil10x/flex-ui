"use client";

import React from "react";
import { RevealCard } from "@/components/flexui/reveal-card";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <RevealCard title="Performance" className="w-64 h-40">
        Built for speed with zero-config optimizations and edge-first architecture.
      </RevealCard>
      <RevealCard title="Security" className="w-64 h-40">
        Enterprise-grade encryption and SOC 2 compliance out of the box.
      </RevealCard>
    </div>
  );
}
