"use client";

import React from "react";
import { WavyText } from "@/components/flexui/wavy-text";

function HeroExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <WavyText
        text="Welcome to the future"
        amplitude={25}
        delay={0.05}
        speed={0.4}
        className="text-3xl font-bold tracking-tight text-white"
      />
      <div className="mt-4">
        <WavyText
          text="Crafted with care and animated with spring physics."
          amplitude={15}
          delay={0.03}
          speed={0.3}
          className="text-base text-zinc-400"
        />
      </div>
    </div>
  );
}

function SubtleWaveExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <WavyText
        text="Subtle wave with small amplitude."
        amplitude={8}
        delay={0.02}
        speed={0.2}
        className="text-xl font-medium text-white"
      />
    </div>
  );
}

function DramaticWaveExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <WavyText
        text="Big waves"
        amplitude={40}
        delay={0.08}
        speed={0.5}
        className="text-4xl font-black tracking-tight text-white"
      />
    </div>
  );
}

export function WavyTextExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Headline</h3>
        <HeroExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Subtle Wave (small amplitude)</h3>
        <SubtleWaveExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Dramatic Wave (large amplitude)</h3>
        <DramaticWaveExample />
      </div>
    </div>
  );
}
