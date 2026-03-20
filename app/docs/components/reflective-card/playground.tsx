"use client";

import React from "react";
import { ReflectiveCard } from "@/components/flexui/reflective-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { ReflectiveCard } from "@/components/flexui/reflective-card";

export function Demo() {
  return (
    <ReflectiveCard
      blurStrength={12}
      metalness={1}
      roughness={0.4}
      grayscale={1}
      specularConstant={1.2}
    />
  );
}`;

export function ReflectiveCardPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">
        This card uses your webcam as a blurred, metallic backdrop. Allow camera
        access when prompted.
      </p>
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[550px] w-full items-center justify-center">
            <ReflectiveCard />
          </div>
        }
        code={code}
        filename="reflective-card-demo.tsx"
      />
    </div>
  );
}
