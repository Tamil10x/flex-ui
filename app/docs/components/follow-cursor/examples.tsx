"use client";

import React from "react";
import { FollowCursor } from "@/components/flexui/follow-cursor";

function DefaultExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FollowCursor />
      <p className="text-sm text-zinc-500">Default violet glow</p>
    </div>
  );
}

function CyanExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FollowCursor color="rgba(56,189,248,0.6)" size={32} />
      <p className="text-sm text-zinc-500">Cyan &middot; 32px</p>
    </div>
  );
}

function SlowSpringExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <FollowCursor
        color="rgba(251,146,60,0.5)"
        size={20}
        stiffness={80}
        damping={12}
      />
      <p className="text-sm text-zinc-500">Slow spring &middot; orange</p>
    </div>
  );
}

export function FollowCursorExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <CyanExample />
        <p className="text-xs text-zinc-500">Custom Color &amp; Size</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <SlowSpringExample />
        <p className="text-xs text-zinc-500">Slow Spring</p>
      </div>
    </div>
  );
}
