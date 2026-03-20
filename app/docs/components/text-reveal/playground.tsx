"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { TextReveal } from "@/components/flexui/text-reveal";

const code = `import { TextReveal } from "@/components/flexui/text-reveal";

export function Demo() {
  return (
    <div className="space-y-8 text-center">
      <TextReveal
        text="Hello, FlexUI."
        mode="char"
        stagger={0.04}
        duration={0.5}
        className="text-4xl font-bold text-white"
      />
      <TextReveal
        text="Animate text word by word with a blur reveal."
        mode="word"
        stagger={0.08}
        duration={0.6}
        className="text-lg text-zinc-400"
      />
    </div>
  );
}`;

export function TextRevealPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8">
            <TextReveal
              text="Hello, FlexUI."
              mode="char"
              stagger={0.04}
              duration={0.5}
              className="text-4xl font-bold text-white"
            />
            <TextReveal
              text="Animate text word by word with a blur reveal."
              mode="word"
              stagger={0.08}
              duration={0.6}
              className="text-lg text-zinc-400"
            />
          </div>
        }
        code={code}
        filename="text-reveal-demo.tsx"
      />
    </div>
  );
}
