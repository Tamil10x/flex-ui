"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { BlurText } from "@/components/flexui/blur-text";

const code = `import { BlurText } from "@/components/flexui/blur-text";

export function Demo() {
  return (
    <div className="space-y-6 text-center">
      <BlurText
        text="Hello, FlexUI."
        mode="word"
        blur={10}
        delay={0.1}
        duration={0.5}
        className="text-4xl font-bold text-white"
      />
      <BlurText
        text="Text fades in from a blurred state, word by word."
        mode="word"
        blur={8}
        delay={0.06}
        duration={0.4}
        className="text-lg text-zinc-400"
      />
    </div>
  );
}`;

export function BlurTextPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-6">
            <BlurText
              text="Hello, FlexUI."
              mode="word"
              blur={10}
              delay={0.1}
              duration={0.5}
              className="text-4xl font-bold text-white"
            />
            <BlurText
              text="Text fades in from a blurred state, word by word."
              mode="word"
              blur={8}
              delay={0.06}
              duration={0.4}
              className="text-lg text-zinc-400"
            />
          </div>
        }
        code={code}
        filename="blur-text-demo.tsx"
      />
    </div>
  );
}
