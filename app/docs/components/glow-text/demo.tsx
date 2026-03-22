"use client";

import React from "react";
import { GlowText } from "@/components/flexui/glow-text";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <GlowText className="text-4xl">Glowing Text</GlowText>
      <GlowText className="text-2xl" color="rgb(168,85,247)">
        Purple Glow
      </GlowText>
      <GlowText className="text-2xl" color="rgb(52,211,153)">
        Emerald Glow
      </GlowText>
    </div>
  );
}
