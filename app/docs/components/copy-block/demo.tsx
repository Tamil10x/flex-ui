"use client";

import React from "react";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";
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
    <PreviewCodeTabs
      preview={
        <div className="flex min-h-[200px] w-full items-center justify-center p-8">
          <div className="w-full max-w-lg">
            <CopyBlock code={sampleCode} filename="App.tsx" language="tsx" />
          </div>
        </div>
      }
      code={`import { CopyBlock } from "@/components/flexui/copy-block";

const sampleCode = \`const greeting = "Hello, world!";
console.log(greeting);\`;

export function Demo() {
  return (
    <CopyBlock
      code={sampleCode}
      filename="App.tsx"
      language="tsx"
    />
  );
}`}
      filename="copy-block-demo.tsx"
    />
  );
}
