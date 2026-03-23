"use client";

import React from "react";
import { TextGradientScroll } from "@/components/flexui/text-gradient-scroll";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const demoCode = `import { TextGradientScroll } from "@/components/flexui/text-gradient-scroll";

export function Demo() {
  return (
    <div className="flex flex-col items-center gap-12">
      <TextGradientScroll text="Build beautiful interfaces with FlexUI" />
      <TextGradientScroll text="Animated. Accessible. Modern." className="text-center" />
    </div>
  );
}`;

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-12 py-8">
          <p className="text-sm text-zinc-500">Scroll this page to see the gradient reveal effect</p>
          <TextGradientScroll text="Build beautiful interfaces with FlexUI" />
          <div className="h-8" />
          <TextGradientScroll text="Animated. Accessible. Modern." className="text-center" />
        </div>
      }
      code={demoCode}
      filename="text-gradient-scroll-demo.tsx"
    />
  );
}
