"use client";

import React, { useState } from "react";
import { TagInput } from "@/components/flexui/tag-input";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { useState } from "react";
import { TagInput } from "@/components/flexui/tag-input";

export function Demo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  return (
    <TagInput
      tags={tags}
      onAdd={(tag) => setTags((prev) => [...prev, tag])}
      onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
      placeholder="Add a technology..."
      className="w-full max-w-md"
    />
  );
}`;

function TagInputPreview() {
  const [tags, setTags] = useState(["React", "TypeScript", "Tailwind"]);

  return (
    <div className="flex w-full items-center justify-center">
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

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={<TagInputPreview />}
      code={demoCode}
      filename="tag-input-demo.tsx"
    />
  );
}
