"use client";

import React from "react";
import { BorderBeam } from "@/components/flexui/border-beam";

function DefaultExample() {
  return (
    <BorderBeam>
      <div className="px-6 py-4">
        <h3 className="text-base font-bold text-white">Default</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Blue beam with default settings.
        </p>
      </div>
    </BorderBeam>
  );
}

function PurpleFastExample() {
  return (
    <BorderBeam color="#8b5cf6" speed={2} borderRadius="16px">
      <div className="px-6 py-4">
        <h3 className="text-base font-bold text-white">Purple Fast</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Violet beam with 2s revolution.
        </p>
      </div>
    </BorderBeam>
  );
}

function ButtonExample() {
  return (
    <BorderBeam color="#10b981" speed={3} borderRadius="9999px">
      <button className="px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/[0.03]">
        Border Beam Button
      </button>
    </BorderBeam>
  );
}

export function BorderBeamExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <PurpleFastExample />
        <p className="text-xs text-zinc-500">Purple Fast</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <ButtonExample />
        <p className="text-xs text-zinc-500">Pill Button</p>
      </div>
    </div>
  );
}
