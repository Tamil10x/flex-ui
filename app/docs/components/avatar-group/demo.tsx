"use client";

import React from "react";
import { AvatarGroup } from "@/components/flexui/avatar-group";

const teamMembers = [
  { name: "Sarah Chen" },
  { name: "Marcus Johnson" },
  { name: "Aisha Patel" },
  { name: "David Kim" },
  { name: "Elena Rodriguez" },
  { name: "James Wright" },
  { name: "Priya Sharma" },
];

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-8 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">Small</span>
        <AvatarGroup avatars={teamMembers} max={4} size="sm" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">Medium</span>
        <AvatarGroup avatars={teamMembers} max={5} size="md" />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">Large</span>
        <AvatarGroup avatars={teamMembers} max={3} size="lg" />
      </div>
    </div>
  );
}
