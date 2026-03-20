"use client";

import React from "react";
import { SpotlightCursor } from "@/components/flexui/spotlight-cursor";

function DefaultExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <SpotlightCursor />
      <p className="relative z-10 text-sm text-zinc-500">Default white</p>
    </div>
  );
}

function BlueExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <SpotlightCursor color="56,189,248" opacity={0.1} size={500} />
      <p className="relative z-10 text-sm text-zinc-500">Cyan &middot; brighter</p>
    </div>
  );
}

function TightExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <SpotlightCursor color="168,85,247" opacity={0.08} size={250} />
      <p className="relative z-10 text-sm text-zinc-500">Purple &middot; tight</p>
    </div>
  );
}

export function SpotlightCursorExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <BlueExample />
        <p className="text-xs text-zinc-500">Cyan &amp; Brighter</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <TightExample />
        <p className="text-xs text-zinc-500">Purple &amp; Tight</p>
      </div>
    </div>
  );
}
