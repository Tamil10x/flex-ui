"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { CounterUp } from "@/components/flexui/counter-up";

export function ComponentDemo() {
  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] items-center justify-center gap-12 p-8">
          <div className="flex flex-col items-center gap-2">
            <CounterUp end={1248} className="text-5xl" />
            <span className="text-sm text-zinc-500">Users</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CounterUp end={56} duration={1500} className="text-5xl" />
            <span className="text-sm text-zinc-500">Countries</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CounterUp end={99} duration={2500} className="text-5xl" />
            <span className="text-sm text-zinc-500">Uptime %</span>
          </div>
        </div>
      }
      code={`import { CounterUp } from "@/components/flexui/counter-up";

export function Demo() {
  return (
    <div className="flex gap-12">
      <CounterUp end={1248} className="text-5xl" />
      <CounterUp end={56} duration={1500} className="text-5xl" />
      <CounterUp end={99} duration={2500} className="text-5xl" />
    </div>
  );
}`}
      filename="counter-up-demo.tsx"
    />
  );
}
