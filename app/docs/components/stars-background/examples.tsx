"use client";

import React from "react";
import { StarsBackground } from "@/components/flexui/stars-background";

function DefaultExample() {
  return (
    <StarsBackground className="h-[200px] w-72 rounded-xl bg-zinc-950">
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-white">Default (80 stars)</p>
      </div>
    </StarsBackground>
  );
}

function DenseExample() {
  return (
    <StarsBackground
      className="h-[200px] w-72 rounded-xl bg-zinc-950"
      count={200}
      twinkleSpeed={[0.8, 2]}
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-white">Dense &amp; Fast</p>
      </div>
    </StarsBackground>
  );
}

function StaticExample() {
  return (
    <StarsBackground
      className="h-[200px] w-72 rounded-xl bg-zinc-950"
      count={120}
      twinkle={false}
      color="#fbbf24"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-sm font-medium text-white">Static Gold Stars</p>
      </div>
    </StarsBackground>
  );
}

export function StarsBackgroundExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <DenseExample />
        <p className="text-xs text-zinc-500">Dense &amp; Fast</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <StaticExample />
        <p className="text-xs text-zinc-500">Static Gold</p>
      </div>
    </div>
  );
}
