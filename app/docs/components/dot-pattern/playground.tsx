"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { DotPattern } from "@/components/flexui/dot-pattern";

const code = `import { DotPattern } from "@/components/flexui/dot-pattern";

export function Demo() {
  return (
    <DotPattern
      spacing={24}
      dotSize={1.2}
      fade
      className="h-[300px] w-full rounded-2xl border border-white/[0.08] bg-zinc-950"
    >
      <div className="flex h-full items-center justify-center">
        <p className="text-lg font-semibold text-white">
          Content on top of the dots
        </p>
      </div>
    </DotPattern>
  );
}`;

export function DotPatternPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <DotPattern
            spacing={24}
            dotSize={1.2}
            fade
            className="flex min-h-[300px] w-full items-center justify-center rounded-2xl border border-white/[0.08] bg-zinc-950"
          >
            <div className="flex h-full items-center justify-center">
              <p className="text-lg font-semibold text-white">
                Content on top of the dots
              </p>
            </div>
          </DotPattern>
        }
        code={code}
        filename="dot-pattern-demo.tsx"
      />
    </div>
  );
}
