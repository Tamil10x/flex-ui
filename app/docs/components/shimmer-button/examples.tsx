"use client";

import React from "react";
import { ShimmerButton } from "@/components/flexui/shimmer-button";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";
import { ArrowRight, Zap } from "lucide-react";

const examples = [
  {
    id: "sb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default shimmer button with a white sweep effect.",
    preview: <ShimmerButton>Get Started</ShimmerButton>,
    code: `<ShimmerButton>Get Started</ShimmerButton>`,
    filename: "default.tsx",
  },
  {
    id: "sb-gradient",
    title: "Gradient Variant",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Gradient background with a colored shimmer sweep.",
    preview: (
      <ShimmerButton
        className="bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/20"
        shimmerColor="#c084fc"
      >
        Gradient Shimmer
      </ShimmerButton>
    ),
    code: `<ShimmerButton
  className="bg-gradient-to-r from-purple-600 to-blue-600 border-purple-500/20"
  shimmerColor="#c084fc"
>
  Gradient Shimmer
</ShimmerButton>`,
    filename: "gradient.tsx",
  },
  {
    id: "sb-icon",
    title: "With Icon",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Pair with lucide-react icons for action buttons.",
    preview: (
      <div className="flex flex-wrap items-center gap-3">
        <ShimmerButton>
          <span className="flex items-center gap-2">
            Continue <ArrowRight className="h-4 w-4" />
          </span>
        </ShimmerButton>
        <ShimmerButton
          className="bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-500/20"
          shimmerColor="#fbbf24"
        >
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> Boost
          </span>
        </ShimmerButton>
      </div>
    ),
    code: `import { ArrowRight, Zap } from "lucide-react";

<ShimmerButton>
  <span className="flex items-center gap-2">
    Continue <ArrowRight className="h-4 w-4" />
  </span>
</ShimmerButton>

<ShimmerButton
  className="bg-gradient-to-r from-yellow-600 to-orange-600 border-yellow-500/20"
  shimmerColor="#fbbf24"
>
  <span className="flex items-center gap-2">
    <Zap className="h-4 w-4" /> Boost
  </span>
</ShimmerButton>`,
    filename: "with-icons.tsx",
  },
  {
    id: "sb-disabled",
    title: "Disabled State",
    tag: "State",
    tagColor: "bg-red-500/10 text-red-400",
    description: "Button with disabled prop — no hover or shimmer interaction.",
    preview: <ShimmerButton disabled>Disabled</ShimmerButton>,
    code: `<ShimmerButton disabled>Disabled</ShimmerButton>`,
    filename: "disabled.tsx",
  },
];

export function ShimmerButtonExamples() {
  return <ShowcaseGrid items={examples} />;
}
