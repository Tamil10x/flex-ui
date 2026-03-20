"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { AuroraBackground } from "@/components/flexui/aurora-background";

const code = `import { AuroraBackground } from "@/components/flexui/aurora-background";

export function Demo() {
  return (
    <AuroraBackground className="flex min-h-[400px] items-center justify-center rounded-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Aurora Borealis</h1>
        <p className="mt-2 text-zinc-400">A soft, animated background glow.</p>
      </div>
    </AuroraBackground>
  );
}`;

export function AuroraBackgroundPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <AuroraBackground className="flex min-h-[400px] w-full items-center justify-center rounded-2xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Aurora Borealis
              </h1>
              <p className="mt-2 text-zinc-400">
                A soft, animated background glow.
              </p>
            </div>
          </AuroraBackground>
        }
        code={code}
        filename="aurora-background-demo.tsx"
      />
    </div>
  );
}
