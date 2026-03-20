"use client";

import React from "react";
import { TextReveal } from "@/components/flexui/text-reveal";

function HeroExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TextReveal
        text="Build beautiful interfaces"
        mode="word"
        stagger={0.1}
        duration={0.6}
        className="text-3xl font-bold tracking-tight text-white"
      />
      <div className="mt-4">
        <TextReveal
          text="Ship faster with pre-built animated components."
          mode="word"
          stagger={0.06}
          duration={0.5}
          className="text-base text-zinc-400"
        />
      </div>
    </div>
  );
}

function TypewriterExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TextReveal
        text="Character-by-character typewriter effect with blur."
        mode="char"
        stagger={0.02}
        duration={0.3}
        className="text-xl font-medium text-white"
      />
    </div>
  );
}

function SlowRevealExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TextReveal
        text="Slow dramatic reveal"
        mode="word"
        stagger={0.25}
        duration={0.8}
        className="text-4xl font-black tracking-tight text-white"
      />
    </div>
  );
}

export function TextRevealExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Headline</h3>
        <HeroExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Typewriter (char mode)</h3>
        <TypewriterExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Slow Dramatic Reveal</h3>
        <SlowRevealExample />
      </div>
    </div>
  );
}
