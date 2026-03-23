"use client";
import React from "react";
import { LoginBlock } from "@/components/flexui/login-block";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { LoginBlock } from "@/components/flexui/login-block";

export function Demo() {
  return <LoginBlock onSubmit={async ({ email }) => console.log(email)} />;
}`;

export function LoginBlockPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Login form with social providers and email/password fields.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950 p-8"><LoginBlock className="min-h-0" /></div>}
        code={code}
        filename="login-block-demo.tsx"
      />
    </div>
  );
}
