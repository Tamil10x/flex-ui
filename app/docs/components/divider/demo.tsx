"use client";

import React from "react";
import { Divider } from "@/components/flexui/divider";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="w-full max-w-md space-y-6">
        <p className="text-center text-sm text-zinc-400">Default divider</p>
        <Divider />

        <p className="text-center text-sm text-zinc-400">Gradient divider</p>
        <Divider gradient />

        <p className="text-center text-sm text-zinc-400">Divider with label</p>
        <Divider label="OR" gradient />

        <div className="flex h-12 items-center justify-center gap-4">
          <span className="text-sm text-zinc-400">Left</span>
          <Divider orientation="vertical" gradient />
          <span className="text-sm text-zinc-400">Right</span>
        </div>
      </div>
    </div>
  );
}
