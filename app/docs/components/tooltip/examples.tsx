"use client";

import React from "react";
import { Tooltip } from "@/components/flexui/tooltip";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Info, Settings, Download, Heart } from "lucide-react";

const btnClass = "rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10";

const examples = [
  {
    id: "tooltip-default",
    title: "Default (Top)",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard tooltip that appears above the trigger element on hover.",
    preview: (
      <Tooltip content="Save your changes" side="top">
        <button className={btnClass}>Hover me</button>
      </Tooltip>
    ),
    code: `<Tooltip content="Save your changes" side="top">
  <button>Hover me</button>
</Tooltip>`,
    filename: "default.tsx",
  },
  {
    id: "tooltip-sides",
    title: "All Placements",
    tag: "Position",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Tooltips positioned on all four sides: top, bottom, left, and right.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-4 py-4">
        <Tooltip content="Top tooltip" side="top">
          <button className={btnClass}>Top</button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" side="bottom">
          <button className={btnClass}>Bottom</button>
        </Tooltip>
        <Tooltip content="Left tooltip" side="left">
          <button className={btnClass}>Left</button>
        </Tooltip>
        <Tooltip content="Right tooltip" side="right">
          <button className={btnClass}>Right</button>
        </Tooltip>
      </div>
    ),
    code: `<Tooltip content="Top tooltip" side="top">
  <button>Top</button>
</Tooltip>
<Tooltip content="Bottom tooltip" side="bottom">
  <button>Bottom</button>
</Tooltip>
<Tooltip content="Left tooltip" side="left">
  <button>Left</button>
</Tooltip>
<Tooltip content="Right tooltip" side="right">
  <button>Right</button>
</Tooltip>`,
    filename: "all-sides.tsx",
  },
  {
    id: "tooltip-rich",
    title: "Rich Content",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Tooltips can render any ReactNode, including icons and formatted text.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Tooltip content={<span className="flex items-center gap-1.5"><Info className="h-3 w-3 text-blue-400" /> More details here</span>}>
          <button className={btnClass}>With Icon</button>
        </Tooltip>
        <Tooltip content={<span className="flex items-center gap-1.5"><Heart className="h-3 w-3 text-pink-400" /> 42 likes</span>}>
          <button className={btnClass}>Stats</button>
        </Tooltip>
      </div>
    ),
    code: `import { Info, Heart } from "lucide-react";

<Tooltip content={
  <span className="flex items-center gap-1.5">
    <Info className="h-3 w-3 text-blue-400" /> More details here
  </span>
}>
  <button>With Icon</button>
</Tooltip>

<Tooltip content={
  <span className="flex items-center gap-1.5">
    <Heart className="h-3 w-3 text-pink-400" /> 42 likes
  </span>
}>
  <button>Stats</button>
</Tooltip>`,
    filename: "rich-content.tsx",
  },
  {
    id: "tooltip-icons",
    title: "Icon Buttons",
    tag: "Pattern",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Tooltips on icon-only buttons to provide accessible labels.",
    preview: (
      <div className="flex items-center justify-center gap-3">
        <Tooltip content="Settings">
          <button className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-400 hover:bg-white/10 hover:text-white">
            <Settings className="h-4 w-4" />
          </button>
        </Tooltip>
        <Tooltip content="Download">
          <button className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-400 hover:bg-white/10 hover:text-white">
            <Download className="h-4 w-4" />
          </button>
        </Tooltip>
        <Tooltip content="Info">
          <button className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-zinc-400 hover:bg-white/10 hover:text-white">
            <Info className="h-4 w-4" />
          </button>
        </Tooltip>
      </div>
    ),
    code: `import { Settings, Download, Info } from "lucide-react";

<Tooltip content="Settings">
  <button><Settings className="h-4 w-4" /></button>
</Tooltip>
<Tooltip content="Download">
  <button><Download className="h-4 w-4" /></button>
</Tooltip>
<Tooltip content="Info">
  <button><Info className="h-4 w-4" /></button>
</Tooltip>`,
    filename: "icon-buttons.tsx",
  },
];

export function TooltipExamples() {
  return <ShowcaseGrid items={examples} />;
}
