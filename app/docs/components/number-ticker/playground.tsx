"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { NumberTicker } from "@/components/flexui/number-ticker";

const code = `import { NumberTicker } from "@/components/flexui/number-ticker";

export function Demo() {
  return (
    <div className="flex items-center gap-12 text-center">
      <div>
        <NumberTicker
          value={1234}
          className="text-5xl font-bold text-white"
        />
        <p className="mt-2 text-sm text-zinc-500">Users</p>
      </div>
      <div>
        <NumberTicker
          value={99.9}
          suffix="%"
          decimals={1}
          className="text-5xl font-bold text-white"
        />
        <p className="mt-2 text-sm text-zinc-500">Uptime</p>
      </div>
      <div>
        <NumberTicker
          value={42}
          prefix="$"
          suffix="M"
          className="text-5xl font-bold text-white"
        />
        <p className="mt-2 text-sm text-zinc-500">Revenue</p>
      </div>
    </div>
  );
}`;

export function NumberTickerPlayground() {
  return (
    <div className="space-y-4">
      <PreviewCodeTabs
        preview={
          <div className="flex min-h-[200px] w-full items-center justify-center gap-12">
            <div className="text-center">
              <NumberTicker
                value={1234}
                className="text-5xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-zinc-500">Users</p>
            </div>
            <div className="text-center">
              <NumberTicker
                value={99.9}
                suffix="%"
                decimals={1}
                className="text-5xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-zinc-500">Uptime</p>
            </div>
            <div className="text-center">
              <NumberTicker
                value={42}
                prefix="$"
                suffix="M"
                className="text-5xl font-bold text-white"
              />
              <p className="mt-2 text-sm text-zinc-500">Revenue</p>
            </div>
          </div>
        }
        code={code}
        filename="number-ticker-demo.tsx"
      />
    </div>
  );
}
