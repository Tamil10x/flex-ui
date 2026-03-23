"use client";

import React from "react";
import { AvatarGroup } from "@/components/flexui/avatar-group";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const team = [
  { name: "Sarah Chen" },
  { name: "Marcus Johnson" },
  { name: "Aisha Patel" },
  { name: "David Kim" },
  { name: "Elena Rodriguez" },
  { name: "James Wright" },
  { name: "Priya Sharma" },
  { name: "Liam O'Brien" },
];

const examples = [
  {
    id: "avatar-group-default",
    title: "Default",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Medium-sized avatar group with a max of 5 and overflow indicator.",
    preview: <AvatarGroup avatars={team} max={5} size="md" />,
    code: `const team = [
  { name: "Sarah Chen" },
  { name: "Marcus Johnson" },
  { name: "Aisha Patel" },
  { name: "David Kim" },
  { name: "Elena Rodriguez" },
  { name: "James Wright" },
  { name: "Priya Sharma" },
  { name: "Liam O'Brien" },
];

<AvatarGroup avatars={team} max={5} size="md" />`,
    filename: "default.tsx",
  },
  {
    id: "avatar-group-sizes",
    title: "All Sizes",
    tag: "Size",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Compare small, medium, and large avatar group sizes side by side.",
    preview: (
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">sm</span>
          <AvatarGroup avatars={team} max={4} size="sm" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">md</span>
          <AvatarGroup avatars={team} max={4} size="md" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-zinc-500">lg</span>
          <AvatarGroup avatars={team} max={4} size="lg" />
        </div>
      </div>
    ),
    code: `<AvatarGroup avatars={team} max={4} size="sm" />
<AvatarGroup avatars={team} max={4} size="md" />
<AvatarGroup avatars={team} max={4} size="lg" />`,
    filename: "sizes.tsx",
  },
  {
    id: "avatar-group-compact",
    title: "Compact Max 3",
    tag: "Prop",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Limit the display to 3 avatars with a prominent overflow count.",
    preview: <AvatarGroup avatars={team} max={3} size="md" />,
    code: `<AvatarGroup avatars={team} max={3} size="md" />`,
    filename: "compact.tsx",
  },
  {
    id: "avatar-group-large-showcase",
    title: "Large Team Showcase",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Large avatars with a higher max for showcasing a bigger team.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <AvatarGroup avatars={team} max={7} size="lg" />
        <p className="text-xs text-zinc-500">{team.length} team members</p>
      </div>
    ),
    code: `<AvatarGroup avatars={team} max={7} size="lg" />
<p>{team.length} team members</p>`,
    filename: "large-showcase.tsx",
  },
];

export function AvatarGroupExamples() {
  return <ShowcaseGrid items={examples} />;
}
