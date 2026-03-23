"use client";
import React from "react";
import { SaasLanding } from "@/components/flexui/pages/saas-landing";
import { PreviewCodeTabs } from "@/components/docs/preview-code-tabs";

const code = `import { SaasLanding } from "@/components/flexui/pages/saas-landing";

export default function Page() {
  return <SaasLanding />;
}`;

export function SaasLandingPlayground() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-500">Full SaaS landing page — scroll to see all sections.</p>
      <PreviewCodeTabs
        preview={<div className="w-full overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-950" style={{ maxHeight: 600, overflowY: "auto" }}><SaasLanding /></div>}
        code={code}
        filename="app/page.tsx"
      />
    </div>
  );
}
