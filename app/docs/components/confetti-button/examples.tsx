"use client";

import React from "react";
import { ConfettiButton } from "@/components/flexui/confetti-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "cb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default confetti button with 20 particles.",
    preview: <ConfettiButton>Celebrate!</ConfettiButton>,
    code: `<ConfettiButton>Celebrate!</ConfettiButton>`,
    filename: "default.tsx",
  },
  {
    id: "cb-many-particles",
    title: "More Particles",
    tag: "Config",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Increase particle count for a bigger burst.",
    preview: (
      <ConfettiButton particleCount={40}>Big Burst!</ConfettiButton>
    ),
    code: `<ConfettiButton particleCount={40}>Big Burst!</ConfettiButton>`,
    filename: "many-particles.tsx",
  },
  {
    id: "cb-gradient",
    title: "Gradient Background",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Confetti on a gradient background button.",
    preview: (
      <ConfettiButton className="bg-gradient-to-r from-violet-600 to-pink-600 border-violet-500/20">
        Party Time
      </ConfettiButton>
    ),
    code: `<ConfettiButton className="bg-gradient-to-r from-violet-600 to-pink-600 border-violet-500/20">
  Party Time
</ConfettiButton>`,
    filename: "gradient.tsx",
  },
];

export function ConfettiButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
