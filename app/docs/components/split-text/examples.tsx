"use client";

import React from "react";
import { SplitText } from "@/components/flexui/split-text";

function SlideUpExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <SplitText
        text="Build beautiful interfaces"
        splitBy="word"
        variant="slide-up"
        stagger={0.08}
        className="text-3xl font-bold tracking-tight text-white"
      />
      <div className="mt-4">
        <SplitText
          text="Each word slides up into place."
          splitBy="word"
          variant="slide-up"
          stagger={0.06}
          className="text-base text-zinc-400"
        />
      </div>
    </div>
  );
}

function FadeExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <SplitText
        text="Character-by-character fade reveal."
        splitBy="char"
        variant="fade"
        stagger={0.02}
        className="text-xl font-medium text-white"
      />
    </div>
  );
}

function ScaleExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <SplitText
        text="Scale In Effect"
        splitBy="char"
        variant="scale"
        stagger={0.04}
        className="text-4xl font-black tracking-tight text-white"
      />
    </div>
  );
}

export function SplitTextExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Slide Up (word mode)</h3>
        <SlideUpExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Fade (char mode)</h3>
        <FadeExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Scale In (char mode)</h3>
        <ScaleExample />
      </div>
    </div>
  );
}
