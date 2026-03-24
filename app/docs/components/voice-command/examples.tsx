"use client";

import React from "react";
import { VoiceCommand } from "@/components/flexui/voice-command";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { Sun, Moon, Search, Volume2, Zap } from "lucide-react";

const noop = () => {};

const examples = [
  {
    id: "vc-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard voice command button with floating palette.",
    preview: (
      <div className="flex items-center justify-center py-12">
        <VoiceCommand
          commands={[
            { phrase: "hello", label: "Say Hello", action: noop },
            { phrase: "search", label: "Open Search", action: noop },
          ]}
        />
      </div>
    ),
    code: `<VoiceCommand
  commands={[
    { phrase: "hello", label: "Say Hello", action: () => alert("Hello!") },
    { phrase: "search", label: "Open Search", action: () => openSearch() },
  ]}
/>`,
    filename: "default.tsx",
  },
  {
    id: "vc-icons",
    title: "With Custom Icons",
    tag: "Compose",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Each command can have a custom icon for visual recognition.",
    preview: (
      <div className="flex items-center justify-center py-12">
        <VoiceCommand
          commands={[
            { phrase: "light", label: "Light Mode", icon: <Sun className="h-3.5 w-3.5 text-amber-400" />, action: noop },
            { phrase: "dark", label: "Dark Mode", icon: <Moon className="h-3.5 w-3.5 text-blue-400" />, action: noop },
            { phrase: "boost", label: "Boost", icon: <Zap className="h-3.5 w-3.5 text-yellow-400" />, action: noop },
          ]}
        />
      </div>
    ),
    code: `import { Sun, Moon, Zap } from "lucide-react";

<VoiceCommand
  commands={[
    { phrase: "light", label: "Light Mode", icon: <Sun />, action: () => setLight() },
    { phrase: "dark", label: "Dark Mode", icon: <Moon />, action: () => setDark() },
    { phrase: "boost", label: "Boost", icon: <Zap />, action: () => boost() },
  ]}
/>`,
    filename: "with-icons.tsx",
  },
  {
    id: "vc-sizes",
    title: "Size Variants",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Small, medium, and large trigger button sizes.",
    preview: (
      <div className="flex items-center justify-center gap-6 py-12">
        <VoiceCommand size="sm" showPalette={false} commands={[{ phrase: "test", action: noop }]} />
        <VoiceCommand size="md" showPalette={false} commands={[{ phrase: "test", action: noop }]} />
        <VoiceCommand size="lg" showPalette={false} commands={[{ phrase: "test", action: noop }]} />
      </div>
    ),
    code: `<VoiceCommand size="sm" showPalette={false} commands={commands} />
<VoiceCommand size="md" showPalette={false} commands={commands} />
<VoiceCommand size="lg" showPalette={false} commands={commands} />`,
    filename: "sizes.tsx",
  },
  {
    id: "vc-no-palette",
    title: "Without Palette",
    tag: "Minimal",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Just the mic button — no floating command list.",
    preview: (
      <div className="flex items-center justify-center py-12">
        <VoiceCommand
          showPalette={false}
          commands={[
            { phrase: "hello", action: noop },
            { phrase: "search", action: noop },
          ]}
        />
      </div>
    ),
    code: `<VoiceCommand
  showPalette={false}
  commands={commands}
  onCommandMatch={(phrase) => console.log("Matched:", phrase)}
/>`,
    filename: "no-palette.tsx",
  },
];

export function VoiceCommandExamples() {
  return <ShowcaseGrid items={examples} />;
}
