"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/flexui/avatar";

interface AvatarGroupItem {
  src?: string;
  name: string;
}

interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AvatarGroup({ avatars, max = 5, size = "md", className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {visible.map((a, i) => (
        <div key={i} className="ring-2 ring-zinc-950 rounded-full">
          <Avatar src={a.src} name={a.name} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-full border border-white/[0.06] bg-zinc-800 font-medium text-white/60 ring-2 ring-zinc-950",
            size === "sm" && "h-8 w-8 text-xs",
            size === "md" && "h-10 w-10 text-sm",
            size === "lg" && "h-14 w-14 text-base"
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
