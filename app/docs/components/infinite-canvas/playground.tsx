"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { InfiniteCanvas } from "@/components/flexui/infinite-canvas";

const code = `import { InfiniteCanvas } from "@/components/flexui/infinite-canvas";

export function Demo() {
  return (
    <InfiniteCanvas className="h-[500px] w-full rounded-2xl border border-white/[0.06]">
      <div className="absolute left-[100px] top-[80px] rounded-xl border border-white/[0.08] bg-zinc-900/80 p-6 backdrop-blur-sm">
        <h3 className="text-lg font-bold text-white">Card A</h3>
        <p className="mt-1 text-sm text-zinc-400">Drag to pan, scroll to zoom.</p>
      </div>
      <div className="absolute left-[350px] top-[200px] rounded-xl border border-violet-500/20 bg-violet-500/10 p-6">
        <h3 className="text-lg font-bold text-violet-300">Card B</h3>
        <p className="mt-1 text-sm text-violet-400/70">Double-click to reset view.</p>
      </div>
      <div className="absolute left-[150px] top-[350px] rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-6">
        <h3 className="text-lg font-bold text-cyan-300">Card C</h3>
        <p className="mt-1 text-sm text-cyan-400/70">Pinch to zoom on touch.</p>
      </div>
    </InfiniteCanvas>
  );
}`;

export function InfiniteCanvasPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <InfiniteCanvas className="h-[500px] w-full rounded-2xl border border-white/[0.06]">
            <div className="absolute left-[100px] top-[80px] rounded-xl border border-white/[0.08] bg-zinc-900/80 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">Card A</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Drag to pan, scroll to zoom.
              </p>
            </div>
            <div className="absolute left-[350px] top-[200px] rounded-xl border border-violet-500/20 bg-violet-500/10 p-6">
              <h3 className="text-lg font-bold text-violet-300">Card B</h3>
              <p className="mt-1 text-sm text-violet-400/70">
                Double-click to reset view.
              </p>
            </div>
            <div className="absolute left-[150px] top-[350px] rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-6">
              <h3 className="text-lg font-bold text-cyan-300">Card C</h3>
              <p className="mt-1 text-sm text-cyan-400/70">
                Pinch to zoom on touch.
              </p>
            </div>
          </InfiniteCanvas>
        }
        code={code}
        filename="infinite-canvas-demo.tsx"
      />
    </div>
  );
}
