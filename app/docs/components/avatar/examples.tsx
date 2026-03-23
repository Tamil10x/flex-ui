"use client";

import React from "react";
import { Avatar } from "@/components/flexui/avatar";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "avatar-default",
    title: "Default with Initials",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Avatars with auto-generated initials and unique gradient backgrounds from names.",
    preview: (
      <div className="flex items-center gap-4">
        <Avatar name="Sarah Chen" size="md" />
        <Avatar name="Marcus Johnson" size="md" />
        <Avatar name="Aisha Patel" size="md" />
        <Avatar name="David Kim" size="md" />
      </div>
    ),
    code: `<Avatar name="Sarah Chen" size="md" />
<Avatar name="Marcus Johnson" size="md" />
<Avatar name="Aisha Patel" size="md" />
<Avatar name="David Kim" size="md" />`,
    filename: "default.tsx",
  },
  {
    id: "avatar-sizes",
    title: "All Sizes",
    tag: "Size",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Small (32px), medium (40px), and large (56px) avatar presets.",
    preview: (
      <div className="flex items-end gap-5">
        <div className="flex flex-col items-center gap-2">
          <Avatar name="Alice Martin" size="sm" />
          <span className="text-xs text-zinc-500">sm</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar name="Alice Martin" size="md" />
          <span className="text-xs text-zinc-500">md</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar name="Alice Martin" size="lg" />
          <span className="text-xs text-zinc-500">lg</span>
        </div>
      </div>
    ),
    code: `<Avatar name="Alice Martin" size="sm" />
<Avatar name="Alice Martin" size="md" />
<Avatar name="Alice Martin" size="lg" />`,
    filename: "sizes.tsx",
  },
  {
    id: "avatar-status",
    title: "With Status Indicator",
    tag: "Compose",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Avatar with an online/offline status ring indicator overlay.",
    preview: (
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar name="Elena Rodriguez" size="lg" />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
        </div>
        <div className="relative">
          <Avatar name="James Wright" size="lg" />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-zinc-500 ring-2 ring-zinc-950" />
        </div>
        <div className="relative">
          <Avatar name="Priya Sharma" size="lg" />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-amber-500 ring-2 ring-zinc-950" />
        </div>
      </div>
    ),
    code: `{/* Online */}
<div className="relative">
  <Avatar name="Elena Rodriguez" size="lg" />
  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
</div>

{/* Offline */}
<div className="relative">
  <Avatar name="James Wright" size="lg" />
  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-zinc-500 ring-2 ring-zinc-950" />
</div>

{/* Away */}
<div className="relative">
  <Avatar name="Priya Sharma" size="lg" />
  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-amber-500 ring-2 ring-zinc-950" />
</div>`,
    filename: "status.tsx",
  },
  {
    id: "avatar-gradient-colors",
    title: "Unique Gradient Colors",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Each name generates a deterministic unique gradient. Same name always produces the same color.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {["Design Team", "Engineering", "Marketing", "Product", "Support", "Sales", "DevOps", "QA"].map((name) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <Avatar name={name} size="md" />
            <span className="text-[10px] text-zinc-500">{name}</span>
          </div>
        ))}
      </div>
    ),
    code: `{["Design Team", "Engineering", "Marketing", "Product", "Support", "Sales", "DevOps", "QA"].map((name) => (
  <Avatar key={name} name={name} size="md" />
))}`,
    filename: "gradient-colors.tsx",
  },
];

export function AvatarExamples() {
  return <ShowcaseGrid items={examples} />;
}
