"use client";

import React from "react";
import { ChromaticText } from "@/components/flexui/chromatic-text";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "ct-hover",
    title: "Hover Trigger",
    tag: "Default",
    tagColor: "bg-violet-500/10 text-violet-400",
    description:
      "RGB channels split on hover, merging back when the cursor leaves. The default trigger mode.",
    preview: (
      <div className="flex items-center justify-center rounded-lg bg-black p-12">
        <ChromaticText className="text-5xl font-bold">
          Chromatic
        </ChromaticText>
      </div>
    ),
    code: `<ChromaticText className="text-5xl font-bold">
  Chromatic
</ChromaticText>`,
    filename: "hover-trigger.tsx",
  },
  {
    id: "ct-always",
    title: "Always Active",
    tag: "Animated",
    tagColor: "bg-cyan-500/10 text-cyan-400",
    description:
      "The chromatic aberration effect is always active with a wider 5px offset for a glitchy, cinematic look.",
    preview: (
      <div className="flex items-center justify-center rounded-lg bg-black p-12">
        <ChromaticText
          className="text-5xl font-bold"
          trigger="always"
          offset={5}
        >
          Glitch
        </ChromaticText>
      </div>
    ),
    code: `<ChromaticText
  className="text-5xl font-bold"
  trigger="always"
  offset={5}
>
  Glitch
</ChromaticText>`,
    filename: "always-active.tsx",
  },
  {
    id: "ct-custom",
    title: "Custom Colors",
    tag: "Styled",
    tagColor: "bg-pink-500/10 text-pink-400",
    description:
      "Custom RGB channel colors with magenta, cyan, and yellow for a CMYK-inspired split effect.",
    preview: (
      <div className="flex items-center justify-center rounded-lg bg-black p-12">
        <ChromaticText
          className="text-5xl font-bold"
          colors={["#ff00ff", "#00ffff", "#ffff00"]}
          offset={4}
        >
          Neon
        </ChromaticText>
      </div>
    ),
    code: `<ChromaticText
  className="text-5xl font-bold"
  colors={["#ff00ff", "#00ffff", "#ffff00"]}
  offset={4}
>
  Neon
</ChromaticText>`,
    filename: "custom-colors.tsx",
  },
];

export function ChromaticTextExamples() {
  return <ShowcaseGrid items={examples} />;
}
