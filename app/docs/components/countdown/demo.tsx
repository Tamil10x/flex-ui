"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
import { Countdown } from "@/components/flexui/countdown";

export function ComponentDemo() {
  const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-8">
          <Countdown targetDate={target} />
          <p className="text-sm text-zinc-500">Counting down to 7 days from now</p>
        </div>
      }
      code={`import { Countdown } from "@/components/flexui/countdown";

export function Demo() {
  const target = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <Countdown
      targetDate={target}
      onComplete={() => console.log("Done!")}
    />
  );
}`}
      filename="countdown-demo.tsx"
    />
  );
}
