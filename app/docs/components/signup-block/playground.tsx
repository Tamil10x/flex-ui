"use client";
import React from "react";
import { SignupBlock } from "@/components/flexui/signup-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { SignupBlock } from "@/components/flexui/signup-block";

export function Demo() {
  return <SignupBlock onSubmit={async (data) => console.log(data)} />;
}`;

export function SignupBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Multi-step signup with animated transitions between steps.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 p-8"><SignupBlock className="min-h-0" /></div>}
        code={code}
        filename="signup-block-demo.tsx"
      />
    </div>
  );
}
