"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { WavyBackground } from "@/components/flexui/wavy-background";

const code = `import { WavyBackground } from "@/components/flexui/wavy-background";

export function Demo() {
  return (
    <WavyBackground className="flex h-[400px] items-center justify-center rounded-2xl bg-zinc-950">
      <h1 className="text-4xl font-bold text-white">
        Wavy Background
      </h1>
    </WavyBackground>
  );
}`;

export function WavyBackgroundPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <WavyBackground className="flex min-h-[350px] w-full items-center justify-center rounded-2xl bg-zinc-950">
            <h1 className="text-4xl font-bold text-white">
              Wavy Background
            </h1>
          </WavyBackground>
        }
        code={code}
        filename="wavy-background-demo.tsx"
      />
    </div>
  );
}
