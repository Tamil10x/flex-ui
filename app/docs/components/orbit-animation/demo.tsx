"use client";

import React from "react";
import { OrbitAnimation } from "@/components/flexui/orbit-animation";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center gap-12 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex flex-col items-center gap-4">
        <OrbitAnimation />
        <span className="text-xs text-zinc-500">Default</span>
      </div>
      <div className="flex flex-col items-center gap-4">
        <OrbitAnimation dotCount={4} speed={5} color="rgb(168,85,247)" />
        <span className="text-xs text-zinc-500">Purple, 4 dots, fast</span>
      </div>
    </div>
  );
}
