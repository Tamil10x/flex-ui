"use client";

import React from "react";
import { NeonGlowCard } from "@/components/flexui/neon-glow-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { NeonGlowCard } from "@/components/flexui/neon-glow-card";

export function Demo() {
  return (
    <NeonGlowCard className="max-w-sm p-8">
      <h3 className="text-lg font-bold text-white">Neon Glow Card</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Hover to intensify the neon glow. The light concentrates near your cursor.
      </p>
    </NeonGlowCard>
  );
}`;

export function NeonGlowCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Hover over the card to see the neon glow intensify and track your
        cursor. The glow pulses continuously for a breathing neon-tube effect.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <NeonGlowCard className="max-w-sm p-8">
              <h3 className="text-lg font-bold text-white">Neon Glow Card</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Hover to intensify the neon glow. The light concentrates near
                your cursor.
              </p>
            </NeonGlowCard>
          </div>
        }
        code={code}
        filename="neon-glow-card-demo.tsx"
      />
    </div>
  );
}
