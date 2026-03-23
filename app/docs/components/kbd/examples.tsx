"use client";

import React from "react";
import { Kbd } from "@/components/flexui/kbd";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "kbd-default",
    title: "Single Keys",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Individual key indicators for common keyboard keys.",
    preview: (
      <div className="flex flex-wrap items-center gap-3">
        <Kbd>Esc</Kbd>
        <Kbd>Tab</Kbd>
        <Kbd>Enter</Kbd>
        <Kbd>Space</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>Ctrl</Kbd>
        <Kbd>Alt</Kbd>
      </div>
    ),
    code: `<div className="flex flex-wrap items-center gap-3">
  <Kbd>Esc</Kbd>
  <Kbd>Tab</Kbd>
  <Kbd>Enter</Kbd>
  <Kbd>Space</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>Ctrl</Kbd>
  <Kbd>Alt</Kbd>
</div>`,
    filename: "single-keys.tsx",
  },
  {
    id: "kbd-shortcuts",
    title: "Keyboard Shortcuts",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Common keyboard shortcut combos with labels.",
    preview: (
      <div className="space-y-4">
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
          <Kbd>Z</Kbd>
          <span className="ml-4 text-sm text-zinc-500">Undo</span>
        </div>
        <div className="flex items-center gap-2">
          <Kbd>Ctrl</Kbd>
          <span className="text-zinc-600">+</span>
          <Kbd>Shift</Kbd>
          <span className="text-zinc-600">+</span>
          <Kbd>P</Kbd>
          <span className="ml-4 text-sm text-zinc-500">Command Palette</span>
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-2">
  <Kbd>Ctrl</Kbd>
  <span className="text-zinc-600">+</span>
  <Kbd>C</Kbd>
  <span className="ml-4 text-sm text-zinc-500">Copy</span>
</div>

<div className="flex items-center gap-2">
  <Kbd>Ctrl</Kbd>
  <span className="text-zinc-600">+</span>
  <Kbd>Shift</Kbd>
  <span className="text-zinc-600">+</span>
  <Kbd>P</Kbd>
  <span className="ml-4 text-sm text-zinc-500">Command Palette</span>
</div>`,
    filename: "shortcuts.tsx",
  },
  {
    id: "kbd-mac",
    title: "macOS Style",
    tag: "Platform",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Mac-style keyboard shortcuts using symbol characters.",
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-1.5">
          <Kbd>&#8984;</Kbd>
          <Kbd>S</Kbd>
          <span className="ml-4 text-sm text-zinc-500">Save</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Kbd>&#8984;</Kbd>
          <Kbd>&#8679;</Kbd>
          <Kbd>K</Kbd>
          <span className="ml-4 text-sm text-zinc-500">Search</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Kbd>&#8997;</Kbd>
          <Kbd>&#8677;</Kbd>
          <span className="ml-4 text-sm text-zinc-500">Switch Tab</span>
        </div>
      </div>
    ),
    code: `<div className="flex items-center gap-1.5">
  <Kbd>⌘</Kbd>
  <Kbd>S</Kbd>
  <span className="ml-4 text-sm text-zinc-500">Save</span>
</div>

<div className="flex items-center gap-1.5">
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>K</Kbd>
  <span className="ml-4 text-sm text-zinc-500">Search</span>
</div>

<div className="flex items-center gap-1.5">
  <Kbd>⌥</Kbd>
  <Kbd>⇥</Kbd>
  <span className="ml-4 text-sm text-zinc-500">Switch Tab</span>
</div>`,
    filename: "macos.tsx",
  },
  {
    id: "kbd-sized",
    title: "Custom Sizes",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Resize keycaps for different contexts using className.",
    preview: (
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col items-center gap-2">
          <Kbd className="h-5 min-w-[20px] px-1 text-[9px]">S</Kbd>
          <span className="text-[10px] text-zinc-600">Small</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Kbd>M</Kbd>
          <span className="text-[10px] text-zinc-600">Default</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Kbd className="h-8 min-w-[32px] px-2.5 text-xs">L</Kbd>
          <span className="text-[10px] text-zinc-600">Large</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Kbd className="h-10 min-w-[40px] px-3 text-sm">XL</Kbd>
          <span className="text-[10px] text-zinc-600">Extra Large</span>
        </div>
      </div>
    ),
    code: `<Kbd className="h-5 min-w-[20px] px-1 text-[9px]">S</Kbd>

<Kbd>M</Kbd>

<Kbd className="h-8 min-w-[32px] px-2.5 text-xs">L</Kbd>

<Kbd className="h-10 min-w-[40px] px-3 text-sm">XL</Kbd>`,
    filename: "sizes.tsx",
  },
];

export function KbdExamples() {
  return <ShowcaseGrid items={examples} />;
}
