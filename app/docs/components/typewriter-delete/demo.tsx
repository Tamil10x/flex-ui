"use client";

import React from "react";
import { TypewriterDelete } from "@/components/flexui/typewriter-delete";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <TypewriterDelete
        text="Build stunning user interfaces with FlexUI."
        className="text-2xl"
      />
      <TypewriterDelete
        text="Fast. Animated. Accessible."
        speed={60}
        className="text-lg text-zinc-300"
      />
    </div>
  );
}
