"use client";

import React from "react";
import { CosmicEye } from "@/components/flexui/cosmic-eye";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "ce-nebula",
    title: "Nebula Eye",
    tag: "Default",
    tagColor: "bg-violet-500/10 text-violet-400",
    description:
      "The default cosmic eye with violet iris and cyan accent — a deep space nebula look.",
    preview: (
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <CosmicEye />
      </div>
    ),
    code: `<CosmicEye />`,
    filename: "nebula-eye.tsx",
  },
  {
    id: "ce-fire",
    title: "Fire Eye",
    tag: "Warm",
    tagColor: "bg-red-500/10 text-red-400",
    description:
      "A blazing fire eye with red iris and golden corona for a fiery, intense look.",
    preview: (
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <CosmicEye
          color="#ef4444"
          accentColor="#fbbf24"
          intensity={2.0}
          glowIntensity={0.6}
        />
      </div>
    ),
    code: `<CosmicEye
  color="#ef4444"
  accentColor="#fbbf24"
  intensity={2.0}
  glowIntensity={0.6}
/>`,
    filename: "fire-eye.tsx",
  },
  {
    id: "ce-frost",
    title: "Frost Eye",
    tag: "Cool",
    tagColor: "bg-sky-500/10 text-sky-400",
    description:
      "An icy frost eye with pale blue iris and silver accent — calm and ethereal.",
    preview: (
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        <CosmicEye
          color="#38bdf8"
          accentColor="#e2e8f0"
          intensity={1.2}
          speed={0.6}
          glowIntensity={0.3}
        />
      </div>
    ),
    code: `<CosmicEye
  color="#38bdf8"
  accentColor="#e2e8f0"
  intensity={1.2}
  speed={0.6}
  glowIntensity={0.3}
/>`,
    filename: "frost-eye.tsx",
  },
];

export function CosmicEyeExamples() {
  return <ShowcaseGrid items={examples} />;
}
