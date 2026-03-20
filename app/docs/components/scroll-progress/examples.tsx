"use client";

import React from "react";
import { ScrollProgress } from "@/components/flexui/scroll-progress";

function DefaultExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Default (Top, Blue-to-Cyan)
      </h3>
      <p className="text-sm text-zinc-400">
        The default progress bar sits at the top of the viewport with a
        blue-to-cyan gradient. Scroll the page to see it in action.
      </p>
      <ScrollProgress />
    </div>
  );
}

function CustomColorExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Custom Color (Purple-to-Pink)
      </h3>
      <p className="text-sm text-zinc-400">
        Pass a custom <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">color</code> prop
        with any CSS gradient or solid color.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full" style={{ background: "linear-gradient(to right, #a855f7, #ec4899)" }} />
      </div>
    </div>
  );
}

function BottomPositionExample() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-8">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Bottom Position
      </h3>
      <p className="text-sm text-zinc-400">
        Set <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">position=&quot;bottom&quot;</code> to
        place the progress bar at the bottom of the viewport, and increase{" "}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-zinc-300">height</code> for a thicker bar.
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-[5px] flex-1 rounded-full" style={{ background: "linear-gradient(to right, #f59e0b, #ef4444)" }} />
      </div>
    </div>
  );
}

export function ScrollProgressExamples() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Default Progress Bar</h3>
        <DefaultExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Custom Gradient</h3>
        <CustomColorExample />
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">Bottom Position</h3>
        <BottomPositionExample />
      </div>
    </div>
  );
}
