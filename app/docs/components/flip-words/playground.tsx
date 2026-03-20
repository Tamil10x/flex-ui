"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { FlipWords } from "@/components/flexui/flip-words";

const code = `import { FlipWords } from "@/components/flexui/flip-words";

export function Demo() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white">
        Build{" "}
        <FlipWords
          words={["beautiful", "modern", "animated", "responsive"]}
          duration={3000}
          className="text-blue-400"
        />{" "}
        interfaces
      </h1>
    </div>
  );
}`;

export function FlipWordsPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8">
            <h1 className="text-4xl font-bold text-white">
              Build{" "}
              <FlipWords
                words={["beautiful", "modern", "animated", "responsive"]}
                duration={3000}
                className="text-blue-400"
              />{" "}
              interfaces
            </h1>
          </div>
        }
        code={code}
        filename="flip-words-demo.tsx"
      />
    </div>
  );
}
