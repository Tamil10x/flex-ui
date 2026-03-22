"use client";

import React from "react";
import { BlurFade } from "@/components/flexui/blur-fade";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <BlurFade delay={0}>
        <h3 className="text-2xl font-bold text-white">Welcome to FlexUI</h3>
      </BlurFade>
      <BlurFade delay={0.15}>
        <p className="max-w-md text-center text-zinc-400">
          Each element fades in with a blur effect, creating an elegant staggered
          entrance animation as they enter the viewport.
        </p>
      </BlurFade>
      <BlurFade delay={0.3}>
        <div className="flex gap-3">
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white">
            First
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white">
            Second
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white">
            Third
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
