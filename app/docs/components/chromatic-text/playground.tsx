"use client";

import React from "react";
import { ChromaticText } from "@/components/flexui/chromatic-text";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { ChromaticText } from "@/components/flexui/chromatic-text";

export function Demo() {
  return (
    <div className="flex items-center justify-center p-16">
      <ChromaticText className="text-6xl font-bold">
        FlexUI
      </ChromaticText>
    </div>
  );
}`;

export function ChromaticTextPlayground() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex items-center justify-center rounded-xl bg-black p-16">
          <ChromaticText className="text-6xl font-bold">
            FlexUI
          </ChromaticText>
        </div>
      }
      code={code}
      filename="chromatic-text-demo.tsx"
    />
  );
}
