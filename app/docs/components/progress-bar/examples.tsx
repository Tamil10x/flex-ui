"use client";

import React from "react";
import { ProgressBar } from "@/components/flexui/progress-bar";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "pb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A simple progress bar with a white fill and percentage label.",
    preview: (
      <div className="w-full max-w-md">
        <ProgressBar value={65} showLabel />
      </div>
    ),
    code: `<ProgressBar value={65} showLabel />`,
    filename: "default.tsx",
  },
  {
    id: "pb-colors",
    title: "Color Variants",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Multiple progress bars with different custom colors for visual distinction.",
    preview: (
      <div className="w-full max-w-md space-y-5">
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Storage used</p>
          <ProgressBar value={72} color="#8b5cf6" showLabel />
        </div>
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Upload complete</p>
          <ProgressBar value={100} color="#10b981" showLabel />
        </div>
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">CPU usage</p>
          <ProgressBar value={89} color="#ef4444" showLabel />
        </div>
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Build progress</p>
          <ProgressBar value={45} color="#f59e0b" showLabel />
        </div>
      </div>
    ),
    code: `<ProgressBar value={72} color="#8b5cf6" showLabel />
<ProgressBar value={100} color="#10b981" showLabel />
<ProgressBar value={89} color="#ef4444" showLabel />
<ProgressBar value={45} color="#f59e0b" showLabel />`,
    filename: "colors.tsx",
  },
  {
    id: "pb-animated",
    title: "Animated Pulse",
    tag: "Animation",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Active progress bars with pulse animation to indicate ongoing operations.",
    preview: (
      <div className="w-full max-w-md space-y-5">
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Downloading...</p>
          <ProgressBar value={38} color="#3b82f6" animated showLabel />
        </div>
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Processing...</p>
          <ProgressBar value={62} color="#ec4899" animated showLabel />
        </div>
      </div>
    ),
    code: `<ProgressBar value={38} color="#3b82f6" animated showLabel />
<ProgressBar value={62} color="#ec4899" animated showLabel />`,
    filename: "animated.tsx",
  },
  {
    id: "pb-sizes",
    title: "Custom Sizes",
    tag: "Layout",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Thin and thick progress bar variants using className height overrides.",
    preview: (
      <div className="w-full max-w-md space-y-6">
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Thin (h-1)</p>
          <ProgressBar value={80} color="#22d3ee" className="[&>div]:h-1" />
        </div>
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Default (h-2)</p>
          <ProgressBar value={60} color="#a78bfa" />
        </div>
        <div>
          <p className="mb-1.5 text-xs text-zinc-400">Thick (h-4)</p>
          <ProgressBar value={45} color="#fb923c" className="[&>div]:h-4 [&>div]:rounded-lg" showLabel />
        </div>
      </div>
    ),
    code: `{/* Thin */}
<ProgressBar value={80} color="#22d3ee" className="[&>div]:h-1" />

{/* Default */}
<ProgressBar value={60} color="#a78bfa" />

{/* Thick */}
<ProgressBar value={45} color="#fb923c" className="[&>div]:h-4 [&>div]:rounded-lg" showLabel />`,
    filename: "sizes.tsx",
  },
];

export function ProgressBarExamples() {
  return <ShowcaseGrid items={examples} />;
}
