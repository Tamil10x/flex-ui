"use client";

import React from "react";
import { ParallaxScroll } from "@/components/flexui/parallax-scroll";

function HeroParallaxExample() {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <ParallaxScroll speed={0.3} direction="up" className="h-full">
        <div className="flex h-[500px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Scroll to see the effect
            </h2>
            <p className="mt-3 text-lg text-zinc-400">
              This content moves upward as you scroll down.
            </p>
          </div>
        </div>
      </ParallaxScroll>
    </div>
  );
}

function ImageParallaxExample() {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <ParallaxScroll speed={0.5} direction="up" className="h-full">
        <div className="flex h-[600px] flex-col items-center justify-center gap-6">
          <div className="h-48 w-48 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-2xl" />
          <p className="text-sm text-zinc-500">
            Image placeholder with stronger parallax
          </p>
        </div>
      </ParallaxScroll>
    </div>
  );
}

function ReverseParallaxExample() {
  return (
    <div className="relative h-[400px] overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950/80">
      <ParallaxScroll speed={0.4} direction="down" className="h-full">
        <div className="flex h-[500px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Reverse Direction
            </h2>
            <p className="mt-3 text-base text-zinc-400">
              This content drifts downward as you scroll.
            </p>
          </div>
        </div>
      </ParallaxScroll>
    </div>
  );
}

export function ParallaxScrollExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Section</h3>
        <HeroParallaxExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Image Parallax</h3>
        <ImageParallaxExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Reverse Direction</h3>
        <ReverseParallaxExample />
      </div>
    </div>
  );
}
