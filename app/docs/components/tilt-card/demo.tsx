"use client";

import React from "react";
import { TiltCard } from "@/components/flexui/tilt-card";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <TiltCard className="max-w-xs">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 text-lg">
            <span role="img" aria-label="sparkle">&#x2728;</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Interactive Card</h3>
          <p className="text-sm text-zinc-400">
            Hover over this card to see the 3D tilt effect. Move your cursor
            around to watch it follow your movement.
          </p>
        </div>
      </TiltCard>
    </div>
  );
}
