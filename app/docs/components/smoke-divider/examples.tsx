"use client";

import React from "react";
import { SmokeDivider } from "@/components/flexui/smoke-divider";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

// ─── Default ─────────────────────────────────────────────────────────────────
function DefaultExample() {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-zinc-400">Above</p>
      <SmokeDivider />
      <p className="text-center text-sm text-zinc-400">Below</p>
    </div>
  );
}

// ─── Custom Color ───────────────────────────────────────────────────────────
function CustomColorExample() {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-zinc-400">Cyan smoke</p>
      <SmokeDivider color="rgba(34,211,238,0.12)" count={10} height={80} />
      <p className="text-center text-sm text-zinc-400">Below</p>
    </div>
  );
}

// ─── Dense & Fast ───────────────────────────────────────────────────────────
function DenseExample() {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-zinc-400">Dense fog</p>
      <SmokeDivider count={15} height={100} speed={2} color="rgba(255,255,255,0.06)" />
      <p className="text-center text-sm text-zinc-400">Below</p>
    </div>
  );
}

const examples = [
  {
    id: "sd-default",
    title: "Default",
    tag: "Basic",
    tagColor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    description: "Default smoke divider with purple wisps.",
    preview: <DefaultExample />,
    code: `<SmokeDivider />`,
    filename: "default.tsx",
  },
  {
    id: "sd-custom-color",
    title: "Custom Color",
    tag: "Themed",
    tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    description: "Cyan-colored wisps with more particles and taller height.",
    preview: <CustomColorExample />,
    code: `<SmokeDivider
  color="rgba(34,211,238,0.12)"
  count={10}
  height={80}
/>`,
    filename: "custom-color.tsx",
  },
  {
    id: "sd-dense",
    title: "Dense Fog",
    tag: "Effect",
    tagColor: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    description: "More wisps, taller area, and faster speed for a thick fog effect.",
    preview: <DenseExample />,
    code: `<SmokeDivider
  count={15}
  height={100}
  speed={2}
  color="rgba(255,255,255,0.06)"
/>`,
    filename: "dense-fog.tsx",
  },
];

export function SmokeDividerExamples() {
  return <ShowcaseGrid items={examples} />;
}
