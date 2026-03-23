"use client";

import React from "react";
import { AuroraCard } from "@/components/flexui/aurora-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { AuroraCard } from "@/components/flexui/aurora-card";

export function Demo() {
  return (
    <AuroraCard className="max-w-sm p-8">
      <h3 className="text-lg font-bold text-white">Aurora Card</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Hover to reveal a multi-layered aurora borealis effect
        that follows your cursor. Three color layers with
        staggered spring physics.
      </p>
    </AuroraCard>
  );
}`;

export function AuroraCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover over the card to see three independent aurora layers track your
        cursor with staggered spring physics. Move fast to see the layers
        separate — slow down to watch them merge.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <AuroraCard className="max-w-sm p-8">
              <h3 className="text-lg font-bold text-white">Aurora Card</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Hover to reveal a multi-layered aurora borealis effect that
                follows your cursor. Three color layers with staggered spring
                physics.
              </p>
            </AuroraCard>
          </div>
        }
        code={code}
        filename="aurora-card-demo.tsx"
      />
    </div>
  );
}
