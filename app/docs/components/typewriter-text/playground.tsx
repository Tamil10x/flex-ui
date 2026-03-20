"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { TypewriterText } from "@/components/flexui/typewriter-text";

const code = `import { TypewriterText } from "@/components/flexui/typewriter-text";

export function Demo() {
  return (
    <div className="text-center space-y-6">
      <TypewriterText
        words={["Hello, FlexUI.", "Build beautiful UIs.", "Ship with confidence."]}
        typingSpeed={80}
        deletingSpeed={50}
        pauseDuration={1500}
        className="text-4xl font-bold text-white"
      />
    </div>
  );
}`;

export function TypewriterTextPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8">
            <TypewriterText
              words={["Hello, FlexUI.", "Build beautiful UIs.", "Ship with confidence."]}
              typingSpeed={80}
              deletingSpeed={50}
              pauseDuration={1500}
              className="text-4xl font-bold text-white"
            />
          </div>
        }
        code={code}
        filename="typewriter-text-demo.tsx"
      />
    </div>
  );
}
