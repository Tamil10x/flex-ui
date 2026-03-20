"use client";

import React from "react";
import { FlipWords } from "@/components/flexui/flip-words";

function HeroExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-white">
        We make{" "}
        <FlipWords
          words={["stunning", "elegant", "powerful", "delightful"]}
          duration={2500}
          className="text-emerald-400"
        />{" "}
        products
      </h2>
    </div>
  );
}

function FastFlipExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <p className="text-xl font-medium text-white">
        Status:{" "}
        <FlipWords
          words={["loading...", "processing...", "optimizing...", "complete!"]}
          duration={1500}
          className="text-amber-400"
        />
      </p>
    </div>
  );
}

function SubtleExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <p className="text-2xl font-light text-zinc-300">
        Think{" "}
        <FlipWords
          words={["different", "bigger", "faster", "smarter"]}
          duration={4000}
          className="font-bold text-violet-400"
        />
      </p>
    </div>
  );
}

export function FlipWordsExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Headline</h3>
        <HeroExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Fast Cycle (1.5s)</h3>
        <FastFlipExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Slow & Subtle (4s)</h3>
        <SubtleExample />
      </div>
    </div>
  );
}
