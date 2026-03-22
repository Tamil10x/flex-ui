"use client";

import React from "react";
import { DirectionHover } from "@/components/flexui/direction-hover";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <DirectionHover
        className="h-64 w-48"
        overlay={
          <div className="flex flex-col items-center gap-2 text-white">
            <p className="text-lg font-semibold">Mountain Peak</p>
            <p className="text-sm text-zinc-300">Hover from any direction</p>
          </div>
        }
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
          <span className="text-4xl">&#9968;</span>
        </div>
      </DirectionHover>
      <DirectionHover
        className="h-64 w-48"
        overlay={
          <div className="flex flex-col items-center gap-2 text-white">
            <p className="text-lg font-semibold">Ocean Wave</p>
            <p className="text-sm text-zinc-300">Direction-aware overlay</p>
          </div>
        }
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
          <span className="text-4xl">&#127754;</span>
        </div>
      </DirectionHover>
    </div>
  );
}
