"use client";

import React from "react";
import { Countdown } from "@/components/flexui/countdown";

export function ComponentDemo() {
  // Set target to 7 days from now
  const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <Countdown targetDate={target} />
      <p className="text-sm text-zinc-500">Counting down to 7 days from now</p>
    </div>
  );
}
