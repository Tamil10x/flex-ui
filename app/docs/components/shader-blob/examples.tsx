"use client";

import React from "react";
import { ShaderBlob } from "@/components/flexui/shader-blob";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "sb-default",
    title: "Violet Blob",
    tag: "Default",
    tagColor: "bg-violet-500/10 text-violet-400",
    description:
      "The default metaball with violet primary and blue accent. Reacts to cursor movement with organic noise distortion.",
    preview: (
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <ShaderBlob />
      </div>
    ),
    code: `<ShaderBlob />`,
    filename: "violet-blob.tsx",
  },
  {
    id: "sb-fire",
    title: "Fire Blob",
    tag: "Warm",
    tagColor: "bg-red-500/10 text-red-400",
    description:
      "A blazing fire blob with red and orange tones. Higher complexity for a more chaotic, flame-like surface.",
    preview: (
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <ShaderBlob
          color="#ef4444"
          accentColor="#f97316"
          complexity={1.5}
          speed={1.2}
        />
      </div>
    ),
    code: `<ShaderBlob
  color="#ef4444"
  accentColor="#f97316"
  complexity={1.5}
  speed={1.2}
/>`,
    filename: "fire-blob.tsx",
  },
  {
    id: "sb-ocean",
    title: "Ocean Blob",
    tag: "Cool",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description:
      "A calm ocean-themed blob with teal and cyan tones. Slower speed for a meditative, flowing feel.",
    preview: (
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <ShaderBlob
          color="#06b6d4"
          accentColor="#22d3ee"
          speed={0.5}
          complexity={0.8}
        />
      </div>
    ),
    code: `<ShaderBlob
  color="#06b6d4"
  accentColor="#22d3ee"
  speed={0.5}
  complexity={0.8}
/>`,
    filename: "ocean-blob.tsx",
  },
];

export function ShaderBlobExamples() {
  return <ShowcaseGrid items={examples} />;
}
