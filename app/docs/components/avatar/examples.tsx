"use client";

import React from "react";
import { Avatar } from "@/components/flexui/avatar";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const people = [
  { name: "Sarah Chen", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Marcus Johnson", src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Aisha Patel", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "David Kim", src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "Elena Rodriguez", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face&q=80" },
  { name: "James Wright", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&q=80" },
];

const examples = [
  {
    id: "avatar-with-images",
    title: "With Profile Images",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Avatars with real profile photos. Smooth hover scale and 3D tilt effect on interaction.",
    preview: (
      <div className="flex items-center gap-4">
        {people.slice(0, 5).map((p) => (
          <Avatar key={p.name} name={p.name} src={p.src} size="lg" />
        ))}
      </div>
    ),
    code: `<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="lg" />
<Avatar name="Marcus Johnson" src="/avatars/marcus.jpg" size="lg" />
<Avatar name="Aisha Patel" src="/avatars/aisha.jpg" size="lg" />`,
    filename: "with-images.tsx",
  },
  {
    id: "avatar-sizes",
    title: "All Sizes",
    tag: "Size",
    tagColor: "bg-purple-500/10 text-purple-400",
    description: "Five sizes from xs (28px) to xl (80px) for any context.",
    preview: (
      <div className="flex items-end gap-5">
        {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
          <div key={s} className="flex flex-col items-center gap-2">
            <Avatar name="Sarah Chen" src={people[0].src} size={s} />
            <span className="text-[10px] text-zinc-600">{s}</span>
          </div>
        ))}
      </div>
    ),
    code: `<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="xs" />
<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="sm" />
<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="md" />
<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="lg" />
<Avatar name="Sarah Chen" src="/avatars/sarah.jpg" size="xl" />`,
    filename: "sizes.tsx",
  },
  {
    id: "avatar-status",
    title: "Status Indicators",
    tag: "Status",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "Built-in status dot with animated ping for online and busy states.",
    preview: (
      <div className="flex items-center gap-6">
        {(["online", "away", "busy", "offline"] as const).map((status, i) => (
          <div key={status} className="flex flex-col items-center gap-2">
            <Avatar name={people[i].name} src={people[i].src} size="lg" status={status} />
            <span className="text-[10px] capitalize text-zinc-500">{status}</span>
          </div>
        ))}
      </div>
    ),
    code: `<Avatar name="Sarah" src="/avatars/sarah.jpg" size="lg" status="online" />
<Avatar name="Marcus" src="/avatars/marcus.jpg" size="lg" status="away" />
<Avatar name="Aisha" src="/avatars/aisha.jpg" size="lg" status="busy" />
<Avatar name="David" src="/avatars/david.jpg" size="lg" status="offline" />`,
    filename: "status.tsx",
  },
  {
    id: "avatar-ring",
    title: "Ring Highlight",
    tag: "Style",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Accent ring around the avatar for highlighted states or selections.",
    preview: (
      <div className="flex items-center gap-5">
        <Avatar name="Sarah Chen" src={people[0].src} size="lg" ring ringColor="rgba(139,92,246,0.6)" />
        <Avatar name="Marcus Johnson" src={people[1].src} size="lg" ring ringColor="rgba(56,189,248,0.6)" />
        <Avatar name="Aisha Patel" src={people[2].src} size="lg" ring ringColor="rgba(52,211,153,0.6)" />
        <Avatar name="David Kim" src={people[3].src} size="lg" ring ringColor="rgba(251,146,60,0.6)" />
      </div>
    ),
    code: `<Avatar name="Sarah" src="/avatars/sarah.jpg" size="lg" ring ringColor="rgba(139,92,246,0.6)" />
<Avatar name="Marcus" src="/avatars/marcus.jpg" size="lg" ring ringColor="rgba(56,189,248,0.6)" />`,
    filename: "ring.tsx",
  },
  {
    id: "avatar-initials",
    title: "Unique Gradient Initials",
    tag: "Fallback",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Each name generates a deterministic unique gradient. Same name always produces the same color.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {["Design Team", "Engineering", "Marketing", "Product", "Support", "Sales", "DevOps", "QA"].map((name) => (
          <div key={name} className="flex flex-col items-center gap-1.5">
            <Avatar name={name} size="md" />
            <span className="text-[10px] text-zinc-600">{name}</span>
          </div>
        ))}
      </div>
    ),
    code: `{["Design Team", "Engineering", "Marketing", "Product"].map((name) => (
  <Avatar key={name} name={name} size="md" />
))}`,
    filename: "initials.tsx",
  },
];

export function AvatarExamples() {
  return <ShowcaseGrid items={examples} />;
}
