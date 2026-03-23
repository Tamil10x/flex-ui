"use client";

import React from "react";
import { MorphingBorderCard } from "@/components/flexui/morphing-border-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { MorphingBorderCard } from "@/components/flexui/morphing-border-card";

export function Demo() {
  return (
    <MorphingBorderCard className="max-w-sm p-8">
      <h3 className="text-lg font-bold text-white">Morphing Border</h3>
      <p className="mt-2 text-sm text-zinc-400">
        Animated conic gradient border that continuously
        rotates. Hover to see the glow intensify and an
        inner spotlight follow your cursor.
      </p>
    </MorphingBorderCard>
  );
}`;

export function MorphingBorderCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        Watch the multi-color border rotate continuously. Hover to see the outer
        glow intensify and an inner spotlight track your cursor.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <MorphingBorderCard className="max-w-sm p-8">
              <h3 className="text-lg font-bold text-white">Morphing Border</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Animated conic gradient border that continuously rotates. Hover
                to see the glow intensify and an inner spotlight follow your
                cursor.
              </p>
            </MorphingBorderCard>
          </div>
        }
        code={code}
        filename="morphing-border-card-demo.tsx"
      />
    </div>
  );
}
