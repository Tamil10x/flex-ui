"use client";

import React from "react";
import { BlobCursor } from "@/components/flexui/blob-cursor";

function DefaultExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <BlobCursor />
      <p className="text-sm text-zinc-500">Default cyan blob</p>
    </div>
  );
}

function PurpleExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <BlobCursor color="rgba(168,85,247,0.3)" size={160} />
      <p className="text-sm text-zinc-500">Purple &middot; 160px</p>
    </div>
  );
}

function SmallExample() {
  return (
    <div className="relative flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950">
      <BlobCursor color="rgba(52,211,153,0.35)" size={80} />
      <p className="text-sm text-zinc-500">Green &middot; 80px</p>
    </div>
  );
}

export function BlobCursorExamples() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8 py-8">
      <div className="flex flex-col items-center gap-3">
        <DefaultExample />
        <p className="text-xs text-zinc-500">Default</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <PurpleExample />
        <p className="text-xs text-zinc-500">Custom Color &amp; Size</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <SmallExample />
        <p className="text-xs text-zinc-500">Smaller Blob</p>
      </div>
    </div>
  );
}
