"use client";

import React, { useState } from "react";
import { TagInput } from "@/components/flexui/tag-input";

export function ComponentDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <TagInput
        tags={tags}
        onAdd={(tag) => setTags((prev) => [...prev, tag])}
        onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
        placeholder="Add a technology..."
        className="w-full max-w-md"
      />
    </div>
  );
}
