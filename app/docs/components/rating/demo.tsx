"use client";

import React, { useState } from "react";
import { Rating } from "@/components/flexui/rating";

export function ComponentDemo() {
  const [value, setValue] = useState(3);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-zinc-400">Interactive (click to rate)</p>
        <Rating value={value} onChange={setValue} />
        <p className="text-sm text-zinc-500">
          You rated: <span className="text-white">{value}/5</span>
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-zinc-400">Read-only (size 32)</p>
        <Rating value={4} size={32} />
      </div>
    </div>
  );
}
