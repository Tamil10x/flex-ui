"use client";

import React from "react";
import { AvatarGroup } from "@/components/flexui/avatar-group";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const team = [
  { name: "Sarah Chen", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Marcus Johnson", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Aisha Patel", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "David Kim", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Elena Rodriguez", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "James Wright", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Priya Sharma", src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Liam O'Brien", src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&q=80" },
];

const teamWithStatus = [
  { name: "Sarah Chen", src: team[0].src, status: "online" as const },
  { name: "Marcus Johnson", src: team[1].src, status: "online" as const },
  { name: "Aisha Patel", src: team[2].src, status: "away" as const },
  { name: "David Kim", src: team[3].src, status: "busy" as const },
  { name: "Elena Rodriguez", src: team[4].src, status: "offline" as const },
];

const examples = [
  {
    id: "avatar-group-default",
    title: "Default with Images",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Avatar group with profile photos. Spring-animated stacking with overflow count.",
    preview: <AvatarGroup avatars={team} max={5} size="md" />,
    code: `const team = [
  { name: "Sarah Chen", src: "/avatars/sarah.jpg" },
  { name: "Marcus Johnson", src: "/avatars/marcus.jpg" },
  // ...
];

<AvatarGroup avatars={team} max={5} size="md" />`,
    filename: "default.tsx",
  },
  {
    id: "avatar-group-sizes",
    title: "All Sizes",
    tag: "Size",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Compare xs through xl avatar group sizes side by side.",
    preview: (
      <div className="flex flex-col items-center gap-6">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <AvatarGroup avatars={team} max={4} size={s} />
            <span className="text-[10px] text-zinc-600">{s}</span>
          </div>
        ))}
      </div>
    ),
    code: `<AvatarGroup avatars={team} max={4} size="sm" />
<AvatarGroup avatars={team} max={4} size="md" />
<AvatarGroup avatars={team} max={4} size="lg" />
<AvatarGroup avatars={team} max={4} size="xl" />`,
    filename: "sizes.tsx",
  },
  {
    id: "avatar-group-expandable",
    title: "Expandable on Hover",
    tag: "Interactive",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Hover the +N badge to expand and reveal all avatars with spring animation.",
    preview: (
      <div className="flex flex-col items-center gap-3">
        <AvatarGroup avatars={team} max={3} size="lg" expandable />
        <p className="text-[10px] text-zinc-500">Hover +5 to expand</p>
      </div>
    ),
    code: `<AvatarGroup avatars={team} max={3} size="lg" expandable />`,
    filename: "expandable.tsx",
  },
  {
    id: "avatar-group-status",
    title: "With Status Indicators",
    tag: "Status",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Each avatar can have its own status indicator (online, away, busy, offline).",
    preview: <AvatarGroup avatars={teamWithStatus} max={5} size="lg" spacing="loose" />,
    code: `const teamWithStatus = [
  { name: "Sarah", src: "/avatars/sarah.jpg", status: "online" },
  { name: "Marcus", src: "/avatars/marcus.jpg", status: "online" },
  { name: "Aisha", src: "/avatars/aisha.jpg", status: "away" },
  { name: "David", src: "/avatars/david.jpg", status: "busy" },
  { name: "Elena", src: "/avatars/elena.jpg", status: "offline" },
];

<AvatarGroup avatars={teamWithStatus} max={5} size="lg" spacing="loose" />`,
    filename: "status.tsx",
  },
  {
    id: "avatar-group-spacing",
    title: "Spacing Variants",
    tag: "Style",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Control overlap density: tight, normal, or loose spacing.",
    preview: (
      <div className="flex flex-col items-center gap-6">
        {(["tight", "normal", "loose"] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <AvatarGroup avatars={team.slice(0, 5)} max={5} size="md" spacing={s} />
            <span className="text-[10px] text-zinc-600">{s}</span>
          </div>
        ))}
      </div>
    ),
    code: `<AvatarGroup avatars={team} max={5} size="md" spacing="tight" />
<AvatarGroup avatars={team} max={5} size="md" spacing="normal" />
<AvatarGroup avatars={team} max={5} size="md" spacing="loose" />`,
    filename: "spacing.tsx",
  },
];

export function AvatarGroupExamples() {
  return <ShowcaseGrid items={examples} />;
}
