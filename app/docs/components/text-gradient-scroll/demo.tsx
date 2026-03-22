"use client";

import React from "react";
import { TextGradientScroll } from "@/components/flexui/text-gradient-scroll";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-12 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <p className="text-sm text-zinc-500">Scroll this page to see the gradient reveal effect</p>
      <TextGradientScroll text="Build beautiful interfaces with FlexUI" />
      <div className="h-8" />
      <TextGradientScroll text="Animated. Accessible. Modern." className="text-center" />
    </div>
  );
}
