"use client";

import React from "react";
import { AuroraBackground } from "@/components/flexui/aurora-background";

function DefaultExample() {
  return (
    <AuroraBackground className="flex min-h-[300px] items-center justify-center rounded-2xl">
      <h2 className="text-3xl font-bold text-white">Default Aurora</h2>
    </AuroraBackground>
  );
}

function WarmColorsExample() {
  return (
    <AuroraBackground
      className="flex min-h-[300px] items-center justify-center rounded-2xl"
      colors={[
        "rgba(239, 68, 68, 0.3)",
        "rgba(249, 115, 22, 0.3)",
        "rgba(234, 179, 8, 0.3)",
        "rgba(236, 72, 153, 0.3)",
      ]}
      speed={6}
    >
      <h2 className="text-3xl font-bold text-white">Warm Aurora</h2>
    </AuroraBackground>
  );
}

function SubtleExample() {
  return (
    <AuroraBackground
      className="flex min-h-[300px] items-center justify-center rounded-2xl"
      colors={[
        "rgba(59, 130, 246, 0.15)",
        "rgba(99, 102, 241, 0.15)",
        "rgba(139, 92, 246, 0.15)",
        "rgba(168, 85, 247, 0.15)",
      ]}
      blur={140}
      speed={12}
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Subtle &amp; Slow</h2>
        <p className="mt-2 text-zinc-400">Higher blur, slower speed.</p>
      </div>
    </AuroraBackground>
  );
}

export function AuroraBackgroundExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Warm Colors</h3>
        <WarmColorsExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Subtle &amp; Slow</h3>
        <SubtleExample />
      </div>
    </div>
  );
}
