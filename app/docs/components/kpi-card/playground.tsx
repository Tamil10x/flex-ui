"use client";

import React, { useState } from "react";
import { KPICard } from "@/components/flexui/kpi-card";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const sparkData = [4, 8, 6, 12, 9, 15, 11, 18, 14, 20, 17, 22];

const code = `"use client";

import { KPICard } from "@/components/flexui/kpi-card";

const sparkData = [4, 8, 6, 12, 9, 15, 11, 18, 14, 20, 17, 22];

export default function KPICardDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 p-8">
      <KPICard
        title="Revenue"
        value={48250}
        prefix="$"
        change={12.5}
        sparklineData={sparkData}
      />
      <KPICard
        title="Users"
        value={3842}
        change={8.3}
        sparklineData={sparkData}
      />
      <KPICard
        title="Bounce Rate"
        value={24.6}
        suffix="%"
        change={-3.2}
        sparklineData={[22, 18, 25, 20, 28, 24, 30, 26, 22, 19, 24, 21]}
      />
    </div>
  );
}`;

export function KPICardPlayground() {
  const [val, setVal] = useState(48250);
  const [change, setChange] = useState(12.5);

  return (
    <PreviewCodeTabs
      preview={
        <div className="flex flex-col items-center gap-6 py-12">
          <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
            <KPICard
              title="Revenue"
              value={val}
              prefix="$"
              change={change}
              sparklineData={sparkData}
            />
            <KPICard
              title="Users"
              value={3842}
              change={8.3}
              sparklineData={[10, 14, 12, 18, 16, 22, 20, 26, 24, 30, 28, 34]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Value
              <input
                type="range"
                min={1000}
                max={100000}
                step={500}
                value={val}
                onChange={(e) => setVal(Number(e.target.value))}
                className="w-28"
              />
              <span className="w-16 text-right font-mono text-xs text-zinc-500">
                {val.toLocaleString()}
              </span>
            </label>
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              Change %
              <input
                type="range"
                min={-50}
                max={50}
                step={0.5}
                value={change}
                onChange={(e) => setChange(Number(e.target.value))}
                className="w-28"
              />
              <span className="w-12 text-right font-mono text-xs text-zinc-500">
                {change.toFixed(1)}%
              </span>
            </label>
          </div>
        </div>
      }
      code={code}
      filename="kpi-card-demo.tsx"
    />
  );
}
