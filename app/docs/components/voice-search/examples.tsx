"use client";

import React from "react";
import { VoiceSearch } from "@/components/flexui/voice-search";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Sparkles, Layout, Type, Zap } from "lucide-react";

const sampleItems = [
  { id: "1", title: "Shimmer Button", description: "Animated shimmer sweep", category: "Buttons", icon: <Sparkles className="h-4 w-4 text-purple-400" />, onSelect: () => {} },
  { id: "2", title: "Glow Button", description: "Ambient glow effect", category: "Buttons", icon: <Zap className="h-4 w-4 text-blue-400" />, onSelect: () => {} },
  { id: "3", title: "Spotlight Card", description: "Cursor-following spotlight", category: "Cards", icon: <Layout className="h-4 w-4 text-emerald-400" />, onSelect: () => {} },
  { id: "4", title: "Text Reveal", description: "Scroll animation", category: "Text", icon: <Type className="h-4 w-4 text-amber-400" />, onSelect: () => {} },
];

const examples = [
  {
    id: "vs-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard voice search with keyboard and voice input.",
    preview: (
      <div className="flex items-center justify-center">
        <VoiceSearch
          items={sampleItems}
          placeholder="Search or speak…"
        />
      </div>
    ),
    code: `<VoiceSearch
  items={items}
  placeholder="Search or speak…"
  shortcut="⌘K"
/>`,
    filename: "default.tsx",
  },
  {
    id: "vs-custom-shortcut",
    title: "Custom Shortcut Label",
    tag: "Config",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Display a custom keyboard shortcut badge.",
    preview: (
      <div className="flex items-center justify-center">
        <VoiceSearch
          items={sampleItems}
          placeholder="Quick search…"
          shortcut="⌘/"
        />
      </div>
    ),
    code: `<VoiceSearch
  items={items}
  placeholder="Quick search…"
  shortcut="⌘/"
/>`,
    filename: "custom-shortcut.tsx",
  },
  {
    id: "vs-custom-placeholder",
    title: "Custom Placeholder",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Tailor the placeholder text for your use case.",
    preview: (
      <div className="flex items-center justify-center">
        <VoiceSearch
          items={sampleItems}
          placeholder="Find components, blocks, templates…"
        />
      </div>
    ),
    code: `<VoiceSearch
  items={items}
  placeholder="Find components, blocks, templates…"
/>`,
    filename: "custom-placeholder.tsx",
  },
];

export function VoiceSearchExamples() {
  return <ShowcaseGrid items={examples} />;
}
