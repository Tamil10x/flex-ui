"use client";

import React from "react";
import { DirectionHover } from "@/components/flexui/direction-hover";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Eye, ShoppingCart, ExternalLink } from "lucide-react";

const examples = [
  {
    id: "dh-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "A direction-aware hover card with gradient background and text overlay.",
    preview: (
      <div className="flex items-center justify-center gap-6">
        <DirectionHover
          className="h-64 w-48"
          overlay={
            <div className="flex flex-col items-center gap-2 text-white">
              <p className="text-lg font-semibold">Mountain Peak</p>
              <p className="text-sm text-zinc-300">Hover from any direction</p>
            </div>
          }
        >
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
            <span className="text-4xl">&#9968;</span>
          </div>
        </DirectionHover>
        <DirectionHover
          className="h-64 w-48"
          overlay={
            <div className="flex flex-col items-center gap-2 text-white">
              <p className="text-lg font-semibold">Ocean Wave</p>
              <p className="text-sm text-zinc-300">Direction-aware overlay</p>
            </div>
          }
        >
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
            <span className="text-4xl">&#127754;</span>
          </div>
        </DirectionHover>
      </div>
    ),
    code: `<DirectionHover
  className="h-64 w-48"
  overlay={
    <div className="flex flex-col items-center gap-2 text-white">
      <p className="text-lg font-semibold">Mountain Peak</p>
      <p className="text-sm text-zinc-300">Hover from any direction</p>
    </div>
  }
>
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
    <span className="text-4xl">&#9968;</span>
  </div>
</DirectionHover>`,
    filename: "default.tsx",
  },
  {
    id: "dh-actions",
    title: "With Action Buttons",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Overlay with interactive buttons for product cards or galleries.",
    preview: (
      <DirectionHover
        className="h-64 w-full max-w-sm"
        overlay={
          <div className="flex flex-col items-center gap-3">
            <p className="text-lg font-bold text-white">Product Preview</p>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-black">
                <ShoppingCart className="h-3 w-3" /> Add to Cart
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white">
                <Eye className="h-3 w-3" /> Preview
              </button>
            </div>
          </div>
        }
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/10 to-orange-500/10">
          <span className="text-5xl">&#128722;</span>
        </div>
      </DirectionHover>
    ),
    code: `import { ShoppingCart, Eye } from "lucide-react";

<DirectionHover
  className="h-64 w-full max-w-sm"
  overlay={
    <div className="flex flex-col items-center gap-3">
      <p className="text-lg font-bold text-white">Product Preview</p>
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-black">
          <ShoppingCart className="h-3 w-3" /> Add to Cart
        </button>
        <button className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white">
          <Eye className="h-3 w-3" /> Preview
        </button>
      </div>
    </div>
  }
>
  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/10 to-orange-500/10">
    <span className="text-5xl">&#128722;</span>
  </div>
</DirectionHover>`,
    filename: "with-actions.tsx",
  },
  {
    id: "dh-gallery",
    title: "Gallery Grid",
    tag: "Layout",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "A row of direction-hover cards for image gallery layouts.",
    preview: (
      <div className="grid grid-cols-3 gap-3">
        {[
          { title: "Sunset", emoji: "&#127749;", from: "from-rose-500/20", to: "to-pink-500/20" },
          { title: "Forest", emoji: "&#127795;", from: "from-green-500/20", to: "to-emerald-500/20" },
          { title: "Night", emoji: "&#127747;", from: "from-indigo-500/20", to: "to-violet-500/20" },
        ].map((item) => (
          <DirectionHover
            key={item.title}
            className="h-40 w-full"
            overlay={
              <div className="flex items-center gap-1.5 text-white">
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="text-sm font-medium">{item.title}</span>
              </div>
            }
          >
            <div
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${item.from} ${item.to}`}
              dangerouslySetInnerHTML={{ __html: `<span class="text-3xl">${item.emoji}</span>` }}
            />
          </DirectionHover>
        ))}
      </div>
    ),
    code: `import { ExternalLink } from "lucide-react";

<div className="grid grid-cols-3 gap-3">
  {["Sunset", "Forest", "Night"].map((title) => (
    <DirectionHover
      key={title}
      className="h-40 w-full"
      overlay={
        <div className="flex items-center gap-1.5 text-white">
          <ExternalLink className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      }
    >
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
        <span className="text-3xl">&#127749;</span>
      </div>
    </DirectionHover>
  ))}
</div>`,
    filename: "gallery-grid.tsx",
  },
];

export function DirectionHoverExamples() {
  return <ShowcaseGrid items={examples} />;
}
