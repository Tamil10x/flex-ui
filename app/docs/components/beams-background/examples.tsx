"use client";

import React from "react";
import { BeamsBackground } from "@/components/flexui/beams-background";

function DefaultExample() {
  return (
    <BeamsBackground className="h-[200px] w-72 rounded-xl bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-white">Default (6 beams)</p>
      </div>
    </BeamsBackground>
  );
}

function ManyBeamsExample() {
  return (
    <BeamsBackground
      className="h-[200px] w-72 rounded-xl bg-zinc-950"
      beamCount={12}
      speed={5}
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-white">12 Beams, Fast</p>
      </div>
    </BeamsBackground>
  );
}

function ColoredBeamsExample() {
  return (
    <BeamsBackground
      className="h-[200px] w-72 rounded-xl bg-zinc-950"
      beamCount={8}
      color="rgba(59,130,246,0.6)"
      speed={10}
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-white">Blue Beams</p>
      </div>
    </BeamsBackground>
  );
}

export function BeamsBackgroundExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ManyBeamsExample />
        <p className="text-xs text-zinc-500">Many Beams</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ColoredBeamsExample />
        <p className="text-xs text-zinc-500">Blue Color</p>
      </div>
    </div>
  );
}
