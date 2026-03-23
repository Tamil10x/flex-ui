"use client";

import React from "react";
import { MovingBorder } from "@/components/flexui/moving-border";

function DefaultExample() {
  return (
    <MovingBorder>
      <div className="px-6 py-4">
        <h3 className="text-base font-bold text-white">Default</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Violet-to-cyan animated border with default settings.
        </p>
      </div>
    </MovingBorder>
  );
}

function CustomColorExample() {
  return (
    <MovingBorder color="from-pink-500 via-orange-500 to-pink-500" speed={2}>
      <div className="px-6 py-4">
        <h3 className="text-base font-bold text-white">Custom Colors</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Pink-to-orange gradient with faster rotation.
        </p>
      </div>
    </MovingBorder>
  );
}

function ButtonExample() {
  return (
    <MovingBorder borderRadius="0.75rem" borderWidth={1.5} speed={4}>
      <button className="px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.03]">
        Moving Border Button
      </button>
    </MovingBorder>
  );
}

export function MovingBorderExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <CustomColorExample />
        <p className="text-xs text-zinc-500">Custom Colors</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ButtonExample />
        <p className="text-xs text-zinc-500">Button</p>
      </div>
    </div>
  );
}
