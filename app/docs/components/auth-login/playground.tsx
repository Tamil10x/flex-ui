"use client";
import React from "react";
import { AuthLogin } from "@/components/flexui/pages/auth-login";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { AuthLogin } from "@/components/flexui/pages/auth-login";

export default function Page() {
  return <AuthLogin />;
}`;

export function AuthLoginPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Split layout with brand panel and login form.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ height: 600, overflowY: "auto" }}><AuthLogin /></div>}
        code={code}
        filename="app/login/page.tsx"
      />
    </div>
  );
}
