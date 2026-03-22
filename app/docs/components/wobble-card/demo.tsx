"use client";

import React from "react";
import { WobbleCard } from "@/components/flexui/wobble-card";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <WobbleCard className="max-w-xs">
        <div className="space-y-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 text-lg font-bold text-white">
            W
          </div>
          <h3 className="text-lg font-semibold text-white">Wobble Card</h3>
          <p className="text-sm text-zinc-400">
            Hover and move your cursor over this card to see the wobbly spring
            animation. It bounces back when you leave.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}
