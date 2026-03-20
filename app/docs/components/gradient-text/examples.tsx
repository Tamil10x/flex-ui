"use client";

import React from "react";
import { GradientText } from "@/components/flexui/gradient-text";

function DefaultExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <GradientText className="text-4xl font-bold">
        Beautiful Gradient Text
      </GradientText>
    </div>
  );
}

function CustomColorsExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <GradientText
        colors={["#f97316", "#ef4444", "#ec4899", "#f97316"]}
        speed={4}
        className="text-3xl font-bold"
      >
        Sunset Gradient
      </GradientText>
    </div>
  );
}

function StaticGradientExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <GradientText
        colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
        animate={false}
        className="text-3xl font-bold"
      >
        Static Gradient
      </GradientText>
    </div>
  );
}

function HeadlineExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-10 text-center">
      <h2 className="text-2xl font-bold text-white">
        Ship with{" "}
        <GradientText
          colors={["#06b6d4", "#3b82f6", "#8b5cf6", "#06b6d4"]}
          speed={2}
        >
          confidence
        </GradientText>
      </h2>
    </div>
  );
}

export function GradientTextExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default (Violet / Cyan / Pink)</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Custom Colors (Sunset)</h3>
        <CustomColorsExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Static (No Animation)</h3>
        <StaticGradientExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Inline Highlight</h3>
        <HeadlineExample />
      </div>
    </div>
  );
}
