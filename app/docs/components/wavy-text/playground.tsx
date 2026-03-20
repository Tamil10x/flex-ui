"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { WavyText } from "@/components/flexui/wavy-text";

const code = `import { WavyText } from "@/components/flexui/wavy-text";

export function Demo() {
  return (
    <div className="space-y-8 text-center">
      <WavyText
        text="Hello, FlexUI."
        amplitude={20}
        delay={0.04}
        className="text-4xl font-bold text-white"
      />
      <WavyText
        text="Each character waves in with spring physics."
        amplitude={15}
        delay={0.03}
        className="text-lg text-zinc-400"
      />
    </div>
  );
}`;

export function WavyTextPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8">
            <WavyText
              text="Hello, FlexUI."
              amplitude={20}
              delay={0.04}
              className="text-4xl font-bold text-white"
            />
            <WavyText
              text="Each character waves in with spring physics."
              amplitude={15}
              delay={0.03}
              className="text-lg text-zinc-400"
            />
          </div>
        }
        code={code}
        filename="wavy-text-demo.tsx"
      />
    </div>
  );
}
