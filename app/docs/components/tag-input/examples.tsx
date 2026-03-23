"use client";

import React, { useState } from "react";
import { TagInput } from "@/components/flexui/tag-input";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

function TagInputDefault() {
  const [tags, setTags] = useState(["React", "TypeScript"]);
  return (
    <TagInput
      tags={tags}
      onAdd={(tag) => setTags((prev) => [...prev, tag])}
      onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
      placeholder="Add a technology..."
      className="w-full max-w-md"
    />
  );
}

function TagInputSkills() {
  const [tags, setTags] = useState(["Design", "Prototyping", "Figma"]);
  return (
    <TagInput
      tags={tags}
      onAdd={(tag) => setTags((prev) => [...prev, tag])}
      onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
      placeholder="Add a skill..."
      className="w-full max-w-md"
    />
  );
}

function TagInputEmpty() {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <TagInput
      tags={tags}
      onAdd={(tag) => setTags((prev) => [...prev, tag])}
      onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
      placeholder="Type something and press Enter..."
      className="w-full max-w-md"
    />
  );
}

function TagInputStyled() {
  const [tags, setTags] = useState(["Next.js", "Vercel", "Edge"]);
  return (
    <TagInput
      tags={tags}
      onAdd={(tag) => setTags((prev) => [...prev, tag])}
      onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
      placeholder="Add a platform..."
      className="w-full max-w-md border-cyan-500/20 bg-cyan-950/20"
    />
  );
}

const examples = [
  {
    id: "tag-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Standard tag input with pre-populated tags. Press Enter to add, click X to remove.",
    preview: <TagInputDefault />,
    code: `const [tags, setTags] = useState(["React", "TypeScript"]);

<TagInput
  tags={tags}
  onAdd={(tag) => setTags((prev) => [...prev, tag])}
  onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
  placeholder="Add a technology..."
/>`,
    filename: "default.tsx",
  },
  {
    id: "tag-skills",
    title: "Skills Input",
    tag: "Variant",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Tag input configured for entering skills or competencies.",
    preview: <TagInputSkills />,
    code: `const [tags, setTags] = useState(["Design", "Prototyping", "Figma"]);

<TagInput
  tags={tags}
  onAdd={(tag) => setTags((prev) => [...prev, tag])}
  onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
  placeholder="Add a skill..."
/>`,
    filename: "skills.tsx",
  },
  {
    id: "tag-empty",
    title: "Empty State",
    tag: "State",
    tagColor: "bg-green-500/10 text-green-400",
    description: "Tag input starting empty with a descriptive placeholder.",
    preview: <TagInputEmpty />,
    code: `const [tags, setTags] = useState<string[]>([]);

<TagInput
  tags={tags}
  onAdd={(tag) => setTags((prev) => [...prev, tag])}
  onRemove={(tag) => setTags((prev) => prev.filter((t) => t !== tag))}
  placeholder="Type something and press Enter..."
/>`,
    filename: "empty.tsx",
  },
  {
    id: "tag-styled",
    title: "Custom Styled",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Tag input with custom border and background colors via className.",
    preview: <TagInputStyled />,
    code: `<TagInput
  tags={tags}
  onAdd={handleAdd}
  onRemove={handleRemove}
  placeholder="Add a platform..."
  className="border-cyan-500/20 bg-cyan-950/20"
/>`,
    filename: "styled.tsx",
  },
];

export function TagInputExamples() {
  return <ShowcaseGrid items={examples} />;
}
