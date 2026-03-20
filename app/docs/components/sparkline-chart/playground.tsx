"use client";

import React, { useState } from "react";
import { SparklineChart } from "@/components/flexui/sparkline-chart";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const sampleData = [4, 8, 6, 12, 9, 15, 11, 18, 14, 20, 17, 22];

const code = `"use client";

import { SparklineChart } from "@/components/flexui/sparkline-chart";

const data = [4, 8, 6, 12, 9, 15, 11, 18, 14, 20, 17, 22];

export default function SparklineDemo() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <SparklineChart data={data} width={280} height={60} showArea animate />
    </div>
  );
}`;

export function SparklineChartPlayground() {
  const [showArea, setShowArea] = useState(true);
  const [color, setColor] = useState("#38bdf8");

  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6 py-12">
          <SparklineChart
            data={sampleData}
            width={280}
            height={80}
            showArea={showArea}
            animate
            color={color}
          />
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <input
                type="checkbox"
                checked={showArea}
                onChange={(e) => setShowArea(e.target.checked)}
                className="rounded border-zinc-700 bg-zinc-900"
              />
              Show area fill
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Color
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-6 w-6 cursor-pointer rounded border-0 bg-transparent"
              />
            </label>
          </div>
        </div>
      }
      code={code}
      filename="sparkline-demo.tsx"
    />
  );
}
