"use client";

import React from "react";
import { MagneticCard } from "@/components/flexui/magnetic-card";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <MagneticCard className="w-64">
        <h3 className="text-lg font-semibold text-white">Magnetic Card</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Move your cursor over this card. It follows your mouse with a smooth
          spring animation.
        </p>
      </MagneticCard>
      <MagneticCard className="w-64" strength={50}>
        <h3 className="text-lg font-semibold text-white">Strong Pull</h3>
        <p className="mt-2 text-sm text-zinc-400">
          This card has a stronger magnetic attraction (strength=50).
        </p>
      </MagneticCard>
    </div>
  );
}
