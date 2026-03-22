"use client";

import React, { useState } from "react";
import { ColorPicker } from "@/components/flexui/color-picker";

export function ComponentDemo() {
  const [color, setColor] = useState("#8b5cf6");

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <ColorPicker value={color} onChange={setColor} />
      <p className="text-sm text-zinc-400">
        Selected: <code className="text-purple-400">{color}</code>
      </p>
    </div>
  );
}
