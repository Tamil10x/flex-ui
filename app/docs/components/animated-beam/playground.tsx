"use client";

import React, { useState } from "react";
import { AnimatedBeam } from "@/components/flexui/animated-beam";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const defaultPath =
  "M 50,50 C 100,20 200,80 300,50 C 400,20 500,80 550,50";

const code = `"use client";

import { AnimatedBeam } from "@/components/flexui/animated-beam";

export default function AnimatedBeamDemo() {
  return (
    <div className="relative w-full h-40">
      <AnimatedBeam
        pathData="M 50,50 C 100,20 200,80 300,50 C 400,20 500,80 550,50"
        color="#389CFD"
        width={2}
        speed={3}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}`;

export function AnimatedBeamPlayground() {
  const [color, setColor] = useState("#389CFD");
  const [speed, setSpeed] = useState(3);
  const [width, setWidth] = useState(2);

  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6 py-12">
          <div className="relative w-full h-32">
            <AnimatedBeam
              pathData={defaultPath}
              color={color}
              width={width}
              speed={speed}
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Color
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Speed
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-24"
              />
              <span className="w-8 text-right font-mono text-xs text-zinc-500">
                {speed}s
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Width
              <input
                type="range"
                min={1}
                max={6}
                step={0.5}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-24"
              />
              <span className="w-8 text-right font-mono text-xs text-zinc-500">
                {width}px
              </span>
            </label>
          </div>
        </div>
      }
      code={code}
      filename="animated-beam-demo.tsx"
    />
  );
}
