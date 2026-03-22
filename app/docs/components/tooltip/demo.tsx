"use client";

import React from "react";
import { Tooltip } from "@/components/flexui/tooltip";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Tooltip content="Tooltip on top" side="top">
        <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
          Top
        </button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" side="bottom">
        <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
          Bottom
        </button>
      </Tooltip>
      <Tooltip content="Tooltip on left" side="left">
        <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
          Left
        </button>
      </Tooltip>
      <Tooltip content="Tooltip on right" side="right">
        <button className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
          Right
        </button>
      </Tooltip>
    </div>
  );
}
