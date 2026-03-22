"use client";

import React, { useState } from "react";
import { Switch } from "@/components/flexui/switch";

export function ComponentDemo() {
  const [checked, setChecked] = useState(false);
  const [checkedSm, setCheckedSm] = useState(true);
  const [checkedLg, setCheckedLg] = useState(false);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">Small</span>
        <Switch checked={checkedSm} onChange={setCheckedSm} size="sm" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">Medium</span>
        <Switch checked={checked} onChange={setChecked} size="md" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">Large</span>
        <Switch checked={checkedLg} onChange={setCheckedLg} size="lg" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-400">Disabled</span>
        <Switch checked={false} onChange={() => {}} disabled size="md" />
      </div>
    </div>
  );
}
