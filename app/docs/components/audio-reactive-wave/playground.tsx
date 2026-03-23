"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { AudioReactiveWave } from "@/components/flexui/audio-reactive-wave";

const code = `import { AudioReactiveWave } from "@/components/flexui/audio-reactive-wave";

export function Demo() {
  return (
    <AudioReactiveWave
      bars={64}
      className="flex min-h-[400px] items-center justify-center rounded-2xl"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Audio Wave</h1>
        <p className="mt-2 text-zinc-400">Reactive waveform visualization.</p>
      </div>
    </AudioReactiveWave>
  );
}`;

export function AudioReactiveWavePlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <AudioReactiveWave
            bars={64}
            className="flex min-h-[400px] w-full items-center justify-center rounded-2xl"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">Audio Wave</h1>
              <p className="mt-2 text-zinc-400">
                Reactive waveform visualization.
              </p>
            </div>
          </AudioReactiveWave>
        }
        code={code}
        filename="audio-reactive-wave-demo.tsx"
      />
    </div>
  );
}
