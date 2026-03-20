"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { ScrollCounter } from "@/components/flexui/scroll-counter";

const code = `import { ScrollCounter } from "@/components/flexui/scroll-counter";

export function Demo() {
  return (
    <div className="flex items-center gap-12 text-center">
      <div>
        <ScrollCounter
          to={10000}
          className="text-5xl font-bold text-white"
        />
        <p className="mt-2 text-sm text-zinc-500">Users</p>
      </div>
      <div>
        <ScrollCounter
          to={99.9}
          suffix="%"
          decimals={1}
          className="text-5xl font-bold text-white"
        />
        <p className="mt-2 text-sm text-zinc-500">Uptime</p>
      </div>
      <div>
        <ScrollCounter
          to={42}
          prefix="$"
          suffix="M"
          className="text-5xl font-bold text-white"
        />
        <p className="mt-2 text-sm text-zinc-500">Revenue</p>
      </div>
    </div>
  );
}`;

export function ScrollCounterPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full items-center justify-center gap-12">
            <div className="text-center">
              <ScrollCounter
                to={10000}
                className="text-5xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-zinc-500">Users</p>
            </div>
            <div className="text-center">
              <ScrollCounter
                to={99.9}
                suffix="%"
                decimals={1}
                className="text-5xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-zinc-500">Uptime</p>
            </div>
            <div className="text-center">
              <ScrollCounter
                to={42}
                prefix="$"
                suffix="M"
                className="text-5xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-zinc-500">Revenue</p>
            </div>
          </div>
        }
        code={code}
        filename="scroll-counter-demo.tsx"
      />
    </div>
  );
}
