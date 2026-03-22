"use client";

import React from "react";
import { CodeInline } from "@/components/flexui/code-inline";

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-6 rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <p className="max-w-lg text-center text-sm leading-relaxed text-zinc-300">
        Install the package with <CodeInline>npm install flexui</CodeInline> and
        import the component using{" "}
        <CodeInline>{"import { Button }"}</CodeInline> from the library.
      </p>
      <p className="max-w-lg text-center text-sm leading-relaxed text-zinc-300">
        Set the environment variable <CodeInline>NODE_ENV=production</CodeInline>{" "}
        before running <CodeInline>next build</CodeInline> to enable
        optimizations.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <CodeInline>string</CodeInline>
        <CodeInline>number</CodeInline>
        <CodeInline>boolean</CodeInline>
        <CodeInline>ReactNode</CodeInline>
      </div>
    </div>
  );
}
