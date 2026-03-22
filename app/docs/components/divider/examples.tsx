"use client";

import React from "react";
import { Divider } from "@/components/flexui/divider";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "dv-default",
    title: "Default Solid",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A simple horizontal divider with a solid line.",
    preview: (
      <div className="w-full max-w-md space-y-4">
        <p className="text-sm text-zinc-400">Section above</p>
        <Divider />
        <p className="text-sm text-zinc-400">Section below</p>
      </div>
    ),
    code: `<Divider />`,
    filename: "default.tsx",
  },
  {
    id: "dv-gradient",
    title: "Gradient",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A gradient divider that fades from transparent at the edges.",
    preview: (
      <div className="w-full max-w-md space-y-4">
        <p className="text-center text-sm text-zinc-400">Content above</p>
        <Divider gradient />
        <p className="text-center text-sm text-zinc-400">Content below</p>
      </div>
    ),
    code: `<Divider gradient />`,
    filename: "gradient.tsx",
  },
  {
    id: "dv-labeled",
    title: "With Label",
    tag: "Feature",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "A gradient divider with a centered text label like 'OR' or 'Section'.",
    preview: (
      <div className="w-full max-w-md space-y-6">
        <Divider label="OR" gradient />
        <Divider label="CONTINUE WITH" gradient />
        <Divider label="NEW SECTION" gradient />
      </div>
    ),
    code: `<Divider label="OR" gradient />
<Divider label="CONTINUE WITH" gradient />
<Divider label="NEW SECTION" gradient />`,
    filename: "with-label.tsx",
  },
  {
    id: "dv-vertical",
    title: "Vertical Separator",
    tag: "Orientation",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "A vertical divider for toolbar or inline layout separation.",
    preview: (
      <div className="flex h-12 items-center justify-center gap-4">
        <span className="text-sm font-medium text-zinc-300">Bold</span>
        <Divider orientation="vertical" gradient />
        <span className="text-sm font-medium text-zinc-300">Italic</span>
        <Divider orientation="vertical" gradient />
        <span className="text-sm font-medium text-zinc-300">Underline</span>
      </div>
    ),
    code: `<div className="flex h-12 items-center gap-4">
  <span>Bold</span>
  <Divider orientation="vertical" gradient />
  <span>Italic</span>
  <Divider orientation="vertical" gradient />
  <span>Underline</span>
</div>`,
    filename: "vertical.tsx",
  },
];

export function DividerExamples() {
  return <ShowcaseGrid items={examples} />;
}
