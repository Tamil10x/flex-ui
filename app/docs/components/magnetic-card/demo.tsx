"use client";

import React from "react";
import { MagneticCard } from "@/components/flexui/magnetic-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { MagneticCard } from "@/components/flexui/magnetic-card";

export default function Demo() {
  return (
    <div className="flex items-center gap-6">
      <MagneticCard className="w-64">
        <h3 className="text-lg font-semibold text-white">Magnetic Card</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Move your cursor over this card. It follows your mouse
          with a smooth spring animation.
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
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center gap-6">
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
      }
      code={code}
      filename="magnetic-card-demo.tsx"
    />
  );
}
