"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { SplitText } from "@/components/flexui/split-text";

const code = `import { SplitText } from "@/components/flexui/split-text";

export function Demo() {
  return (
    <div className="space-y-8 text-center">
      <SplitText
        text="Hello, FlexUI."
        splitBy="char"
        variant="slide-up"
        stagger={0.04}
        className="text-4xl font-bold text-white"
      />
      <SplitText
        text="Animate text word by word with split animations."
        splitBy="word"
        variant="slide-up"
        stagger={0.08}
        className="text-lg text-zinc-400"
      />
    </div>
  );
}`;

export function SplitTextPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8">
            <SplitText
              text="Hello, FlexUI."
              splitBy="char"
              variant="slide-up"
              stagger={0.04}
              className="text-4xl font-bold text-white"
            />
            <SplitText
              text="Animate text word by word with split animations."
              splitBy="word"
              variant="slide-up"
              stagger={0.08}
              className="text-lg text-zinc-400"
            />
          </div>
        }
        code={code}
        filename="split-text-demo.tsx"
      />
    </div>
  );
}
