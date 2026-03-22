"use client";

import React from "react";
import { Kbd } from "@/components/flexui/kbd";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>C</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Copy</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>V</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Paste</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Ctrl</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-zinc-600">+</span>
        <Kbd>P</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Command Palette</span>
      </div>
      <div className="flex items-center gap-2">
        <Kbd>Esc</Kbd>
        <span className="ml-4 text-sm text-zinc-500">Close</span>
      </div>
    </div>
  );
}
