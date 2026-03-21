"use client";

import React from "react";
import { SplashCursor } from "@/components/flexui/splash-cursor";

function DefaultExample() {
  return (
    <SplashCursor className="flex h-48 w-72 items-center justify-center rounded-xl border border-white/[0.06] bg-zinc-950">
      <p className="text-sm text-zinc-500">Default splash</p>
    </SplashCursor>
  );
}

function WarmColorsExample() {
  return (
    <SplashCursor
      className="flex h-48 w-72 items-center justify-center rounded-xl border border-white/[0.06] bg-zinc-950"
      colors={["#F59E0B", "#EF4444", "#F97316"]}
      size={50}
    >
      <p className="text-sm text-zinc-500">Warm colors</p>
    </SplashCursor>
  );
}

function LargeTrailExample() {
  return (
    <SplashCursor
      className="flex h-48 w-72 items-center justify-center rounded-xl border border-white/[0.06] bg-zinc-950"
      colors={["#10B981", "#06B6D4", "#3B82F6"]}
      size={60}
      trail={40}
    >
      <p className="text-sm text-zinc-500">Large trail</p>
    </SplashCursor>
  );
}

export function SplashCursorExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <WarmColorsExample />
        <p className="text-xs text-zinc-500">Warm Colors</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <LargeTrailExample />
        <p className="text-xs text-zinc-500">Large Trail</p>
      </div>
    </div>
  );
}
