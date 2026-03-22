"use client";

import React from "react";
import { ImageCompare } from "@/components/flexui/image-compare";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <ImageCompare
        before="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80&sat=-100"
        after="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop&q=80"
        className="max-w-lg"
      />
    </div>
  );
}
