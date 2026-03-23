"use client";

import React from "react";
import { Skeleton } from "@/components/flexui/skeleton";
import { ShowcaseGrid } from "@/components/docs/expandable-showcase";

const examples = [
  {
    id: "sk-text",
    title: "Text Lines",
    tag: "Base",
    tagColor: "bg-zinc-800 text-zinc-400",
    description: "Stacked text-line skeletons to represent loading paragraph content.",
    preview: (
      <div className="space-y-3 w-full max-w-sm">
        <Skeleton width="85%" height={14} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="65%" height={14} />
      </div>
    ),
    code: `<Skeleton width="85%" height={14} />
<Skeleton width="100%" height={14} />
<Skeleton width="65%" height={14} />`,
    filename: "text-lines.tsx",
  },
  {
    id: "sk-user-card",
    title: "User Card",
    tag: "Layout",
    tagColor: "bg-blue-500/10 text-blue-400",
    description: "Avatar and text lines arranged as a loading user profile card.",
    preview: (
      <div className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-5 w-full max-w-sm">
        <Skeleton width={48} height={48} rounded />
        <div className="flex-1 space-y-2.5">
          <Skeleton width={140} height={14} />
          <Skeleton width={100} height={12} />
          <Skeleton width="100%" height={10} />
        </div>
      </div>
    ),
    code: `<div className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-zinc-900/50 p-5">
  <Skeleton width={48} height={48} rounded />
  <div className="flex-1 space-y-2.5">
    <Skeleton width={140} height={14} />
    <Skeleton width={100} height={12} />
    <Skeleton width="100%" height={10} />
  </div>
</div>`,
    filename: "user-card.tsx",
  },
  {
    id: "sk-media-card",
    title: "Media Card",
    tag: "Layout",
    tagColor: "bg-amber-500/10 text-amber-400",
    description: "Image placeholder with title and description for a media card loading state.",
    preview: (
      <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 overflow-hidden w-full max-w-xs">
        <Skeleton width="100%" height={160} className="rounded-none" />
        <div className="p-4 space-y-2.5">
          <Skeleton width="70%" height={16} />
          <Skeleton width="100%" height={12} />
          <Skeleton width="45%" height={12} />
        </div>
      </div>
    ),
    code: `<div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
  <Skeleton width="100%" height={160} className="rounded-none" />
  <div className="p-4 space-y-2.5">
    <Skeleton width="70%" height={16} />
    <Skeleton width="100%" height={12} />
    <Skeleton width="45%" height={12} />
  </div>
</div>`,
    filename: "media-card.tsx",
  },
  {
    id: "sk-dashboard",
    title: "Dashboard Grid",
    tag: "Compose",
    tagColor: "bg-emerald-500/10 text-emerald-400",
    description: "A multi-card dashboard skeleton layout for complex loading states.",
    preview: (
      <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 space-y-3">
            <Skeleton width={60} height={10} />
            <Skeleton width="100%" height={28} />
            <Skeleton width={80} height={8} />
          </div>
        ))}
        <div className="col-span-3 rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 space-y-3">
          <Skeleton width={120} height={12} />
          <Skeleton width="100%" height={80} className="rounded-lg" />
        </div>
      </div>
    ),
    code: `<div className="grid grid-cols-3 gap-3">
  {[1, 2, 3].map((i) => (
    <div key={i} className="rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 space-y-3">
      <Skeleton width={60} height={10} />
      <Skeleton width="100%" height={28} />
      <Skeleton width={80} height={8} />
    </div>
  ))}
  <div className="col-span-3 rounded-lg border border-white/[0.06] bg-zinc-900/50 p-4 space-y-3">
    <Skeleton width={120} height={12} />
    <Skeleton width="100%" height={80} className="rounded-lg" />
  </div>
</div>`,
    filename: "dashboard.tsx",
  },
];

export function SkeletonExamples() {
  return <ShowcaseGrid items={examples} />;
}
