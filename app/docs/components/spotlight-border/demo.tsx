"use client";

import React from "react";
import { SpotlightBorder } from "@/components/flexui/spotlight-border";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <SpotlightBorder className="w-72">
        <h3 className="text-lg font-semibold text-white">Hover me</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Move your mouse around the border to see the spotlight effect follow your cursor.
        </p>
      </SpotlightBorder>
      <SpotlightBorder color="139,92,246" className="w-72">
        <h3 className="text-lg font-semibold text-white">Custom Color</h3>
        <p className="mt-2 text-sm text-zinc-400">
          The spotlight color can be customized via the color prop using RGB values.
        </p>
      </SpotlightBorder>
    </div>
  );
}
