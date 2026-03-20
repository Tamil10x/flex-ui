"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { GradientText } from "@/components/flexui/gradient-text";

const code = `import { GradientText } from "@/components/flexui/gradient-text";

export function Demo() {
  return (
    <div className="text-center space-y-6">
      <GradientText className="text-5xl font-bold">
        FlexUI Gradient
      </GradientText>
      <GradientText
        colors={["#f97316", "#ef4444", "#ec4899", "#f97316"]}
        speed={4}
        className="text-2xl font-semibold"
      >
        Custom color palette
      </GradientText>
    </div>
  );
}`;

export function GradientTextPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[250px] w-full flex-col items-center justify-center gap-8">
            <GradientText className="text-5xl font-bold">
              FlexUI Gradient
            </GradientText>
            <GradientText
              colors={["#f97316", "#ef4444", "#ec4899", "#f97316"]}
              speed={4}
              className="text-2xl font-semibold"
            >
              Custom color palette
            </GradientText>
          </div>
        }
        code={code}
        filename="gradient-text-demo.tsx"
      />
    </div>
  );
}
