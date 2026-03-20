"use client";

import React, { useState } from "react";
import { ProgressRing } from "@/components/flexui/progress-ring";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `"use client";

import { ProgressRing } from "@/components/flexui/progress-ring";

export default function ProgressRingDemo() {
  return (
    <div className="flex items-center gap-8 p-8">
      <ProgressRing value={72} animate>
        <span className="text-xl font-bold text-white">72%</span>
      </ProgressRing>
      <ProgressRing value={45} color="#a78bfa" animate>
        <span className="text-xl font-bold text-white">45%</span>
      </ProgressRing>
    </div>
  );
}`;

export function ProgressRingPlayground() {
  const [value, setValue] = useState(72);
  const [color, setColor] = useState("#38bdf8");

  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6 py-12">
          <ProgressRing value={value} color={color} animate>
            <span className="text-2xl font-bold text-white">{value}%</span>
          </ProgressRing>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Value
              <input
                type="range"
                min={0}
                max={100}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-28"
              />
              <span className="w-10 text-right font-mono text-xs text-zinc-500">
                {value}%
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Color
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent"
              />
            </label>
          </div>
        </div>
      }
      code={code}
      filename="progress-ring-demo.tsx"
    />
  );
}
