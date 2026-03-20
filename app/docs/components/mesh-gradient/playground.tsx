"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { MeshGradient } from "@/components/flexui/mesh-gradient";

const code = `import { MeshGradient } from "@/components/flexui/mesh-gradient";

export function Demo() {
  return (
    <MeshGradient className="flex h-[400px] items-center justify-center rounded-2xl">
      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
        Mesh Gradient
      </h1>
    </MeshGradient>
  );
}`;

export function MeshGradientPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <MeshGradient className="flex min-h-[350px] w-full items-center justify-center rounded-2xl">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Mesh Gradient
            </h1>
          </MeshGradient>
        }
        code={code}
        filename="mesh-gradient-demo.tsx"
      />
    </div>
  );
}
