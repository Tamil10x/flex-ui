"use client";

import React from "react";
import { MorphingBlob } from "@/components/flexui/morphing-blob";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "mb-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "The default morphing blob with violet-to-blue gradient.",
    preview: (
      <div className="flex items-center justify-center py-4">
        <MorphingBlob />
      </div>
    ),
    code: `<MorphingBlob />`,
    filename: "default.tsx",
  },
  {
    id: "mb-colors",
    title: "Custom Colors & Sizes",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Different gradient colors and sizes.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-6">
        <MorphingBlob color="#EC4899" accentColor="#F59E0B" size={120} />
        <MorphingBlob color="#10B981" accentColor="#06B6D4" size={160} />
        <MorphingBlob color="#F43F5E" accentColor="#8B5CF6" size={100} />
      </div>
    ),
    code: `<MorphingBlob color="#EC4899" accentColor="#F59E0B" size={120} />
<MorphingBlob color="#10B981" accentColor="#06B6D4" size={160} />
<MorphingBlob color="#F43F5E" accentColor="#8B5CF6" size={100} />`,
    filename: "colors.tsx",
  },
  {
    id: "mb-children",
    title: "With Children",
    tag: "Compose",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Render content centered on top of the blob.",
    preview: (
      <div className="flex items-center justify-center py-4">
        <MorphingBlob size={180} color="#6366F1" accentColor="#A855F7" speed={3}>
          <span className="text-lg font-bold text-white drop-shadow-lg">
            Hello
          </span>
        </MorphingBlob>
      </div>
    ),
    code: `<MorphingBlob size={180} color="#6366F1" accentColor="#A855F7" speed={3}>
  <span className="text-lg font-bold text-white drop-shadow-lg">
    Hello
  </span>
</MorphingBlob>`,
    filename: "with-children.tsx",
  },
];

export function MorphingBlobExamples() {
  return <ShowcaseGrid items={examples} />;
}
