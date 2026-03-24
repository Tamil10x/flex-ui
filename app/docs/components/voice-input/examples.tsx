"use client";

import React from "react";
import { VoiceInput } from "@/components/flexui/voice-input";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "vi-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard voice input with waveform visualization.",
    preview: (
      <VoiceInput
        onTranscript={(t) => console.log(t)}
      />
    ),
    code: `<VoiceInput
  onTranscript={(text) => console.log(text)}
  onFinal={(text) => alert(text)}
/>`,
    filename: "default.tsx",
  },
  {
    id: "vi-continuous",
    title: "Continuous Mode",
    tag: "Mode",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Keeps listening after each phrase for hands-free dictation.",
    preview: (
      <VoiceInput
        continuous
        placeholder="Continuous listening mode…"
        onTranscript={(t) => console.log(t)}
      />
    ),
    code: `<VoiceInput
  continuous
  placeholder="Continuous listening mode…"
  onTranscript={(text) => console.log(text)}
/>`,
    filename: "continuous.tsx",
  },
  {
    id: "vi-sizes",
    title: "Size Variants",
    tag: "Style",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Small, medium, and large sizes for different contexts.",
    preview: (
      <div className="space-y-4 w-full max-w-md">
        <VoiceInput size="sm" placeholder="Small voice input…" />
        <VoiceInput size="md" placeholder="Medium voice input…" />
        <VoiceInput size="lg" placeholder="Large voice input…" />
      </div>
    ),
    code: `<VoiceInput size="sm" placeholder="Small voice input…" />
<VoiceInput size="md" placeholder="Medium voice input…" />
<VoiceInput size="lg" placeholder="Large voice input…" />`,
    filename: "sizes.tsx",
  },
  {
    id: "vi-no-wave",
    title: "Without Waveform",
    tag: "Minimal",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Compact variant without the waveform visualization bar.",
    preview: (
      <VoiceInput
        showWaveform={false}
        placeholder="No waveform visualization…"
      />
    ),
    code: `<VoiceInput
  showWaveform={false}
  placeholder="No waveform visualization…"
/>`,
    filename: "no-waveform.tsx",
  },
];

export function VoiceInputExamples() {
  return <ShowcaseGrid items={examples} />;
}
