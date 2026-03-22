"use client";

import React from "react";
import { PulseButton } from "@/components/flexui/pulse-button";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <PulseButton>Get Started</PulseButton>
      <PulseButton color="rgba(139,92,246,0.5)" pulseCount={2}>
        Subscribe
      </PulseButton>
      <PulseButton color="rgba(52,211,153,0.5)" pulseCount={4}>
        Join Now
      </PulseButton>
    </div>
  );
}
