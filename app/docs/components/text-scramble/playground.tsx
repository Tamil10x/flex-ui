"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { TextScramble } from "@/components/flexui/text-scramble";

const code = `import { TextScramble } from "@/components/flexui/text-scramble";

export function Demo() {
  return (
    <div className="space-y-6 text-center">
      <TextScramble
        text="Hello, FlexUI."
        speed={40}
        revealDelay={3}
        className="text-4xl font-bold text-white"
      />
      <TextScramble
        text="Scramble through random characters before resolving."
        speed={30}
        revealDelay={2}
        className="text-lg text-zinc-400"
      />
    </div>
  );
}`;

export function TextScramblePlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-6">
            <TextScramble
              text="Hello, FlexUI."
              speed={40}
              revealDelay={3}
              className="text-4xl font-bold text-white"
            />
            <TextScramble
              text="Scramble through random characters before resolving."
              speed={30}
              revealDelay={2}
              className="text-lg text-zinc-400"
            />
          </div>
        }
        code={code}
        filename="text-scramble-demo.tsx"
      />
    </div>
  );
}
