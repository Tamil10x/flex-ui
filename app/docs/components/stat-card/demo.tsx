"use client";

import React from "react";
import { StatCard } from "@/components/flexui/stat-card";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <StatCard label="Revenue" value="$48.2k" change={12.5} />
      <StatCard label="Users" value="2,841" change={8.1} />
      <StatCard label="Bounce Rate" value="24.3%" change={-3.2} />
    </div>
  );
}
