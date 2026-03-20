"use client";

import React from "react";
import { BlurText } from "@/components/flexui/blur-text";

function HeroBlurExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <BlurText
        text="Design with clarity"
        mode="word"
        blur={12}
        delay={0.12}
        duration={0.6}
        className="text-3xl font-bold tracking-tight text-white"
      />
      <div className="mt-4">
        <BlurText
          text="Beautiful blur-in animations for every headline."
          mode="word"
          blur={8}
          delay={0.06}
          duration={0.5}
          className="text-base text-zinc-400"
        />
      </div>
    </div>
  );
}

function AllAtOnceExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <BlurText
        text="Entire text fades in from blur at once."
        mode="all"
        blur={16}
        duration={0.8}
        className="text-xl font-medium text-white"
      />
    </div>
  );
}

function SubtleBlurExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <BlurText
        text="Subtle soft focus reveal"
        mode="word"
        blur={4}
        delay={0.15}
        duration={0.7}
        className="text-4xl font-black tracking-tight text-white"
      />
    </div>
  );
}

export function BlurTextExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Hero Blur-In</h3>
        <HeroBlurExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">All At Once</h3>
        <AllAtOnceExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Subtle Soft Focus</h3>
        <SubtleBlurExample />
      </div>
    </div>
  );
}
