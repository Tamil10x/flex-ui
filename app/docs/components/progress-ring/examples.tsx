"use client";

import React from "react";
import { ProgressRing } from "@/components/flexui/progress-ring";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

export function ProgressRingExamples() {
  return (
    <ShowcaseGrid
      items={[
        {
          id: "basic",
          title: "Basic Ring",
          tag: "Base",
          preview: (
            <div className="flex items-center justify-center py-8">
              <ProgressRing value={72} animate>
                <span className="text-xl font-bold text-white">72%</span>
              </ProgressRing>
            </div>
          ),
          code: `<ProgressRing value={72} animate>
  <span className="text-xl font-bold text-white">72%</span>
</ProgressRing>`,
          filename: "basic.tsx",
        },
        {
          id: "custom-style",
          title: "Custom Style",
          tag: "Style",
          preview: (
            <div className="flex items-center justify-center py-8">
              <ProgressRing
                value={85}
                size={140}
                strokeWidth={12}
                color="#a78bfa"
                animate
              >
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">85</span>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                    Score
                  </p>
                </div>
              </ProgressRing>
            </div>
          ),
          code: `<ProgressRing
  value={85}
  size={140}
  strokeWidth={12}
  color="#a78bfa"
  animate
>
  <div className="text-center">
    <span className="text-2xl font-bold text-white">85</span>
    <p className="text-[10px] uppercase tracking-wider text-zinc-500">
      Score
    </p>
  </div>
</ProgressRing>`,
          filename: "custom-style.tsx",
        },
        {
          id: "multiple",
          title: "Multiple Rings",
          tag: "Compose",
          preview: (
            <div className="flex items-center justify-center gap-6 py-8">
              <ProgressRing value={92} size={80} strokeWidth={6} color="#34d399" animate>
                <span className="text-sm font-bold text-white">92%</span>
              </ProgressRing>
              <ProgressRing value={67} size={80} strokeWidth={6} color="#f97316" animate>
                <span className="text-sm font-bold text-white">67%</span>
              </ProgressRing>
              <ProgressRing value={45} size={80} strokeWidth={6} color="#f87171" animate>
                <span className="text-sm font-bold text-white">45%</span>
              </ProgressRing>
            </div>
          ),
          code: `<div className="flex gap-6">
  <ProgressRing value={92} size={80} strokeWidth={6} color="#34d399" animate>
    <span className="text-sm font-bold text-white">92%</span>
  </ProgressRing>
  <ProgressRing value={67} size={80} strokeWidth={6} color="#f97316" animate>
    <span className="text-sm font-bold text-white">67%</span>
  </ProgressRing>
  <ProgressRing value={45} size={80} strokeWidth={6} color="#f87171" animate>
    <span className="text-sm font-bold text-white">45%</span>
  </ProgressRing>
</div>`,
          filename: "multiple.tsx",
        },
      ]}
    />
  );
}
