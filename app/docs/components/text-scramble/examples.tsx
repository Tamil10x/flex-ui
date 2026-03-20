"use client";

import React from "react";
import { TextScramble } from "@/components/flexui/text-scramble";

function HeroScrambleExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TextScramble
        text="Build the future"
        speed={40}
        revealDelay={4}
        className="text-3xl font-bold tracking-tight text-white"
      />
      <div className="mt-4">
        <TextScramble
          text="Modern components for modern interfaces."
          speed={30}
          revealDelay={2}
          className="text-base text-zinc-400"
        />
      </div>
    </div>
  );
}

function FastScrambleExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TextScramble
        text="Lightning fast decryption effect."
        speed={20}
        revealDelay={2}
        className="text-xl font-medium text-white"
      />
    </div>
  );
}

function CustomCharsExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <TextScramble
        text="01001000 01101001"
        characters="01"
        speed={50}
        revealDelay={5}
        className="text-2xl font-bold tracking-widest text-emerald-400"
      />
    </div>
  );
}

export function TextScrambleExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Scramble</h3>
        <HeroScrambleExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Fast Decryption</h3>
        <FastScrambleExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Binary Characters</h3>
        <CustomCharsExample />
      </div>
    </div>
  );
}
