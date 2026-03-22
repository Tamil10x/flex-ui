"use client";

import React from "react";
import { ProgressBar } from "@/components/flexui/progress-bar";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="w-full max-w-md space-y-6">
        <div>
          <p className="mb-2 text-xs text-zinc-400">Default (75%)</p>
          <ProgressBar value={75} showLabel />
        </div>
        <div>
          <p className="mb-2 text-xs text-zinc-400">Colored &amp; animated (45%)</p>
          <ProgressBar value={45} color="#8b5cf6" animated showLabel />
        </div>
        <div>
          <p className="mb-2 text-xs text-zinc-400">Complete (100%)</p>
          <ProgressBar value={100} color="#34d399" showLabel />
        </div>
      </div>
    </div>
  );
}
