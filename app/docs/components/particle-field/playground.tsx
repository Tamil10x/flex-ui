"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { ParticleField } from "@/components/flexui/particle-field";

const code = `import { ParticleField } from "@/components/flexui/particle-field";

export function Demo() {
  return (
    <ParticleField
      count={50}
      className="flex min-h-[400px] items-center justify-center rounded-2xl"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Particle Field</h1>
        <p className="mt-2 text-zinc-400">Floating dots that drift across the background.</p>
      </div>
    </ParticleField>
  );
}`;

export function ParticleFieldPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <ParticleField
            count={50}
            className="flex min-h-[400px] w-full items-center justify-center rounded-2xl"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Particle Field
              </h1>
              <p className="mt-2 text-zinc-400">
                Floating dots that drift across the background.
              </p>
            </div>
          </ParticleField>
        }
        code={code}
        filename="particle-field-demo.tsx"
      />
    </div>
  );
}
