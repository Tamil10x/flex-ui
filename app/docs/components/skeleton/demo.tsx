"use client";

import React from "react";
import { Skeleton } from "@/components/flexui/skeleton";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex items-start gap-4">
        <Skeleton width={48} height={48} rounded />
        <div className="space-y-3">
          <Skeleton width={180} height={14} />
          <Skeleton width={240} height={14} />
          <Skeleton width={120} height={14} />
        </div>
      </div>
    </div>
  );
}
