"use client";

import React from "react";
import { HoverCard } from "@/components/flexui/hover-card";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <HoverCard className="w-72">
        <h3 className="text-lg font-semibold text-white">Hover me</h3>
        <p className="mt-2 text-sm text-zinc-400">
          This card lifts up and scales slightly on hover with a smooth spring
          animation. Great for interactive cards and feature highlights.
        </p>
      </HoverCard>
      <HoverCard className="w-72">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="rgb(168,85,247)" strokeWidth="1.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">Featured</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Combine with icons and rich content for engaging feature cards.
        </p>
      </HoverCard>
    </div>
  );
}
