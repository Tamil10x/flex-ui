"use client";

import React from "react";
import { TypewriterDelete } from "@/components/flexui/typewriter-delete";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { TypewriterDelete } from "@/components/flexui/typewriter-delete";

export function Demo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <TypewriterDelete
        text="Build stunning user interfaces with FlexUI."
        className="text-2xl"
      />
      <TypewriterDelete
        text="Fast. Animated. Accessible."
        speed={60}
        className="text-lg text-zinc-300"
      />
    </div>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6">
          <TypewriterDelete
            text="Build stunning user interfaces with FlexUI."
            className="text-2xl"
          />
          <TypewriterDelete
            text="Fast. Animated. Accessible."
            speed={60}
            className="text-lg text-zinc-300"
          />
        </div>
      }
      code={demoCode}
      filename="typewriter-delete-demo.tsx"
    />
  );
}
