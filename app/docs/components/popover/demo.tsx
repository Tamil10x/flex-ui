"use client";

import React from "react";
import { Popover } from "@/components/flexui/popover";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[250px] items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Popover
        trigger={
          <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">
            Click me (bottom)
          </button>
        }
        side="bottom"
      >
        <div className="w-48">
          <p className="font-medium text-white">Popover Content</p>
          <p className="mt-1 text-xs text-zinc-400">
            This popover appears below the trigger element.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={
          <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">
            Click me (top)
          </button>
        }
        side="top"
      >
        <div className="w-48">
          <p className="font-medium text-white">Top Popover</p>
          <p className="mt-1 text-xs text-zinc-400">
            This popover appears above the trigger element.
          </p>
        </div>
      </Popover>

      <Popover
        trigger={
          <button className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08]">
            Click me (right)
          </button>
        }
        side="right"
      >
        <div className="w-48">
          <p className="font-medium text-white">Right Popover</p>
          <p className="mt-1 text-xs text-zinc-400">
            This popover appears to the right of the trigger.
          </p>
        </div>
      </Popover>
    </div>
  );
}
