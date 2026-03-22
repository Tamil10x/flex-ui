"use client";

import React from "react";
import { CopyBlock } from "@/components/flexui/copy-block";

const sampleCode = `import { CopyBlock } from "@/components/flexui/copy-block";

export default function App() {
  return (
    <CopyBlock
      code="npm install flexui"
      filename="terminal"
      language="bash"
    />
  );
}`;

export function ComponentDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl border border-white/[0.04] bg-zinc-950/50 p-8">
      <div className="w-full max-w-lg">
        <CopyBlock code={sampleCode} filename="App.tsx" language="tsx" />
      </div>
    </div>
  );
}
